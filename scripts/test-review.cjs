const fs = require("fs"),
  path = require("path"),
  http = require("http"),
  { spawn } = require("child_process"),
  { JSDOM, VirtualConsole } = require("jsdom"),
  assert = require("assert/strict");

(async () => {
  const site = path.resolve(__dirname, "../site");
  const html = fs.readFileSync(path.join(site, "review/index.html"), "utf8");
  const errors = [];
  const dom = new JSDOM(html, {
    url: "https://portfolio.test/Enola-data/review/",
    runScripts: "outside-only",
    pretendToBeVisual: true,
    virtualConsole: new VirtualConsole().on("jsdomError", (error) =>
      errors.push(error.message),
    ),
  });
  const w = dom.window,
    d = w.document;
  w.eval(fs.readFileSync(path.join(site, "data.js"), "utf8"));
  w.eval(fs.readFileSync(path.join(site, "review/review.js"), "utf8"));

  const check = (name, fn) => {
    fn();
    console.log("PASS " + name);
  };

  check("review index renders all 11 cases", () => {
    assert.equal(d.querySelectorAll("[data-review-case-card]").length, 11);
    assert.equal(w.__PORTFOLIO_REVIEW_READY__.cases, 11);
  });
  check("review index renders all 38 metrics and six data domains", () => {
    assert.equal(w.__PORTFOLIO_REVIEW_READY__.metrics, 38);
    assert.equal(d.querySelectorAll(".review-domain-card").length, 6);
    assert.equal(d.querySelectorAll(".review-evidence-status").length, 5);
  });
  check("visual gallery points to existing local assets", () => {
    const images = [...d.querySelectorAll(".review-visual-image img")];
    assert.equal(images.length, 15);
    images.forEach((img) => {
      const url = new URL(img.getAttribute("src"), w.location.href);
      const relative = path.relative("/Enola-data", url.pathname).replace(/^\//, "");
      assert.ok(fs.existsSync(path.join(site, relative)), img.getAttribute("src"));
    });
  });
  check("case and data navigation returns to the main portfolio routes", () => {
    assert.equal(d.querySelectorAll('.review-case-card a[href^="../#/case/"]').length, 11);
    assert.equal(d.querySelectorAll('.review-domain-card a[href^="../#/data/"]').length, 6);
    assert.ok(d.querySelector('a[href="../#/home"]'));
  });
  check("case search filters and restores the full index", () => {
    const input = d.querySelector("#review-search");
    input.value = "Amazon";
    input.dispatchEvent(new w.Event("input", { bubbles: true }));
    assert.equal([...d.querySelectorAll("[data-review-case-card]")].filter((x) => !x.hidden).length, 1);
    input.value = "";
    input.dispatchEvent(new w.Event("input", { bubbles: true }));
    assert.equal([...d.querySelectorAll("[data-review-case-card]")].filter((x) => !x.hidden).length, 11);
  });
  check("review route is marked noindex and has no remote dependencies", () => {
    assert.ok(d.querySelector('meta[name="robots"][content="noindex, nofollow"]'));
    assert.equal(d.querySelectorAll('script[src^="http"],link[href^="http"]').length, 0);
    assert.deepEqual(errors, []);
  });
  w.close();

  const port = 8175;
  const server = spawn(process.execPath, [path.resolve(__dirname, "../preview.cjs")], {
    env: { ...process.env, PORT: String(port) },
    stdio: "ignore",
  });
  const get = (pathname) =>
    new Promise((resolve, reject) => {
      const req = http.get("http://127.0.0.1:" + port + pathname, (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            type: res.headers["content-type"],
            body: Buffer.concat(chunks),
          }),
        );
      });
      req.on("error", reject);
    });
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    let ready = false;
    for (let i = 0; i < 30 && !ready; i += 1) {
      try {
        const response = await get("/review/");
        ready = response.status === 200;
      } catch {
        await wait(100);
      }
    }
    assert.ok(ready, "preview server did not become ready");
    const page = await get("/review/");
    check("local preview serves /review/ as an index document", () => {
      assert.equal(page.status, 200);
      assert.match(page.type, /text\/html/);
      assert.ok(page.body.toString("utf8").includes("INDEPENDENT REVIEW"));
    });
    const css = await get("/review/review.css");
    check("local preview serves nested review styles", () => {
      assert.equal(css.status, 200);
      assert.match(css.type, /text\/css/);
    });
    const image = await get("/assets/projects/exhibition-booth-overview-redacted.jpg");
    check("local preview serves anonymized JPEG assets with image MIME", () => {
      assert.equal(image.status, 200);
      assert.match(image.type, /image\/jpeg/);
      assert.ok(image.body.length > 0);
    });
  } finally {
    server.kill("SIGTERM");
    await wait(100);
  }
  console.log("Review entry checks passed.");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
