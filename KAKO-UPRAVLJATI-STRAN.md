# KAKO UPRAVLJATI SVOJO SPLETNO STRAN

Navodila za janzoric.com. Napisana za fotografa, ne za programerja.
Če si to odprl po enem letu: ne skrbi, vse je spodaj, korak za korakom.

---

## Kazalo

1. [Kaj je kje (pregled)](#1-kaj-je-kje)
2. [Izvoz fotografij iz Lightrooma](#2-izvoz-fotografij-iz-lightrooma)
3. [⭐ LETNA POSODOBITEV PORTFOLIA](#3-letna-posodobitev-portfolia)
4. [Posamezna opravila v CMS-ju](#4-posamezna-opravila-v-cms-ju)
5. [Cene in pogosta vprašanja](#5-cene-in-pogosta-vprašanja)
6. [Ostala besedila in fotografije na straneh](#6-ostala-besedila-in-fotografije)
7. [Kontaktni obrazec in statistika](#7-kontaktni-obrazec-in-statistika)
8. [Varnostna kopija in vrnitev na prejšnjo različico](#8-varnostna-kopija-in-vrnitev)
9. [Ko kaj ne dela](#9-ko-kaj-ne-dela)
10. [Računi, stroški in roki](#10-računi-stroški-in-roki)

---

## 1. Kaj je kje

| Kaj | Kje | Za kaj |
|---|---|---|
| **Spletna stran** | https://janzoric.com | to, kar vidijo obiskovalci |
| **CMS (urejevalnik)** | https://janzoric.com/admin/ | portfolio, cene, vprašanja – brez kode |
| **GitHub** | https://github.com/janzoric/janzoric-site | kjer je shranjena cela stran (in vsa zgodovina sprememb) |
| **Objave** | https://github.com/janzoric/janzoric-site/actions | seznam objav – zelena kljukica = objavljeno |
| **Kontaktni obrazec** | https://formspree.io | sporočila iz obrazca (pridejo tudi na info@janzoric.com) |
| **Statistika** | https://janzoric.goatcounter.com | koliko ljudi pride in od kod |
| **Domena** | WordPress.com → Domene | janzoric.com in DNS nastavitve |
| **Email** | Titan Email | info@janzoric.com |

**Kako deluje objava:** vsakič, ko v CMS-ju klikneš **Save**, se sprememba shrani na GitHub,
GitHub v 2–4 minutah sam zgradi novo stran in jo objavi. Nič drugega ni treba narediti.

---

## 2. Izvoz fotografij iz Lightrooma

Enkrat si naredi **prednastavitev (preset)**, potem je izvoz en klik.

V Lightroom Classic izberi fotke → **File → Export…** in nastavi:

| Razdelek | Nastavitev |
|---|---|
| **File Naming** | Rename To: **Custom Name – Sequence**, Custom Text: `porocna-2027` *(leto zamenjaj)* |
| **File Settings** | Image Format: **JPEG** · Quality: **85** · Color Space: **sRGB** · Limit File Size: *ne* |
| **Image Sizing** | ✅ Resize to Fit: **Long Edge** · **2500** pixels · ✅ Don't Enlarge · Resolution: 72 |
| **Output Sharpening** | ✅ Sharpen For: **Screen** · Amount: **Standard** |
| **Metadata** | Include: **Copyright Only** · ✅ Remove Location Info |
| **Watermarking** | *brez* |

Nato levo spodaj **Add** → ime npr. `Spletna stran` → odslej samo izbereš ta preset.

**Zakaj tako:**
- **2500 px in kakovost 85** = ~1 MB na fotko. Stran sama naredi manjše verzije za telefone,
  zato večje datoteke ne prinesejo nič, le napolnijo prostor na GitHubu (ta je omejen na ~1 GB).
  ⚠️ Ne nalagaj originalov (10+ MB).
- **sRGB** = barve so enake v vseh brskalnikih. (Adobe RGB bi izgledal pust.)
- **Ime brez imen parov** – imena datotek so na GitHubu javna.
- **Brez lokacije** – GPS podatki ne gredo na splet.

---

## 3. LETNA POSODOBITEV PORTFOLIA

*Enkrat na leto, po sezoni. ~1 ura, večinoma izbiranje.*

### Korak 1 – Izberi fotke v Lightroomu
Izberi najljubše fotke sezone (ali iz vseh let). Daj jim zvezdico ali barvo, da jih najdeš.

### Korak 2 – Izvozi
Izvozi jih s presetom **Spletna stran** (poglavje 2) v novo mapo na namizju, npr. `PORTFOLIO 2027`.

### Korak 3 – Odpri CMS
1. Pojdi na **https://janzoric.com/admin/**
2. Klikni **Sign In Using Access Token** in prilepi svoj ključ (shranjen v Geslih na Macu pod
   "janzoric CMS").
   *Če ključ ne deluje več, je potekel → glej [9. Ko kaj ne dela](#cms-me-ne-spusti-noter).*

### Korak 4 – Naloži nove fotke
1. Odpri **Portfolio → Fotografije v portfoliu**.
2. Iz Finderja **povleci vse nove fotke naenkrat** na seznam fotografij.
3. Počakaj, da se pojavijo sličice. Nove so na koncu seznama.

### Korak 5 – Odstrani stare
Pri fotkah, ki jih ne želiš več: klikni **✕ / koš** ob sličici.
*(S tem fotka izgine s strani. Da jo izbrišeš tudi iz shrambe, glej korak 8.)*

### Korak 6 – Uredi vrstni red
Fotko primeš za **ročaj na levi** in jo povlečeš gor ali dol. Na telefonu: gumba gor/dol.

Nasveti za dober vrstni red:
- **Začni z nečim, kar te opiše** – smešno, nepričakovano, ne nujno najlepše.
- **Vsaka 17. in 18. fotka se prikaže večja**, ena ob drugi (»razpon«).
  Na ta mesta postavi dva močna para, ki se dopolnjujeta. Ker dodajanje fotk zamakne vse naprej,
  to preveri **na koncu**.
- Ne postavljaj **več črno-belih zaporedoma** – razporedi jih.
- Lahko slediš dnevu: priprave → obred → portreti → žur.

### Korak 7 – Shrani in preveri
1. Klikni **Save**.
2. Počakaj 3–4 minute in odpri **https://janzoric.com/portfolio/**.
3. Če se novo še ne vidi: osveži stran (ali jo odpri v zasebnem zavihku).

### Korak 8 – Počisti shrambo (priporočeno)
Odstranjene fotke so še vedno shranjene na GitHubu. Da ne zasedajo prostora:
1. V CMS-ju odpri **Assets**.
2. Odpri mapo **src/photos/portfolio**.
3. Izberi fotke, ki jih ni več na strani → **Delete**.

⚠️ Briši **samo** fotke, ki si jih v koraku 5 odstranil s seznama. Če zbrišeš fotko, ki je še
na seznamu, objava ne bo uspela (glej [9](#objava-ni-uspela-rdeč-križec)).

### Korak 9 – (neobvezno) Opisi fotk za Google
Vsaka fotka ima kratek opis za Google in slepe uporabnike (»Ženin začudeno gleda čevelj …«).
Nove fotke ga dobijo samodejno (»Poročna fotografija«). Če želiš svojega, glej
[6. Ostala besedila](#opisi-fotografij).

**To je to. 🎉**

---

## 4. Posamezna opravila v CMS-ju

| Želim … | Naredim |
|---|---|
| **dodati eno fotko** | Portfolio → povleci fotko na seznam → premakni na mesto → Save |
| **dodati več fotk naenkrat** | povleci vse naenkrat iz Finderja |
| **premakniti fotko** | ročaj na levi → povleci → Save |
| **odstraniti fotko s strani** | ✕ ob sličici → Save |
| **izbrisati datoteko** | najprej odstrani s seznama + Save, nato Assets → Delete |
| **zamenjati fotko** | naloži novo, postavi jo na mesto stare, staro odstrani (✕) → Save, nato staro izbriši v Assets |

---

## 5. Cene in pogosta vprašanja

Oboje urejaš v CMS-ju, brez kode:

- **Izbira (paketi in cene)** – ime paketa, cena, kaj dobita, šaljivi dodatki, opomba o dronu.
- **Pogosta vprašanja (IZBIRA)** – dodaš, spremeniš ali izbrišeš vprašanje in odgovor.

Spremeniš → **Save** → čez 3 minute je na strani.

> Cene so napisane tudi v podatkih za Google (to se posodobi samo).

---

## 6. Ostala besedila in fotografije

Besedila na domači strani, O meni, Kontakt … niso v CMS-ju, ker se skoraj nikoli ne spreminjajo
in so oblikovana »ročno«. Ko jih želiš spremeniti, imaš dve možnosti:

### A) Najlažje: prosi Claude
Odpri Claude Code v mapi `NOVA AI STRAN/janzoric-site` in napiši, kaj želiš spremeniti.

### B) Sam, na GitHubu (za manjše popravke besedila)
1. Odpri https://github.com/janzoric/janzoric-site → mapa **src**.
2. Izberi datoteko:

   | Stran | Datoteka |
   |---|---|
   | Domača stran | `src/index.njk` |
   | Kdo je ta model? | `src/kdo-je-ta-model.njk` |
   | Portfolio (naslov nad galerijo) | `src/portfolio.njk` |
   | Izbira (koraki »Kako se me najame«) | `src/izbira.njk` |
   | Kontakt | `src/kontakt.njk` |
   | Noga strani (kolofon) | `src/_includes/base.njk` |
   | Email, Instagram, podatki s.p. | `src/_data/site.json` |
   | Mnenja strank (domača stran) | `src/_data/mnenja.yml` |

3. Klikni ikono **svinčnika ✏️** (Edit).
4. Poišči besedilo in spremeni **samo besede**. Ne briši znakov `<` `>` in tega, kar je med njimi.
   `<br>` pomeni novo vrstico.
5. Zgoraj desno **Commit changes…** → **Commit changes**. Čez 3 minute je objavljeno.

Če se kaj pokvari → [vrni prejšnjo različico](#8-varnostna-kopija-in-vrnitev).

### Zamenjava fotografije na domači strani ali O meni
Fotke na teh straneh so v mapi **src/photos/site/**:

| Fotka | Datoteka |
|---|---|
| Velika fotka (riba) | `hero-riba.jpg` |
| Pričevanje (tenis) | `testimonial-tenis.jpg` |
| Polaroid | `jan-polaroid.jpg` |
| NPR. (skok) | `npr-skok.jpg` |
| Kolaž »Iz arhiva« | `kolaz-cevlji.jpg`, `kolaz-vrecke.jpg`, `kolaz-glave.jpg`, `kolaz-resevalci.jpg` |
| O meni | `jan-s-parom.jpg`, `jan-kolo.jpg`, `jan-turna-smuka.jpg` |

Najlažje zamenjaš tako: novo fotko izvozi z **istim imenom** (npr. `hero-riba.jpg`), nato na
GitHubu odpri mapo `src/photos/site` → **Add file → Upload files** → povleci fotko →
**Commit changes**. Stara se zamenja z novo.

⚠️ Če zamenjaš velike fotke, preveri, da se postavitev še lepo vidi – druga fotka ima lahko
drugačno razmerje. Opis fotke (za Google) je v datoteki strani (`alt="…"`).

### Opisi fotografij
Opisi portfolio fotk so v `src/_data/opisi.yml`, ena vrstica na fotko:
```
porocna-2027-01.jpg: "Ženin skoči v bazen v obleki"
```
Ime mora biti točno ime datoteke. Kratko, stvarno, brez »čarobnih trenutkov«.

---

## 7. Kontaktni obrazec in statistika

**Sporočila iz obrazca** pridejo na **info@janzoric.com**.
Vsa so shranjena tudi na **formspree.io** (prijava → tvoj obrazec → Submissions).

- Brezplačno je **50 sporočil na mesec**. Če jih je kdaj več, ti Formspree pošlje opozorilo.
- Če sporočilo ne pride: poglej v Formspree pod **Spam**.

**Statistika obiskov:** https://janzoric.goatcounter.com – koliko obiskov, katere strani,
od kod (Instagram, Google …). Brez piškotkov, zato ne potrebuješ pasice za soglasje.

---

## 8. Varnostna kopija in vrnitev

### Varnostna kopija
- **GitHub hrani celotno stran in vsako spremembo kadarkoli** – to je že varnostna kopija.
- Kopija je tudi na tvojem Macu (mapa `janzoric-site`). Da je sveža: **GitHub Desktop →
  Fetch origin → Pull**. Naredi to po vsaki letni posodobitvi.
- **Originalne fotke** imej še naprej v Lightroomu in na svojem backupu – na strani so le
  manjše kopije.

### Vrnitev na prejšnjo različico (če se kaj pokvari)
1. Odpri **GitHub Desktop** → izberi repozitorij `janzoric-site` → **Fetch origin → Pull**.
2. Levo zgoraj zavihek **History**.
3. Poišči spremembo, ki je kaj pokvarila (zadnja je na vrhu).
4. Desni klik → **Revert Changes in Commit**.
5. Zgoraj **Push origin**. Čez 3 minute je stran spet taka kot prej.

Nič ni nikoli zares izgubljeno – vsaka prejšnja različica je v zgodovini.

---

## 9. Ko kaj ne dela

### Sprememba se ne vidi na strani
1. Počakaj **4 minute**.
2. Odpri **https://github.com/janzoric/janzoric-site/actions**:
   - 🟡 rumen krog = še gradi, počakaj,
   - ✅ zelena kljukica = objavljeno → stran osveži ali jo odpri v zasebnem zavihku,
   - ❌ rdeč križec = glej spodaj.

### Objava ni uspela (rdeč križec)
Najpogostejši razlogi:
- **na seznamu je fotka, ki je bila izbrisana v Assets** → v CMS-ju jo odstrani s seznama → Save,
- **pokvarjena ali čudna datoteka** (npr. HEIC, PNG z napako) → odstrani jo in naloži JPEG,
- **napaka pri ročnem urejanju besedila** → [vrni prejšnjo različico](#vrnitev-na-prejšnjo-različico-če-se-kaj-pokvari).

Dokler objava ne uspe, ostane na spletu **zadnja delujoča različica** – stran nikoli ne »pade«.

### CMS me ne spusti noter
Ključ (token) je najverjetneje potekel. Narediš novega:
1. GitHub → tvoja slika → **Settings** → **Developer settings** → **Personal access tokens** →
   **Fine-grained tokens** → **Generate new token**
2. Name: `janzoric CMS` · Expiration: najdaljše · Repository access: *Only select repositories* →
   `janzoric-site` · Permissions → **Contents: Read and write**
3. **Generate token** → kopiraj → shrani v Gesla → prijavi se v CMS z novim ključem.

### Obrazec ne pošilja
- Poglej v Formspree (Submissions in Spam).
- Preveri, ali nisi presegel 50 sporočil na mesec.

### Stran ne deluje na janzoric.com
Najverjetneje so se spremenile DNS nastavitve pri WordPress.com. Pravilne so:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | janzoric.github.io |

⚠️ **Nikoli ne spreminjaj** zapisov MX, `titan1._domainkey`, `_dmarc`, `v=spf1…` (email) in
`google-site-verification` / `_github-pages-challenge-janzoric`.
⚠️ Pri WordPress.com **ne klikaj »Restore default A records«**.

V GitHubu: **Settings → Pages** mora pri Custom domain pisati `janzoric.com` in imeti
kljukico **Enforce HTTPS**.

---

## 10. Računi, stroški in roki

| Storitev | Cena | Na kaj paziti |
|---|---|---|
| GitHub (gostovanje strani) | brezplačno | repozitorij mora ostati javen; največ ~1 GB |
| Domena janzoric.com (WordPress.com) | letna naročnina | **poteče 1. 3. 2027** – vklopi samodejno podaljšanje |
| Email (Titan) | po tvojem paketu | ločeno od strani |
| Formspree | brezplačno | 50 sporočil/mesec |
| GoatCounter | brezplačno | – |
| Sveltia CMS | brezplačno | odprtokodno |

**Če katera storitev kdaj preneha delovati:**
- **Formspree** → v `src/_data/site.json` zamenjaš `formEndpoint` z drugo storitvijo (npr. Web3Forms).
- **Sveltia CMS** → portfolio lahko urejaš tudi neposredno v datoteki `src/_data/portfolio.yml`
  na GitHubu (vsaka vrstica = ena fotka, vrstni red = vrstni red na strani), ali pa se
  namesti drug CMS (Pages CMS, Decap).
- **GitHub Pages** → ista stran brez sprememb deluje tudi na Netlify ali Cloudflare Pages.

Vse – besedila, fotke, oblikovanje – je **tvoje** in v enem repozitoriju. Lahko ga kadarkoli
preneseš (GitHub → Code → Download ZIP).

---

*Tehnični opis projekta (za programerje ali Claude) je v `README.md`.*
