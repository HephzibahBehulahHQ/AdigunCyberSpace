(()=>{"use strict";
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
/* On-demand app loader: heavy interactive modules are fetched only when requested. */
const MODULES={
 electrical:"js/electrical-lab.js",
 deep:"js/engineering-deep-lab.js",
 terminal:"js/lab-tools.js",
 quiz:"js/cyber-game.js?v=50",
 arcade:"js/cyber-arcade.js?v=50",
 ops:"js/cyber-dashboard.js",
 games:"js/engineering-game-center.js?v=50"
};
const loadedModules=new Map();
function loadModule(key){
 if(!MODULES[key])return Promise.resolve();
 if(window.__loadedModules?.has(key))return Promise.resolve();
 if(loadedModules.has(key))return loadedModules.get(key);
 const p=new Promise((resolve,reject)=>{
  const s=document.createElement("script");s.src=MODULES[key];s.async=false;
  s.onload=()=>{window.__loadedModules=window.__loadedModules||new Set();window.__loadedModules.add(key);resolve()};
  s.onerror=()=>reject(new Error("Could not load "+key));
  document.head.appendChild(s);
 });
 loadedModules.set(key,p);return p;
}
window.SystemLoader=loadModule;

const logs=[
 ["23 SEP 2026","MAP","Interactive Cyber Systems Map connected to the portfolio."],
 ["23 SEP 2026","LAB","Cyber Operations Dashboard added as a safe telemetry simulation."],
 ["23 SEP 2026","BUILD","Cyber Arcade expanded to 39 cybersecurity practice games."],
 ["22 SEP 2026","LEARNING","Networking and cybersecurity study trail documented."],
 ["CURRENT","FOCUS","Web security, networking, Linux, Python and data systems."]
];
const dna=[
 ["PHYSICAL SYSTEMS","Electronics, wiring, signals and real-world infrastructure.","ENGINEERING"],
 ["AVIATION","Systems-oriented work and aircraft environment experience.","ENGINEERING"],
 ["SOFTWARE","Web interfaces, JavaScript, Python and automation.","SOFTWARE"],
 ["DATA","Analytics, Pandas, BigQuery and machine-learning experiments.","DATA"],
 ["CYBERSECURITY","Networks, web security, ethical testing and defensive thinking.","SECURITY"]
];
const range=[
 ["01","LOG ANALYSIS","Read a short event sequence and identify what deserves investigation.","Analyze"],
 ["02","NETWORK BASICS","Identify protocols, ports and normal network behaviour.","Inspect"],
 ["03","WEB SECURITY","Recognize common web-security concepts and safer design choices.","Learn"],
 ["04","INCIDENT RESPONSE","Put containment, investigation, eradication and recovery into context.","Respond"],
 ["05","OSINT & RECON","Learn the purpose of reconnaissance without touching real targets.","Research"],
 ["06","LINUX LAB","Practice commands, permissions, processes and filesystem concepts.","Practice"]
];
function ensure(){
 let old=document.getElementById("systemsHub"); if(old)return old;
 const m=document.createElement("div");m.id="systemsHub";m.className="systems-hub";
 m.innerHTML='<div class="systems-backdrop"></div><div class="systems-sheet" role="dialog" aria-modal="true" aria-labelledby="systemsHubTitle"><header class="systems-head"><div><span class="lab-kicker">HEPHZIBAH / SYSTEMS LAYER</span><h2 id="systemsHubTitle">SYSTEMS HUB</h2></div><button class="systems-close" aria-label="Close">×</button></header><nav class="systems-tabs" aria-label="Systems sections"><button data-tab="mission">MISSION CONTROL</button><button data-tab="dna">ENGINEERING DNA</button><button data-tab="range">CYBER RANGE</button><button data-tab="logs">SYSTEM LOGS</button></nav><main id="systemsContent"></main></div>';
 document.body.appendChild(m);
 const content=m.querySelector("#systemsContent");
 const close=()=>m.classList.remove("open");
 m.querySelector(".systems-close").onclick=close;m.querySelector(".systems-backdrop").onclick=close;
 function render(tab){
  m.querySelectorAll(".systems-tabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
  if(tab==="logs"){content.innerHTML='<section class="hub-intro"><span>SYSTEM LOG</span><h3>Continuous build record</h3><p>A lightweight public record of the lab as it changes.</p></section><div class="system-log">'+logs.map(x=>'<article><time>'+esc(x[0])+'</time><b>'+esc(x[1])+'</b><p>'+esc(x[2])+'</p></article>').join("")+'</div>';return}
  if(tab==="dna"){content.innerHTML='<section class="hub-intro"><span>ENGINEERING DNA</span><h3>From physical systems to digital systems</h3><p>Electronics and aviation experience sit alongside software, data and cybersecurity work.</p></section><div class="dna-chain">'+dna.map((x,i)=>'<article class="dna-node"><small>0'+(i+1)+'</small><strong>'+esc(x[0])+'</strong><p>'+esc(x[1])+'</p><em>'+esc(x[2])+'</em></article>').join('<i class="dna-arrow">→</i>')+'</div><div class="dna-principles"><span>PRECISION</span><span>OBSERVABILITY</span><span>SECURITY</span><span>RESPONSIBILITY</span></div>';return}
  if(tab==="range"){content.innerHTML='<section class="hub-intro"><span>AUTHORIZED CYBER RANGE</span><h3>Practice the thinking, not the target.</h3><p>These exercises are designed as browser-safe learning scenarios. No external systems are scanned.</p></section><div class="range-grid">'+range.map(x=>'<button class="range-card" data-range="'+x[0]+'"><small>'+x[0]+'</small><strong>'+esc(x[1])+'</strong><p>'+esc(x[2])+'</p><b>'+esc(x[3])+' →</b></button>').join("")+'</div><div id="rangeExercise" class="range-exercise"><span>SELECT A LAB</span><p>Choose an exercise above to load a small scenario.</p></div>';
   m.querySelectorAll(".range-card").forEach(b=>b.onclick=()=>exercise(b.dataset.range));return}
  content.innerHTML='<section class="hub-intro"><span>MISSION CONTROL</span><h3>One view of the personal lab</h3><p>The website connects engineering, software, cybersecurity, data and learning into one system.</p></section><div class="mission-grid"><div><small>IDENTITY</small><strong>ENGINEER → BUILDER → LEARNER</strong></div><div><small>CORE DOMAINS</small><strong>ENGINEERING / CYBER / DATA / WEB</strong></div><div><small>ACTIVE LABS</small><strong>MAP / TERMINAL / QUIZ / ARCADE / OPS</strong></div><div><small>BUILD MODEL</small><strong>LEARN → BUILD → TEST → DOCUMENT</strong></div></div><div class="mission-actions"><button data-open="map">OPEN SYSTEM MAP</button><button data-open="terminal">OPEN TERMINAL</button><button data-open="ops">OPEN OPERATIONS</button></div>';
  m.querySelector('[data-open="map"]').onclick=()=>{close();window.CyberMapActions?.center()};
m.querySelector('[data-open="terminal"]').onclick=async()=>{close();await loadModule("terminal");window.CyberLabTerminal?.open()};
m.querySelector('[data-open="ops"]').onclick=async()=>{close();await loadModule("ops");window.CyberDashboard?.open()};
 }
 function exercise(id){
  const box=m.querySelector("#rangeExercise");if(!box)return;
  const data={
   "01":["LOG ANALYSIS","10:21:31 LOGIN FAILED · 10:21:32 LOGIN FAILED · 10:21:33 LOGIN FAILED · 10:21:34 LOGIN SUCCESS · 10:21:35 PRIVILEGE CHANGE","Question: which sequence deserves investigation?","Repeated authentication failures followed by privilege change."],
   "02":["NETWORK BASICS","DNS → hostname resolution · TCP → reliable transport · HTTPS → encrypted web session","Question: which protocol resolves a hostname?","DNS."],
   "03":["WEB SECURITY","INPUT → VALIDATION → OUTPUT ENCODING → SAFE RESPONSE","Question: why validate and encode user input?","To reduce unsafe interpretation of untrusted data."],
   "04":["INCIDENT RESPONSE","DETECT → IDENTIFY → CONTAIN → ERADICATE → RECOVER → REVIEW","Question: which phase limits spread?","Containment."],
   "05":["OSINT & RECON","SCOPE → PASSIVE RESEARCH → VERIFY → DOCUMENT","Question: what should come before reconnaissance?","A clear authorized scope."],
   "06":["LINUX LAB","ls · pwd · grep · find · chmod · ss · ip","Question: which command searches text?","grep."]
  }[id];
  box.innerHTML='<span>'+esc(data[0])+'</span><code>'+esc(data[1])+'</code><p>'+esc(data[2])+'</p><strong>LEARNING NOTE: '+esc(data[3])+'</strong>';
 }
 m.querySelectorAll(".systems-tabs button").forEach(b=>b.onclick=()=>render(b.dataset.tab));
 m.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
 render("mission");return m;
}
async function open(tab="mission"){const m=ensure();m.classList.add("open");m.setAttribute("aria-hidden","false");const b=m.querySelector('[data-tab="'+tab+'"]');if(b)b.click()}
function wire(){
 const map={mission:"missionBtn",dna:"dnaBtn",range:"rangeBtn",logs:"logsBtn"};
 Object.entries(map).forEach(([tab,id])=>{const b=document.getElementById(id);if(b)b.onclick=()=>open(tab)});
}
window.CyberSystemsHub={open,wire};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wire);else wire();
/* Unified system layer: status, command palette, activity memory and cross-module launchers. */
function wireMapHeader(){
 const btn=document.getElementById("systemInfoBtn"),info=document.getElementById("systemInfo");
 if(!btn||!info)return;
 btn.onclick=()=>{
  const isOpen=btn.getAttribute("aria-expanded")==="true";
  btn.setAttribute("aria-expanded",String(!isOpen));
  info.hidden=isOpen;
  btn.querySelector("span").textContent=isOpen?"+":"−";
 };
}
function ensureWeatherForecast(){
 if(document.getElementById("weatherForecast"))return;
 const el=document.createElement("aside");
 el.id="weatherForecast";el.className="weather-forecast";el.setAttribute("aria-label","Hamburg weather forecast");
 el.innerHTML='<div class="weather-forecast-label"><span>WEATHER</span><i>HAMBURG</i></div><div class="weather-forecast-main"><strong id="weatherTemp">—</strong><span id="weatherCondition">LOADING</span><small id="weatherWind">—</small></div><a class="weather-forecast-source" href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" title="Open Open-Meteo weather source">OPEN-METEO</a>';
 const host=document.querySelector(".map-header-main")||document.body;
 host.appendChild(el);
 async function loadWeather(){
  try{
   const u="https://api.open-meteo.com/v1/forecast?latitude=53.5511&longitude=9.9937&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=3&timezone=Europe%2FBerlin";
   const res=await fetch(u,{cache:"no-store"});if(!res.ok)throw new Error("Weather "+res.status);
   const j=await res.json(),c=j.current||{};
   const codes={0:"CLEAR",1:"MAINLY CLEAR",2:"PARTLY CLOUDY",3:"OVERCAST",45:"FOG",48:"FOG",51:"DRIZZLE",53:"DRIZZLE",55:"DRIZZLE",61:"RAIN",63:"RAIN",65:"RAIN",71:"SNOW",73:"SNOW",75:"SNOW",80:"SHOWERS",81:"SHOWERS",82:"SHOWERS",95:"STORM",96:"STORM",99:"STORM"};
   const t=document.getElementById("weatherTemp"),cond=document.getElementById("weatherCondition"),wind=document.getElementById("weatherWind");
   if(t)t.textContent=Number(c.temperature_2m).toFixed(1)+"°C";
   if(cond)cond.textContent=(codes[c.weather_code]||"WEATHER")+" · NOW";
   if(wind)wind.textContent=Number.isFinite(Number(c.wind_speed_10m))?"WIND "+Number(c.wind_speed_10m).toFixed(0)+" km/h":"";
   el.dataset.state="live";
  }catch(e){
   const t=document.getElementById("weatherTemp"),cond=document.getElementById("weatherCondition"),wind=document.getElementById("weatherWind");
   if(t)t.textContent="—";if(cond)cond.textContent="WEATHER RETRY";if(wind)wind.textContent="";
   el.dataset.state="error";
  }
 }
 loadWeather();
 const weatherTimer=window.setInterval(loadWeather,600000);
 el._weatherCleanup=()=>clearInterval(weatherTimer);
}
function wireUnifiedLayer(){
 const existing=document.getElementById("systemDock"); if(existing)return;
 const dock=document.createElement("div");dock.id="systemDock";dock.className="system-dock";
 dock.innerHTML='<span class="dock-pulse" aria-hidden="true"></span><span class="dock-label">SYSTEM</span><button data-system="map">MAP</button><button data-system="electrical">LAB</button><button data-system="mission">MISSION</button><button data-system="range">RANGE</button><button data-system="terminal">TERMINAL</button><button data-system="games">GAMES</button><button id="commandPaletteBtn" title="Open command palette" aria-label="Open command palette">⌘ K</button>';
 document.body.appendChild(dock);
 dock.style.setProperty("position","fixed","important");
 dock.style.setProperty("left","auto","important");
 dock.style.setProperty("right","18px","important");
 dock.style.setProperty("bottom","18px","important");
 dock.style.setProperty("transform","none","important");
 dock.style.setProperty("margin-left","0","important");
 dock.style.setProperty("margin-right","0","important");
 dock.style.setProperty("width","max-content","important");
 dock.style.setProperty("max-width","calc(100vw - 36px)","important");
 dock.style.setProperty("justify-content","flex-end","important");
 const launch=async x=>{
 if(x==="map"){document.getElementById("fitBtn")?.click();return}
 if(x==="work"||x==="contact"){window.CyberMapActions?.openById(x);return}
 if(x==="electrical"){await loadModule("deep");window.EngineeringDeepLab?.open();return}
 if(x==="terminal"){await loadModule("terminal");window.CyberLabTerminal?.open();return}
 if(x==="ops"){await loadModule("ops");window.CyberDashboard?.open();return}
 if(x==="quiz"){await loadModule("quiz");window.CyberGame?.open();return}
 if(x==="arcade"){await loadModule("arcade");window.CyberArcade?.open();return}
 if(x==="games"){await loadModule("games");window.EngineeringGameCenter?.open();return}
 open(x)
};
 dock.querySelectorAll("[data-system]").forEach(b=>b.onclick=()=>launch(b.dataset.system));
 const palette=document.createElement("div");palette.id="commandPalette";palette.className="command-palette";
 palette.innerHTML='<div class="palette-backdrop"></div><div class="palette-box" role="dialog" aria-modal="true" aria-label="System command palette"><input id="paletteInput" autocomplete="off" placeholder="Type a system command…"><div id="paletteResults"></div><small>ESC close · ↑↓ navigate · ENTER launch</small></div>';
 document.body.appendChild(palette);
 const commands=[
  ["WORK","Professional work and engineering background","work"],["CONTACT","Direct contact and public channels","contact"],["MAP","Interactive systems map","map"],["ELECTRICAL","Virtual Workbench and PLC / OT Lab","electrical"],["MISSION CONTROL","Personal systems overview","mission"],["ENGINEERING DNA","Physical to digital engineering path","dna"],["CYBER RANGE","Safe learning scenarios","range"],["SYSTEM LOGS","Build and learning record","logs"],["TERMINAL","Ethical tool terminal","terminal"],["OPERATIONS","Simulated SOC dashboard","ops"],["QUIZ","Cyber Defender Quiz","quiz"],["ARCADE","Cybersecurity game lab","arcade"],["GAME CENTER","Engineering game and question lab","games"]
 ];
 const inp=palette.querySelector("#paletteInput"),res=palette.querySelector("#paletteResults");let selected=0;
 function draw(){const q=inp.value.toLowerCase();const rows=commands.filter(x=>(x[0]+" "+x[1]).toLowerCase().includes(q));if(selected>=rows.length)selected=0;res.innerHTML=rows.map((x,i)=>'<button class="'+(i===selected?"selected":"")+'" data-command="'+x[2]+'"><b>'+x[0]+'</b><span>'+x[1]+'</span></button>').join("");res.querySelectorAll("button").forEach(b=>b.onclick=()=>{palette.classList.remove("open");launch(b.dataset.command)})}
 function show(){palette.classList.add("open");inp.value="";selected=0;draw();setTimeout(()=>inp.focus(),20)}
 document.getElementById("commandPaletteBtn").onclick=show;
 inp.oninput=draw;inp.onkeydown=e=>{const rows=res.querySelectorAll("button");if(e.key==="ArrowDown"){e.preventDefault();selected=Math.min(selected+1,rows.length-1);draw()}if(e.key==="ArrowUp"){e.preventDefault();selected=Math.max(selected-1,0);draw()}if(e.key==="Enter"){e.preventDefault();rows[selected]?.click()}};
 palette.querySelector(".palette-backdrop").onclick=()=>palette.classList.remove("open");
 document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();show()}if(e.key==="Escape")palette.classList.remove("open")});
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",wireMapHeader);document.addEventListener("DOMContentLoaded",wireUnifiedLayer);}else{wireMapHeader();wireUnifiedLayer()}

})();