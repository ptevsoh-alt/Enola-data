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
  w.eval(fs.readFileSync(path.join(site, "selected-work.js"), "utf8"));
  w.eval(fs.readFileSync(path.join(site, "review/review.js"), "utf8"));

  const check = (name, fn) => {
    fn();
    console.log("PASS " + name);
  };

  check("review index renders all 11 cases", () => {
    assert.equal(d.querySelectorAll("[data-review-case-card]").length, 11);
    assert.equal(w.__PORTFOLIO_REVIEW_READY__.cases, 11);
    assert.equal(d.querySelector("#review-direction").textContent, `${w.PORTFOLIO.profile.direction} · ${w.PORTFOLIO.profile.focus}`);
    assert.equal(d.querySelector("#review-intro").textContent, w.PORTFOLIO.profile.summary);
  });
  check("selected work links to projects in the same personal portfolio", () => {
    const links = [...d.querySelectorAll("#review-path .review-path-card")];
    assert.deepEqual(links.map((link) => link.hash.split("/")[2]), ["gtm", "brand", "social", "operations", "creative", "b2b"]);
    assert.equal(d.querySelector("#review-path h2").textContent, "代表项目");
    assert.equal(d.querySelectorAll("#review-cases .review-status").length, 0);
    assert.ok(!d.querySelector("#review-cases").textContent.includes("项关联指标"));
    assert.ok(d.querySelector('.review-path-card[href^="../#/case/b2b/"] img[src$="exhibition-booth-overview-redacted.jpg"]'));
    assert.ok(d.querySelector('#review-path ~ #review-cases'));
    links.forEach((link) => {
      const [, , id, chapter] = link.hash.split("/");
      assert.equal(chapter, w.PORTFOLIO_SELECTED_WORK[id].chapter);
      assert.equal(link.querySelector("h3").textContent, w.PORTFOLIO_SELECTED_WORK[id].title);
    });
    assert.deepEqual([...d.querySelectorAll("#review-kpis strong")].map((node) => node.textContent), ["96.5万", "3.7万"]);

  });
  check("review index renders 36 supported metrics and six data domains", () => {
    assert.equal(w.__PORTFOLIO_REVIEW_READY__.metrics, 36);
    assert.equal(d.querySelectorAll(".review-domain-card").length, 6);
    assert.equal(d.querySelectorAll(".review-outcome-card").length, 4);
  });

  check("review page renders Campaign, creative, community and delivery visual maps", () => {
    assert.deepEqual([...d.querySelectorAll("#review-campaign-flow li b")].map((node) => node.textContent), ["选场景", "定主张", "拆交付", "核上线"]);
    assert.ok(d.querySelector('#review-systems a[href="../#/case/gtm/campaign-mechanism-mapping"]'));
    assert.equal(d.querySelectorAll("#review-territories .review-territory-card").length, 5);
    assert.equal(d.querySelectorAll("#review-community-flow li").length, 4);
    assert.deepEqual([...d.querySelectorAll("#review-delivery-flow li b")].map((node) => node.textContent), ["排优先级", "定验收项", "审物料", "复盘交接"]);
  });
  check("review gallery embeds two full TVCs and two distinct Creator scenes", () => {
    const clips = [...d.querySelectorAll("#review-videos video")];
    assert.equal(clips.length, 2);
    assert.ok(d.querySelector('nav a[href="#review-videos"]'));
    assert.equal(d.querySelectorAll('#review-videos iframe').length, 2);
    assert.ok(d.querySelector('#review-videos iframe[src="https://drive.google.com/file/d/15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/preview"]'));
    assert.ok(d.querySelector('#review-videos iframe[src="https://drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/preview"]'));
    assert.ok(d.querySelector('#review-videos').textContent.includes("KOL / Creator"));
    assert.ok(d.querySelector('#review-videos source[src="../assets/video/creator-livingroom-7s.mp4"]'));
    assert.ok(d.querySelector('#review-videos source[src="../assets/video/creator-staircase-7s.mp4"]'));
    assert.ok(!d.querySelector('#review-videos source[src*="holiday-story.mp4"]'));
    assert.ok(!d.querySelector('#review-videos source[src*="#t="]'));
    clips.forEach((clip) => {
      assert.ok(clip.hasAttribute("controls"));
      assert.ok(clip.hasAttribute("playsinline"));
      const source = clip.querySelector('source[type="video/mp4"]');
      assert.ok(source);
      const relative = path.relative("/Enola-data", new URL(source.getAttribute("src"), w.location.href).pathname).replace(/^\//, "");
      assert.ok(fs.existsSync(path.join(site, relative)), relative);
    });
  });
  check("review links both themed Campaign TVCs and the creative strategy", () => {
    const links = [...d.querySelectorAll(".review-film-editions a")];
    assert.equal(links.length, 3);
    assert.ok(links.some(link => link.getAttribute("href").includes("15m5TOYZh90NUqTmSbHget8BJbeBEhLKE/view")));
    assert.ok(links.some(link => link.getAttribute("href").includes("1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/view")));
    assert.ok(links.some(link => link.getAttribute("href") === "../#/case/creative/video-campaign-strategy"));
  });
  check("visual gallery points to existing local assets", () => {
    const images = [...d.querySelectorAll(".review-visual-image img")];
    assert.equal(images.length, 16);
    assert.equal(d.querySelector('img[src="../assets/projects/fathers-day-bbq-concept.jpg"]'), null);
    assert.equal(d.querySelector('img[src="../assets/projects/black-friday-suite-concept.jpg"]'), null);
    images.forEach((img) => {
      const url = new URL(img.getAttribute("src"), w.location.href);
      const relative = path.relative("/Enola-data", url.pathname).replace(/^\//, "");
      assert.ok(fs.existsSync(path.join(site, relative)), img.getAttribute("src"));
    });
  });

  check("visual category filters show only matching assets and restore all", () => {
    const b2b = d.querySelector('[data-review-visual-filter="b2b"]');
    b2b.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    assert.equal([...d.querySelectorAll("[data-review-visual-card]")].filter((x) => !x.hidden).length, 3);
    assert.equal(b2b.getAttribute("aria-pressed"), "true");
    d.querySelector('[data-review-visual-filter="all"]').dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
    assert.equal([...d.querySelectorAll("[data-review-visual-card]")].filter((x) => !x.hidden).length, 16);
  });
  check("review page shows four real results without evidence-status visual noise", () => {
    const metrics = [...d.querySelectorAll(".review-outcome-card strong")].map(el => el.textContent);
    assert.deepEqual(metrics, ["96.5万", "3.7万", "4,009", "82.46%"]);
    assert.equal(d.querySelectorAll(".review-evidence-track").length, 0);
    assert.equal(d.querySelectorAll(".review-domain-track").length, 0);
    assert.ok(!d.querySelector("#review-evidence").textContent.includes("证据状态分布"));
  });
  check("homepage exposes a direct independent review entry", () => {
    const homepage = fs.readFileSync(path.join(site, "index.html"), "utf8");
    assert.match(homepage, /href="review\/">审阅入口/);
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
      assert.match(page.body.toString("utf8"), /id="review-title">黄文琳的/);
      assert.ok(page.body.toString("utf8").includes("review-systems"));
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
