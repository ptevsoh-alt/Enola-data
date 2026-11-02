const fs = require("fs"),
  path = require("path"),
  vm = require("vm"),
  crypto = require("crypto"),
  assert = require("assert/strict");
const site = path.resolve(__dirname, "../site"),
  ctx = { window: {} };
const checks = [];
function check(n, fn) {
  fn();
  checks.push({ name: n, status: "PASS" });
}
vm.runInNewContext(fs.readFileSync(path.join(site, "data.js"), "utf8"), ctx);
const p = ctx.window.PORTFOLIO;
check("11 unique cases and 38 retained public metrics", () => {
  assert.equal(p.cases.length, 11);
  assert.equal(p.metrics.length, 38);
  assert.equal(new Set(p.cases.map((c) => c.id)).size, 11);
  assert.equal(new Set(p.metrics.map((m) => m.id)).size, 38);
});
check("metric provenance, definitions, windows and limitations", () =>
  p.metrics.forEach((m) => {
    for (const k of [
      "source",
      "window",
      "definition",
      "limits",
      "unit",
      "status",
      "sourceId",
      "fieldVerification",
    ])
      assert.ok(m[k], m.id + ":" + k);
    assert.notEqual(m.status, "VERIFIED");
    assert.equal(m.evidenceStatus, m.status);
  }),
);
check("no creator operating records in any public payload", () => {
  assert.equal(
    p.metrics.filter(
      (m) => m.domain === "creator" || m.id.startsWith("creator-"),
    ).length,
    0,
  );
  assert.equal(p.cases.find((c) => c.id === "creator").metrics.length, 0);
  const text = fs
    .readdirSync(site)
    .filter((f) => /\.(js|html|css)$/.test(f))
    .map((f) => fs.readFileSync(path.join(site, f), "utf8"))
    .join("");
  assert.ok(
    !/creator-(?:new|videos|active|gmv)|GMV|新增达人|活跃达人|飞书表|科技有限公司|Qimedo/i.test(
      text,
    ),
  );
});
check("missing values and unverified comparison windows preserved", () => {
  assert.equal(p.metrics.find((m) => m.id === "retention").value, null);
  assert.equal(p.metrics.find((m) => m.id === "fb-viewers").value, null);
  p.metrics
    .filter((m) => m.sourceType === "screenshot")
    .forEach((m) => {
      assert.equal(m.windowStart, null);
      assert.equal(m.comparisonWindow, null);
    });
});
check("all content links resolve", () => {
  p.cases.forEach((c) =>
    c.metrics.forEach((id) => assert.ok(p.metrics.some((m) => m.id === id))),
  );
  p.metrics.forEach((m) => assert.ok(p.cases.some((c) => c.id === m.caseId)));
  p.capabilities.forEach((c) => assert.ok(p.cases.some((x) => x.id === c[3])));
});
check("scripts parse", () => {
  for (const file of ["data.js", "app.js"])
    new vm.Script(fs.readFileSync(path.join(site, file), "utf8"));
});
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    let f = path.join(d, e.name);
    e.isDirectory() ? walk(f) : files.push(f);
  }
}
walk(site);
check("public assets exhaustive, portable and hash verified", () => {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(site, "../PUBLIC_ASSETS.json")),
  );
  assert.deepEqual(
    manifest.map((e) => e.file).sort(),
    files.map((f) => path.relative(site, f).split(path.sep).join("/")).sort(),
  );
  manifest.forEach((e) => {
    assert.ok(!e.file.includes("\\") && !e.file.includes(".."));
    const b = fs.readFileSync(path.join(site, e.file));
    assert.equal(e.bytes, b.length);
    assert.equal(e.sha256, crypto.createHash("sha256").update(b).digest("hex"));
  });
});
check(
  "no raw evidence, private paths, remote scripts or submission code",
  () => {
    files
      .filter((f) => /\.(js|html|css|txt)$/.test(f))
      .forEach((f) => {
        const s = fs.readFileSync(f, "utf8");
        assert.ok(
          !/(?:[CD]:[\\/]|sourceImage|assets\/evidence|https?:\/\/|fetch\(|XMLHttpRequest|sendBeacon)/.test(
            s,
          ),
          f,
        );
      });
    assert.ok(!fs.existsSync(path.join(site, "assets/evidence")));
  },
);
console.log(
  JSON.stringify(
    { checks, passed: checks.length, total: checks.length },
    null,
    2,
  ),
);
