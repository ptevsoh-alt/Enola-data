const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const site = path.resolve(__dirname, "../site");
const clips = [
  ["creator-staircase-7s.mp4", "楼梯吸尘实操 · 7秒"],
  ["creator-livingroom-7s.mp4", "客厅产品介绍 · 7秒"],
];
function mp4Duration(buffer) {
  const at = buffer.indexOf(Buffer.from("mvhd"));
  assert.ok(at >= 0, "MP4 missing movie header");
  if (buffer[at + 4] === 0) {
    const scale = buffer.readUInt32BE(at + 16), ticks = buffer.readUInt32BE(at + 20);
    assert.ok(scale > 0);
    return ticks / scale;
  }
  const scale = buffer.readUInt32BE(at + 24);
  assert.ok(scale > 0);
  const ticks = Number(buffer.readBigUInt64BE(at + 28));
  return ticks / scale;
}
const hasProbe = spawnSync("ffprobe", ["-version"], { encoding:"utf8" }).status === 0;
const hasFfmpeg = spawnSync("ffmpeg", ["-version"], { encoding:"utf8" }).status === 0;
for (const [name, label] of clips) {
  const pathname = path.join(site, "assets/video", name);
  const bytes = fs.readFileSync(pathname);
  assert.ok(bytes.length > 100000, "clip too small or missing: " + name);
  const duration = mp4Duration(bytes);
  assert.ok(duration >= 5 && duration <= 30, "Creator video must be 5 seconds or longer: " + name + " / " + duration);
  for(const box of ["ftyp","moov","mdat"])assert.ok(bytes.includes(Buffer.from(box)), "missing MP4 atom: " + box);
  if (hasProbe) {
    const checked = spawnSync("ffprobe",["-v","error","-show_entries","format=duration:stream=codec_type,width,height","-of","json",pathname],{encoding:"utf8",timeout:20000});
    assert.equal(checked.status,0,checked.stderr);
    const info=JSON.parse(checked.stdout);
    assert.ok(Number(info.format.duration) >= 5, "ffprobe found sub-5-second clip: " + name);
    assert.ok(info.streams.some(x=>x.codec_type==="video"&&x.width>=480&&x.height>=720),"missing portrait video");
  }
  if(hasFfmpeg){
    const decode=spawnSync("ffmpeg",["-nostdin","-v","error","-xerror","-i",pathname,"-map","0:v:0","-f","null","-"],{encoding:"utf8",timeout:45000});
    assert.equal(decode.status,0,decode.stderr);
  }
  console.log("PASS "+label+" / "+duration.toFixed(3)+"s / "+bytes.length+" bytes");
}
const page=fs.readFileSync(path.join(site,"projects.js"),"utf8");
const review=fs.readFileSync(path.join(site,"review/index.html"),"utf8");
for(const [name] of clips){
  assert.ok(page.includes('assets/video/'+name),'case missing '+name);
  assert.ok(review.includes('../assets/video/'+name),'review missing '+name);
}
for(const name of ["stair-demo.mp4","creator-livingroom-intro.mp4","product-opening.mp4","holiday-story.mp4"]){
  assert.ok(!page.includes('assets/video/'+name),'retired short file in case page: '+name);
  assert.ok(!review.includes('../assets/video/'+name),'retired short file in review: '+name);
}
for (const [name,content] of [["case",page],["review",review]]) {
  assert.ok(!content.includes("drive.google.com/file/d/"),"public "+name+" leaks raw-film file identifiers");
  assert.ok(!/<iframe[^>]+src=["']https?:/.test(content),"public "+name+" has external film embed");
}
assert.equal((page.match(/class="tvc-work-safe-preview"/g)||[]).length,2,"Two film creative cases must remain");
assert.equal((review.match(/class="review-film-safe-preview"/g)||[]).length,2,"Two film review summaries must remain");
assert.ok(!page.includes("video-holiday-cutdown")&&!review.includes("video-holiday-cutdown"),"TVC cutdown control must not exist");
console.log("PASS two anonymized seasonal film summaries and two local Creator clips; no raw-film URL.");
