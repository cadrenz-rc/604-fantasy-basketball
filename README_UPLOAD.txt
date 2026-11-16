THE 604 LEAGUE | NOVEMBER 15 AWARDS DISPLAY FIX v57

Problem fixed: previous homepage league-ui.js omitted all 3 November 15 awards; daily-awards.html already referenced them but had stale cached script URLs.

Upload exactly the following THREE files to the ROOT of cadrenz-rc/604-fantasy-basketball/main:
  league-ui.js
  nov13-updates.js
  daily-awards.html

IMPORTANT: ONE MANUAL HOME PAGE CHANGE ALSO REQUIRED
Go to https://github.com/cadrenz-rc/604-fantasy-basketball/edit/main/index.html
At the bottom, change <script src="league-ui.js?v=52"></script> to <script src="league-ui.js?v=57"></script>
Commit that change. This is necessary to bypass the older cached homepage JavaScript.

NOTE: Other files bundled here are unnecessary for this award-only repair; only the three files above need uploading.
The November 15 award entries are: Stud Luka Doncic (gamefaceon), Dud Brandon Miller (TribuWakwak), Stream Kelly Oubre Jr. (Jthrust).
The earlier November 12-14 award entries and Week 4 homepage recap are preserved.
The existing site design and video are not changed.
