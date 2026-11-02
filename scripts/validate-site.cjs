const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../site'),context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),context);const p=context.window.PORTFOLIO;
const checks=[];function check(name,ok){checks.push({name,status:ok?'PASS':'FAIL'});if(!ok)process.exitCode=1}
check('10 unique cases',p.cases.length===10&&new Set(p.cases.map(c=>c.id)).size===10);
check('six business domains',Object.keys(p.domains).length===6);
check('26 unique metrics',p.metrics.length===26&&new Set(p.metrics.map(m=>m.id)).size===26);
check('all metric-to-case links resolve',p.metrics.every(m=>p.cases.some(c=>c.id===m.caseId)));
check('all case metric references resolve',p.cases.every(c=>c.metrics.every(id=>p.metrics.some(m=>m.id===id))));
check('all capability links resolve',p.capabilities.every(c=>p.cases.some(x=>x.id===c[3])));
check('all experience links resolve',p.experiences.every(c=>p.cases.some(x=>x.id===c.caseId)));
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
check('no public screenshot references',p.metrics.every(m=>!('sourceImage' in m)));
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

console.log(JSON.stringify({passed:result.passed,total:result.total}));

const publicFiles=[]; function walk(d){for(const entry of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,entry.name);entry.isDirectory()?walk(f):publicFiles.push(f)}} walk(root);
check('no local paths or private labels',publicFiles.filter(f=>/\.(html|js|css|txt)$/.test(f)).every(f=>!/(?:[CD]:[\\/]|file:\/\/|Enola-marketing|Qimedo-Shopify-Codex|sourceImage|assets\/evidence\/)/.test(fs.readFileSync(f,'utf8'))));
check('only approved public images',publicFiles.filter(f=>/\.(png|jpg|jpeg)$/i.test(f)).every(f=>/^concept-0[123]\.png$/.test(path.basename(f))));
console.log(JSON.stringify({passed:checks.filter(c=>c.status==='PASS').length,total:checks.length,checks}));
