# World Cup 2026 Bracket Pool

A small web app where people submit World Cup prediction-pool guesses.

## What changed

- Users rank every group 1-4 instead of only checking advancers.
- The app automatically treats ranks 1 and 2 as advancing.
- Users then pick the best 8 third-place teams.
- The knockout bracket follows the FIFA/ESPN match-number structure:
  - Round of 32: Matches 73-88
  - Round of 16: Matches 89-96
  - Quarterfinals: Matches 97-100
  - Semifinals: Matches 101-102
  - Final: Match 104

## Run locally

```bash
npm install
ADMIN_PASSWORD=mysecret npm start
```

Open http://localhost:3000.

## Deploy quickly

Use Render/Railway/Fly.io:
- Build command: `npm install`
- Start command: `npm start`
- Environment variable: `ADMIN_PASSWORD=whatever-you-want`

Submissions are saved in `data/submissions.json` on the server.
For serious public use, replace the JSON file with a database, because free hosting can wipe local storage.

## Current 2026 groups included

A: Mexico, South Africa, Korea Republic, Czechia
B: Canada, Bosnia and Herzegovina, Qatar, Switzerland
C: Brazil, Morocco, Haiti, Scotland
D: United States, Paraguay, Australia, Türkiye
E: Germany, Curaçao, Côte d’Ivoire, Ecuador
F: Netherlands, Tunisia, Japan, Sweden
G: Belgium, IR Iran, New Zealand, Egypt
H: Spain, Cabo Verde, Saudi Arabia, Uruguay
I: France, Senegal, Iraq, Norway
J: Argentina, Algeria, Jordan, Austria
K: Portugal, Colombia, Uzbekistan, Congo DR
L: England, Croatia, Ghana, Panama
