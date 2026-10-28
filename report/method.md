# Aðferð og heiðarleiki gagna

Þetta er ný A/B-tilraun byggð á fyrri Lestrarhorns-frumgerð. Eldri frumgerðin er ekki kölluð A og eldri próf eru ekki látin líta út fyrir að hafa verið skrifuð fyrir hana.

Níu Playwright-próf voru skrifuð áður en nýju A/B-viðmótin voru byggð. Tómar inngangsskrár voru notaðar til að mæla rauðu upphafsstöðuna. Nemandi hefur enn ekki staðfest að hafa lesið hverja próflínu; yfirferð er ólokið og verður ekki tilbúin í skýrslunni.

Sama prompt.md, spec.md, gagnasafn, tímabundni stíll og prófunarsafn fara til tveggja agent-lota án samtalssögu (fork_turns=none). Þetta eru aðskildar subagent-lotur í sama verkfæraumhverfi, ekki tvær nýjar handvirkt opnaðar Codex-lotur. Sameiginlegar kerfisleiðbeiningar eru óhjákvæmilegar. Enginn sérsniðinn aðgengis-skill er til í repo við A. Hann er búinn til eftir að A er fryst og aðeins B fær hann. Ekkert er viljandi brotið í A til að framleiða mun.

A verður varðveitt eftir fyrstu byggingu og mælingu. Fyrsta B-mæling er varðveitt áður en lagfæringar fara fram. Loka-B má bæta, en ekki breyta sameiginlegum prófum til að fela villur. Ef prófið sjálft reynist rangt skal skrá breytingu og keyra það aftur á báðar útgáfur.

Sjálfvirk próf og agent-vafraprófun eru ekki handvirk prófun nemanda. Nemandi framkvæmir lyklaborð, skjálesara og 200% zoom án AI, skráir raunverulegar niðurstöður og velur að minnsta kosti eitt vandamál fyrir nýtt regression-próf. Ekki má merkja þann hluta lokið fyrr.

Litir og letur eru tímabundin, samþykkt af nemanda. Module 3 skjáskot vantar. GitHub Actions telst ekki grænt nema raunveruleg keyrsla hafi tekist á GitHub; staðbundið Playwright-próf sannar það ekki.

## Fyrsta prófunartilraun
Playwright gat ekki ræst Chromium vegna macOS/sandbox-villu (`MachPortRendezvousServer: Permission denied`). 18 merktar bilanir eru innviðabilanir, EKKI 18 aðgengisvillur. Rauða upphafskeyrslan sannar því ekki prófin. Upprunalegur JSON-loggur er varðveittur sem infrastructure-error-before-build.json. Keyra þarf prófin í leyfðu umhverfi eða CI til að fá gildar samanburðartölur.
