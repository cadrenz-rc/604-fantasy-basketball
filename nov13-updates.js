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
