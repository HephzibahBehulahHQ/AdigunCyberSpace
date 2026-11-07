(()=>{"use strict";
/* CYBER DEFENDER QUIZ v2 — 5,000 generated records from 25 concepts × 20 contexts × 10 variants. */
const KEY="hb_cyber_defender_v2";
const BASE=[
["Which OSI layer handles routing?","Network","Physical","Session","Presentation"],
["Which protocol resolves domain names?","DNS","DHCP","FTP","SMTP"],
["What does HTTP 404 mean?","Not Found","Server Error","Success","Redirect"],
["Which port is HTTPS?","443","21","25","110"],
["What does MFA add?","Multiple factors","Bandwidth","An IP","A DNS record"],
["Which tool captures packets?","Wireshark","Nmap","Git","Grep"],
["Which protocol assigns IP settings?","DHCP","DNS","SSH","ARP"],
["What is phishing?","Social engineering","Routing","A filesystem","A compiler"],
["Which command searches text?","grep","chmod","ping","ss"],
["What does TLS protect?","Data in transit","CPU","Disk space","Keyboard input"],
["Which method retrieves a web resource?","GET","POST","PATCH","CONNECT"],
["What does a firewall control?","Network traffic by rules","CPU scheduling","Compression","DNS ownership"],
["What identifies a layer-2 interface?","MAC address","URL","PID","Port"],
["Which transport protocol is connection-oriented?","TCP","UDP","ICMP","ARP"],
["Which transport protocol is connectionless?","UDP","TCP","SSH","TLS"],
["What does SSH provide?","Secure remote access","Email","DNS","Compression"],
["What is hashing?","A one-way digest","Reversible encryption","Routing","IP assignment"],
["What property means data was not altered?","Integrity","Availability","Latency","Portability"],
["What property means a service remains usable?","Availability","Integrity","Confidentiality","Compression"],
["What is SQL injection?","Manipulating SQL through unsafe input","Encrypting a database","Scanning Wi-Fi","Changing permissions"],
["What is XSS?","Injecting script into a web context","Scanning ports","Spoofing DNS","Hashing passwords"],
["What is a CVE?","An identifier for a known vulnerability","A firewall","A filesystem","A DNS record"],
["What is Nmap used for?","Network discovery","Password hashing","Source control","Document editing"],
["What is SIEM used for?","Security log correlation","Disk encryption","IP assignment","Compilation"],
["What is least privilege?","Only the access needed","Open access","Maximum trust","No authentication"]
];
const CONTEXTS=["network baseline","cloud environment","Windows endpoint","Linux server","web application","identity system","SOC dashboard","home lab","enterprise gateway","development environment","database service","VPN access","DNS infrastructure","email service","API service","container host","file server","CI/CD pipeline","mobile endpoint","industrial test network"];
const FORMS=["Recall","Scenario","Evidence check","Quick check","Analyst check","Field check","Concept check","Practice","Review","Identify"];
const esc=s=>String(s??"").replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function record(n){const b=BASE[n%BASE.length],c=CONTEXTS[Math.floor(n/25)%CONTEXTS.length],f=FORMS[Math.floor(n/500)%FORMS.length],v=Math.floor(n/1000)%10+1;const choices=[b[1],b[2],b[3],b[4]],shift=n%4,rot=choices.slice(shift).concat(choices.slice(0,shift));return{q:f+" "+(n+1)+": In a "+c+", "+b[0]+" (variant "+v+")",a:b[1],o:rot,n:rot.indexOf(b[1])}}
function open(){let m=document.getElementById("gameConsole");if(!m){m=document.createElement("div");m.id="gameConsole";m.className="lab-modal";m.innerHTML='<div class="lab-modal-backdrop"></div><div class="lab-modal-sheet game-sheet"><div class="lab-modal-head"><div><span class="lab-kicker">CYBER DEFENDER QUIZ / 5,000 GENERATED RECORDS</span><h2>CYBER DEFENDER QUIZ</h2></div><button class="lab-close" aria-label="Close">×</button></div><div id="gameArea"></div></div>';document.body.appendChild(m);m.querySelector(".lab-close").onclick=()=>m.classList.remove("open");m.querySelector(".lab-modal-backdrop").onclick=()=>m.classList.remove("open")}m.classList.add("open");let a=m.querySelector("#gameArea"),n=0,score=0,seen=new Set();function render(){if(n>=20){a.innerHTML='<div class="game-result"><div class="game-kicker">SESSION COMPLETE</div><h3>'+score+" / "+n+'</h3><p>5,000 generated-question capacity. Unique records used: '+seen.size+'</p><button id="again">PLAY AGAIN</button></div>';a.querySelector("#again").onclick=start;return}let id;do{id=Math.floor(Math.random()*5000)}while(seen.has(id));seen.add(id);let r=record(id);a.innerHTML='<div class="game-meta"><span>QUESTION '+(n+1)+' / 20</span><span>RECORD '+(id+1)+' / 5000</span><span>SCORE '+score+'</span></div><h3>'+esc(r.q)+'</h3><div class="game-options">'+r.o.map((x,i)=>'<button data-i="'+i+'">'+String.fromCharCode(65+i)+". "+esc(x)+"</button>").join("")+'</div><div class="game-foot">Generated from a parameterized cybersecurity knowledge engine.</div>';a.querySelectorAll(".game-options button").forEach(b=>b.onclick=()=>{let i=+b.dataset.i;a.querySelectorAll(".game-options button").forEach(x=>x.disabled=true);if(i===r.n){score++;b.classList.add("correct")}else{b.classList.add("wrong");a.querySelector('[data-i="'+r.n+'"]').classList.add("correct")}setTimeout(()=>{n++;render()},250)})}function start(){n=0;score=0;seen=new Set();render()}start()}window.CyberGame={open,count:5000};})();