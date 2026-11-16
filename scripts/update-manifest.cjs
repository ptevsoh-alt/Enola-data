const fs = require("fs"),
  path = require("path"),
  crypto = require("crypto");
const root = path.resolve(__dirname, "../site"),
  files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    e.isDirectory() ? walk(f) : files.push(f);
  }
}
walk(root);
fs.writeFileSync(
  path.resolve(__dirname, "../PUBLIC_ASSETS.json"),
  JSON.stringify(
    files.map((f) => {
      const b = fs.readFileSync(f);
      return {
        file: path.relative(root, f).split(path.sep).join("/"),
        bytes: b.length,
        sha256: crypto.createHash("sha256").update(b).digest("hex"),
      };
    }),
    null,
    2,
  ) + "\n",
);
