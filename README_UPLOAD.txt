THE 604 LEAGUE — WEEK 4 FINAL RESULTS FRONT PAGE (NOVEMBER 16, 2026)

Upload the following four files to the ROOT of cadrenz-rc/604-fantasy-basketball, replacing the existing versions:
- league-ui.js
- nov13-updates.js
- standings.html
- teams.html

Do NOT upload this ZIP itself. Extract it, upload the four files, then Commit changes.

What is updated:
- The homepage uses league-ui.js to insert the complete Week 4 FINAL result card BEFORE the dashboard content.
- The welcome intro video will not auto-block the Week 4 lead; it remains available via its replay button.
- Week 5's seven pairings are shown in a collapsible section on the homepage and in standings.html.
- The full 14-team Yahoo standings after Week 4, including recorded waiver/moves values, appear on standings.html.
- November 16 add/drop moves are appended (GWA₱o, Neil😎 and Lakay xt16n), preserving prior recorded moves.
- The earlier November 12–14 awards remain unchanged, including Giannis as November 14 Stud.
- No November 15 award winners are presumed confirmed.

IMPORTANT CACHE CHECK: If your homepage does not update after committing, open index.html in GitHub and change the query string for the final league-ui.js script to a new version, e.g. from ?v=52 to ?v=55. You do not need to change any other HTML for the week 4 lead.

NOT YET UPDATED: The transaction archive and trade archive pages still require their base transactions-data.js to be modified. The home page and Awards page use the overlay data. Week 5 scores are explicitly not live.
