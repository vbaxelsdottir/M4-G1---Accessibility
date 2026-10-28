# Aðgengisákvarðanir — Lestrarhornið

Staða: tillaga út frá verkefnalýsingu, þarf yfirferð nemanda. Núverandi litir og letur eru samþykkt tímabundið; Module 3 skjáskot vantar enn. Bækur, höfundar og kápur eru ímynduð kennslugögn.

## Uppbygging og heiti
- HTML lang="is". Ensk heiti sem verkefnið krefst eru merkt lang="en" þar sem við á.
- header: sleppihlekkur „Fara beint í efni“ fyrst, heiti klúbbs og nav með heitinu „Aðalvalmynd“.
- nav tengir í #search, #details, #signup. Engir falskir hlekkir.
- main#main-content með tabindex="-1"; footer með stuttum upplýsingum um sýniverkefni.
- h1: Lestrarhornið. h2: Finndu næstu bók; Meira um bækurnar; Vertu með í klúbbnum. Bókarheiti í niðurstöðum eru h3. Í opnum dialog er h2 bókarheitið. Ekkert stig er sleppt.
- article fyrir hverja niðurstöðu, með mynd og h3/hnappi með bókarheitinu. Vistunarhnappur er systkini, ekki inni í öðrum hnappi.

## Leit, gögn og myndir
shared/books.json er eina heimildin fyrir 8 atriði. Slóðir mynda eru reiknaðar miðað við JSON/shared möppuna og virka í GitHub Pages-undirmöppu. Leitað er í heiti/höfundi/tegund án tillits til há-/lágstafa. „Norðurljós“ gefur eina niðurstöðu; tóm leit gefur 8. Engin niðurstaða fær skýran texta.
Search er sýnilegt label fyrir type=search. #results-count er role=status, aria-live=polite og aria-atomic=true, alltaf til staðar; breytist án þess að stela fókus. T.d. „1 bók fannst“.
Allar átta myndir eru upprunalegt skraut á ímynduðum bókakápum. Þær bæta ekki upplýsingum við sýnilegt heiti/höfund og fá alt="". Sömu myndir í dialog fá líka alt="". Vistunartákn eru aria-hidden=true; heiti stjórntækis kemur frá aria-label. Ef merkingarbærri mynd er síðar bætt við þarf nemandi að ákveða alt-texta eftir tilgangi.

## Vistun
Native button, minnst 44×44 CSS px í þessari hönnun (verkefnislágmark 24×24). Aðgengilegt heiti helst „Save Norðurljós“ þegar vistað er, aria-pressed breytist. Sýnilegt tákn og texti „Vistað“ sýna stöðu án þess að reiða sig eingöngu á lit. Staða helst við leit meðan síðan er opin; engin krafa um varanlega geymslu.

## Fókus, aðalverkefnið í röð
1. Tab: sleppihlekkur. Enter: fókus á main-content; næsta Tab fer í Search.
2. Slá inn „Norðurljós“. Fókus helst á Search meðan fjöldi breytist.
3. Tab: hnappurinn „Norðurljós“ í niðurstöðunni. Enter: native dialog.showModal().
4. Upphafsfókus á Close. Tab og Shift+Tab halda fókus innan gluggans; bakgrunnur er óvirkur. Escape lokar og fókus fer á sama bókahnapp. Prófa einnig Close.
5. Tab frá bókahnappi: „Save Norðurljós“. Space vistar; fókus helst. Shift+Tab fer aftur á bókahnappinn.
6. Tab áfram í Name, Email, Reading format, samþykkisreit og „Skrá mig“. Engin jákvæð tabindex.
7. Röng innsending fær fókus á fyrsta ranga reit. Rétt innsending heldur fókus á hnappi og tilkynnir staðfestingu í role=status.

## Form
Native label, input, select og checkbox. Name og Email eru required með autocomplete=name/email. Reading format required: tómt val „Veldu snið“, gildi printed/audio/ebook. Samþykki er required og óhakað í upphafi.
Notaðu noValidate og skýr villuskilaboð svo villur séu í DOM við viðeigandi reit. Ekki sýna villur áður en notandi reynir að senda. Eftir tilraun uppfærist viðkomandi villa við leiðréttingu. aria-invalid samsvarar sýnilegri villu og aria-describedby tengir villu og hjálpartexta. Fyrsti rangi reitur fær fókus eftir að villurnar eru komnar í DOM; prófa með skjálesara hvort skilaboð lesist eðlilega. Staðfesting segir að þetta sé sýnidæmi og engin raunveruleg skráning hafi farið fram.

## Litir og útlit
Georgia/serif fyrir fyrirsagnir; Arial/sans-serif fyrir megintexta. Engin hreyfing nauðsynleg. Rem-einingar og sveigjanlegar stærðir; 200% zoom og 320 CSS px flæði án efnis- eða virkniþjófnaðar.
| Notkun | Forgrunnur | Bakgrunnur | Hlutfall |
| --- | --- | --- | --- |
| Megintexti | #243c32 | #f8f6ef | 10,99:1 |
| Hnappatexti | #ffffff | #243c32 | 11,88:1 |
| Villutexti | #9b2424 | #f8f6ef | 7,27:1 |
| Fókus | #713908 | #f8f6ef | 8,48:1 |

Hlutföll reiknuð með sRGB/WCAG-formúlu. Viðbótarpör (hover, brúnir, ljósir fletir) skal mæla og skrá líka. AA-viðmið: venjulegur texti 4,5:1, viðeigandi tákn/brúnir 3:1. Fókus: skýr a.m.k. 3px útlína, offset svo hún liggi á ljósum grunni.

## Takmörk
Sjálfvirk próf sannreyna hegðun og hluta aðgengis, ekki fulla upplifun skjálesara. Nemandi verður að lesa hverja próflínu, framkvæma handprófin án AI og staðfesta eigin hönnunarákvarðanir. Engin prófunarniðurstaða má vera tilbúin.
