# Agent-vafraprófun — ekki handprófun nemanda

Umhverfi: Codex innbyggður vafri á macOS. Þetta er önnur keyrsla en Playwright/Chromium-safnið. Byggt á fyrstu B-útgáfu, e2ba07e.

## B með button
- Tab → Enter á sleppihlekk → Tab færði fókus í Search.
- Innsláttur „Norðurljós“ gaf 1 niðurstöðu; fókus hélst í leit.
- Tab → Enter opnaði gluggann „Norðurljós“; Close fékk fókus.
- Tab / Shift+Tab og Escape voru notuð. Eftir lokun var fókus á bókahnappinum „Norðurljós“. Ekki var tekið milliskjáskot af hverju Tab-skrefi í glugganum, svo þetta eitt sannar ekki alla fókusgildruna.
- Tab → Space virkjaði Save Norðurljós; staðan varð Vistað og fókus hélst á vistunarhnappi.
- Name og Email voru fyllt út með lyklaborði. Í native select þurfti Space, ör niður og Enter til að velja Prentuð bók í þessum vafra; ör niður og Tab ein og sér héldu upphaflega tómu vali.
- Tab → Space hakaði við samþykki; Tab → Enter sendi sýniformið. Staðfestingin „Takk fyrir!“ birtist og fókus hélst á Skrá mig.

Niðurstaða: Aðalferlið kláraðist með lyklaborðsverkfærum agents. Þetta er ekki vottun, ekki VoiceOver-prófun og ekki niðurstaða Playwright-safnsins.

## Afrit með div
Niðurstaða verður skráð eftir raunverulega keyrslu. Aðeins save-elementinu er skipt úr button í div, með sama className, tákni, ARIA-eigindum og onClick. Ekki er bætt við role, tabindex eða lyklaborðsviðburði. B sjálfu er ekki breytt í div.

## Endurprófun 8. nóvember 2026

Tilraunaafritið var endurnýjað úr loka-B. main.jsx er eins nema opnunar- og lokunartag vistunarhnappsins er div. CSS er eins. B sjálft var ekki breytt.

Í innbyggðum vafra var Search valið og Norðurljós slegið inn. Tab og Enter opnuðu gluggann, Escape lokaði. Á B fór næsta Tab á Save; Space gaf Vistað. Tab-röðin fór síðan í Name, Email, Reading format, samþykki og Skrá mig. Test Reader / reader@example.com, P fyrir Prentuð bók, Space á samþykki og Enter á Skrá mig gáfu Takk fyrir-staðfestingu.

Í div-afritinu tókst leit, opnun og lokun. Næsta Tab fór beint í Name; Save var sleppt og staðan var Óvistað. Aðgengistré sýndi container Save Norðurljós í stað innbyggðs stjórntækis. Agent gat ekki lokið vistun með þessari lyklaborðsleið. Smellur á sama div breytti stöðunni í Vistað: músarvirkni ein og sér sannar ekki aðgengi.

Takmörk: þetta var agent-vafraprófun með lyklaborðsaðgerðum eftir að leitarreitur var valinn, ekki sjálfstæð handprófun nemanda eða VoiceOver-próf.
