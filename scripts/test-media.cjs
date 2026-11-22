const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "../site");
const clips = [
  ["holiday-story.mp4", "节庆故事短版"],
  ["holiday-story-long.mp4", "节庆故事长版"],
  ["stair-demo.mp4", "楼梯演示"],
  ["product-opening.mp4", "开场对照"],
];

function boxes(buffer) {
  const seen = [];
  for (let pos = 0; pos + 8 <= buffer.length;) {
    let size = buffer.readUInt32BE(pos);
    const type = buffer.subarray(pos + 4, pos + 8).toString("latin1");
    let header = 8;
    if (size === 1) {
      assert.ok(pos + 16 <= buffer.length, "invalid large box header");
      size = Number(buffer.readBigUInt64BE(pos + 8));
      header = 16;
    } else if (size === 0) {
      size = buffer.length - pos;
    }
    assert.ok(Number.isSafeInteger(size) && size >= header && pos + size <= buffer.length, "invalid MP4 box: " + type);
    seen.push(type);
    pos += size;
  }
  return seen;
}

const hasFfprobe = spawnSync("ffprobe", ["-version"], { encoding: "utf8" }).status === 0;
const hasFfmpeg = spawnSync("ffmpeg", ["-version"], { encoding: "utf8" }).status === 0;

for (const [name, label] of clips) {
  const pathname = path.join(root, "assets/video", name);
  const file = fs.readFileSync(pathname);
  assert.ok(file.length > 10000, "empty / truncated video: " + name);
  // Preserve the older 82-second local edit as an archived resource; feature film uses Drive's 90-second release.
  if (name === "holiday-story-long.mp4") {
    assert.equal(file.length, 1744928, "legacy 82-second asset changed unexpectedly");
  }
  const found = boxes(file);
  assert.ok(found.includes("ftyp") && found.includes("moov") && found.includes("mdat"), "missing MP4 media atoms: " + name);
  if (hasFfprobe) {
    const result = spawnSync("ffprobe", [
      "-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height",
      "-of", "json", pathname,
    ], { encoding: "utf8", timeout: 20000 });
    assert.equal(result.status, 0, result.stderr);
    const info = JSON.parse(result.stdout);
    assert.ok(Number(info.format.duration) > 1, "invalid video duration: " + name);
    assert.ok(info.streams.some(x => x.codec_type === "video" && x.width >= 240 && x.height >= 240), "missing playable video stream: " + name);
  }
  if (hasFfmpeg) {
    const decoded = spawnSync("ffmpeg", ["-nostdin", "-v", "error", "-xerror", "-i", pathname, "-map", "0:v:0", "-f", "null", "-"], { encoding: "utf8", timeout: 45000 });
    assert.equal(decoded.status, 0, "decode failure for " + name + ": " + decoded.stderr);
  }
  console.log("PASS " + label + " / " + name + " / " + file.length + " bytes" +
    (hasFfprobe ? " / metadata PASS" : " / ffprobe unavailable") +
    (hasFfmpeg ? " / video decode PASS" : " / ffmpeg unavailable"));
}
const review = fs.readFileSync(path.join(root, "review/index.html"), "utf8");
const projects = fs.readFileSync(path.join(root, "projects.js"), "utf8");
for (const [name] of clips) {
  if (name !== "holiday-story-long.mp4") {
    assert.ok(review.includes("../assets/video/" + name), "review does not use " + name);
    assert.ok(projects.includes('assets/video/' + name), "case study does not use " + name);
  }
}
for (const id of ["15m5TOYZh90NUqTmSbHget8BJbeBEhLKE"]) {
  assert.ok(review.includes("drive.google.com/file/d/" + id + "/preview"), "review misses public full film");
  assert.ok(projects.includes("drive.google.com/file/d/" + id + "/preview"), "case misses public full film");
}
assert.ok(projects.includes("drive.google.com/file/d/1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y/preview"), "alternate public film missing");
console.log("PASS two permission-checked Drive long films selected plus three native short clips; browser access remains separately tested.");
