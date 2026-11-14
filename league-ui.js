// The 604 League · Nov 12–13, 2026 commissioner-approved update
(function(){
 const newAwards=[{"date":"2026-11-12","type":"stud","player":"Cade Cunningham","team":"Philly in 3","portraitId":1630595,"note":"52 PTS · 5 REB · 11 AST · 0 TO. Commissioner selection."},{"date":"2026-11-12","type":"dud","player":"Jamal Shead","team":"Strategist","note":"Commissioner selection."},{"date":"2026-11-12","type":"stream","player":"Paul Reed","team":"Philly in 3","portraitId":1630194,"note":"Added November 12 at 10:24 AM. Stream of the Night."},{"date":"2026-11-13","type":"stud","player":"Alperen Şengün","team":"#WEMB-VP","portraitId":1630578,"note":"43 PTS · 12 REB · 5 AST. Commissioner selection."},{"date":"2026-11-13","type":"dud","player":"Draymond Green","team":"Adobar91","portraitId":203110,"note":"4 PTS · 3 REB · 3 AST. Commissioner selection."},{"date":"2026-11-13","type":"stream","player":"Meleek Thomas","team":"Strategist","note":"Added November 13 at 7:11 AM. Stream of the Night."}];
 const newTransactions=[{"date":"2026-11-13 19:40","team":"Tree Planters","added":"Dylan Cardwell","dropped":"Jakob Poeltl"},{"date":"2026-11-13 17:39","team":"Philly in 3","added":"Naji Marshall","dropped":"Ryan Dunn"},{"date":"2026-11-13 07:11","team":"Strategist","added":"Meleek Thomas","dropped":"Jamal Shead"},{"date":"2026-11-12 20:18","team":"Adobar91","added":"Draymond Green","dropped":"Tari Eason"},{"date":"2026-11-12 10:24","team":"Philly in 3","added":"Paul Reed","dropped":"Brayden Burries"},{"date":"2026-11-12 05:54","team":"Adobar91","added":"Sandro Mamukelashvili","dropped":"Jaxson Hayes"},{"date":"2026-11-12 02:22","team":"Lakay xt16n","added":"Andrew Wiggins","dropped":"Ryan Rollins"},{"date":"2026-11-12 02:22","team":"#WEMB-VP","added":"CJ McCollum","dropped":"Mikal Bridges"}];
 const newTrades=[{"date":"2026-11-13 02:23","teamA":"Tree Planters","teamB":"Jthrust","teamA_sends":["Nickeil Alexander-Walker"],"teamB_sends":["Josh Giddey"]}];
 const existingAwards=Array.isArray(window.leagueAwards)?window.leagueAwards:[];
 const replaced=new Set(newAwards.map(x=>x.date+'|'+x.type));
 window.leagueAwards=existingAwards.filter(x=>!replaced.has(x.date+'|'+x.type)).concat(newAwards);
 const existingTx=Array.isArray(window.leagueTransactions)?window.leagueTransactions:[];
 for(const x of newTransactions)if(!existingTx.some(y=>x.date===y.date&&x.team===y.team&&x.added===y.added))existingTx.push(x);
 existingTx.sort((a,b)=>b.date.localeCompare(a.date));
 window.leagueTransactions=existingTx;
 const existingTrades=Array.isArray(window.leagueTrades)?window.leagueTrades:[];
 for(const x of newTrades)if(!existingTrades.some(y=>x.date===y.date&&x.teamA===y.teamA&&x.teamB===y.teamB))existingTrades.push(x);
 existingTrades.sort((a,b)=>b.date.localeCompare(a.date));
 window.leagueTrades=existingTrades;
})();

(function(){
'use strict';
const tx=Array.isArray(window.leagueTransactions)?window.leagueTransactions:[];
const awards=Array.isArray(window.leagueAwards)?window.leagueAwards:[];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=d=>d?new Date(d+'T12:00:00').toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric'}):'Date to confirm';
const photo=a=>a.portraitId?'<img loading="lazy" alt="'+esc(a.player)+'" src="https://cdn.nba.com/headshots/nba/latest/1040x760/'+a.portraitId+'.png" onerror="this.style.display=\'none\'">':'';
const card=a=>'<article class="v43-award-card '+esc(a.type)+'">'+photo(a)+'<div class="v43-type">'+esc(a.type==='stream'?'Stream of the Night':a.type==='stud'?'Stud of the Night':'Dud of the Night')+'</div><h3>'+esc(a.player)+'</h3><p>'+esc(a.team)+'</p>'+(a.note?'<small>'+esc(a.note)+'</small>':'')+'</article>';
const current=awards.filter(a=>a.date).map(a=>a.date).sort().at(-1);
const currentAwards=awards.filter(a=>a.date===current&&a.type!=='stream');
const stream=awards.find(a=>a.type==='stream'&&a.date===current);
const featured=document.getElementById('v43-featured');if(featured)featured.innerHTML=[...currentAwards,...(stream?[stream]:[])].map(card).join('');
const latest=document.getElementById('v43-latest-transactions');if(latest){latest.innerHTML=tx.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5).map(t=>'<div class="v43-tx"><b>'+esc(t.team)+'</b><span>'+esc(t.date)+' · '+(t.added?'+'+esc(t.added):'')+(t.added&&t.dropped?' / ':'')+(t.dropped?'−'+esc(t.dropped):'')+'</span></div>').join('')||'<p>No recorded transactions.</p>';}
const counter=document.getElementById('v43-tx-count');if(counter)counter.textContent=tx.length;
const totals={};for(const a of awards){const t=totals[a.team]??={stud:0,dud:0,stream:0};t[a.type]++;}
const leaderboard=document.getElementById('v43-award-leaders');if(leaderboard){leaderboard.innerHTML=['stud','dud','stream'].map(type=>{const r=Object.entries(totals).filter(([_,v])=>v[type]).sort((a,b)=>b[1][type]-a[1][type]||a[0].localeCompare(b[0]));const max=r[0]?.[1][type]||0;return '<div class="v43-leader"><b>'+type.toUpperCase()+' LEADERS</b><p>'+r.filter(([_,v])=>v[type]===max).map(([n])=>esc(n)).join(' · ')+' — '+max+'</p></div>';}).join('');}
const archive=document.getElementById('v43-award-archive');if(archive){const dates=[...new Set(awards.filter(a=>a.date).map(a=>a.date))].sort().reverse();archive.innerHTML=dates.map(d=>'<section class="v43-archive-day"><h2>'+esc(date(d))+'</h2><div class="v43-award-grid">'+awards.filter(a=>a.date===d).map(card).join('')+'</div></section>').join('')+'<section class="v43-archive-day"><h2>Inaugural Stream Award · Date to confirm</h2><div class="v43-award-grid">'+awards.filter(a=>!a.date).map(card).join('')+'</div></section>';}
const table=document.getElementById('v43-award-table');if(table){table.innerHTML=Object.entries(totals).sort((a,b)=>b[1].stud-a[1].stud||a[0].localeCompare(b[0])).map(([team,c])=>'<tr><td>'+esc(team)+'</td><td>'+c.stud+'</td><td>'+c.dud+'</td><td>'+c.stream+'</td></tr>').join('');}
const movement=document.getElementById('v43-player-movement');if(movement){const players=new Map();const norm=s=>String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[’]/g,"'").toLowerCase().trim();for(const t of tx){for(const [field,k] of [['added','adds'],['dropped','drops']]){if(!t[field])continue;const key=norm(t[field]);if(!players.has(key))players.set(key,{name:t[field],adds:0,drops:0});players.get(key)[k]++;}}const all=[...players.values()];const draw=mode=>{const rank=all.slice().sort((a,b)=>mode==='drops'?b.drops-a.drops||b.adds-a.adds:mode==='adds'?b.adds-a.adds||b.drops-a.drops:(b.adds+b.drops)-(a.adds+a.drops));movement.innerHTML=rank.slice(0,40).map((p,i)=>'<tr><td>'+(i+1)+'. '+esc(p.name)+'</td><td>'+p.adds+'</td><td>'+p.drops+'</td><td>'+(p.adds+p.drops)+'</td></tr>').join('');};const selector=document.getElementById('v43-movement-sort');if(selector)selector.addEventListener('change',()=>draw(selector.value));draw(selector?.value||'drops');}
})();
