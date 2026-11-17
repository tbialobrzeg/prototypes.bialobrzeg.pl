# Bloomgrid r7.3 — specyfikacja responsywności i ruchu

r7.3, korekta Q366 (zaakceptowana przez Tomasza): komunikaty chwilowe to osiem kart z własną ilustracją, kolorem, animacją, dźwiękiem i czasem (2–3,4 s), jedna naraz w kolejce; poza kartą nie ma efektów komunikatów (zostaje rozkwit kwiatka wskaźnika przy karcie 6), a przy Pustej grządce trójka pojawia się po 1900 ms (stuknięcie po 600 ms pomija). Opis: podsekcja „Osiem kart” i wiersze 12, 14, 15 (korekta Q366) w „Ruch”; zastępuje opisy wcześniejsze tam, gdzie się różnią.

r7.3 (Q339–Q362) wprowadza jeden sposób komunikatów chwilowych: kartę ruchu w stałym miejscu nad planszą, w kolejce kroków po 2000 ms (punkty z pochwałą i pełnym rozbiciem → kropelki albo święto → nowy rekord → nowy poziom) zamiast pochwały nad planszą, dopisków punktów w pasku i plakietki awansu na wyniku. Podlewanie to kropelki za zbicie kilku linii naraz (L − 1), bez serii i więdnięcia; 3 kropelki dają święto pełnego podlania (+500). Roślina Podlewania jest większa (telefony 56×61, mac-wide 66×72), pasek Podlewania na telefonach ma 54 px (było 44), kolumna mac-wide ma nowe odstępy i gniazdo karty. Na linii jednego koloru plakietka „+500” zamiast „×2”. Opis: sekcja „Karta ruchu i święto pełnego podlania (r7.3)”, wiersze 14 i 15 w „Ruch”; zmienione miejsca oznacza „r7.3”. Układy `phone-merged` i `landscape` dostały kartę i święto tymczasowo (Q349); dopracuje je BLG-20.

r7 (Q232–Q234 i brief r7) dodaje: dwa przełączniki obok siebie, „Muzyka” i „Efekty”, na ekranie startowym i w nagłówku gry (sekcje „screen.game — telefony”, „screen.home”). Na telefonach etykieta poziomu i nazwa trybu przechodzą do wiersza 24 px pod nagłówkiem (sekcja „Etykieta poziomu”). Sekcja „Wysokość okna (r6)” ma nowe minimalne odstępy. Dochodzą też: drabina czterech pochwał, „Kolorowa rabata!”, „Podlewanie” zamiast plakietki serii oraz święto Pustej grządki (premia max(1000, 500 × poziom), w wyzwaniu 2000; ok. 2,5 s); opisują je sekcja „Pochwały i Podlewanie (r7)” i wiersze 4, 12, 13 oraz „—” w „Ruch”. Geometria planszy, trójki i mac-wide bez zmian. Na telefonach w pionie grupa gry przesuwa się o wiersz poziomu (24 px), plansza nie zmienia rozmiaru, poza oknami, które w r6 i tak się kurczyły.

r6 (Q147–Q153, Q175, Q176, Q184, Q185) dodaje: etykietę poziomu w środku nagłówka gry klasycznej, plakietkę awansu i przenikanie tła, poziom w panelu końca i trzy nowe tła kręgu motywów — sekcja „Poziomy (r6)” oraz wiersze 10 i 11 w „Ruch”. Q177–Q181 i Q199–Q203: każdy ekran mieści się w oknie bez przewijania do 375×548 / 852×340 — sekcja „Wysokość okna (r6)”; nowy target `iphone-se`; telefon w poziomie w układzie obok siebie; pochwała „Pusta grządka! +300” i reguła dopisków punktów. Geometria r5 bez zmian poza: nowym elementem w środku nagłówka gry klasycznej (nagłówek nie zmienia wysokości), wyższym panelem końca gry klasycznej (+28 px, linia poziomu) i stanami po ruchu bez ramki czyszczenia (pola w pełnym rozmiarze).

r5 (Q128–Q143, Q162) dodaje: przełącznik dźwięku na ekranie startowym i w nagłówku gry, krok końca gry z komunikatem nad trójką, powód końca i różnicę do rekordu w panelu, animacje (sekcja „Ruch” na końcu), wyśrodkowany tekst komunikatu bez przycisku i punkty ruchu w jednym wierszu na telefonach. Zmiany geometrii r5: sekcje „screen.game — telefony” (pasek serii i punktów, nagłówek), „screen.home” (przełącznik, znak), „Krok końca gry”.

r4 (Q111–Q114) zmienia geometrię w trzech miejscach, opisanych niżej: wspólna siatka ekranu gry na mac-wide (sekcja „screen.game — mac-wide”), całkowite szerokości slotów trójki na wszystkich targetach (sekcja „Geometria planszy i trójki”) i przyciski menu z wyśrodkowanym tekstem i większym wierszem informacji (sekcja „screen.home”, Q111, Q115). Pozostała geometria jak w r3 (r3: wygląd z Q96, Q102; brak nazwy trybu w grze klasycznej, Q107). Nowe są sekcje „Tło i grafiki” i „Tła na targetach” na końcu.

Targety: `mac-wide` 1440×900, `iphone-standard` 393×852, `iphone-se` 375×667 (r6, Q178), `android-standard` 412×915, `mobile-compact` 360×800, `mobile-large` 440×956, `tablet-narrow` 820×1180, `phone-landscape` 852×393. `element.product-work-surface` obejmuje cały ekran targetu.

## Reguła układu dla dowolnej szerokości okna (r2, Q65 wariant A)

O układzie decyduje wyłącznie szerokość okna:

| Szerokość okna | Układ |
|---|---|
| < 1024 px | Układ telefonu (sekcje „telefony” niżej) w kolumnie o szerokości min(okno, 440 px), wyśrodkowanej poziomo. Tło (niebo i pas ogrodu) na całą szerokość okna. Geometria planszy i trójki liczona z szerokości kolumny, więc od 440 px w górę jest taka jak na `mobile-large`. |
| ≥ 1024 px | Układ `mac-wide` (sekcje „mac-wide” niżej), treść do 1040 px wyśrodkowana. |

- ~~Wysokość nie zmienia układu; ekran telefonu ma co najmniej 800 px, niższe okno przewija~~ — zasada r2 usunięta w r6 (Q177). Obowiązuje sekcja „Wysokość okna (r6)” niżej.
- Wyższe okno (np. `tablet-narrow`) daje układ telefonu z większym wolnym miejscem: grupa gry wyśrodkowana pionowo, trójka i menu przy dolnej krawędzi.
- Podczas przeciągania strona się nie przewija (`touch-action: none` na planszy i klockach); blokadę przewijania dokumentu (Q187) wdraża aplikacja.

## Wysokość okna (r6, Q177–Q181, Q199–Q202)

Każdy ekran — start, gra (także wyzwanie dnia), krok końca, panel końca, dialog wyjścia i komunikaty — mieści się w widocznym obszarze okna bez przewijania pionowego i poziomego. Układ liczy się od dynamicznej wysokości okna (w aplikacji `100dvh` albo równoważnie; paski Safari zmieniają wysokość). Dolna granica (Q181): 375×548 w pionie i 852×340 w poziomie mieszczą się zawsze; mniejsze okna mogą się przewijać, ale pole planszy nigdy nie spada poniżej 32 px. W prototypie liczy to `BG.fitHeight` (`assets/bloomgrid-ui.js`), a wynik stoi na powierzchni jako `data-layout` i zmienne CSS (`--pad-t`, `--pad-b`, `--score-gap`, `--tray-gap`, `--min-h`).

### Układy

| Układ (`data-layout`) | Kiedy | Co |
|---|---|---|
| `phone` | okno < 1024 px, wyższe niż szerokie | jak r5: nagłówek, wynik, pasek serii i punktów, plansza, trójka w kolumnie do 440 px |
| `phone-merged` (Q199) | jak `phone`, ale po skurczeniu odstępów i planszy do pola 32 px nadal brak miejsca (375 px szerokości: okno < 578 px) | seria (skrócona do ikony i „×c”) po lewej i punkty ruchu po prawej stronie wyniku, w jego wierszu; pasek znika z układu; pole 32 px |
| `landscape` (Q180, Q200) | okno < 1024 px, szersze niż wysokie | plansza po lewej na całą wysokość, po prawej kolumna 380 px: nagłówek (dom, dźwięk, poziom albo nazwa trybu, rekord), wynik, pasek, trójka; odstęp 32 px; ekran startowy w dwóch kolumnach (Q202) |
| `wide` | okno ≥ 1024 px | siatka Q112; plansza od wysokości okna (pole do 64 px), nagłówek = plansza + 72 + 380 px |

### Kolejność dopasowania w pionie (Q179)

1. Odstępy: góra 59 → 8 px, dół 34 → 8 px, wynik pod nagłówkiem 8 → 4 px, trójka pod planszą 16 → 12 px — proporcjonalnie, tyle, ile trzeba. r7 (Q232): w układzie telefonu w pionie minimum to góra 4, dół 4, wynik pod wierszem poziomu 4 i trójka pod planszą 8 px. Odstęp wyniku 4 px zamiast proponowanych 0 wynika z tego, że tabliczka wyniku wystaje 4 px w górę, a tabliczka wiersza poziomu (20 px) kończy się 2 px nad dołem wiersza. Między tabliczkami zostają więc 2 px; przy 0 px nachodziłyby na siebie do 4,5 px (zmierzone). Potrzebna wysokość = góra + nagłówek 48 + wiersz poziomu 24 + odstęp wyniku + wynik 58 + pasek (46, w `phone-merged` 12; r7.3: 56 — pasek 54 px z większą rośliną, `phone-merged` bez zmian) + plansza + odstęp trójki + trójka + dół. Przy 375×548 (`phone-merged`, pole 32 px) zajmuje dokładnie 548 px. Dalej odstępów się nie zmniejsza: gdy wiersz poziomu się nie mieści, skraca się nazwa w wierszu (wielokropek).
2. Plansza i trójka proporcjonalnie (pole trójki = pole trójki naturalne × pole / pole naturalne, w dół), do pola 32 px.
3. Q199: seria i punkty do wiersza wyniku (`phone-merged`), pole 32 px.
4. Gdy i to się nie mieści, ekran przewija się (wysokość ekranu = `--min-h`), pole zostaje 32 px.
- Szerokość: margines boczny 16 px; gdy przy nim pole byłoby < 32 px (okno węższe niż 344 px), margines 12 px.
- Ekran startowy: te same odstępy; potem zmniejsza się obrazek (ozdoba, do 48 px wysokości), przyciski menu nie.
- Panel końca i dialog: w `phone-merged` i `landscape` karta ma mniejsze odstępy (padding 14 / 18 px, przerwy 8 px), w `landscape` przyciski obok siebie.
- Komunikat błędu zapisu (Q201): gdy jego 76 px nie mieści się w kolumnie (każde okno niższe niż układ naturalny + 76 px: `iphone-se`, 390×660, 375×548, poziomo), leży na wierszu wyniku w wariancie jednowierszowym (ikona, „Nie zapisano”, „Spróbuj ponownie”; 56 px), szerokość treści (poziomo: kolumny). Zasłania wynik, serię i punkty, nigdy przycisków nagłówka, planszy ani trójki.
- ~~Punkty ruchu (Q203): suma i dopiski serii i koloru, gdy się mieszczą; gdy nie — zostaje dopisek o większej wartości (mobile-compact, `phone-merged`). W `phone-merged` suma nad dopiskiem, dopisek może zawinąć się w 2 wiersze.~~ — r7.3: punkty ruchu z pełnym rozbiciem są w karcie ruchu; reguła Q203 i dopiski w pasku usunięte.

## Marginesy treści

- Telefony: 59 px u góry (pasek stanu), 34 px u dołu (wskaźnik), 16 px po bokach — na wysokich oknach; niższe okna kurczą je do 8 px (sekcja „Wysokość okna (r6)”). Szerokość treści = szerokość targetu − 32 px (328 / 361 / 380 / 408 px).
- `mac-wide`: 32 px u góry i u dołu, 40 px po bokach. Treść wyśrodkowana, maksymalnie 1040 px szerokości.

## Geometria planszy i trójki

| Target | Pole planszy | Odstęp / rama | Plansza | Pole w trójce | Slot (wys.) | Klocek nad palcem |
|---|---|---|---|---|---|---|
| mobile-compact | 36 | 3 / 6 | 327 | 15 | 101 | 44 |
| iphone-standard | 40 | 3 / 6 | 359 | 17 | 111 | 48 |
| android-standard | 42 | 3 / 6 | 375 | 18 | 116 | 50 |
| mobile-large | 46 | 3 / 6 | 407 | 20 | 126 | 54 |
| mac-wide | 64 | 4 / 8 | 564 | 18 | 116 | — (mysz) |

- Plansza = 8·pole + 9·odstęp + 2·rama. Na telefonach pole = ⌊(min(szerokość treści, 420) − 9·odstęp − 2·rama) / 8⌋; plansza nie rośnie powyżej 420 px.
- Pole w trójce = ⌊(szerokość slotu − 16 − 4·2) / 5⌋, żeby slot mieścił klocek 5×5, gdzie szerokość slotu = (szerokość trójki − 2·12) / 3.
- r4: sloty rysowane są w całkowitej szerokości S = ⌊(szerokość trójki − 24) / 3⌋, zmniejszonej o 1, gdy (szerokość trójki − 3·S) jest nieparzyste; dwa odstępy = (szerokość trójki − 3·S) / 2. Wynik: iphone-standard 111 px / odstęp 14, mobile-compact 100 / 14, android-standard i mac-wide 118 / 13, mobile-large, tablet-narrow i phone-landscape 128 / 12. Trzy sloty stoją na całkowitych pozycjach i rysują się identycznie (slot to jeden obraz rozciągnięty na cały slot, bez 9-slice). Pole w trójce i wysokość slotu bez zmian.
- Klocek nad palcem (R-1.8): dolna krawędź rysowanego klocka max(44 px, pole + 8 px) nad punktem dotyku, klocek wyśrodkowany poziomo względem palca. Miejsce wyznacza lewy górny róg rysowanego klocka, zaokrąglony do najbliższego pola.
- Mysz: przeciągany klocek ma rozmiar pól planszy i zachowuje punkt chwytu (proporcjonalnie przeliczony z trójki).
- Przeciągany klocek podąża za wskaźnikiem bez przyciągania; przyciągane jest tylko podświetlenie pól. W stanach `game.dragging-*` klocek stoi 0,3 pola w lewo i w górę od pól docelowych, więc podświetlenie jest widoczne.
- Plakietka „×2” (22×18 px) nie zasłania żadnego pola (Q59). Rząd: od prawej ramki na wysokości rzędu, wystaje do 14 px poza planszę (na telefonach mieści się w marginesie 16 px). Kolumna: nad górną ramką, wystaje do 10 px ponad planszę, w pas serii.
- r7.3 (Q346): plakietka ma tekst „+500” (premia Kolorowej rabaty) zamiast „×2”, moneta 24×18 px (mac-wide 30×18), tekst 9 / 11 px. Rząd: lewa krawędź na krawędzi pól, wystaje do 16 px poza element planszy (telefony: margines boczny ≥ 16,5 px, zmierzone bez wyjścia poza powierzchnię). Kolumna bez zmian. Tekst czytnika: „linia jednego koloru, Kolorowa rabata +500”.

## screen.game — telefony

Kolejność od góry:

1. Nagłówek (min. 48 px), siatka `1fr auto 1fr`: po lewej `component.icon-button` 44 px i obok niego `component.sound-toggle` 44 px (r5, odstęp 4 px, środki na jednej linii), `component.mode-label` w środku tylko w wyzwaniu dnia (zawija się do 2 wierszy; r3, Q107: w grze klasycznej środek pusty), `component.score-display` `record` po prawej (zawsze trzecia kolumna siatki).
   - r7: po lewej wyjście, „Muzyka” (`element.game.music`) i „Efekty” (`element.game.sound`): trzy przyciski 44 px w odstępach 4 px, razem 140 px. Środek nagłówka jest pusty, bo etykieta poziomu i nazwa trybu stoją w wierszu pod nim. Najmniejszy odstęp „Efekty”–tabliczka rekordu (wynik 9 999 999, rekord 9 999 999) wynosi 87,5 px (mobile-compact EN).
   - r7 (Q232): wiersz poziomu 24 px pod nagłówkiem (sekcja „Etykieta poziomu”).
2. Grupa gry wyśrodkowana pionowo w miejscu między nagłówkiem a trójką:
   - `component.score-display` `score` (etykieta 13 px, cyfry 40 px), 8 px pod nagłówkiem;
   - pasek 44 px o szerokości planszy: `component.combo-badge` po lewej, `component.move-points` po prawej; pasek ma stałą wysokość także bez obu elementów, więc plansza nie skacze. r5: zawartość wyśrodkowana w górnych 36 px paska (dolne 8 px zajmuje rama planszy wysunięta w górę), punkty ruchu w jednym wierszu: suma, potem dopiski (wcześniej dopiski pod sumą wychodziły pod ramę i były przycięte, np. „seria +150” w `game.combo`); tabliczka punktów kończy się ≥ 1,9 px nad ramą;
   - `component.board` wyśrodkowana.
   - r7.3: pasek ma 54 px (zawartość w górnych 46 px): po lewej Podlewanie (pigułka 32 px, roślina 56×61 — największa, przy której przy wyniku 9 999 999 zostają ≥ 2 px do tabliczki wyniku; przy treści węższej niż 335 px szerokość rośliny = treść − 279 px, mobile-compact 49×53), prawa część pusta — punkty ruchu są w karcie ruchu. Zmierzony prześwit roślina–tabliczka wyniku przy 9 999 999: iphone-standard 11,3, iphone-se 3,3, android-standard 19,3, mobile-compact 2,3, mobile-large i tablet-narrow 35,3 px; do wiersza poziomu ≥ 46 px. Karta ruchu leży na warstwie nad ekranem (sekcja „Karta ruchu i święto pełnego podlania (r7.3)”).
3. Tylko `game.save-error`: `component.alert` `save-error` na pełną szerokość treści, 12 px pod grupą gry. Grupa gry przesuwa się w górę (38 px), trójka zostaje na miejscu.
4. `component.piece-tray` na pełną szerokość treści, przy dolnym marginesie (zasięg kciuka), co najmniej 16 px pod grupą gry.

Zmierzone położenie (px od góry, mobile-compact / iphone / android / mobile-large):

| Stan | Plansza | Komunikat zapisu | Trójka |
|---|---|---|---|
| `game.classic-start` | 271–598 / 276–635 / 297–672 / 296–703 | — | 665–766 / 707–818 / 765–881 / 796–922 |
| `game.save-error` | 233–560 / 238–597 / 259–634 / 258–665 | 585–649 / 627–691 / 685–749 / 716–780 | jw. |

Nadmiar wysokości dzieli się po równo nad i pod grupą gry.

- r5: wstęga wyzwania dnia na telefonach wystaje w bok 9 px (było 11), żeby nie nachodziła na przełącznik dźwięku; najmniejszy odstęp wstęga–przełącznik 2,9 px (mobile-compact EN), wstęga–tabliczka rekordu 3 px.

## Krok końca gry (r5, Q128–Q131)

- Po ruchu kończącym grę (R-1.7) — po animacji tego ruchu — przez 1,5 s: plansza przygaszona (pola i ziemia, rama bez zmian), klocki trójki w wariancie `no-fit`, komunikat `element.game.no-moves.message` nad trójką; warstwa `element.game.no-moves` pokrywa cały ekran gry (przewija się z nim), bez zasłony. Potem panel końca gry; przygaszenie i oznaczenie zostają pod panelem.
- Komunikat: tabliczka na szerokość trójki, tekst 17 px wyśrodkowany i zawijany w wyrównane wiersze, dolna krawędź tekstu 12 px nad trójką (tabliczka 4 px nad trójką). Telefony: między planszą a trójką; gdzie miejsca brak (mobile-compact: tekst PL w 2 wierszach; phone-landscape: 16 px między planszą a trójką), tabliczka nachodzi na dolną ramę przygaszonej planszy (do 33 px), nigdy na trójkę. mac-wide: w kolumnie trójki, w miejscu paska serii i punktów (w kroku zawartość paska jest ukryta).
- Stuknięcie, klik albo Esc w czasie kroku pokazuje panel od razu; panel przez 300 ms nie przyjmuje kliknięć, a fokus trafia na „Zagraj ponownie” po tym czasie.

`game.crash` (telefony): zasłona na całą powierzchnię, pasek `component.alert` `crash` 16 px od boków, u góry na 59 px (w miejscu nagłówka).

## screen.game — mac-wide

- r5 (Q143): przełącznik dźwięku 56×56 px obok przycisku wyjścia (x 280, odstęp 12 px), środki obu na jednej linii z rekordem (y 60).
- r4 (Q112) — wspólna siatka: nagłówek ma szerokość planszy + odstępu + kolumny trójki (564 + 72 + 380 = 1016 px), wyśrodkowany jak siatka gry. Przycisk wyjścia (56×56 px, Q113) stoi lewą krawędzią na lewej krawędzi planszy (x 212), rekord (etykieta 14 px, cyfry 22 px, tekst wyśrodkowany w tabliczce) prawą krawędzią na prawej krawędzi kolumny trójki (x 1228); środki przycisku i rekordu na jednej linii (y 60). Nazwa trybu w środku tylko w wyzwaniu dnia (Q107). Nagłówek ma 56 px wysokości.
- Pod nim siatka `564px 380px` z odstępem 72 px, wyśrodkowana w poziomie i w pionie:
  - lewa kolumna: plansza 564 px (pole 64 px);
  - prawa kolumna, od góry: wynik (etykieta 13 px, cyfry 60 px), pasek 96 px, trójka 380 px (sloty 118 px, odstęp 13, wysokość 116 px); w `game.save-error` pod trójką komunikat zapisu 380 px.
  - Oś pionowa: wynik (etykieta i cyfry), seria i punkty ruchu są wyśrodkowane na osi środkowego slotu trójki (x 1038 = środek kolumny). Pasek ma układ kolumnowy: seria (32 px), odstęp 6 px, punkty ruchu z dopiskami; stała wysokość 96 px, więc kolumna nie skacze, gdy seria albo punkty znikają.
  - r7.3 (Q345) zastępuje zdanie wyżej: kolumna od góry — wynik (79 px), 24 px, Podlewanie w pasku 76 px (pigułka 38 px przy dolnej krawędzi, roślina 66×72 wystaje 34 px nad pigułkę), 24 px, gniazdo karty ruchu 216 px (karta przy górnej krawędzi, do 380 px), 24 px, trójka (116 px); razem 559 px przy planszy 564 px, kolumna wyśrodkowana w pionie względem planszy. Zmierzone (`game.full-watering`, capture): wynik 198,5–277,5 (tabliczka cyfr do 281,5), pasek 301,5–377,5, pigułka 339,5–377,5, roślina 307,5–379,5, gniazdo 401,5–617,5, trójka 641,5–757,5. Prześwit roślina–tabliczka wyniku 26 px, także przy wyniku 9 999 999 (r7.2: roślina sięgała do wyniku), pigułka–karta 24 px (r7.2: 6 px). Stała wysokość gniazda: kolumna nie skacze, gdy karta znika. Niższe okno szerokie: gniazdo = min(216, wysokość okna − 120 − 343) px, najmniej 150 px (1280×680: 216 px); gdy kolumna z komunikatem zapisu (88 px) się nie mieści (okno niższe niż 767 px), komunikat leży na wierszu wyniku w wariancie jednowierszowym (jak Q201).
  - Tolerancja wspólnych krawędzi i osi: ±1 px (zmierzone 0 px w `game.combo`, `game.color-bonus`, `game.line-clear`, `game.classic-start`, `game.dragging-line-preview`, `game.daily-start`).
- Zmierzone (px od góry, `game.classic-start`): plansza 196–760, wynik 312,5–391,5, trójka 527,5–643,5; `game.save-error`: wynik 270,5, trójka 485,5–601,5, komunikat 621,5–685,5. `game.crash`: pasek 560 px wyśrodkowany, 32 px od góry, na zasłonie.
- Gdzie siatka Q112 obowiązuje: tylko w układzie mac-wide (okno ≥ 1024 px), bo tylko tam kolumna trójki stoi obok planszy. `tablet-narrow` (820 px) i `phone-landscape` (852 px) mają układ telefonu (kolumna do 440 px; trójka pod planszą), więc Q112 ich nie zmienia; na telefonach przycisk wyjścia i rekord zostają przy krawędziach treści (rekord prawą krawędzią przy prawej krawędzi trójki, 0 px).
- Uzasadnienie: przy 900 px wysokości układ kolumnowy wymusiłby pole ~48 px. Układ obok siebie daje pole 64 px, a droga myszy z trójki na planszę to ~300 px.
- Hover na klocku (tylko urządzenia z kursorem): rozjaśnienie i cień, kursor `grab`; podczas przeciągania `grabbing`.

## Nakładki: dialog i panel końca gry

- Zasłona na całą powierzchnię (`rgba(28,22,14,.46)`), karta do 380 px (`mac-wide` do 460 px) wyśrodkowana, margines 16 px. Etykiety przycisków nie łamią się.
- Telefony: przyciski jeden pod drugim, na pełną szerokość karty. `mac-wide`: przyciski obok siebie, równa szerokość.
- Panel końca gry nie zasłania nagłówka logicznie (zasłona go przyciemnia), końcowa plansza pozostaje widoczna pod zasłoną.

## screen.home

- r7: w prawym górnym rogu zamiast jednego przełącznika stoi para „Muzyka” (`element.home.music`) i „Efekty” (`element.home.sound`), odstęp 4 px (mac-wide 12 px). Prawa krawędź „Efektów” leży w miejscu dawnego przełącznika (prawa krawędź treści, mac-wide x 1228). Na telefonach w pionie znak z hasłem stoi 56 px niżej niż w r6, pod parą, więc przy żadnej szerokości nie sięga pod przełączniki. Przy 375×548 najmniejszy odstęp w pionie przełączniki–tabliczka znaku wynosi 2 px. Telefon w poziomie i mac-wide bez zmian położenia znaku.
- r5 (Q143): `component.sound-toggle` w prawym górnym rogu ekranu: telefony 44 px, 59 px od góry, prawa krawędź na prawej krawędzi treści — tej samej, co prawa krawędź przycisków menu (16 px od krawędzi kolumny; zmierzone 0 px różnicy na 6 targetach telefonu); mac-wide 56 px, 32 px od góry, prawa krawędź na prawej krawędzi rekordu i kolumny trójki ekranu gry (x 1228, różnica 0 px, Q112). Na telefonach znak z hasłem ma szerokość do (szerokość treści − 106 px) i tabliczkę wystającą 6 px w bok, więc nie sięga pod przełącznik (odstęp ≥ 3 px, mobile-compact EN); dłuższe hasło (EN na mobile-compact) zawija się w 2 wiersze.
- r5 (Q162): `component.alert` `read-error` — tekst wyśrodkowany w całym komunikacie, ikona przy lewej krawędzi.

- r4 (Q111, Q115): w przycisku menu ikona przy lewej krawędzi, blok tekstu wyśrodkowany w całym przycisku (prawy margines bloku 46 px = ikona 36 + odstęp 10). Wiersz informacji 15 px; „Wyzwanie dnia” pokazuje tylko „Rekord dnia N” (bez daty). Wszystkie wiersze informacji mieszczą się w jednym wierszu na każdym targecie (także mobile-compact i EN); przycisk ma 70,6 px wysokości (r3: 69,3), kolumna menu przy dolnym marginesie rośnie w górę o ok. 1,3 px na przycisk. Dłuższy tekst zawinąłby się w wyrównane wiersze bez nachodzenia na ikonę.

- Telefony, od góry: `component.wordmark` (nazwa 34 px, znak 44 px) 24 px pod marginesem, pod nim ilustracja skrzyni z kwiatami `assets/img/home-hero.webp` (320×160, obraz 640×320, dekoracja). Kolumna menu przy dolnym marginesie (zasięg kciuka), odstęp 12 px: [`component.alert` `read-error` — tylko `home.read-error`], [„Kontynuuj” primary — tylko przy zapisie], „Nowa gra” (primary bez zapisu, secondary z zapisem), „Wyzwanie dnia” secondary. `component.menu-button` min. 68 px, pełna szerokość treści.
- Zmierzone (iphone-standard, `home.resume-available`): nazwa i ilustracja 83–329 px, kolumna menu 586–818 px. Na mobile-compact menu 534–766 px; wolne miejsce zostaje między ilustracją a menu.
- `mac-wide`: nazwa 48 px, znak 60 px, ilustracja 380 px, wyśrodkowane u góry (72–370 px). Kolumna menu 400 px wyśrodkowana w poziomie i w pionie w pozostałym miejscu (503–735 px przy 3 przyciskach).

## Tło i grafiki

- Tło sceny (Q98, Q104): jedna z trzech ilustracji `blossom-wall`, `garden-dusk`, `hedge`, każda w dwóch kadrach: pionowym 9:16 (`assets/img/bg-<tło>-phone.webp`, 768×1376) i poziomym 16:9 (`bg-<tło>-desktop.webp`, 1376×768). Ekran startowy ma zawsze `blossom-wall`; gra klasyczna — tło losowane przy nowej grze; wyzwanie dnia — tło z daty ciągu (numer dnia od 1970-01-01 modulo 3). Tło jest dekoracją, nie zawiera informacji, nie przewija się z ekranem.
- r6 (Q147, Q148): krąg sześciu motywów gry klasycznej w kolejności `blossom-wall`, `lily-pond`, `garden-dusk`, `dawn-meadow`, `hedge`, `firefly-night` (dzienne i wieczorne na przemian). Nowe tła mają te same kadry 9:16 i 16:9 i te same zasady (cover, u dołu), z wyjątkiem `bg-lily-pond-desktop.webp` 1202×676 (wycinek bez brzegu papieru, ta sama proporcja 16:9; na mac-wide skala 1,331 zamiast 1,172). Ekran startowy i wyzwanie dnia bez zmian (trzy pierwotne tła).
- Kafle kolorów (R-1.9, Q103): `assets/img/tile-<color>.webp` (128×128) wypełniają pole planszy i przeciągany klocek (pole 36–64 px); klocki w trójce (pole 15–20 px) mają uproszczony kafel `tile-<color>-s.webp` (64×64): jeden duży kwiat z grubym konturem, czytelny przy 15 px.
- Rama planszy: `assets/img/board-frame.webp` jako border-image o szerokości rama + wysunięcie: telefony 6 + 8 px, mac-wide 8 + 10 px. Wysunięcie (border-image-outset) nie zmienia układu; na telefonach mieści się w bocznym marginesie 16 px.
- Wyzwanie dnia (Q108): nazwa trybu na śliwkowej wstędze (`assets/img/daily-ribbon.webp`, pseudo-element wystający 5 px w górę, 16 px w dół i w bok 22 px na mac-wide, 11 px na telefonach); na ramie planszy złota listwa 2 px (−3…−1 px od krawędzi planszy) i złote słońca w narożnikach (22 px telefony, 30 px mac-wide, środek w narożniku ramy); dialog i panel końca na karcie `daily-card.webp`. Układ bez zmian.
- r4: rama planszy, ramy kart, pigułki przycisków i plakietka serii są rozciągane (`border-image-repeat: stretch`). W r3 `round` na ramach z fakturą zostawiał widoczne złącza powtórzeń na środku boków. Slot trójki, przycisk wyjścia, moneta „×2” i wstęga wyzwania to pojedyncze obrazy rozciągnięte na cały element (bez 9-slice).
- Tekst na tle sceny (rekord, wynik, punkty ruchu, znak z hasłem) leży na kremowej tabliczce rysowanej pseudo-elementem wystającym 4 px w pionie i 12 px w poziomie (znak: 10 / 14 px); nie zmienia rozmiaru elementów. Na mac-wide wynik zajmuje kolumnę 380 px, więc tabliczka leży tylko pod cyframi i etykietą.

## Tła na targetach

Kadr wybiera proporcja powierzchni, nie układ: powierzchnia wyższa niż szeroka → kadr 9:16, pozostałe → 16:9. Obraz pokrywa całą powierzchnię (cover), zakotwiczony u dołu i wyśrodkowany w poziomie.

| Target | Powierzchnia | Kadr | Skala | Przycięcie |
|---|---|---|---|---|
| mac-wide | 1440×900 | 16:9 | 1,172 (1612×900) | po 86 px z boków |
| iphone-standard | 393×852 | 9:16 | 0,619 (476×852) | po 41 px z boków |
| android-standard | 412×915 | 9:16 | 0,665 (511×915) | po 49 px z boków |
| mobile-compact | 360×800 | 9:16 | 0,581 (447×800) | po 43 px z boków |
| mobile-large | 440×956 | 9:16 | 0,695 (534×956) | po 47 px z boków |
| tablet-narrow | 820×1180 | 9:16 | 1,068 (820×1469) | 289 px od góry (gałęzie, niebo) |
| phone-landscape | 852×393 | 16:9 | 0,619 (852×475) | 82 px od góry |

- `tablet-narrow`: układ telefonu (kolumna 440 px), ale tło na całą szerokość okna z kadru pionowego; obraz powiększony o 7%, przycięta górna część nieba.
- `phone-landscape`: r6 — układ obok siebie bez przewijania (Q180), tło z kadru poziomego.
- `iphone-se` 375×667 (r6): kadr 9:16, cover jak pozostałe telefony.

## Pasek narzędzi podglądu (tylko user_preview i katalog)

Pasek jest przyklejony do dołu okna przeglądarki, poza powierzchnią. Powierzchnia skaluje się do miejsca nad paskiem (maks. 100%). Na wąskim oknie rzędy się zawijają, a pole uwag zajmuje cały wiersz. W `mode=capture` paska nie ma.

## Teksty EN

Fixture `english` zmienia wszystkie etykiety. Kontenery tekstu nie mają stałej szerokości ani `nowrap`, z wyjątkiem plakietek (seria, „×2”, nowy rekord) i dopisków punktów ruchu, które zawijają się między dopiskami. Najdłuższe teksty EN („Your score won't count toward your best”, „A new daily challenge is available.”) zawijają się w karcie 328 px. Grupowanie cyfr według `Intl.NumberFormat` (R-2.5): pl od 10 000 („2340”, „18 420”), en od 1 000 („6,842”). r5: komunikat końca „No room for any piece” mieści się w jednym wierszu na każdym targecie (tekst PL na mobile-compact w 2 wyśrodkowanych wierszach); różnica do rekordu „11,578 short of your best”.

## Poziomy (r6)

### Etykieta poziomu (Q147, Q151)

r7 (Q232) na układach `phone`, `phone-merged` i `landscape`:
- Etykieta poziomu (gra klasyczna) i nazwa trybu z datą (wyzwanie dnia, na wstędze) nie stoją w środku nagłówka, tylko w wierszu 24 px tuż pod nim. Wiersz jest wyśrodkowany w kolumnie treści.
- Treść to jedna linia „Poziom n · <ogród>” (numer 14 px, nazwa 13 px). Kropka środkowa jest widoczna tylko w wierszu, czytnik jej nie czyta.
- Tabliczka (i wstęga wyzwania) ma 20 px wysokości, 2 px od góry i dołu wiersza. Od tabliczki wyniku dzieli ją co najmniej 2 px, zmierzone na każdym targecie telefonu, przy 375×548, 390×660 i 852×340.
- Wiersz się nie zawija (`nowrap`). Gdy treść się nie mieści, skraca się tylko nazwa, wielokropkiem; numer poziomu i odstępy zostają.
- Zmierzone przy poziomie 2504, z najdłuższą nazwą w każdym języku i na każdym targecie oraz przy 375×548, 390×660 i 852×340: jedna linia, bez wielokropka i bez przycięcia. PL „Ogród o zmroku” zajmuje 208,8 px, EN „Dawn meadow” 184,1 px, wstęga z datą 195,6 px.
- Na mac-wide (`wide`) etykieta zostaje w środku nagłówka, w dwóch wierszach jak w r6.

Opis r6 (dla `wide`):

- Tylko gra klasyczna, środek nagłówka — to samo miejsce co nazwa trybu w wyzwaniu dnia (oś treści między lewą grupą wyjście + dźwięk a rekordem; wyśrodkowanie zmierzone 0 px na każdym targecie). Nagłówek bez zmiany wysokości: 48 px telefony, 56 px mac-wide.
- Dwa wiersze na kremowej tabliczce (jak wynik i rekord): „Poziom n” 16 px / 800, nazwa motywu 12,5 px / 700 w jednym wierszu; mac-wide 18 / 14 px. Etykieta 32,8 px wysokości na telefonach, 36,8 px na mac-wide.
- Nazwy motywów mają najwyżej 14 znaków, żeby na mobile-compact tabliczka nie sięgała pod przełącznik dźwięku: najmniejszy odstęp tabliczki od przełącznika 10 px („Ogród o zmroku”), od tabliczki rekordu 31 px (mobile-compact). EN krótsze.
- Poziom z wyniku (Q197, Q153): progi 300, 800, 2000, 3500, 6000, 9000, dalej co 4000; poziom = 1 + liczba osiągniętych progów. Motyw poziomu n: `CIRCLE[(start + n − 1) mod 6]`, `start` losowany przy nowej grze (Q148). W prototypie `start` wynika z tła stanu.
- r7.1 (Q219, Q237) zastępuje zdanie wyżej i kolejność z r6: motyw wynika wyłącznie z poziomu. Poziom n ma motyw numer (n − 1) mod 6 z kręgu `dawn-meadow` (Łąka o świcie), `blossom-wall` (Kwietna ściana), `lily-pond` (Staw z liliami), `hedge` (Żywopłot), `garden-dusk` (Ogród o zmroku), `firefly-night` (Noc świetlików). Ekran startowy i wyzwanie dnia bez zmian.

### Plakietka awansu i przenikanie tła (Q150, Q188)

r7.3 (Q342): plakietka awansu na wyniku jest usunięta (`component.level-up-badge`); awans jest wpisem „Nowy poziom n · ogród” w karcie ruchu, a wynik nie jest zasłaniany przez awans. Przenikanie tła bez zmian. Dwa punkty niżej opisują r6–r7.2.

- Plakietka na wyniku: środek plakietki = środek elementu wyniku (0 px, zmierzone), w opakowaniu `.bg-score-wrap`. Telefony: 24 / 15 px, wysokość 57,6 px (wynik 58 px), szerokość wg treści (mobile-compact „Poziom 4! · Żywopłot” 160 px); mac-wide: 32 / 17 px, 215×75 px na wyniku 380×79 w kolumnie trójki. Nie nachodzi na planszę (z ramą 8 / 10 px) ani trójkę na żadnym targecie; na telefonach od ramy planszy dzieli ją pasek serii i punktów (mobile-compact 38 px).
- Pochwała z tego samego ruchu stoi nad środkiem planszy (jak w r5) — plakietka awansu i pochwała są widoczne naraz, w różnych miejscach, bez nakładania (`game.level-up-praise`).
- Przenikanie: nowe tło od razu na powierzchni, stare na warstwie `.bg-bgfade` (pierwsze dziecko powierzchni, pod ekranem) gaśnie liniowo 800 ms; reduced-motion 150 ms.

### Pusta grządka (Q189, Q203)

- Pochwała „Pusta grządka! +300” (`component.praise`, `data-variant="empty-garden"`) nad środkiem pustej planszy: tekst 26 px (mac-wide 40 px), wyśrodkowany, zawija się w planszy (szerokość do planszy − 24 px; telefony 2 wiersze). Ma pierwszeństwo przed „Świetnie!” i „Wspaniale!” — jedna pochwała na ruch.
- Rozkwit: płatki 0,6 pola na 24 z 64 pól w stałym wzorze (co trzecie pole), na warstwie efektów planszy; stała klatka w capture.
- Punkty ruchu: suma ruchu (z premią), bez dopisku „pusta grządka”.

r7: premia za pustą planszę w grze klasycznej wynosi max(1000, 500 × poziom), w wyzwaniu dnia 2000. Napis „Pusta grządka! +N” ma 32 px, na mac-wide 48 px. W prototypie premia liczy się z poziomu, na którym zagrano ruch (przed ewentualnym awansem). `game.empty-garden` jest na poziomie 7 (+3500, bez awansu), a `game.empty-garden-level-up` awansuje z poziomu 4 na 5 (+2000). Przebieg święta opisuje wiersz 12 w „Ruch”.

r7.3: święto bez zmian. Punkty ruchu pokazuje karta ruchu 1500 ms po ruchu (razem z przenikaniem tła awansu), z częścią „Pusta grządka +N” w rozbiciu i ewentualnym wpisem poziomu; karta nie ma pochwały (pochwałą jest napis święta). Napis święta zachowuje `element.game.praise` (`data-variant="empty-garden"`).

## Pochwały i Podlewanie (r7, Q233, Q234)

r7.3: pochwała nie stoi już nad środkiem planszy, tylko jako największy element karty ruchu (sekcja niżej), w rozmiarach 24 / 27 / 30 / 33 px (mac-wide 30 / 34 / 37 / 40 px); pierwszeństwo i drabina bez zmian. Dopiski punktów zastąpiło rozbicie w karcie. Roślina Podlewania: 56×61 na telefonach, 66×72 na mac-wide, pigułka 32 / 38 px; wariant zwarty na pasku telefonu (`is-tight`) usunięty, w `phone-merged` zostaje (38×42). Poniżej opis r7.

- Jedna pochwała na ruch, w kolejności pierwszeństwa: Pusta grządka, potem „Kolorowa rabata!” (ruch czyści linię jednego koloru), potem drabina. Pochwała stoi nad środkiem planszy, nigdy na trójce.
- Drabina liczy S = L + max(0, c − 1), gdzie L to liczba linii ruchu, a c to Podlewanie po ruchu:

  | S | Pochwała | Tekst (telefony / mac-wide) |
  |---|---|---|
  | 0–1 | brak | — |
  | 2–3 | „Świetnie!” / „Great!” | 26 / 34 px |
  | 4–5 | „Wspaniale!” / „Wonderful!” | 30 / 38 px, złoty blask |
  | 6 | „Cudownie!” / „Amazing!” | 34 / 42 px, jaśniejszy gradient i mocniejszy blask |
  | ≥ 7 | „Rajski ogród!” / „Paradise!” | 38 / 48 px, złoto-różowy gradient i rozbłysk 16 płatków |

  „Kolorowa rabata!” / „Flower bed!” ma 30 / 38 px, różową tabliczkę i złoty błysk na linii (wiersz 3 w „Ruch”).
- Szerokość pochwały: najwyżej szerokość planszy − 24 px. Dłuższy tekst zawija się w wyrównane, wyśrodkowane wiersze, więc pochwała nie wychodzi poza planszę ani na trójkę.
- Dopiski punktów ruchu: „kolorowa rabata +500” za każdą linię jednego koloru i „podlewanie +N”. Reguła Q203 (gdy brak miejsca, zostaje dopisek o większej wartości) obowiązuje dalej.
- `component.combo-badge` „Podlewanie” zastępuje plakietkę „Seria ×c”. To kremowa pigułka 30 px (mac-wide 34 px) z rośliną w doniczce po lewej, „×c” i trzema kroplami. Roślina 44×48 px (mac-wide 50×56) wystaje nad pigułkę, ale nie sięga nad planszę ani na wynik. W kontroli par nie nakłada się na żaden element na żadnym targecie.
  - Stopnie rośliny: ×2 kiełek, ×3 listki, ×4 pąk, ×5 kwiat, ×6 i więcej złoty kwiat z promieniami. Obrazy z generatora (`assets/img/plant-<stopień>.webp`, 88×96 = 2×) mają stałą ramkę 44×48 px i doniczkę tej samej szerokości. Roślina rośnie w obrazie, a ramka się nie zmienia. Przy złotym kwiecie pigułka ma złotą obwódkę i poświatę.
  - Krople to zapas wody (3 − ruchy bez linii). Przy ostatniej kropli pąk i kwiat (×4, ×5) zmieniają się w obraz zwiędłej rośliny (`plant-wilt.webp`). Kiełek, listki i złoty kwiat zostają swoim obrazem, przygaszonym (CSS `saturate(.5) brightness(.9) sepia(.2)`), żeby stopień był dalej czytelny.
  - Bez koloru stopień czyta się z kształtu rośliny i z „×c”, a zapas z liczby pełnych kropli. Czytnik dostaje pełny tekst: „Podlewanie ×c, zapas wody: d z 3”.
  - Wariant zwarty: krople stoją w kolumnie (7×9 px), roślina ma ramkę 38×42 px, pigułka zaczyna się 38 px od lewej. Pigułka ma wtedy ok. 78 px zamiast ok. 113 px.
    - W `phone-merged` wariant zwarty obowiązuje zawsze (r6: skrócona plakietka). Pigułka stoi w wierszu wyniku po lewej, dolną krawędzią 4 px nad dołem wyniku, więc roślina nie sięga do wiersza poziomu.
    - Na pasku telefonu wariant zwarty włącza się (klasa `is-tight` na pasku), gdy suma i oba dopiski nie mieszczą się obok pełnej pigułki. Dopiero gdy i to nie wystarcza, zostaje jeden dopisek o większej wartości (Q203).
    - Zmierzone: mobile-compact i `iphone-se` w `game.combo-color` mają wariant zwarty i jeden dopisek „kolorowa rabata +500” w jednym wierszu. Między tabliczką punktów a pigułką zostaje co najmniej 2 px.
  - `phone-merged`, r7: wiersz wyniku jest 12 px szerszy z każdej strony niż plansza, ale nie szerszy niż treść. Seria i punkty sięgają w boczny margines planszy. Dopisek w tym wierszu ma 11,5 px, nie ma ikony i zajmuje najwyżej 2 wiersze, np. „kolorowa rabata” / „+500”.

## Karta ruchu i święto pełnego podlania (r7.3, Q339–Q368)

### Osiem kart (korekta Q366, zaakceptowana przez Tomasza) — zastępuje opisy niżej tam, gdzie się różnią

- Wspólne dla wszystkich kart: jedno miejsce (telefony: warstwa nad ekranem, dolna krawędź 6 px nad paskiem Podlewania; mac-wide: gniazdo w kolumnie trójki), jedna karta naraz w kolejce, kremowa karta z obrysem 2 px i cieniem, zaokrąglenie 20 px (mac-wide 24 px), po lewej ilustracja w kwadracie 76 px (mac-wide 100 px, zaokrąglenie 16 px), po prawej tekst do lewej: nagłówek 22 px / 900 (mac-wide 26 px), liczba 32 px / 900 `var(--green-d)` (mac-wide 42 px), podpis 13 px / 700 `#5A4630` (mac-wide 15 px). Padding 10 / 16 px (mac-wide 12 / 20 px), odstęp ilustracja–tekst 12 px (mac-wide 16 px). Szerokość: telefony szerokość treści do 361 px, mac-wide do 380 px. Wysokość: telefony 104–117 px, mac-wide 128–171 px (nagłówek „Kolorowa rabata!” i „Pusta grządka!” może zawinąć się w dwa wiersze; gniazdo mac-wide ma 150–216 px).
- Własne dla każdej karty (`data-art`), dźwięk z R-6.1 (`data-sound`, nazwy z `sound-output.ts`):

  | nr | treść | ilustracja · kolor | wejście i efekt | dźwięk |
  |---|---|---|---|---|
  | 1 | punkty | pięć kafli kwiatów na pasie ziemi · zieleń | kafle podskakują po kolei (70 ms odstępu, 500 ms), błysk wzdłuż pasa (800 ms od 300 ms) | `line`; ruch bez czyszczenia `place` |
  | 2 | pochwała | złota rozeta ze wstążkami na promieniach, 1–3 gwiazdki według szczebla, „Rajski ogród!” także płatki · złoto, obwódka rośnie ze szczeblem | rozeta wskakuje z obrotem (550 ms), promienie obracają się o 60° (2,5 s), gwiazdki po kolei | `praise-great` / `-wonderful` / `-amazing` / `-paradise` |
  | 3 | Kolorowa rabata | łuk pięciu kwiatów wiśni w różowej poświacie · malina | kwiaty wyrastają po kolei (80 ms odstępu), złota smuga, iskry | `flower-bed` |
  | 4 | Pusta grządka | mini-plansza w drewnianej ramie z płatkami, girlanda płatków na ramce karty, płatki opadają przez kartę · złoto, mocna poświata | płatki rozkwitają falą od środka (140 ms na pierścień), opadają (1,6 s), girlanda rozkwita od 600 ms | `empty-garden` |
  | 5 | kropelki | konewka nad pąkiem w doniczce, licznik kropelek po ruchu (z 3) · błękit | konewka się przechyla, dwie krople lecą (400 / 600 ms), nowa kropla w liczniku wskakuje (900 ms) | `watering-drop` |
  | 6 | Pełne podlanie | złoty kwiat na złotych promieniach, rozbłysk płatków, girlanda na ramce · złoto | pąk → kwiat → złoty kwiat (1,6 s), rozbłysk 8 płatków (od 500 ms), girlanda od 1,1 s | `watering-grow` |
  | 7 | nowy rekord | złoty puchar z gwiazdą w wieńcu laurowym, konfetti z płatków · złoto i brąz | puchar wskakuje, błysk przez puchar, konfetti opada | `new-record` |
  | 8 | nowy poziom | okno w łuku z miniaturą tła nowego poziomu · zieleń | ogród poprzedniego poziomu przechodzi w nowy (odsłanianie od dołu, 900 ms od 300 ms), iskry | `level-up` |

  Ilustracje są dekoracją (`aria-hidden`) z własnych SVG i istniejących obrazów (kafle, płatki, rośliny, tła), bez nowych obrazów z generatora. Stała klatka stanu (capture) i każda klatka po efekcie to klatka szczytowa ilustracji.
- Karty 1–4 to warianty karty punktów ruchu: ruch pokazuje dokładnie jedną z nich, z pierwszeństwem R-2.9 — Pusta grządka, Kolorowa rabata, pochwała z liczby linii, zwykłe punkty. Kolejka jednego ruchu ma najwyżej 4 karty: punkty → kropelki (5) albo Pełne podlanie (6) → rekord (7) → poziom (8).
- Czas karty: tyle, ile trzeba na przeczytanie — max(2000, 1200 + 40 ms × liczba znaków treści), zaokrąglony do 100 ms; karty 4, 6 i 8 co najmniej 3000 ms (`data-duration-ms`; w przykładach z katalogu 2,0 / 2,4 / 3,3 / 3,4 / 2,8 / 3,0 / 2,0 / 3,0 s, w stanach gry 2,0–3,4 s). Wejście 250 ms (10 px w górę, skala 0,94 → 1, nagłówek 350 ms od 100 ms), efekt ilustracji do ok. 1,6 s, postój, zanik w ostatnich 300 ms; następna karta zaczyna się, gdy poprzednia znika.
- Pusta grządka: nowa trójka pojawia się po 1900 ms (Q241, wyjątek od Q136; także przy reduced-motion, Q254). Do tej chwili miejsca trójki są puste (klocki ukryte, układ bez zmian) — tak pokazuje to stała klatka `game.empty-garden`. Stuknięcie albo klik w dowolnym miejscu ekranu gry po 600 ms (`interaction.game.empty-garden-skip`, atrybuty na ekranie gry na czas pauzy) kończy pauzę: karta 4 znika, trójka wjeżdża od razu, rusza następna karta kolejki. Stuknięcie przed 600 ms nic nie robi.
- Poza kartą nie ma efektów komunikatów: bez osobnego napisu „Pełne podlanie!” przy pigułce, bez warstw święta (promienie, poświata, płatki, girlanda na ramie), bez napisu „Pusta grządka! +N” na planszy, bez płatków na polach planszy i przez cały ekran. Zostaje rozkwit kwiatka wskaźnika (`element.game.combo`) w czasie karty 6 — trwa tyle co karta (3000 ms: wzrost 0–30%, pąk → kwiat → złoty kwiat 0 / 300 / 600 ms, dwa pulsy poświaty, powrót od 80%; telefony 2×, mac-wide 1,35×; zachodzi na kartę i nagłówek). Na planszy zostają zwykłe efekty czyszczenia (rozkwit linii, przy linii jednego koloru złoty błysk; wiersze 2 i 3 (korekta Q366) w „Ruch”); plakietki „+500” po ruchu nie ma (premię pokazuje karta 3), zostaje tylko w podglądzie przeciągania (R-1.4).
- Telefony (poprawka po zrzutach r7.3): karta jest w pełni nieprzezroczysta nad nagłówkiem, wierszem poziomu i wynikiem. Tabliczka wyniku (`element.game.score`), na którą karta zachodzi, na czas karty znika (visibility: hidden) i wraca, gdy kolejka się kończy — nic nie prześwituje ani nie wystaje spod karty. Półprzezroczystość z Q348 (tło 82%) ma tylko część karty nad planszą (z ramą wysuniętą 8 px); przygaszenie nad niesionym klockiem (18%) bez zmian. mac-wide bez zmian (gniazdo w kolumnie nie zachodzi na wynik).
- reduced-motion: bez wejścia i efektu ilustracji (od razu klatka szczytowa), karta pojawia się i znika przezroczystością po 150 ms, ten sam czas; kwiatek wskaźnika bez wzrostu, ze stałą poświatą.

### Jedna karta, osiem treści (Q366–Q368) — wcześniejsza wersja; wygląd i czas zastępuje sekcja wyżej

- Wszystkie komunikaty chwilowe pokazuje `component.move-card` (`element.game.move-card`) w jednym miejscu (telefony: nad paskiem Podlewania; mac-wide: gniazdo w kolumnie trójki), z jednym wyglądem i trzema wierszami: nagłówek (24 px / 900 `#3A2405`, mac-wide 30 px), duża liczba (36 px / 900 `var(--green-d)`, mac-wide 46 px), podpis (13 px / 700 `#5A4630`, mac-wide 15 px). Pusty wiersz się nie pokazuje. Karta: kremowa `rgba(255,246,226,.97)`, obrys `#8A5A1E` 2 px, cień, padding 8 / 14 px (mac-wide 12 / 18 px), szerokość od 180 px (mac-wide 220 px) do szerokości treści (380 px). Jedyny akcent: obwódka mocniejsza przy pochwale szczebla 2–4.
- Osiem treści (nagłówek / liczba / podpis):
  1. punkty: — / „+243” / „1 linia”;
  2. punkty z pochwałą: „Świetnie!” | „Wspaniale!” | „Cudownie!” | „Rajski ogród!” / „+723” / „3 linie naraz” (2 linie: „2 linie naraz”; 5+: „5 linii naraz”);
  3. Kolorowa rabata: „Kolorowa rabata!” / „+743” / „1 linia · Kolorowa rabata +500”;
  4. Pusta grządka: „Pusta grządka!” / „+1243” / „2 linie naraz · Pusta grządka +1000”;
  5. kropelki: „+1 kropelka” | „+2 kropelki” / — / „3 kropelki = Pełne podlanie”;
  6. Pełne podlanie: „Pełne podlanie!” / „+500” / „kwiatek zaczyna od nowa”;
  7. nowy rekord: „Nowy rekord!” / „18 421” (wynik) / —;
  8. nowy poziom: „Nowy poziom!” / „4” / „Żywopłot”.
  Ruch bez linii (z rekordem albo poziomem, Q347): — / „+4” / „położony klocek”. Liczba karty punktów to przyrost wyniku bez premii „Pełne podlanie” (ma kartę 6 „+500”), więc suma kart = przyrost wyniku. Podpis bez rachunku pól (Q368).
- Publiczne ID wierszy: nagłówek pochwały, Kolorowej rabaty i Pustej grządki — `element.game.praise` (`component.praise`, `data-variant`); kropelek — `element.game.drops-gain`; Pełnego podlania — `element.game.full-watering`; rekordu — `element.game.new-record`; poziomu — `element.game.level-up`; liczba punktów — `element.game.move-points` (`component.move-points`).
- Kolejka bez zmian (punkty → kropelki albo Pełne podlanie → rekord → poziom), każda karta 2000 ms, także 4 i 6 (było: święto pełnego podlania 3000 ms, kolejka Pustej grządki od 1500 ms). Ta sama animacja wejścia i zaniku dla każdej treści (bez rozbłysku płatków przy „Rajski ogród!”).
- Usunięte (Q367): osobny napis „Pełne podlanie!” przy pigułce, złote promienie, poświata, płatki w tle i girlanda na ramie (`component.full-watering` jako warstwy, `interaction.game.full-watering-skip` — nie ma czego pomijać); przy Pustej grządce napis „Pusta grządka! +N” na planszy i płatki przez cały ekran. Zostaje: rozkwit kwiatka wskaźnika (`element.game.combo`) w czasie karty 6 (2000 ms: wzrost 0–600 ms, pąk → kwiat → złoty kwiat 0 / 300 / 600 ms, dwa pulsy poświaty, powrót od 1600 ms; telefony 2×, mac-wide 1,35×; zachodzi na kartę i nagłówek) oraz przy Pustej grządce rozkwit pól planszy, doliczanie wyniku i pauza trójki (R-2.10).
- Katalog: sekcja „Komunikaty chwilowe” (`data-element-id="specimen.move-cards"`, karty `specimen.move-card.<nr>-phone` i `specimen.move-card.<nr>-mac-wide`).

### Podlewanie — kropelki (Q355, Q357–Q359, Q362)

- Ruch, który czyści L linii naraz, daje L − 1 kropelek (1 linia: 0, 2: 1, 3: 2, 4: 3…). Kropelki zbierają się między ruchami i nie znikają; puste ruchy nic nie zabierają; kwiatek nie więdnie. Każde 3 kropelki = „Pełne podlanie” (święto i +500), potem od nowa; nadmiar przechodzi dalej (2 + 3 → nagroda, zostają 2). Ruch, który daje więcej niż jedną nagrodę (np. 2 + 5 → 7 kropelek), pokazuje jedno święto, a premia w rozbiciu jest wielokrotnością 500.
- Między grami (Q364, Q365): w grze klasycznej kropelki (0–2) zostają po końcu gry i są widoczne od pierwszego ruchu następnej; nowa gra nie zeruje kwiatka (stan `game.classic-start-drops`). Panel końca gry klasycznej przy kropelkach &gt; 0 ma wiersz `element.game.over.drops`: trzy krople (13×17 px, pełne = zebrane) i „2 z 3 kropelek — dokończ w następnej grze” (14 px / 700 `#145C9E`, wyśrodkowany, zawija się w wyrównane wiersze), pod wierszem poziomu; panel bez innych zmian. Wyzwanie dnia: własny kwiatek, w każdym podejściu od zera; kropelki z wyzwania nie przechodzą do gry klasycznej; bez wiersza na panelu.
- Wskaźnik `element.game.combo` (`component.combo-badge`): zawsze w grze (także 0 kropelek) — kwiatek i trzy krople (pełne = zebrane). Stopień kwiatka: 0 kiełek, 1 pąk, 2 kwiat; przy 3 (tylko w święcie) kwiat rozkwita w złoty. Bez „×c”.
- Usunięte (Q362): licznik ×2…×6, kropelki jako zapas („życia”), więdnięcie po 3 pustych ruchach, premia serii 50·c i część „Podlewanie +N” w rozbiciu, obraz i stan zwiędłej rośliny.
- Wymiary pigułki i rośliny bez zmian (r7.3, Q345); kropelki 13×17 px (mac-wide 15×19).

### Kolejka komunikatów ruchu (Q356, Q360, Q361)

- Komunikaty jednego ruchu idą po kolei, każdy osobno, nigdy kilka naraz, w kolejności: (1) punkty — pochwała, jeśli jest, „+N” i rozbicie; (2) kwiatek — „+1 kropelka” / „+2 kropelki” (z podpowiedzią „3 kropelki = Pełne podlanie”) albo święto nagrody; (3) „Nowy rekord!”; (4) nowy poziom — zawsze na końcu. Kroków, których ruch nie ma, nie ma. Karta kroku trwa 2000 ms, święto 3000 ms.
- Gra się nie zatrzymuje; kroki następnego ruchu dołączają na koniec kolejki. Stuknięcie pomija tylko święto (wtedy od razu następny krok).
- Kropelki w pigułce zmieniają się z początkiem kroku 2; tło i etykieta poziomu — z początkiem kroku 4. Ruch z Pustą grządką: kolejka tego ruchu startuje 1500 ms po ruchu (po napisie święta).
- Pochwała tylko z liczby linii naraz (Q361; szczegóły Q363 czekają): L = 1 bez pochwały, 2 „Świetnie!”, 3 „Wspaniale!”, 4 „Cudownie!”, ≥ 5 „Rajski ogród!”; „Kolorowa rabata!” i Pusta grządka mają pierwszeństwo jak dotąd.

### Karta ruchu (`component.move-card`, `element.game.move-card`)

- Krok `points`: pochwała (`element.game.praise`, największa), suma „+N” (`element.game.move-points`, 24 / mac-wide 30 px) i pod nią rozbicie „pola +4 · 3 linie +720 · Kolorowa rabata +500 · Pełne podlanie +500 · Pusta grządka +N” (13 / 15 px; tylko niezerowe części; suma = przyrost wyniku). Krok `drops`: krople i „+2 kropelki” (26 / 32 px, `element.game.drops-gain`) oraz „3 kropelki = Pełne podlanie” (13 / 15 px). Krok `record`: „Nowy rekord!” na złotej pigułce (24 / 28 px, `element.game.new-record`). Krok `level`: „Nowy poziom n · ogród” na zielonej pigułce (`element.game.level-up`).
- Kiedy: krok punktów przy ruchu z czyszczeniem, a bez czyszczenia tylko, gdy ruch ma rekord albo poziom (suma i „pola +N”, Q347). „Nowy rekord!” raz na grę, w ruchu przekroczenia rekordu trybu sprzed gry; przy rekordzie 0 sprzed gry bez (Q352); w wyzwaniu dnia tylko, gdy podejście liczy się do rekordu dnia (R-3.6). Poziom tylko w grze klasycznej.
- Czas: każdy krok 2000 ms (wejście 250 ms, zanik w ostatnich 300 ms); zastępowanie bez kolejki (Q340, Q353) zastąpiła kolejka (Q360).
- mac-wide: gniazdo 216 px w kolumnie trójki pod Podlewaniem; karta do 380 px, wyśrodkowana na osi kolumny, przy górnej krawędzi gniazda. Nie zasłania planszy, wyniku ani trójki.
- Telefony (`phone`; tymczasowo także `phone-merged` i `landscape`, Q349): warstwa nad ekranem, karta do szerokości treści (kolumna `landscape`: 380 px), wyśrodkowana nad planszą (`landscape`: nad kolumną). Położenie w pionie (Q348):
  1. dolna krawędź 6 px nad górną krawędzią paska Podlewania (`phone-merged`: nad wierszem wyniku), więc karta zachodzi na wynik, wiersz poziomu i nagłówek;
  2. gdy karta jest wyższa niż miejsce od górnej krawędzi nagłówka do tej linii, stoi od górnej krawędzi nagłówka i schodzi w dół — na pasek, a dopiero potem na górę planszy;
  3. część na planszy (z ramą wysuniętą 8 px) — karta półprzezroczysta (tło 82%); plansza nie maleje.
- Zmierzone (capture): karta jednego kroku mieści się nad paskiem Podlewania na każdym targecie telefonu w układzie `phone` (np. iphone-se, `game.dragging-under-card`: karta punktów 110 px, 31–141 px, pasek od 147 px), więc nie dochodzi do planszy.
- Przygaszenie (Q348): gdy prostokąt przeciąganego albo niesionego klocka przecina kartę, karta ma przezroczystość 18%; po puszczeniu albo wyjściu klocka znad karty wraca. Stan `game.dragging-under-card` (iphone-se): klocek niesiony nad kartą (nad planszą, bez podglądu).
- Bez interakcji: `pointer-events: none`; stuknięcie w miejscu karty trafia w to, co pod nią (przycisk nagłówka, klocek).

### Święto pełnego podlania (`component.full-watering`, `element.game.full-watering`)

- Wyzwalacz (Q357): ruch, po którym zebrane kropelki dochodzą do 3. Święto jest krokiem 2 kolejki komunikatów (zamiast karty kropelek), po kroku punktów; w czasie święta wskaźnik ma 3 pełne krople, po nim — 0 albo nadmiar. Premię +500 pokazuje rozbicie kroku 1 („Pełne podlanie +500”); napis święta bez liczby (Q354). (Q350 — „przy każdej serii, która dojdzie do ×6” — nieaktualne.)
- Miejsce: nigdy na polach planszy ani na trójce. Tył (pod planszą, wynikiem, kartą i trójką, nad tłem sceny): promienie od środka planszy na całą powierzchnię, poświata o średnicy 1,9 × szerokość planszy, 22 płatki spadające przez tło. Przód: girlanda 28 kwiatków (telefony 18 px, mac-wide 26 px) na linii ramy planszy, 1 px poza krawędzią elementu planszy (na drewnie, nie na polach); rozbłysk płatków z kwiatka wskaźnika; napis „Pełne podlanie!” / „Full bloom!” (Q354) tuż przy kwiatku.
- Kwiatek (poprawka r7.3): jedynym kwiatkiem na ekranie jest roślina pigułki Podlewania (`element.game.combo`, ten sam element co przy „×6”) — bez osobnych roślin święta. Rośnie od dna doniczki, nad kartą ruchu, wynikiem i nagłówkiem (z-index w ekranie; „×c” i krople zostają nad nią):
  - mac-wide do 1,35× (89×97 px; środek wzrostu na środku ramki) — największe powiększenie bez wejścia na tabliczkę wyniku (zmierzone: kwiatek 282,3, tabliczka do 281,5 px); napis 20 px nad pigułką, od prawego brzegu powiększonego kwiatka (4 px), w odstępie między wynikiem a pigułką.
  - Telefony do 2× (112×122 px, mobile-compact 98×107; środek wzrostu 20% szerokości ramki od lewej, więc kwiatek nie wychodzi poza ekran) — zachodzi na kartę ruchu, wynik i na niskich oknach na wiersz poziomu (Q348); napis 17 px w pasku tuż za pigułką, na jej wysokości.
  - W czasie święta kwiatek ma ostre obrazy `plant-3…5-big.webp` (352×384), potem wraca do zwykłego obrazu.
- Przebieg 3000 ms: wiersz 15 w „Ruch”. Gra się nie zatrzymuje (trójka wjeżdża od razu, klocki można chwytać).
- Pominięcie (Q351): stuknięcie albo klik w dowolnym miejscu ekranu gry — święto znika w 150 ms, a to samo stuknięcie działa normalnie (chwyta klocek, naciska przycisk). Interakcja `interaction.game.full-watering-skip`.
- Stała klatka (capture `game.full-watering`): kwiatek wskaźnika w szczycie (złoty kwiat, pełne powiększenie, złota poświata), girlanda, promienie, poświata, płatki w tle w stałych miejscach, napis.

### Interakcja klocka

- Wygląd przeciągania bez zmian względem r5 (klocek nad palcem z odsunięciem max(44 px, pole + 8 px), slot `lifted`). Stuknij-stuknij nie ma (Q185). Moment podniesienia, pole chwytu, niesienie myszą i blokadę przewijania (Q182, Q186, Q187, R-1.10, R-1.11) wdraża Wykonawca; prototyp ich nie pokazuje.

## Ruch (r5, Q135–Q139; r6: wiersze 8, 10, 11, 12; r7: wiersze 4, 12, 13, —)

Zasady: animacje grają tylko po interakcji gracza i nie blokują gry — stan po ruchu (plansza po czyszczeniu, nowa trójka, wynik) jest od razu końcowy, a efekty leżą na warstwie nad planszą albo na klasie elementu zdejmowanej po czasie (Q136); następny klocek można chwycić w trakcie animacji. Bez wstrząsu ekranu, bez błysków częstszych niż 3/s (jeden złoty błysk na linię), bez efektów kasynowych (Q137). W `mode=capture` animacji nie ma: każdy stan to stała klatka końcowa (0 animacji, DOM stały). Stałe czasów: `BG.MOTION` w `assets/bloomgrid-ui.js`.

| # | Animacja | Czas | Krzywa i przebieg | reduced-motion |
|---|---|---|---|---|
| 1 | osadzenie położonego klocka (pola, które zostały na planszy) | 150 ms | ease-out; skala 0,84 → 1,06 (60%) → 1 | przezroczystość 0 → 1, 150 ms linear |
| 2 | czyszczenie linii — rozkwit | 450 ms | kopia kafla na warstwie efektów: ease-in; skala 1 → 1,14 (30%) → 0,3 z obrotem 18°, przezroczystość 1 → 0 (od 30%); 3 płatki w kolorze kafla (`assets/img/petal-<kolor>.webp`, ½ pola) z jego środka: ease-out, przesunięcie do ±0,75 pola w bok i 0,45–1,15 pola w dół, obrót ±90–210°, skala 0,6 → 1, przezroczystość 1 → 0 | kopia kafla zanika (przezroczystość 1 → 0, 150 ms), bez płatków |
| 3 | linia jednego koloru | 600 ms | rozkwit jak 2, ale 600 ms; jeden złoty błysk (gradient 40% długości linii) przesuwa się wzdłuż linii ease-in-out, pojawia się i znika w 15% / 85%; kopia plakietki „×2” podskakuje (skala 0,4 → 1,3 (25%) → 1 (45%)) i gaśnie od 80% | zanikanie 150 ms, bez błysku, „×2” zanika |
| 3 (korekta Q366) | linia jednego koloru (zastępuje 3 w części plakietki) | 600 ms | rozkwit i złoty błysk jak 3; **bez plakietki „+500” po ruchu** — premię pokazuje karta 3 (komunikaty tylko w jednym miejscu, Q366). Plakietka „+500” zostaje wyłącznie w podglądzie przeciągania nad linią jednego koloru (R-1.4) | zanikanie 150 ms, bez błysku |
| 4 | r7: Podlewanie przy wzroście licznika bez zmiany stopnia rośliny (zmiana stopnia: wiersz 13). r7.3: kropelka bez zmiany stopnia nie występuje (każda kropelka zmienia stopień); podbicie zostaje w kodzie dla zgodności | 250 ms | ease-out; skala 1 → 1,22 (40%) → 1 | przezroczystość 150 ms |
| 5 | punkty ruchu (r7.3: usunięte, punkty są w karcie ruchu — 14) | 300 ms | ease-out; 10 px w górę i pojawienie; zostają widoczne do następnego położenia (r4: znikały po 1,4 s) | przezroczystość 150 ms |
| 6 | wynik dolicza się | ≤ 400 ms | ease-out cubic, wartość pośrednia zaokrąglana, `requestAnimationFrame` | od razu nowa wartość |
| 7 | nowa trójka | 3 × 80 ms | klocki wjeżdżają kolejno: start co 80 ms, każdy wjazd 240 ms `cubic-bezier(.2,.8,.3,1.2)`, z 18 px niżej i skali 0,7 | przezroczystość 150 ms, wszystkie naraz |
| 8 | nowy rekord — deszcz płatków na karcie panelu | 1000 ms | 18 płatków pięciu kolorów, start rozłożony do 400 ms, spadek liniowy przez kartę z obrotem, każdy kończy w 1000 ms. r6 (Q176): droga spadku = wysokość karty + 48 px (`--fall`; start 24 px nad górną krawędzią karty, koniec 24 px pod dolną), więc płatki są na karcie przez całą sekundę na każdym targecie. Zmierzone: mac-wide karta 325 px, droga 373 px (r5: stałe 520 px — płatki opuszczały kartę po ok. 60% czasu); iphone-standard karta 324 px; płatków na karcie w 250 / 500 / 750 ms: 14 / 18 / 18 z 18 | brak |
| 9 | krok końca gry | 1500 ms | przygaszenie planszy 300 ms ease-out, komunikat wsuwa się 8 px w górę w 300 ms; po 1,5 s panel końca: 250 ms ease-out (12 px w górę, skala 0,96 → 1); stuknięcie, klik albo Esc skraca krok | ten sam czas 1,5 s; komunikat i panel tylko przezroczystość 150 ms |
| 10 | r6: awans — plakietka poziomu na wyniku (Q150, Q188). r7.3: usunięta, awans jest wpisem karty ruchu (14); zostaje wyskok etykiety poziomu (250 ms) | 1500 ms | ease-out; skala 0,7 → 1,06 (14%) → 1 (22%), postój, zanik od 85% (1275 ms); równocześnie etykieta poziomu jak 4 (250 ms) i — gdy ruch czyści 2+ linie — pochwała nad planszą | pojawienie 150 ms, widoczna, zanik 150 ms (tylko przezroczystość); etykieta: przezroczystość 150 ms |
| 11 | r6: przenikanie tła przy awansie (Q150) | 800 ms | linear; stare tło na warstwie nad nowym, przezroczystość 1 → 0 | przezroczystość 150 ms |
| 12 | r6: pusta grządka (Q189) | 1200 ms | rozkwit falą od środka planszy: płatki na polach, pierścień co 60 ms (do 4 pierścieni, start ≤ 240 ms), każdy płatek 600 ms ease-out: skala 0,2 → 1,15 (35%) → 0,9, przezroczystość 0 → 1 → 0, 6 px w górę; pochwała „Pusta grządka! +300” (Q203): skala 0,6 → 1,08 (15%) → 1 (25%), postój, zanik od 85% (1020 ms); punkty ruchu jak 5, wynik jak 6 | bez fali i skali: płatki przezroczystość 150 ms, plakietka pojawienie 150 ms, widoczna, zanik 150 ms |
| 12 (r7) | święto Pustej grządki (zastępuje opis r6 powyżej) | ok. 2500 ms | rozkwit falą od środka planszy jak w r6 (pierścień co 60 ms, każdy płatek 1200 ms: skala 0,2 → 1,15 (25%) → 1 (35%), zanik od 80%); równocześnie 28 płatków spada przez cały ekran (warstwa nad ekranem, liniowo 1600 ms, start rozłożony do 900 ms, droga = wysokość ekranu + 60 px); napis „Pusta grządka! +N” na planszy (premia sekcji „Pusta grządka”): skala 0,5 → 1,12 (8%) → 1 (14%), postój, zanik od 88%; wynik dolicza się przez 1500 ms (ease-out cubic). Klocki nowej trójki są ukryte do 1900 ms, potem wjeżdżają jak 7. Przy awansie plakietka awansu (10) i przenikanie tła (11) startują 1500 ms po ruchu | bez fali, lotu płatków i skali: płatki na planszy przezroczystość 150 ms; napis pojawia się w 150 ms, stoi i znika w 150 ms (2,5 s); wynik od razu; trójka wjeżdża po 1900 ms także przy ograniczeniu ruchu (wjazd jak 7), bo pauza święta jest regułą produktu, a nie animacją; pominięcie działa po 600 ms (Q254) |
| 13 | Podlewanie — nowy stopień kwiatka (r7.3: z początkiem kroku kropelek; więdnięcie usunięte, Q358) | 300 ms | nowy stopień: kwiatek podskakuje (ease-out; skala 0,85 → 1,15 z 6 px w górę (45%) → 1) i pigułka rozbłyska złotą poświatą (40%) | tylko przezroczystość 150 ms |
| 14 | r7.3: kolejka komunikatów — krok karty ruchu (Q356, Q360) | 2000 ms na krok | wejście 250 ms ease-out (8 px w górę, skala 0,96 → 1); pochwała w karcie wyskakuje 350 ms ease-out (skala 0,7 → 1,08 (60%) → 1); „Rajski ogród!” z rozbłyskiem 16 płatków (800 ms); postój; zanik w ostatnich 300 ms ease-in (6 px w górę); potem następny krok (punkty → kropelki albo święto 15 → rekord → poziom). Przygaszenie nad klockiem: przezroczystość 18% (przejście 120 ms). Po Pustej grządce kolejka startuje 1500 ms po ruchu | wejście i zanik tylko przezroczystością po 150 ms, ten sam czas; przygaszenie bez przejścia |
| 15 | r7.3: święto pełnego podlania (Q344, Q357; krok 2 kolejki przy 3 kropelkach) | 3000 ms | 0–300 ms: promienie i poświata wchodzą, promienie obracają się o 24° do końca; girlanda rozkwita falą od rogu planszy najbliżej pigułki (kwiatek 450 ms: skala 0 → 1,25 → 1, start do 700 ms); kwiatek wskaźnika Podlewania (poprawka r7.3, jedyny kwiatek) rośnie od dna doniczki ze skali 1 do pełnego powiększenia (0–900 ms, ease-out) i rozkwita: obraz pąk (0 ms) → kwiat (300 ms) → złoty kwiat (600 ms); 600 ms: rozbłysk 14 płatków z kwiatu; złota poświata kwiatka z dwoma pulsami (szczyty 900 i 1800 ms), pigułka świeci (szczyt 900 ms); 300–800 ms: napis wyskakuje (0,6 → 1,08 → 1); płatki w tle spadają 2,2 s (start do 1 s); 2400–3000 ms: kwiatek wraca do skali 1 i traci poświatę, potem zwykły obraz; 2500–3000 ms: warstwy gasną. Stuknięcie: warstwy gasną i kwiatek wraca do skali 1 w 150 ms | kwiatek bez wzrostu i zmiany obrazu, ze stałą złotą poświatą; girlanda, promienie i napis: pojawienie 150 ms, postój, zanik 150 ms; bez obrotu, fali i deszczu; 3000 ms |
| 12 (korekta Q366) | Pusta grządka (zastępuje 12 i 12 (r7)) | pauza trójki 1900 ms | efekt tylko w karcie 4 (kolejka od razu); na planszy zwykły rozkwit czyszczonych linii jak 2; wynik dolicza się 1500 ms (ease-out cubic); nowa trójka pojawia się po 1900 ms (wjazd jak 7), wcześniej miejsca trójki puste; stuknięcie albo klik w ekran gry po 600 ms kończy pauzę (karta 4 znika, trójka od razu, następna karta) | rozkwit linii przezroczystością 150 ms, wynik od razu; trójka po 1900 ms także tu (reguła produktu, Q254); pominięcie po 600 ms |
| 14 (korekta Q366) | karta komunikatu (zastępuje 14) | max(2000, 1200 + 40 ms × znaki), karty 4, 6, 8 ≥ 3000 ms | wejście 250 ms ease-out (10 px w górę, skala 0,94 → 1), nagłówek 350 ms od 100 ms; efekt ilustracji własny dla karty (tabela w „Osiem kart”), do ok. 1,6 s; postój w klatce szczytowej; zanik 300 ms na końcu; następna karta od razu | bez wejścia i efektu ilustracji; pojawienie i zanik przezroczystością 150 ms; ten sam czas |
| 15 (korekta Q366) | rozkwit kwiatka wskaźnika przy karcie 6 (zastępuje 15) | czas karty 6 (3000 ms) | jak 15, ale bez warstw święta, napisu i pominięcia: rośnie do 30% czasu, pąk → kwiat → złoty kwiat 0 / 300 / 600 ms, dwa pulsy poświaty, wraca od 80% | bez wzrostu i zmiany obrazu, stała złota poświata |
| — | pochwała (Q139; r7: Q233, Q234). r7.3: zastąpiona kartą ruchu (14); opis r7 niżej | 800 ms | ease-out; skala 0,7 → 1,06 (20%) → 1 (30%), potem unosi się o 30% wysokości i gaśnie od 75%. r7: szczebel drabiny albo „Kolorowa rabata!” (sekcja „Pochwały i Podlewanie (r7)”), najwyżej jedna na ruch. Przy „Rajski ogród!” rozbłysk 16 płatków z środka pochwały (800 ms ease-out, do 120 px w bok, obrót, zanik). Przy „Kolorowa rabata!” złoty błysk linii (wiersz 3). Pochwała nie zasłania trójki | pojawienie 144 ms, widoczna, zanik 144 ms (tylko przezroczystość); bez rozbłysku i błysku |

- r6 (Q175): stany `game.line-clear`, `game.color-bonus`, `game.combo` pokazują stan po ruchu (plansza po czyszczeniu, wynik i punkty ruchu, seria); rozkwit i ramka czyszczenia są tylko w katalogu (`foundation.motion`) i na żywo.
- r7.3: kolejność po ruchu: 1–3, 6, 14 (karta ruchu) i przy awansie 11 startują razem; 15 gdy Podlewanie przechodzi z ×5 na ×6; przy Pustej grządce 12, potem 14 i 11 po 1500 ms, a 15 po 2500 ms. Zdanie niżej opisuje r7.
- Kolejność po ruchu: 1–3, 5, 6 i pochwała (albo przy awansie 10 i 11 zamiast pochwały) startują razem; 4 gdy licznik serii rośnie; 7 gdy ruch dobrał nową trójkę; krok końca (9) zaczyna się po animacji ruchu (150 / 450 / 600 ms, przy reduced-motion 150 ms).
- Katalog (`foundation.motion`, `component.game-over-panel`, `component.no-moves-step`) ma przyciski „Odtwórz” przy animacjach.
