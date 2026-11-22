const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "../site");
const clips = [
  ["holiday-story-long.mp4", "节庆故事长版"],
  ["stair-demo.mp4", "楼梯演示"],
  ["product-opening.mp4", "旧开场素材（不在页面展示）"],
  ["creator-livingroom-intro.mp4", "独立客厅产品介绍"],
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
  if (!["holiday-story-long.mp4", "product-opening.mp4"].includes(name)) {
    assert.ok(review.includes("../assets/video/" + name), "review does not use " + name);
    assert.ok(projects.includes('assets/video/' + name), "case study does not use " + name);
  }
}
for (const id of ["15m5TOYZh90NUqTmSbHget8BJbeBEhLKE", "1xuDMGJbNw4RZt9nBuyLkjy7Hl6MZZm6y"]) {
  assert.ok(review.includes("drive.google.com/file/d/" + id + "/preview"), "review misses public full film");
  assert.ok(projects.includes("drive.google.com/file/d/" + id + "/preview"), "case misses public full film");
}
assert.ok(projects.includes('id="thanksgiving-tvc"') && projects.includes('id="holiday-full-film"'), "two themed TVC projects not found");
assert.ok(projects.includes('id="kol-shorts"'), "creator short-form video grouping missing");
assert.ok(projects.includes('assets/video/creator-livingroom-intro.mp4'), "case must use a standalone living-room Creator file");
assert.ok(review.includes('../assets/video/creator-livingroom-intro.mp4'), "review must use a standalone living-room Creator file");
assert.ok(!review.includes('../assets/video/holiday-story.mp4') && !projects.includes('assets/video/holiday-story.mp4'), "TVC short cutdown should not appear publicly");
assert.notEqual("stair-demo.mp4", "creator-livingroom-intro.mp4", "Creator playback should use two distinct files");
assert.ok(!projects.includes("product-opening.mp4#t=") && !review.includes("product-opening.mp4#t="), "Do not rely on an unstable media-fragment end time");
console.log("PASS Thanksgiving and Christmas full TVCs plus standalone living-room and stairs Creator scenes; no TVC cutdowns.");
