/* ===== Loader ===== */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 500);
});
/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
/* ===== Mobile menu ===== */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
/* ===== Typing animation ===== */
const typedEl = document.getElementById('typedText');
const phrases = [
  'Ace your next technical interview...',
  'Get real-time AI feedback on every answer.',
  'Build confidence. Land your dream job.',
  'Practice anywhere, anytime.'
];
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const cur = phrases[pIdx];
  typedEl.textContent = cur.substring(0, cIdx);
  if (!deleting && cIdx < cur.length) { cIdx++; setTimeout(typeLoop, 60); }
  else if (deleting && cIdx > 0) { cIdx--; setTimeout(typeLoop, 30); }
  else {
    deleting = !deleting;
    if (!deleting) pIdx = (pIdx + 1) % phrases.length;
    setTimeout(typeLoop, 1200);
  }
}
typeLoop();
/* ===== Particles ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
resize(); addEventListener('resize', resize);
for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    r: Math.random()*2+1, vx:(Math.random()-.5)*.6, vy:(Math.random()-.5)*.6
  });
}
function drawParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(34,211,238,.6)'; ctx.fill();
  });
  // connect close points
  for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
    const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
    const d=Math.hypot(dx,dy);
    if(d<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(59,130,246,${1-d/120})`;ctx.stroke();}
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
/* ===== Reveal on scroll ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
/* ===== Question Bank Data ===== */
const questionBank = {
  Java: ['What is JVM?','Explain OOP concepts.','Difference between abstract class & interface.','What is multithreading?','Explain garbage collection.'],
  Python: ['What are decorators?','Difference between list & tuple.','Explain GIL.','What is list comprehension?','Explain *args and **kwargs.'],
  JavaScript: ['Explain closures.','What is the event loop?','Difference between var, let, const.','What is hoisting?','Explain promises vs async/await.'],
  React: ['What is the Virtual DOM?','Explain useEffect.','Class vs Functional components.','What are React keys?','Explain Context API.'],
  SQL: ['Difference between WHERE & HAVING.','What is a JOIN?','Explain indexes.','What is normalization?','Difference between DELETE & TRUNCATE.'],
  DBMS: ['Explain ACID.','What is a transaction?','Difference between SQL & NoSQL.','What is a foreign key?','Explain ER model.'],
  OS: ['What is a deadlock?','Explain paging vs segmentation.','What is a thread?','Difference between process & thread.','Explain scheduling algorithms.'],
  Networks: ['Explain OSI model.','TCP vs UDP.','What is DNS?','Explain HTTP vs HTTPS.','What is a subnet mask?'],
  HR: ['Tell me about yourself.','Why should we hire you?','What are your strengths?','Where do you see yourself in 5 years?','Why this company?']
};
const interviewQuestions = {
  technical: { beginner:['What is a variable?','Explain a function.','What is an array?'], intermediate:['Explain recursion.','What is Big-O notation?','Explain hash tables.'], advanced:['Design a URL shortener.','Explain CAP theorem.','Implement LRU cache.'] },
  hr: { beginner:['Tell me about yourself.','Why this role?','What motivates you?'], intermediate:['Describe a conflict at work.','Your biggest weakness?','How do you handle pressure?'], advanced:['How do you lead a team through change?','Describe a strategic failure.','Negotiate your salary expectations.'] },
  behavioral: { beginner:['Describe teamwork experience.','A time you helped a peer.','How do you organize work?'], intermediate:['Tell me about a difficult decision.','A time you missed a deadline.','How do you handle feedback?'], advanced:['Conflict with senior leadership story.','A failure that shaped you.','Influencing without authority.'] },
  aptitude: { beginner:['What is 15% of 200?','Next in series: 2,4,8,16,?','If A=1, Z=?'], intermediate:['Train problem...','Probability of two heads in 3 flips.','Time-work problem...'], advanced:['Complex permutation problem.','Bayesian probability problem.','Compound interest puzzle.'] }
};
/* ===== Question Bank UI ===== */
const tabsEl = document.getElementById('bankTabs');
const listEl = document.getElementById('bankList');
let activeCat = 'Java';
function renderBank(filter='') {
  tabsEl.innerHTML = '';
  Object.keys(questionBank).forEach(cat => {
    const b = document.createElement('button');
    b.textContent = cat;
    if(cat===activeCat) b.classList.add('active');
    b.onclick = () => { activeCat = cat; renderBank(document.getElementById('bankSearch').value); };
    tabsEl.appendChild(b);
  });
  listEl.innerHTML = '';
  questionBank[activeCat]
    .filter(q => q.toLowerCase().includes(filter.toLowerCase()))
    .forEach(q => { const li=document.createElement('li'); li.textContent=q; listEl.appendChild(li); });
}
renderBank();
document.getElementById('bankSearch').addEventListener('input', e => renderBank(e.target.value));
/* ===== Interview Practice ===== */
let timerInt=null, seconds=0, qCount=0;
function fmt(s){const m=Math.floor(s/60),x=s%60;return `${String(m).padStart(2,'0')}:${String(x).padStart(2,'0')}`}
function startTimer(){ clearInterval(timerInt); seconds=0; timerInt=setInterval(()=>{seconds++;document.getElementById('timerDisplay').textContent=fmt(seconds);},1000); }
function nextQuestion(){
  const cat=document.getElementById('categorySelect').value;
  const diff=document.getElementById('difficultySelect').value;
  const arr=interviewQuestions[cat][diff];
  const q=arr[Math.floor(Math.random()*arr.length)];
  document.getElementById('questionBox').textContent=q;
  qCount++; document.getElementById('qCounter').textContent=qCount;
  document.getElementById('transcript').value='';
  ['confBar','commBar','techBar'].forEach(id=>document.getElementById(id).style.width='0%');
  document.getElementById('suggestion').textContent='';
}
document.getElementById('startInterviewBtn').onclick=()=>{startTimer();qCount=0;nextQuestion();notify('Interview started! Good luck 🚀');};
document.getElementById('nextQuestionBtn').onclick=nextQuestion;
/* ===== Speech Recognition ===== */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition=null, recognizing=false;
if(SR){
  recognition=new SR(); recognition.continuous=true; recognition.interimResults=true; recognition.lang='en-US';
  recognition.onresult=(e)=>{
    let txt=''; for(let i=e.resultIndex;i<e.results.length;i++) txt+=e.results[i][0].transcript;
    document.getElementById('transcript').value=txt;
  };
  recognition.onend=()=>{recognizing=false;};
}
document.getElementById('recordBtn').onclick=()=>{
  if(!recognition){ alert('Speech recognition not supported in this browser.'); return; }
  if(!recognizing){ recognition.start(); recognizing=true; notify('🎙️ Recording started'); }
};
document.getElementById('stopBtn').onclick=()=>{
  if(recognition&&recognizing){ recognition.stop(); recognizing=false; analyzeAnswer(); }
};
/* ===== AI Feedback (simulated) ===== */
function analyzeAnswer(){
  const txt=document.getElementById('transcript').value.trim();
  const len=txt.split(/\s+/).length;
  const conf=Math.min(100,40+len*2+Math.random()*15);
  const comm=Math.min(100,50+Math.random()*40);
  const tech=Math.min(100,30+len*1.5+Math.random()*25);
  document.getElementById('confBar').style.width=conf+'%';
  document.getElementById('commBar').style.width=comm+'%';
  document.getElementById('techBar').style.width=tech+'%';
  const tips=['Try to give more concrete examples.','Use the STAR method to structure your answer.','Speak more slowly and clearly.','Add measurable results to back your claims.','Great answer — try expanding with a brief example.'];
  document.getElementById('suggestion').textContent='💡 '+tips[Math.floor(Math.random()*tips.length)];
  saveStat((conf+comm+tech)/3);
}
/* ===== Bookmark ===== */
document.getElementById('bookmarkBtn').onclick=()=>{
  const q=document.getElementById('questionBox').textContent;
  const list=JSON.parse(localStorage.getItem('bookmarks')||'[]');
  if(!list.includes(q)){list.push(q);localStorage.setItem('bookmarks',JSON.stringify(list));notify('⭐ Bookmarked!');}
};
/* ===== Resume Analyzer ===== */
document.getElementById('resumeFile').addEventListener('change',(e)=>{
  const f=e.target.files[0]; if(!f) return;
  const score=Math.floor(60+Math.random()*35);
  const dash=283-(283*score/100);
  document.getElementById('resumeFill').style.strokeDashoffset=dash;
  let n=0; const inter=setInterval(()=>{ n++; document.getElementById('resumeScore').textContent=n; if(n>=score) clearInterval(inter); },15);
  const skills=['JavaScript','React','HTML','CSS','Git','Node.js'];
  const missing=['TypeScript','Docker','AWS','System Design'];
  document.getElementById('skillsTags').innerHTML=skills.map(s=>`<span>${s}</span>`).join('');
  document.getElementById('missingTags').innerHTML=missing.map(s=>`<span>${s}</span>`).join('');
  document.getElementById('resumeSuggestions').innerHTML=['Add a quantifiable project impact.','Include relevant certifications.','Tailor keywords per job description.','Keep resume to one page.'].map(t=>`<li>${t}</li>`).join('');
  notify('📄 Resume analyzed: '+f.name);
});
/* ===== Dashboard / Stats ===== */
function loadStats(){
  const s=JSON.parse(localStorage.getItem('stats')||'{"count":0,"avg":0,"history":[]}');
  document.getElementById('statInterviews').textContent=s.count;
  document.getElementById('statSuccess').textContent=Math.min(100,Math.round(s.avg))+'%';
  document.getElementById('statAvg').textContent=Math.round(s.avg);
  document.getElementById('statReady').textContent=Math.min(100,Math.round(s.avg*1.1))+'%';
  drawCharts(s.history);
}
function saveStat(score){
  const s=JSON.parse(localStorage.getItem('stats')||'{"count":0,"avg":0,"history":[]}');
  s.count++; s.history.push(Math.round(score)); if(s.history.length>14) s.history.shift();
  s.avg=s.history.reduce((a,b)=>a+b,0)/s.history.length;
  localStorage.setItem('stats',JSON.stringify(s));
  loadStats();
}
/* ===== Charts (Canvas, no library) ===== */
function drawCharts(history){
  // Bar
  const bar=document.getElementById('barChart'); const bc=bar.getContext('2d');
  bar.width=bar.clientWidth; const w=bar.width, h=bar.height;
  bc.clearRect(0,0,w,h);
  const data=history.length?history.slice(-7):[60,72,55,80,68,90,75];
  const bw=w/data.length-12;
  data.forEach((v,i)=>{
    const bh=(v/100)*(h-20);
    const x=i*(bw+12)+6, y=h-bh;
    const g=bc.createLinearGradient(0,y,0,h); g.addColorStop(0,'#22d3ee'); g.addColorStop(1,'#3b82f6');
    bc.fillStyle=g; bc.fillRect(x,y,bw,bh);
    bc.fillStyle='#fff'; bc.font='11px sans-serif'; bc.fillText(v,x+bw/2-8,y-4);
  });
  // Pie
  const pie=document.getElementById('pieChart'); const pc=pie.getContext('2d');
  pie.width=pie.clientWidth; const pw=pie.width, ph=pie.height;
  pc.clearRect(0,0,pw,ph);
  const segs=[{l:'Tech',v:40,c:'#3b82f6'},{l:'HR',v:25,c:'#22d3ee'},{l:'Behavior',v:20,c:'#a78bfa'},{l:'Aptitude',v:15,c:'#60a5fa'}];
  let start=-Math.PI/2; const cx=ph/2, cy=ph/2, r=ph/2-10;
  segs.forEach(s=>{ const ang=(s.v/100)*Math.PI*2; pc.beginPath(); pc.moveTo(cx,cy); pc.arc(cx,cy,r,start,start+ang); pc.closePath(); pc.fillStyle=s.c; pc.fill(); start+=ang; });
  pc.fillStyle='#fff'; pc.font='12px sans-serif';
  segs.forEach((s,i)=>{ pc.fillStyle=s.c; pc.fillRect(ph+10,20+i*22,12,12); pc.fillStyle='#fff'; pc.fillText(`${s.l} (${s.v}%)`,ph+28,30+i*22); });
  // Line
  const line=document.getElementById('lineChart'); const lc=line.getContext('2d');
  line.width=line.clientWidth; const lw=line.width, lh=line.height;
  lc.clearRect(0,0,lw,lh);
  const ld=history.length?history:[40,55,50,65,70,68,80,85,82,90];
  lc.strokeStyle='#22d3ee'; lc.lineWidth=3; lc.beginPath();
  ld.forEach((v,i)=>{ const x=(i/(ld.length-1))*lw; const y=lh-(v/100)*(lh-20)-10; if(i===0) lc.moveTo(x,y); else lc.lineTo(x,y); });
  lc.stroke();
  lc.fillStyle='rgba(34,211,238,.2)'; lc.lineTo(lw,lh); lc.lineTo(0,lh); lc.closePath(); lc.fill();
}
addEventListener('resize',()=>loadStats());
/* ===== Notes ===== */
const notes=document.getElementById('notesArea');
notes.value=localStorage.getItem('notes')||'';
notes.addEventListener('input',()=>localStorage.setItem('notes',notes.value));
/* ===== Daily Challenge & Quote ===== */
const challenges=['Solve a string-reversal problem in 3 ways.','Explain REST vs GraphQL.','Implement debounce in JavaScript.','Mock interview: introduce yourself in 60 seconds.'];
const quotes=['"Success is the sum of small efforts repeated daily."','"The expert in anything was once a beginner."','"Hard work beats talent when talent doesn\'t work hard."','"Dream big. Start small. Act now."'];
const day=new Date().getDate();
document.getElementById('dailyChallenge').textContent=challenges[day%challenges.length];
document.getElementById('quote').textContent=quotes[day%quotes.length];
/* ===== Download Report ===== */
document.getElementById('downloadReport').onclick=()=>{
  const s=JSON.parse(localStorage.getItem('stats')||'{}');
  const blob=new Blob([`AI Interview Assistant — Performance Report\n\nInterviews: ${s.count||0}\nAvg Score: ${Math.round(s.avg||0)}\nHistory: ${(s.history||[]).join(', ')}\n`],{type:'text/plain'});
  const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='report.txt'; a.click();
};
/* ===== Notifications ===== */
function notify(msg){
  const ul=document.getElementById('notifList');
  const li=document.createElement('li'); li.textContent=msg;
  ul.prepend(li);
  while(ul.children.length>6) ul.removeChild(ul.lastChild);
}
/* ===== Contact ===== */
document.getElementById('contactForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const n=document.getElementById('cName').value.trim();
  const em=document.getElementById('cEmail').value.trim();
  const m=document.getElementById('cMsg').value.trim();
  if(!n||!em||!m) return;
  document.getElementById('contactSuccess').textContent=`Thanks ${n}! We'll get back to you shortly.`;
  e.target.reset();
});
/* ===== Init ===== */
loadStats();