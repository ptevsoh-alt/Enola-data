const http = require("http"),
  fs = require("fs"),
  path = require("path");
const root = path.resolve(__dirname, "site");
http
  .createServer((req, res) => {
    let p = path.resolve(
      root,
      "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
    );
    if (p === root) p = path.join(root, "index.html");
    if (!p.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(p, (e, b) => {
      if (e) {
        res.writeHead(404).end();
        return;
      }
      res.setHeader(
        "Content-Type",
        {
          ".html": "text/html; charset=utf-8",
          ".js": "text/javascript; charset=utf-8",
          ".css": "text/css; charset=utf-8",
          ".png": "image/png",
          ".svg": "image/svg+xml",
        }[path.extname(p)] || "text/plain",
      );
      res.end(b);
    });
  })
  .listen(8174, "127.0.0.1");
