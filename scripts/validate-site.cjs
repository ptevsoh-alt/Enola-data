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
check("11 unique cases and 36 supported public metrics", () => {
  assert.equal(p.cases.length, 11);
  assert.equal(p.metrics.length, 36);
  assert.equal(new Set(p.cases.map((c) => c.id)).size, 11);
  assert.equal(new Set(p.metrics.map((m) => m.id)).size, 36);
  assert.ok(p.metrics.every((m) => !["待补充","--"].includes(m.display)), "No placeholder outcomes in public metrics");
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
  assert.ok(!p.metrics.some((m) => m.id === "retention"), "Unverified lifecycle outcome is excluded from public data");
  assert.ok(!p.metrics.some((m) => m.id === "fb-viewers"), "Unavailable Facebook viewers value is not a public KPI");
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
  p.experiences.forEach((experience) =>
    experience.work.forEach(([id]) => assert.ok(p.cases.some((c) => c.id === id))),
  );
});
check("independent review entry and relative navigation", () => {
  const review = fs.readFileSync(path.join(site, "review/index.html"), "utf8");
  assert.ok(/href="review\.css(?:\?[^"]*)?"/.test(review));
  assert.ok(/src="review\.js(?:\?[^"]*)?"/.test(review));
  assert.match(review, /src="\.\.\/data\.js(?:\?[^"]*)?"/);
  assert.ok(review.includes('name="robots" content="noindex, nofollow"'));
  assert.ok(fs.existsSync(path.join(site, "review/review.css")));
  assert.ok(fs.existsSync(path.join(site, "review/review.js")));
  assert.ok(fs.readFileSync(path.join(site, "index.html"), "utf8").includes('href="review/"'));
});
check("scripts parse", () => {
  for (const file of ["data.js", "selected-work.js", "app.js", "growth.js", "projects.js", "review/review.js"])
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
        // The two explicitly approved, publicly readable Drive films are embedded as media,
        // never as scripts or API calls; every other outbound URL remains prohibited.
        const approvedMedia = s.replace(
          /https:\/\/drive\.google\.com\/file\/d\/(?:15m5TOYZh90NUqTmSbHget8BJbeBEhLKE|1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y)\/(?:preview|view(?:\?usp=drivesdk)?)/g,
          "APPROVED_DRIVE_VIDEO",
        );
        assert.ok(
          !/(?:[CD]:[\\/]|sourceImage|https?:\/\/|fetch\(|XMLHttpRequest|sendBeacon)/.test(
            approvedMedia,
          ),
          f,
        );
      });
    const evidenceDir = path.join(site, "assets/evidence");
    assert.deepEqual(
      fs.readdirSync(evidenceDir).sort(),
      ["facebook-group-insights.webp", "facebook-page-insights.webp"],
    );
    for (const name of fs.readdirSync(evidenceDir)) {
      const stat = fs.statSync(path.join(evidenceDir, name));
      assert.ok(stat.size > 0 && stat.size < 10000, name);
    }
  },
);

check("public identity minimization and video case preservation", () => {
  const pathText = [
    "index.html", "app.js", "data.js", "growth.js", "projects.js",
    "role-journeys.js", "selected-work.js", "review/index.html",
    "review/review.js"
  ].map((file) => fs.readFileSync(path.join(site, file), "utf8")).join("\n");
  const unapprovedNames = [/\u745e\u97f3\u535a/, /\u78b3\u5b9d\u8d1d/, /Qimedo/i];
  assert.ok(unapprovedNames.every((pattern) => !pattern.test(pathText)),
    "Employer or brand identifier leaked into public website");
  assert.ok(!/[A-Z]:[\\\/](?:Users|Documents|Projects)/i.test(pathText),
    "Private local directory exposed");
  assert.ok(!/(?:[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|(?<![\d.])(?:\+?86[- ]?)?1[3-9]\d{9}(?!\d))/.test(pathText),
    "Direct email/phone identifier exposed");
  const videoCase = fs.readFileSync(path.join(site,"projects.js"),"utf8");
  const videoReview = fs.readFileSync(path.join(site,"review/index.html"),"utf8");
  assert.ok(videoCase.includes('id="video-brand-positioning"'));
  assert.ok(videoCase.includes('id="video-campaign-showcase"'));
  assert.ok(videoReview.includes('id="review-videos"'));
  for (const key of ["1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y",
                     "15m5TOYZh90NUqTmSbHget8BJbeBEhLKE"]) {
    assert.ok(videoCase.includes(key) && videoReview.includes(key),
      "One full TVC playback link was removed");
  }
  for (const name of ["creator-staircase-7s.mp4","creator-livingroom-7s.mp4"]) {
    assert.ok(fs.existsSync(path.join(site,"assets/video",name)),
      "Locally hosted video excerpt removed");
  }
});

console.log(
  JSON.stringify(
    { checks, passed: checks.length, total: checks.length },
    null,
    2,
  ),
);
