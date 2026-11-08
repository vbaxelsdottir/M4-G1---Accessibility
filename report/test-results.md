# Fyrstu A/B-niðurstöður og lagfæringar

Raunverulegar Playwright-keyrslur nemanda, 28. október 2026:

| Útgáfa | Stóðust | Féllu | Próf sem féllu |
| --- | --- | --- | --- |
| A, fyrsta keyrsla | 6 | 3 | 02 lyklaborðsferli; 04 fókus í dialog; 09 þröngt útlit |
| B, fyrsta keyrsla | 7 | 2 | 02 lyklaborðsferli; 04 fókus í dialog |
| A, leiðrétt prófunarsafn | Ókeyrt | Ókeyrt | Bíður nýrrar keyrslu |
| B, eftir lagfæringu | Ókeyrt | Ókeyrt | Bíður nýrrar keyrslu |

Upprunalegir JSON-loggar eru í evidence/a-first.json og evidence/b-first.json. Upprunalega prófunarsafnið er varðveitt í evidence/tests-first.txt. A-kóðanum var ekki breytt; SHA-256 gildi eru varðveitt í evidence/a-preserved-sha256.json.

## Greining

Próf 02 komst að lokum aðalferlis en staðfesting forms var tóm. DOM-snapshot B sýndi að Reading format stóð enn á „Veldu snið“ og viðeigandi villa birtist. Prófið notaði aðeins ArrowDown og Tab á native select. Það staðfesti ekki valið á macOS. Þetta var galli í prófunarskrefinu, ekki ástæða til að fjarlægja required eða veikja formið.

Sama prófunarsafn fyrir A og B er nú leiðrétt: Space opnar valmynd, Home fer á fyrsta val, ArrowDown velur prentaða bók, Enter staðfestir; ný fullyrðing krefst gildisins printed. Allt er áfram gert með lyklaborði. Endurkeyra þarf báðar útgáfur. Ekki bera nýjar tölur saman við þær gömlu án þess að nefna þessa prófbreytingu.

Próf 04 fann að fókus var ekki lengur inni í dialog eftir Tab. Native showModal gerir bakgrunn óvirkan en uppfyllti ekki eitt og sér strangari kröfu verkefnisins um lokaða Tab-röð. Í B var bætt við afmörkuðum Tab/Shift+Tab viðburði sem fer frá síðasta virka stjórntæki í fyrsta og öfugt. Escape og Close nota enn native lokun; fókus fer aftur á upprunalega bókahnappinn. A er óbreytt.

Próf 09 fann lárétt yfirflæði í A við 320 px. Það stóðst í B. A er varðveitt sem grunnútgáfa. Ekki er hægt að álykta af einni A/B-tilraun að skill eitt og sér valdi öllum muninum.

## Sannreynt eftir breytingu

- npm run build: stóðst.
- Agent-prófun í innbyggðum vafra: opnun setti fókus á Close; Tab hélt honum þar; Shift+Tab hélt honum þar; Escape lokaði og skilaði fókus á Norðurljós.
- Allt Playwright-safnið eftir breytingu: ekki enn keyrt í leyfðu umhverfi. Engin fullyrðing um 9/9 þar til raunverulegur loggur liggur fyrir.
- Þetta er hvorki handprófun nemanda né skjálesaraprófun.

## Næsta keyrsla í VS Code terminal

```sh
RESULT_FILE=report/evidence/a-corrected-tests.json npm run test:a
RESULT_FILE=report/evidence/b-after-fix.json npm run test:b
```

Ef eitthvað fellur skal skoða nákvæma bilun, ekki veikja vænta hegðun. Uppfæra þessa töflu úr nýju loggunum þegar þeir liggja fyrir.

## Önnur keyrsla og önnur lagfæring

Loggar: a-corrected-tests.json (6 stóðust, 3 féllu), b-after-fix.json (8 stóðust, 1 féll). Próf 04 stóðst nú í B. Próf 02 féll nú fyrr, á Shift+Tab eftir vistun (lína 67), ekki á formstaðfestingu. Þessi keyrsla sannreynir því ekki enn leiðrétt select-skrefið.

B endurheimti fókus í ósamstilltum close-viðburði. Native dialog hafði þegar fært fókus aftur við lokun; seinni handler gat fært hann aftur þegar notandi hafði farið áfram. B notar nú sameiginlega closeBook aðgerð fyrir Close og Escape: close() og focus() fara fram saman, án síðari onClose fókusfærslu. Prófunarsafni var ekki breytt í þessari lotu og A er áfram óbreytt.

Ný keyrsla eftir þessa breytingu er enn óframkvæmd. Vista skal niðurstöðuna í b-after-focus-fix.json.

## Þriðja keyrsla og leiðrétting á select-prófi

b-after-focus-fix.json: 8 stóðust, 1 féll. Fókusferlið komst nú fram hjá Shift+Tab en select-gildið var tómt í línu 80. Fyrri popup-takkaröðin var því ekki rétt lausn í prófunarumhverfinu.

Sameiginlegt próf notar nú native type-ahead: ýtir á p á fókuseruðum select-reit til að velja „Prentuð bók“. Fullyrðingin toHaveValue('printed') er óbreytt. Engin selectOption() eða DOM-breyting er notuð og ekkert í A/B-viðmótinu er breytt vegna þessa. Prófun með innbyggðum vafra staðfesti að p breytti tómu vali í Prentuð bók; Playwright-endurkeyrsla er enn eftir. Fyrri útgáfa prófsins er varðveitt í evidence/tests-popup-sequence.txt.

Endurkeyra skal B fyrst og síðan A með sama loka-prófunarsafni fyrir sanngjarnan samanburð. Ekki fullyrða að allt standist fyrr en loggar liggja fyrir.

## Staðfest lokakeyrsla — 28. október 2026

Loggarnir hafa verið lesnir: b-typeahead.json sýnir 9 staðist, 0 fallið, 0 sleppt. a-final-comparison.json sýnir 7 staðist, 2 fallið, 0 sleppt (04 og 09). Þessar keyrslur nota sama loka-prófunarsafn með P type-ahead. Eldri „ókeyrt“ athugasemdir hér að ofan lýsa stöðunni á fyrri stigum, ekki núverandi niðurstöðu. A er áfram óbreytt.
