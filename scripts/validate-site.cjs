const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../site'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);const p=context.window.PORTFOLIO;
const checks=[];function check(name,ok){checks.push({name,status:ok?'PASS':'FAIL'});if(!ok)process.exitCode=1}
check('10 unique cases',p.cases.length===10&&new Set(p.cases.map(c=>c.id)).size===10);
check('six business domains',Object.keys(p.domains).length===6);
check('38 unique metrics',p.metrics.length===38&&new Set(p.metrics.map(m=>m.id)).size===38);
check('all metric-to-case links resolve',p.metrics.every(m=>p.cases.some(c=>c.id===m.caseId)));
check('all case metric references resolve',p.cases.every(c=>c.metrics.every(id=>p.metrics.some(m=>m.id===id))));
check('all capability links resolve',p.capabilities.every(c=>p.cases.some(x=>x.id===c[3])));
check('all experience links resolve',p.experiences.every(c=>p.cases.some(x=>x.id===c.caseId)));\nconst expectedExperience=[['2025.04—2026.09','碳宝贝科技有限公司','社媒负责人 / 社媒管理组长'],['2023.11—2025.03','瑞音博科技有限公司','海外渠道 / 市场推广'],['2022.07—2023.10','韵衫科技有限公司','亚马逊运营专员'],['2020.12—2022.06','传盛科技有限公司','资深亚马逊运营专员']];\ncheck('four resume-aligned career entries',p.experiences.length===4&&expectedExperience.every((r,i)=>p.experiences[i].date===r[0]&&p.experiences[i].title===r[1]&&p.experiences[i].role===r[2]));\nconst resumeMetricIds=['product-sales-stage','fb-link-click-change','ig-event-engagement-change','ig-follower-change','b2b-email-open','b2b-lead-conversion','linkedin-follower-change','fb-follower-scale','amazon-profit-margin','amazon-offsite-followers','amazon-complaint-change','amazon-review-change'];\ncheck('resume-backed metrics present',resumeMetricIds.every(id=>p.metrics.some(m=>m.id===id)));\nconst emailRange=p.metrics.find(m=>m.id==='b2b-email-open');\ncheck('B2B email open rate preserves 10–15% range',emailRange&&emailRange.value===null&&emailRange.range?.[0]===10&&emailRange.range?.[1]===15);
check('no VERIFIED claims',p.metrics.every(m=>m.status!=='VERIFIED'));
check('missing retention remains null',p.metrics.find(m=>m.id==='retention').value===null);
check('ER follows supplied totals',Math.abs(p.metrics.find(m=>m.id==='er').value-37000/965000)<1e-10);
check('all metrics have provenance and caveats',p.metrics.every(m=>m.source&&m.window&&m.definition&&m.limits&&m.unit));
const pageIds=['fb-views','fb-viewers','fb-content-interactions','fb-link-clicks','fb-visits','fb-follows'];
const groupIds=['group-members','group-posters','group-viewers'];
check('Facebook Page metrics present',pageIds.every(id=>p.metrics.some(m=>m.id===id&&m.domain==='social')));
check('Facebook Group metrics isolated',groupIds.every(id=>p.metrics.some(m=>m.id===id&&m.domain==='community')));
check('missing viewers value remains null',p.metrics.find(m=>m.id==='fb-viewers').value===null);
check('screenshot comparison windows remain unverified',p.metrics.filter(m=>m.sourceType==='screenshot').every(m=>m.windowStart===null&&m.windowEnd===null&&m.comparisonWindow===null));
check('no public screenshot references',p.metrics.every(m=>!('sourceImage' in m)));\ncheck('range metrics are not styled as missing',app.includes('m.value===null&&!m.range'));\ncheck('no stale screenshot-display copy',!/(脱敏截图原貌|保留指标卡与原始截图)/.test(app));
const app=fs.readFileSync(path.join(root,'app.js'),'utf8'),css=fs.readFileSync(path.join(root,'styles.css'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
new vm.Script(app);check('app syntax',true);new vm.Script(fs.readFileSync(path.join(root,'data.js'),'utf8'));check('data syntax',true);
check('no remote dependencies',![app,css,html].some(s=>/https?:\/\//.test(s)));
check('reduced motion support',css.includes('prefers-reduced-motion:reduce'));
check('site root dependencies exist',['styles.css','data.js','app.js','assets/favicon.svg','assets/concept-01.png','assets/concept-02.png','assets/concept-03.png'].every(f=>fs.existsSync(path.join(root,f))));
check('no old internal concept filenames',!app.includes('v5-concept-'));
check('no contact form or outbound submission',!html.includes('<form')&&!/fetch\(|XMLHttpRequest|sendBeacon/.test(app));
check('no public evidence directory',!fs.existsSync(path.join(root,'assets/evidence')));
check('public copy has no internal repository labels',!/(Enola-marketing|R2\.2|V5 匿名|本地审核预览)/.test(app+html));
const result={checks,passed:checks.filter(c=>c.status==='PASS').length,total:checks.length,caseCount:p.cases.length,metricCount:p.metrics.length};



const publicFiles=[]; function walk(d){for(const entry of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,entry.name);entry.isDirectory()?walk(f):publicFiles.push(f)}} walk(root);
check('no local paths or private labels',publicFiles.filter(f=>/\.(html|js|css|txt)$/.test(f)).every(f=>!/(?:[CD]:[\\/]|file:\/\/|Enola-marketing|Qimedo-Shopify-Codex|sourceImage|assets\/evidence\/)/.test(fs.readFileSync(f,'utf8'))));
check('only approved public images',publicFiles.filter(f=>/\.(png|jpg|jpeg)$/i.test(f)).every(f=>/^concept-0[123]\.png$/.test(path.basename(f))));
const assets=JSON.parse(fs.readFileSync(path.join(root,'../PUBLIC_ASSETS.json'),'utf8'));
check('portable public asset paths',assets.every(e=>!e.file.includes('\\')&&!e.file.startsWith('/')&&!e.file.split('/').includes('..')));
check('public asset hashes match',assets.every(e=>fs.existsSync(path.join(root,e.file))&&crypto.createHash('sha256').update(fs.readFileSync(path.join(root,e.file))).digest('hex')===e.sha256));
console.log(JSON.stringify({passed:checks.filter(c=>c.status==='PASS').length,total:checks.length,checks}));
