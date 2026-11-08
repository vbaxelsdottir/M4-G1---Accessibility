# Lestrarhornið — A/B aðgengisverkefni

## Keyra í VS Code
Opnaðu þessa möppu. Node 24 er notað í CI.

```sh
npm install
npm run dev
```

Opnaðu slóðina sem Vite birtir. Þetta verkefni notar ekki Go Live. Rótin er skilasíða, `/a/` er grunnútgáfa, `/b/` er útgáfa með aðgengis-skill og `/report/` er skýrsla.

## Próf
Lestu tests/accessibility.spec.js línu fyrir línu áður en þú skilar.

```sh
npx playwright install chromium
npm run test:a
npm run test:b
npm run build
```

Í Codex-umhverfinu við gerð verkefnis gat Chromium ekki ræst vegna sandbox-takmörkunar. Það er ekki mæling á aðgengi. Keyrðu prófin í þínu venjulega terminal eða í GitHub Actions og varðveittu JSON-niðurstöðurnar.

## Skrár
- prompt.md — sama prompt fyrir A og B.
- spec.md — ákvarðanir um aðgengi, í yfirferð hjá nemanda.
- shared/books.json — 8 ímyndaðar bækur; shared/covers/ eru upprunalegar skrautmyndir.
- shared/style-guide.md — tímabundinn stíll. Module 3 skjáskot vantar.
- a/ — fryst grunnútgáfa; ekki laga A eftir mælingu.
- b/ — útgáfa sem má laga.
- .agents/skills/accessibility/SKILL.md — eigið skill, bætt við eftir A.
- tests/ — sameiginleg Playwright-próf.
- report/ — niðurstöður, aðferð og handprófunareyðublað.

## GitHub og Pages
Verkefnið er ekki birt á GitHub fyrr en repo/slóð og græn Actions-keyrsla liggja fyrir.
1. Búðu til tómt opinbert GitHub-repo og tengdu þessa staðbundnu Git-geymslu. Ekki bæta README við á GitHub áður en þú ýtir þessari sögu upp.
2. Push á main. Veldu Settings → Pages → Source: GitHub Actions.
3. „Test B and publish Pages“ prófar B og birtir aðeins ef prófin og build standast.
4. Keyrðu „Measure A and B“ undir Actions til að safna niðurstöðum beggja. Sæktu artifacts og skráðu raunverulegar tölur í skýrslu.
5. Bættu repo-slóð og raunverulegri Pages-slóð í skýrslu og skilareitina.

Fyrir skil þarf einnig Module 3 efni, þína yfirferð á prompt/spec/prófum, handprófanir án AI, regression-próf úr þeim og rýni á tveimur samnemendum. Ekki merkja þetta lokið sjálfkrafa.
# M4-G1---Accessibility
