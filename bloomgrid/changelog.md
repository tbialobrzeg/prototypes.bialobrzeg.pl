# Changelog

## r7.4

- Rewizja bazowa: `r7.3` (w `prototype/` pod Gitem przed tą zmianą). Rewizja docelowa: `r7.4`.
- Wejście: brief Lidera — punktacja aplikacji od 2026-11-20 (decyzje Tomasza Q394–Q402); różnica S-2 `level-thresholds-q371` ma zniknąć. Zmiana liczb i danych stanów, **nie wyglądu**: ramki, kolory, ilustracje, układy i animacje kart bez zmian.
- Migracje ID: brak (`id_migrations: []`); publiczne ID elementów bez zmian.
- **Reguły** (`assets/bloomgrid-rules.js`, `BGRules.score`, `BGRules.play`, `BGRules.levelOf`, `BGRules.emptyBonus`, `BGRules.X`; źródło: R-2.1–R-2.4, R-2.10, R-2.11, R-2.13 i `source/app/game-engine/domain/scoring.ts`, `level.ts`): X = 80; położenie bez linii 0 punktów (było: liczba pól); k linii naraz X·3^(k−1) (było 80·k²); linia jednego koloru +9X = 720 (było +500); Pełne podlanie +6X = 480 (było +500); Pusta grządka liczona w `play` z reguły — klasyczna max(12X, 6X × poziom sprzed ruchu), wyzwanie dnia 25X (było: premia z danych stanu `move.emptyBonus`); poziom = 1 + ⌊wynik / 800⌋ (`BG.levelOf`, było: progi Q197/Q371 300, 800, 2000, 3500, 6000, 9000, potem co 4000). Motyw z kręgu od poziomu 1 bez zmian.
- **Karty** (`assets/bloomgrid-ui.js`): karta punktów tylko przy ruchu z linią (ruch bez linii nie ma karty „położony klocek”); karta 6 „+480” z reguły (`6 · X`); premia Pustej grządki w karcie 4 z `move.points.empty`. Plakietka podglądu linii jednego koloru i jej tekst dla czytnika: „+720” (`bonus_badge`, `bonus_sr`, pl i en).
- **Stany — wyniki i ruchy** (`assets/fixtures.json`; wartości z danych aplikacji `tests/support/prototype-state-data.ts`, wynik sprzed ruchu jako wielokrotność X):
  - bez ruchu: `game.classic-resumed`, `game.dragging-fits`, `game.save-error`, `game.crash`, `game.music-muted`, `game.watering-bud`, `game.watering-flower` 2400 (było 2340 / 2840), `home.resume-available` zapis 2400; `game.dragging-line-preview` 4240 (6210; także okaz katalogu); `game.level-5` 3920 (5940); `game.level-6` 4480 (6480); `game.over-classic`, `game.no-moves-classic` (pl i en) 4080 (6842); `game.over-classic-new-record` 22 000 (21 360); `game.over-classic-tied` bez zmian (18 420 = rekord fixture);
  - z ruchem (sprzed → po): `game.line-clear` 1680 → 1760; `game.color-bonus`, `game.combo-color`, `game.flower-bed` 1680 → 2480; `game.combo` 3280 → 3520; `game.level-up-praise` 1600 → 2560; `game.praise-great` 1680 → 1920; `game.praise-wonderful` 2480 → 3200; `game.praise-amazing` 3280 → 5920; `game.praise-paradise` 4080 → 11 040; `game.queue-points`, `game.queue-drops`, `game.queue-level` 1680 → 2400; `game.move-card-record` 4640 → 4880 (rekord 4700); `game.full-watering` 6400 → 7120; `game.empty-garden` 4560 → 7520 (premia 2880, awans 6 → 10); `game.empty-garden-level-up` 2320 → 3840 (premia 1440, awans 3 → 5); `game.dragging-under-card` 3280 → 4960;
  - `game.level-up`: plansza, trójka i ruch z danych aplikacji (`level-up-before`: rząd 8 domknięty klockiem single drop), 1520 → 1600, awans na poziom 3 (było: inna plansza, 780 → 864);
  - wyzwanie dnia (aplikacja nie ma tych wyników w danych; najbliższa wielokrotność X): `game.daily-exit-confirm` 880 (860), `game.over-daily`, `game.no-moves-daily` (pl i en) 2160 (2140), `game.over-daily-new-day` 3280 (3310);
  - usunięte pola `move.emptyBonus` i `emptyGarden` (premia z reguły).
- **Tła stanów** (pole `background` = motyw poziomu widocznego w stałej klatce; przed kartą „Nowy poziom” poziom sprzed ruchu, Q360): zmienione `game.color-bonus`, `game.combo-color`, `game.flower-bed` → `lily-pond` (było `hedge`); `game.empty-garden` → `firefly-night` (`dawn-meadow`); `game.move-card-record` → `firefly-night` (`garden-dusk`); `game.full-watering` → `lily-pond` (`firefly-night`); `game.over-classic-tied` → `firefly-night` (`lily-pond`; poziom 24); `game.dragging-under-card` → `garden-dusk` (`hedge`). Tabela „Tła stanów” w `README.md` przeliczona.
- **Usunięty stan:** `game.level-up-no-clear` (manifest, fixture, opis w katalogu) — w nowej grze położenie bez linii nie zmienia wyniku, więc nie ma awansu bez czyszczenia. Odwołania poza `prototype/` poprawia Lider. Manifest ma 51 stanów.
- **Rozbieżność z danymi aplikacji (do decyzji Lidera):** w `tests/support/prototype-state-data.ts` stany `game.praise-wonderful`, `-amazing`, `-paradise` używają tego samego ruchu co `game.praise-great` (2 linie), więc w aplikacji pokazałyby „Świetnie!”. Prototyp zostawia swoje plansze 3, 4 i 5 linii (szczebel pochwały to treść stanu) i bierze z aplikacji wynik sprzed ruchu (31X, 41X, 51X) oraz tło; wyniki po ruchu różnią się od aplikacji (prototyp 3200, 5920, 11 040). Druga: `STATE_BACKGROUNDS['game.color-bonus']` = `hedge` (poziom po ruchu), a prototyp w klatce karty 3 pokazuje poziom sprzed ruchu (`lily-pond`, Q360) — tak samo jak drugi wpis tego stanu w `tests/support/prototype-states.ts` (`lily-pond`).
- **Katalog:** przykładowe liczby kart, które przeczyły regułom, przeliczone: 1 „+80” (było „+243”), 2 „+720” (723), 3 „+800 / 1 linia · Kolorowa rabata +720” (743, +500), 4 „+1200 / 2 linie naraz · Pusta grządka +960” (1243, +1000), 6 „+480” (500), 7 „18 480” (18 421); drabina, karta z awansem, demo Pustej grządki i panele końca przeliczone; okaz „bez czyszczenia” usunięty. Wygląd kart bez zmian.
- **`responsive-spec.md`:** nowa sekcja „Punktacja i poziomy (r7.4)”; dopiski r7.4 przy progach poziomów, premii Pustej grządki, dopiskach i przykładach kart. **`README.md`:** tabela „Tła stanów”.
- Obrazy: bez wywołań generatora i bez zmian obrazów.

## r7.3

- Rewizja bazowa: `r7.2` (zaakceptowana, w `prototype/` pod Gitem przed tą zmianą).
- Rewizja docelowa: `r7.3`.
- Wejście: brief Lidera BLG-22 (zgłoszenie Tomasza: komunikaty niespójne, za krótkie, elementy przy wyniku za blisko, mały kwiatek, pełne podlanie bez efektu), decyzje Reprezentanta Q339–Q347 i odpowiedzi na pytania Designera Q348–Q354 (2026-11-16), spis `tmp/analysis/komunikaty-chwilowe-spis.md`. Rozstrzygnięcia Designera 1–7 z pytań przyjęte bez weta.
- Migracje ID: brak (`id_migrations: []`) — żadne publiczne ID nie zostało zastąpione innym. Zmiana znaczenia `element.game.level-up` i usunięte ID niżej.
- Obrazy: **bez wywołań generatora**. Nowe i zmienione WebP to wycinki z istniejących oryginałów r7 (`assets/generated/plant-*.png`, pochodzenie w ich `.json`), opis w `assets/img/derived.json` (klucz `r7_3_plant`, wpisy `plant-*.webp`):
  - `assets/img/plant-1…5.webp`, `plant-wilt.webp` — ponownie wycięte w 132×144 (2× ramki 66×72; było 88×96), bo roślina pigułki jest większa;
  - nowe `assets/img/plant-3-big.webp`, `plant-4-big.webp`, `plant-5-big.webp`, 352×384 (2× ramki 176×192) — ostre obrazy powiększonego kwiatka wskaźnika w święcie pełnego podlania (`plant-1-big`, `plant-2-big` z pierwszej wersji r7.3 usunięte, sekcja „Poprawka” niżej).

### Korekta Q366: osiem kart, każda inna (Tomasz, 2026-11-17)

Tomasz o kartach samego tekstu: „karty mają być piękne, każda inna”. Propozycję w sekcji katalogu „Komunikaty chwilowe” zaakceptował: „ładne, niech będą i użyjmy w grze”. Ta sekcja zastępuje „Ujednolicenie” niżej w wyglądzie, czasie i efektach poza kartą.

- **Wspólne:** jedno miejsce, jedna karta naraz w kolejce, czas na przeczytanie, kremowa ramka z obrysem i cieniem, fonty i rozmiary (nagłówek 22 / 26 px, liczba 32 / 42 px, podpis 13 / 15 px; telefony / mac-wide), ilustracja po lewej (76 / 100 px), tekst do lewej.
- **Własne dla każdej karty** (`data-art` 1–8, `data-sound`, `data-duration-ms`): 1 punkty — pięć kafli na pasie ziemi, zieleń, `line` (bez czyszczenia `place`); 2 pochwała — złota rozeta, gwiazdki według szczebla, `praise-*`; 3 Kolorowa rabata — łuk kwiatów wiśni, malina, `flower-bed`; 4 Pusta grządka — mini-plansza w płatkach, girlanda i opadające płatki, złoto, `empty-garden`; 5 kropelki — konewka i licznik kropelek, błękit, `watering-drop`; 6 Pełne podlanie — złoty kwiat na promieniach, rozbłysk płatków, girlanda, `watering-grow`; 7 nowy rekord — puchar w wieńcu, konfetti, `new-record`; 8 nowy poziom — okno z tłem nowego poziomu, zieleń, `level-up`. Szczegóły: `responsive-spec.md`, „Osiem kart”, i katalog `component.move-card`.
- **Karty punktów (doprecyzowanie Lidera):** karty 1–4 to warianty jednej karty punktów ruchu; ruch pokazuje dokładnie jedną (R-2.9: Pusta grządka, Kolorowa rabata, pochwała z liczby linii, zwykłe punkty). Kolejka ruchu ma najwyżej 4 karty.
- **Czas:** max(2000, 1200 + 40 ms × liczba znaków), zaokrąglony do 100 ms; karty 4, 6, 8 co najmniej 3000 ms (2–3,4 s; było 2000 ms dla każdej). Rozkwit kwiatka wskaźnika trwa tyle co karta 6 (3000 ms).
- **Pusta grządka (doprecyzowanie Lidera, Q241):** trójka pojawia się po 1900 ms (wyjątek od Q136, także przy reduced-motion); stała klatka `game.empty-garden` pokazuje puste miejsca trójki. Nowe: pominięcie stuknięciem albo klikiem w ekran gry po 600 ms (`interaction.game.empty-garden-skip` — karta 4 znika, trójka od razu, następna karta).
- **Usunięte efekty poza kartą:** płatki na polach planszy przy Pustej grządce (w stanie i na żywo; `BG.emptyBloomFrame`), builder napisu `BG.emptyGarden` i martwe reguły CSS święta pełnego podlania (`.bg-fullw*`, `fw-*` poza rozkwitem kwiatka) i Pustej grządki (`.bg-empty-*`, `fx-empty*`). Osobnego napisu „Pełne podlanie!” przy pigułce nie ma (usunięty w Q367; teraz także jego CSS). Zostaje rozkwit kwiatka wskaźnika przy karcie 6 i zwykłe efekty czyszczenia linii na planszy.
- **Runtime:** wygląd kart jest w `bloomgrid-ui.js` (`BG.CARD_ART`, `BG.cardArt`, `BG.cardMs`, `BG.moveCard`) i `bloomgrid.css` (blok „korekta Q366”); katalog używa tych samych funkcji. `BG.fx.card` bierze czas z karty i odtwarza jej efekt (klasa `is-play`).
- **Stany, fixtury, ID:** stany i scenariusze bez zmian (karta wynika z ruchu scenariusza; `game.queue-*`, `game.full-watering`, `game.empty-garden*`, `game.praise-*`, `game.flower-bed`, `game.move-card-record`, `game.level-up*` pokazują nowe karty); teksty fixtur bez zmian. Publiczne ID bez zmian, `id_migrations: []`; nowe ID interakcji `interaction.game.empty-garden-skip`.
- **Obrazy:** bez wywołań generatora; ilustracje to własne SVG i istniejące obrazy (`tile-*-s`, `petal-*`, `plant-3/4/5-big`, `bg-*-phone`).
- **Plakietka „+500” po ruchu (decyzja Lidera po korekcie):** usunięta z planszy przy linii jednego koloru (animacja `fx.sweep` i stała klatka czyszczenia), bo powtarza kartę 3 — komunikaty tylko w jednym miejscu (Q366). Złoty błysk linii i rozkwit czyszczenia zostają jako animacja planszy. Plakietka „+500” zostaje w podglądzie przeciągania nad linią jednego koloru (wymaganie R-1.4). Usunięte reguły CSS `fx-badge`.
- **`interaction.game.empty-garden-skip`:** przyjęte przez Lidera (wykonanie Q241 i Q370).
- **Karta na telefonach (poprawka Lidera po zrzutach r7.3):** spod karty prześwitywał wynik, a dolna krawędź tabliczki wyniku wystawała. Teraz karta jest nieprzezroczysta nad nagłówkiem i wynikiem, tabliczka wyniku, na którą karta zachodzi, na czas karty znika i wraca po kolejce. Półprzezroczystość (Q348) ma tylko część karty nad planszą (gradient tła od górnej krawędzi ramy, `--opaque-h` z `placeCard`); przygaszenie przy przeciąganiu bez zmian.

### Ujednolicenie: jedna karta, osiem treści (decyzje Tomasza Q366–Q368, 2026-11-17)

Tomasz: „powinno być tylko jedno miejsce komunikatów tymczasowych i powinny się one różnić tylko treścią”. Sekcja zastępuje opisy niżej tam, gdzie się różnią.

- **Karta (Q366):** wszystkie komunikaty chwilowe pokazuje `component.move-card` w jednym miejscu, z jednym wyglądem i układem trzech wierszy: nagłówek, duża liczba, podpis drobnym drukiem; pusty wiersz się nie pokazuje. Osiem treści: punkty („+243” / „1 linia”), punkty z pochwałą („Wspaniale!” / „+723” / „3 linie naraz”), Kolorowa rabata, Pusta grządka, kropelki, Pełne podlanie („Pełne podlanie!” / „+500” / „kwiatek zaczyna od nowa”), nowy rekord („Nowy rekord!” / wynik), nowy poziom („Nowy poziom!” / „4” / „Żywopłot”); EN odpowiednio. Każda karta 2000 ms, także Pełne podlanie (było 3000 ms) i Pusta grządka (kolejka od razu, było od 1500 ms). Jedyny akcent: mocniejsza obwódka przy wyższej pochwale.
- **Zmiana znaczenia ID:** `element.game.praise` — nagłówek karty (pochwała, „Kolorowa rabata!”, „Pusta grządka!”; wcześniej pigułka pochwały i napis na planszy); `element.game.move-points` (`component.move-points`) — duża liczba karty punktów, bez rozbicia (Q341 rozbicie usunięte); `element.game.full-watering` — nagłówek karty 6 (wcześniej warstwa święta); `element.game.drops-gain`, `element.game.new-record`, `element.game.level-up` — nagłówki kart 5, 7, 8. Liczba karty punktów nie zawiera premii Pełnego podlania (ma własną kartę „+500”).
- **Podpis (Q368):** bez rachunku pól — co gracz zrobił: „1 linia”, „3 linie naraz”, „położony klocek” (ruch bez linii z rekordem albo poziomem), z dopiskiem „· Kolorowa rabata +500” / „· Pusta grządka +1000”.
- **Usunięte (Q367):** `component.full-watering` (warstwy: złote promienie, poświata, płatki w tle, girlanda na ramie, osobny napis „Pełne podlanie!” przy pigułce, rozbłysk płatków) i `interaction.game.full-watering-skip` (pominięcie stuknięciem — karta jest zwykłą kartą, gra się nie zatrzymuje); przy Pustej grządce napis „Pusta grządka! +N” na planszy (`.bg-empty-garden`) i płatki przez cały ekran; rozbłysk płatków przy „Rajski ogród!”; osobne wyglądy pigułki pochwały, pigułek rekordu i poziomu w karcie. Teksty: `card_cells`, `card_full`, `card_level`, `card_lines_*` w starym brzmieniu (z liczbą punktów). Nowe: `card_place`, `card_empty_head`, `card_full_sub`, `card_level_head`; zmienione: `card_line_1` („1 linia”), `card_lines_few` / `card_lines_many` („{k} linie naraz” / „{k} linii naraz”). Stałe `BG.MOTION`: `fullWatering`, `fullGrow`, `skip`, `cardDelay`, `wither`.
- **Zostaje:** rozkwit kwiatka wskaźnika (`element.game.combo`) w czasie karty „Pełne podlanie!” — teraz 2000 ms; przy Pustej grządce rozkwit pól planszy, doliczanie wyniku i pauza nowej trójki (R-2.10). Logika kropelek bez zmian.
- **Katalog:** nowa pierwsza sekcja „Komunikaty chwilowe” (`data-element-id="specimen.move-cards"`) z 8 kartami w dwóch rozmiarach (telefon, mac-wide) obok siebie, karty `specimen.move-card.<nr>-phone` / `specimen.move-card.<nr>-mac-wide` (karta 2 „Wspaniale!”, karta 5 „+2 kropelki”); sekcje `component.move-card` i `component.move-points` przepisane, sekcja `component.full-watering` usunięta.
- **Stany:** bez nowych i usuniętych; zmieniona treść klatek: `game.full-watering` (karta 6 i kwiatek w szczycie zamiast warstw święta), `game.empty-garden` i `game.empty-garden-level-up` (bez napisu na planszy; karta 4 albo 8), wszystkie stany z kartą (nowy układ wierszy).

### Przeróbka: kropelki Podlewania i kolejka komunikatów (decyzje Tomasza Q355–Q362, 2026-11-17)

Ta sekcja zastępuje opisy niżej tam, gdzie się różnią (seria ×c, karta 2400 ms bez kolejki, drabina z siłą ruchu, wyzwalacz święta przy ×6).

- **Kropelki (Q355, Q357–Q359):** ruch, który czyści L linii naraz, daje L − 1 kropelek; kropelki zbierają się między ruchami i nie znikają; puste ruchy nic nie zabierają, kwiatek nie więdnie. 3 kropelki = święto „Pełne podlanie!” / „Full bloom!” z rozkwitem kwiatka wskaźnika i premią +500, potem od nowa; nadmiar przechodzi dalej. Model punktów prototypu (`bloomgrid-rules.js`): stan `drops` (0–2) zamiast `combo`/`dry`; punkty ruchu `full` (500 × liczba nagród), `dropsGain`, `dropsAfter`.
- **Wskaźnik `element.game.combo` (`component.combo-badge`) — zmiana znaczenia:** kwiatek i trzy kropelki (pełne = zebrane), zawsze widoczny w grze (także przy 0); stopnie 0 kiełek, 1 pąk, 2 kwiat; bez etykiety „×c”. Było: seria ×2…×6 i krople jako zapas do utraty serii.
- **Usunięte (Q362):** licznik ×2…×6, kropelki jako „życia”, więdnięcie po 3 pustych ruchach, premia serii 50·c i część „Podlewanie +N” w rozbiciu punktów; więdnięcie (`BG.fx.wither`, animacje `fx-wither`), obraz zwiędłej rośliny `assets/img/plant-wilt.webp` i stan `game.watering-wilt`; stan `game.watering-gold` (×7 nie istnieje); nieużywane obrazy `plant-2.webp` (listki) i `plant-5.webp` (mały złoty kwiat; złoty kwiat pokazuje święto obrazem `plant-5-big.webp`). Teksty `combo`, `combo_drops_sr`, `card_watering`. Oryginały z generatora i ich pochodzenie zostają w `assets/generated/`.
- **Kolejka komunikatów (Q356, Q360, Q361):** komunikaty ruchu po kolei, każdy osobno: (1) punkty — pochwała, „+N”, rozbicie (z „Pełne podlanie +500”, gdy ruch dał nagrodę); (2) „+1 kropelka” / „+2 kropelki” z podpowiedzią „3 kropelki = Pełne podlanie” albo święto (3000 ms); (3) „Nowy rekord!”; (4) nowy poziom, zawsze na końcu (z nim przenikanie tła i etykieta). Karta kroku 2000 ms (było 2400). Brakujące kroki pomijane; kroki następnego ruchu dołączają na koniec; gra się nie zatrzymuje; stuknięcie pomija tylko święto. Ruch z Pustą grządką: kolejka od 1500 ms po ruchu. Zastępuje Q340 i Q353 (zastępowanie bez kolejki).
- **`component.move-card` — zmiana znaczenia:** karta pokazuje jeden krok (`data-step`: points, drops, record, level) zamiast całego ruchu. Nowe ID `element.game.drops-gain` (krok kropelek). `element.game.new-record` i `element.game.level-up` są teraz osobnymi krokami (duże pigułki), nie wpisami pod punktami. Nowe teksty: `watering_sr`, `card_drops_1`, `card_drops_few`, `card_drops_many`, `card_drops_hint`, `card_full`.
- **Drabina pochwał (Q361; Q363 czeka na Reprezentanta):** tylko z liczby linii naraz: 1 bez pochwały, 2 „Świetnie!”, 3 „Wspaniale!”, 4 „Cudownie!”, ≥ 5 „Rajski ogród!”; Kolorowa rabata i Pusta grządka jak dotąd.
- **Święto pełnego podlania (`component.full-watering`):** wyzwalacz = 3 zebrane kropelki (było: seria ×5 → ×6, Q350); krok 2 kolejki; kwiatek wskaźnika i reszta jak w poprawce niżej. Kilka nagród w jednym ruchu: jedno święto, premia ×n w rozbiciu.
- **Kropelki między grami (Q364, Q365):** w grze klasycznej kropelki (0–2) zostają po końcu gry i są widoczne od pierwszego ruchu następnej (nowy stan `game.classic-start-drops`, start z 2 kropelkami; „Zagraj ponownie” przy kropelkach prowadzi do niego). Panel końca gry klasycznej przy kropelkach > 0: nowy wiersz `element.game.over.drops` — trzy krople i „2 z 3 kropelek — dokończ w następnej grze” / „2 of 3 drops — finish in your next game” (tekst `over_drops`); mieści się bez przebudowy panelu (kontrola niżej). `game.over-classic` (także EN) ma teraz 2 kropelki, więc pokazuje ten wiersz. Wyzwanie dnia: własny kwiatek od zera w każdym podejściu, bez przenoszenia i bez wiersza.
- **Stany:** nowe `game.classic-start-drops` (Q364), `game.watering-flower` (2 kropelki), `game.queue-points`, `game.queue-drops`, `game.queue-level` (ten sam ruch: 3 linie z awansem 3 → 4, kolejne kroki kolejki); usunięte `game.watering-wilt`, `game.watering-gold`. Zmienione znaczenie: `game.watering-bud` (1 kropelka, pąk; było ×4), `game.combo`, `game.combo-color` (ruch przy 1 kropelce, bez serii), `game.praise-wonderful`, `-amazing`, `-paradise` (nowe plansze: 3, 4, 5 linii naraz; amazing i paradise dają nagrodę, paradise zostawia 1 kropelkę nadmiaru), `game.full-watering` (2 linie przy 2 kropelkach; klatka kroku 2), `game.move-card-record` (klatka kroku „rekord”), `game.level-up`, `game.level-up-praise`, `game.empty-garden-level-up`, `game.level-up-no-clear` (klatka kroku „poziom”), `game.dragging-under-card` (karta punktów, tło poziomu sprzed awansu). Pole fixture `step` wybiera krok klatki capture; pola `combo` i `dry` zastąpione przez `drops`. Razem 52 stany.

### Poprawka: jeden kwiatek w święcie pełnego podlania (uwaga Tomasza do zrzutów `game.full-watering`)

- Tomasz: „nie rozumiem, czemu widzę i pełne podlanie i nad nim kwiatka, i mam 2 kwiatki na raz”. W pierwszej wersji r7.3 święto miało własne rośliny (mac-wide jedna 172×188 w lewym marginesie, telefony dwie 64×70 na końcach paska) obok kwiatka wskaźnika „×6”.
- Teraz jedynym kwiatkiem jest kwiatek wskaźnika Podlewania (roślina pigułki, `element.game.combo`): przez 3000 ms rośnie od dna doniczki (telefony do 2×, mac-wide do 1,35× — największe bez wejścia na tabliczkę wyniku), rozkwita (pąk → kwiat → złoty kwiat, obrazy `plant-3…5-big.webp`), świeci złotą poświatą, a potem wraca do zwykłego rozmiaru i obrazu. Na telefonach zachodzi na kartę ruchu, wynik i nagłówek (Q348). Napis „Pełne podlanie!” stoi tuż przy nim: mac-wide nad pigułką, od prawego brzegu kwiatka; telefony w pasku za pigułką. Promienie, poświata, płatki w tle i girlanda na ramie bez zmian. reduced-motion: kwiatek bez wzrostu, ze stałą poświatą.
- Usunięte: rośliny święta (dekoracje `.bg-fullw-plant` bez publicznych ID), obrazy `assets/img/plant-1-big.webp` i `plant-2-big.webp` (wpisy w `derived.json` też). **Publiczne ID bez zmian**: `component.full-watering`, `element.game.full-watering`, `interaction.game.full-watering-skip`, `element.game.combo` zostają; żadne publiczne ID nie zostało usunięte.
- Runtime: `BG.fwPill` (kwiatek wskaźnika w trybie animacji, stałej klatki i reduced-motion), `BG.FW_SCALE`, `BG.FW_STAGES`; `BG.fullWatering` bez roślin.

### Karta ruchu (Q339–Q343, Q347, Q348, Q352, Q353)

- Nowy komponent `component.move-card`, instancja `element.game.move-card` (`role="status"`, `aria-live="polite"`, bez interakcji). Wszystko z jednego ruchu w jednej karcie: pochwała (`element.game.praise`, największa; rośnie ze szczeblem: telefony 24 / 27 / 30 / 33 px, mac-wide 30 / 34 / 37 / 40 px, oprawa karty mocniejsza od szczebla 2), suma i pełne rozbicie (`element.game.move-points`), wpis awansu (`element.game.level-up`) i wpis „Nowy rekord!” (`element.game.new-record`, nowe ID).
- Czas 2400 ms (Q340); karta następnego ruchu zastępuje ją od razu; ruch bez karty jej nie zdejmuje (Q353). Ruch bez czyszczenia: karta tylko z awansem albo rekordem, „+N” i „pola +N” (Q347). „Nowy rekord!” raz na grę, w ruchu przekroczenia rekordu trybu sprzed gry; przy rekordzie 0 bez wpisu (Q352); w wyzwaniu dnia tylko, gdy podejście liczy się do rekordu dnia. Ruch z Pustą grządką: karta 1500 ms po ruchu, bez pochwały, z „Pusta grządka +N” w rozbiciu.
- Miejsce: mac-wide — gniazdo 216 px w kolumnie trójki pod Podlewaniem; telefony — warstwa nad ekranem, dolna krawędź 6 px nad paskiem Podlewania, zachodzi na wynik i nagłówek, a na planszę dopiero, gdy jest wyższa (wtedy półprzezroczysta; plansza nie maleje). Nad niesionym klockiem karta przygasa do 18% (Q348). `phone-merged` i `landscape`: ta sama reguła tymczasowo (Q349, BLG-20).
- Pierwszeństwo pochwały bez zmian (R-2.9): Pusta grządka (święto), Kolorowa rabata, drabina.

### Święto pełnego podlania (Q344, Q350, Q351, Q354)

- Nowy komponent `component.full-watering`, instancja `element.game.full-watering` (`role="status"`), interakcja `interaction.game.full-watering-skip` (tap / klik w dowolnym miejscu ekranu gry → święto znika w 150 ms, to samo stuknięcie działa dalej normalnie).
- Wyzwalacz: Podlewanie przechodzi z ×5 na ×6, w każdej serii raz. 3000 ms: złote promienie, poświata i płatki w tle (pod planszą i trójką), girlanda 28 kwiatków na ramie planszy, kwiatek wskaźnika Podlewania rośnie, rozkwita i świeci (po poprawce niżej; pierwsza wersja miała osobne rośliny), napis „Pełne podlanie!” / „Full bloom!”. Nie zasłania pól planszy ani trójki; gra się nie zatrzymuje. reduced-motion: klatka kluczowa, pojawienie i zanik po 150 ms, ten sam czas. Ruch z Pustą grządką i ×6: po święcie Pustej grządki.

### Podlewanie i odstępy (Q345)

- Roślina pigułki: telefony 56×61 (było 44×48; przy treści węższej niż 335 px szerokość = treść − 279 px, mobile-compact 49×53 — żeby przy wyniku 9 999 999 zostały ≥ 2 px do tabliczki wyniku), mac-wide 66×72 (było 50×56); pigułka 32 / 38 px (było 30 / 34). `phone-merged` bez zmian (38×42), `landscape` tymczasowo 44×48.
- Telefony: pasek Podlewania 54 px (było 44); w dopasowaniu wysokości 56 zamiast 46 px. mac-wide: kolumna wynik | 24 | pasek 76 | 24 | gniazdo karty 216 | 24 | trójka (było: wynik | 20 | pasek 96 z pigułką, 6 px, punktami | 20 | trójka); prześwit roślina–tabliczka wyniku 26 px (było ok. 0), pigułka–karta 24 px (było 6). Na niższym oknie szerokim gniazdo karty maleje (najmniej 150 px), a komunikat zapisu przy oknie niższym niż 767 px leży na wierszu wyniku (wariant Q201; wcześniej tylko na telefonach), bo inaczej `game.save-error` przy 1280×680 przewijał się.

### „+500” zamiast „×2” (Q346)

- Plakietka linii jednego koloru na planszy (podgląd przeciągania, klatka czyszczenia, ruch) ma tekst „+500”, moneta 24×18 px (mac-wide 30×18), w rzędzie wystaje do 16 px poza planszę (było 14). Tekst czytnika „linia jednego koloru, Kolorowa rabata +500” (było „…, punkty ×2”).

### Usunięte

- `component.level-up-badge` (plakietka „Poziom n!” na wyniku, 1500 ms) — awans jest wpisem karty. `element.game.level-up` zostaje, ale **zmienia znaczenie**: wiersz „Nowy poziom n · ogród” w karcie ruchu (było: plakietka na wyniku).
- Osobna pochwała nad środkiem planszy (800 ms) — pochwała jest w karcie; `component.praise` i `element.game.praise` zostają (warianty bez zmian; `empty-garden` dalej jako napis święta na planszy).
- Dopiski punktów „podlewanie +N” i „kolorowa rabata +N” w pasku, reguła Q203 (zostaje jeden dopisek) i zwarte Podlewanie na pasku telefonu (`is-tight`); `component.move-points` / `element.game.move-points` zostają jako część karty (suma i rozbicie). Punkty ruchu w r7.2 zostawały do następnego położenia; teraz trwają jak karta, 2400 ms.
- Animacje „Ruch” 5 (punkty ruchu) i 10 (plakietka awansu; zostaje wyskok etykiety poziomu), stałe `BG.MOTION.praise` i `BG.MOTION.levelUp`.
- Teksty fixture: `move_combo`, `move_mono`, `level_up`, `level_up_sr`. Nowe: `card_cells`, `card_line_1`, `card_lines_few`, `card_lines_many`, `card_watering`, `card_flowerbed`, `card_empty`, `card_level`, `full_watering`. Zmienione: `bonus_badge` („+500”), `bonus_sr`.
- Flagi scenariuszy `levelUp` i `showPraise` (klatkę stanu po ruchu wylicza teraz karta z ruchu scenariusza).

### Stany

- Nowe (5): `game.watering-bud` (×4, pąk, pełne krople), `game.move-card-record` (karta z „Nowy rekord!”), `game.level-up-no-clear` (ruch bez czyszczenia z awansem), `game.full-watering` (klatka kluczowa święta; w `user_preview` cały przebieg), `game.dragging-under-card` (tylko `iphone-se`: największa karta przygaszona nad niesionym klockiem). Razem 49 stanów, 8 targetów, 385 par.
- Zmienione: `game.level-up` — ma teraz ruch scenariusza (wynik 780 → 1014, „Świetnie!”, awans na 3) i odtwarzanie; wcześniej stała plakietka bez ruchu (wynik 860). Wszystkie stany z ruchem (`game.line-clear`, `game.color-bonus`, `game.combo`, `game.combo-color`, `game.level-up-praise`, `game.empty-garden*`, `game.praise-*`, `game.flower-bed`) pokazują w capture kartę ruchu zamiast pochwały nad planszą, punktów w pasku i plakietki awansu.
- Pokrycie briefu: karta dla każdego szczebla (`game.praise-great`, `-wonderful`, `-amazing`, `-paradise`), z awansem (`game.level-up`, `game.level-up-praise`), z rekordem (`game.move-card-record`), z Kolorową rabatą (`game.flower-bed`, `game.color-bonus`), ruch bez czyszczenia z awansem (`game.level-up-no-clear`), święto (`game.full-watering`, opis przebiegu: `responsive-spec.md` wiersz 15), pigułka na każdym stopniu (×2 `game.classic-resumed`, ×3 `game.combo`, ×4 `game.watering-bud` i `game.watering-wilt`, ×5 `game.praise-amazing`, ×6 `game.praise-paradise`, ×7 `game.watering-gold`; wszystkie stopnie w katalogu na każdym targecie), Pusta grządka bez zmian (`game.empty-garden`, `game.empty-garden-level-up`).

### Runtime i dokumenty

- `assets/bloomgrid-ui.js`: `BG.moveCard`, `BG.cardFor`, `BG.pointParts`, `BG.lineLabel`, nowe `BG.movePoints`, `BG.fullWatering`, `BG.fx.card`, `BG.fx.fullWatering`; w `BG.play` karta (`o.card`, `o.milestones`), przygaszenie nad klockiem, święto przy ×6; `BG.fitHeight` z paskiem 56 px; `d.carry` w statycznym przeciąganiu (klocek poza planszą). Usunięte `BG.levelUpBadge`, `BG.fx.praise`, `BG.fx.levelUp`, dopasowanie dopisków (`fitPoints`).
- `index.html`: miejsce karty (gniazdo mac-wide, warstwa telefonów), wpisy awansu i rekordu, klatka karty w stanach z ruchem, klatka święta; bez plakietki awansu.
- `catalog.html`: nowe sekcje `component.move-card`, `component.full-watering`; zmienione `component.move-points`, `component.combo-badge`, `component.level-label`, `foundation.motion` (wiersze 3, 5, 10, 12, —, nowe 14 i 15; dema z kartą), plan stanów; usunięta sekcja `component.level-up-badge`.
- `responsive-spec.md`: nowa sekcja „Karta ruchu i święto pełnego podlania (r7.3)”, zmiany oznaczone „r7.3” w sekcjach wysokości okna, geometrii, telefonów, mac-wide, poziomów, Pustej grządki, pochwał i „Ruch”.

## r7.2

- Rewizja bazowa: `r7.1` (commit d6d3481).
- Rewizja docelowa: `r7.2`.
- Migracje ID: brak (`id_migrations: []`). Publiczne ID, stany, wygląd i układ bez zmian; żadne publiczne ID nie zmieniło się.
- Wejście: decyzja Reprezentanta Q254. Wymaganie R-2.10 odsyła do wiersza 12 (r7) w „Ruch”, a kod i testy działają według Q254. Obrazy: bez wywołań generatora.

### Zmiana: trójka po święcie Pustej grządki przy ograniczeniu ruchu (Q254)

- `responsive-spec.md`, „Ruch”, wiersz 12 (r7), kolumna reduced-motion: było „trójka po 150 ms”, jest „trójka wjeżdża po 1900 ms także przy ograniczeniu ruchu (wjazd jak 7), bo pauza święta jest regułą produktu, a nie animacją; pominięcie działa po 600 ms (Q254)”. Reszta komórki (napis, płatki tylko przezroczystością, wynik od razu) bez zmian.
- `catalog.html`, `foundation.motion`, wiersz 12: ten sam opis przy reduced-motion (czas z `BG.MOTION.emptyDeal`).
- `assets/bloomgrid-ui.js`, `BG.fx.emptyGarden`: wjazd trójki (`o.after`) zawsze po `BG.MOTION.emptyDeal` (1900 ms), także przy reduced-motion (było 150 ms). Dotyczy demo w katalogu i odtwarzania stanów `game.empty-garden`, `game.empty-garden-level-up` w `index.html`. Sam wjazd przy reduced-motion jak w wierszu 7 (przezroczystość 150 ms).

## r7.1

- Rewizja bazowa: `r7` (commit 33b1276).
- Rewizja docelowa: `r7.1`.
- Migracje ID: brak (`id_migrations: []`). Publiczne ID, stany, wygląd i układ bez zmian.
- Wejście: decyzja Tomasza i Reprezentanta Q237 (2026-11-14), krąg „dzień w podróży”, oraz Q219: tło poziomu 1 inne niż tło ekranu startowego. Obrazy: bez wywołań generatora.

### Zmiana: krąg motywów poziomów (Q237)

- Poziom n gry klasycznej ma motyw numer (n − 1) mod 6 z kręgu:
  1. Łąka o świcie (`dawn-meadow`)
  2. Kwietna ściana (`blossom-wall`)
  3. Staw z liliami (`lily-pond`)
  4. Żywopłot (`hedge`)
  5. Ogród o zmroku (`garden-dusk`)
  6. Noc świetlików (`firefly-night`)

  Poziom 7 to znów Łąka o świcie. W r7 krąg zaczynał się od Kwietnej ściany, w kolejności R-5.4.
- Runtime: `BG.CIRCLE` ma nową kolejność. `index.html` liczy motyw wyłącznie z poziomu (start kręgu 0) i ustawia go jako tło gry klasycznej. Etykieta poziomu, plakietka awansu i przenikanie przy awansie na żywo idą za kręgiem.
- Pozostałe miejsca:
  - katalog: opis kręgu w `foundation`; okazy kręgu i awansu biorą kolejność z `BG.CIRCLE`;
  - `responsive-spec.md`: sekcja „Etykieta poziomu”;
  - `README.md`: tabela „Tła stanów”.
- Bez zmian: ekran startowy (zawsze `blossom-wall`) i wyzwanie dnia (tło z daty, modulo 3).

### Zmienione scenariusze (pole `background`, fixture `default`; „także EN” = również `english`)

- poziom 1 → `dawn-meadow`: `game.classic-start` (także EN), było `blossom-wall`;
- poziom 3 → `lily-pond`: `game.line-clear`, `game.level-up`, `game.praise-great`, było `garden-dusk`;
- poziom 4 → `hedge`, było `dawn-meadow`: `game.classic-resumed`, `game.dragging-fits`, `game.color-bonus`, `game.combo-color`, `game.save-error`, `game.crash`, `game.music-muted`, `game.level-up-praise`, `game.praise-wonderful`, `game.flower-bed`, `game.watering-wilt`;
- poziom 5 → `garden-dusk`, było `hedge`: `game.combo`, `game.level-5`, `game.praise-amazing`, `game.empty-garden-level-up`;
- poziom 7 → `dawn-meadow`: `game.empty-garden`, było `blossom-wall`;
- poziom 9 → `lily-pond`: `game.over-classic-tied`, było `garden-dusk`;
- poziom 10 → `hedge`: `game.over-classic-new-record`, było `dawn-meadow`.
- Bez zmian (poziom 6, `firefly-night` w obu kręgach): `game.dragging-line-preview`, `game.over-classic` (także EN), `game.no-moves-classic` (także EN), `game.level-6`, `game.praise-paradise`, `game.watering-gold`.
- Razem 23 zmienione scenariusze (22 w `default`, 1 w `english`).
- Odtworzenie i awans na żywo: `game.empty-garden-level-up` przechodzi z Żywopłotu (poziom 4) do Ogrodu o zmroku (poziom 5), `game.level-up-praise` ze Stawu z liliami (3) do Żywopłotu (4), `game.level-5` z Ogrodu o zmroku (5) do Nocy świetlików (6).

## r7

- Rewizja bazowa: `r6` (zaakceptowana, commit c57f4bf)
- Rewizja docelowa: `r7`
- Migracje ID: brak (`id_migrations: []`). Zachowane ID r6; `element.home.sound` i `element.game.sound` (z interakcjami) znaczą teraz „Efekty” — przełącznik efektów dźwiękowych (dawny jeden przełącznik dźwięku). Usunięty stan `home.sound-muted` (zastępują go `home.music-muted` i `home.all-muted`).
- Wejście: brief r7 i dodatek (decyzje Tomasza i Reprezentanta z 2026-11-14), odpowiedzi Q232–Q234. Zakres: tylko wygląd i ruch elementów; dźwięk i logikę gry robi aplikacja.
- Obrazy z generatora (`process image generate`, model `google/gemini-3-pro-image`, wsad 6 obrazów uruchomiony przez Lidera, koszt 0,839 USD): roślina Podlewania w 5 stopniach i wariant zwiędły.
  - Oryginały z pochodzeniem: `assets/generated/plant-1-sprout`, `plant-2-leaves`, `plant-3-bud`, `plant-4-flower`, `plant-5-gold`, `plant-wilt` (`.png` + `.json`).
  - Prompty: `assets/prompts/plant-*.txt`. Obraz wzorcowy: `assets/img/tile-leaf.webp`.
  - Obrazy w grze: `assets/img/plant-1…5.webp` i `plant-wilt.webp`, 88×96 px. Wycinek opisuje `assets/img/derived.json`: tło usunięte, doniczka tej samej szerokości, WebP z alfą.
  - Ikona nuty i krople to dalej własne rysunki SVG. Rysunek SVG rośliny (`BG.plantSVG`) zastąpiły obrazy.

### Dodane stany (11) i usunięty (1)

| Stan | Opis |
|---|---|
| `home.music-muted` | muzyka wyciszona, efekty włączone (zastępuje `home.sound-muted`) |
| `home.all-muted` | muzyka i efekty wyciszone |
| `game.music-muted` | gra z wyciszoną muzyką |
| `game.praise-great`, `game.praise-wonderful`, `game.praise-amazing`, `game.praise-paradise` | ruch 2 linie (bez linii jednego koloru) przy podlewaniu po ruchu 1 / 3 / 5 / 6 — siła ruchu S = 2 / 4 / 6 / 7: „Świetnie!” / „Wspaniale!” / „Cudownie!” / „Rajski ogród!” (Q233) |
| `game.flower-bed` | linia jednego koloru: „Kolorowa rabata!”, „kolorowa rabata +500” (Q234) |
| `game.watering-wilt` | podlewanie ×4 (pąk), jedna kropla — roślina lekko więdnie |
| `game.watering-gold` | podlewanie ×7 — złoty kwiat |
| `game.empty-garden-level-up` | święto Pustej grządki i awans w tym samym ruchu |

Razem 44 stany × 8 targetów = 352 pary. Stany z ruchem i pochwałą mają w `user_preview` odtwarzanie: start sprzed ruchu, po 0,7 s od gotowości prototyp sam wykonuje ruch ze scenariusza (widać pochwałę, Podlewanie, Kolorową rabatę, święto, awans); „▶ Odtwórz animację” w pasku narzędzi podglądu powtarza (Tomasz ogląda animacje na stronie prototypu). `capture` pokazuje stałą klatkę po ruchu.

### Dodane i zmienione komponenty, ID i teksty

- `component.sound-toggle`: warianty `music` i `effects` (`data-kind`). Nowe `element.home.music` + `interaction.home.music-toggle`, `element.game.music` + `interaction.game.music-toggle`. Para „Muzyka” (nuta; wyciszona — nuta przekreślona) i „Efekty” (głośnik; wyciszony — głośnik z krzyżykiem), obie z `aria-pressed`, domyślnie włączone. Teksty: `music` „Muzyka” / „Music”, `sound` „Efekty” / „Sound effects”. Pola fixture: `music: false`, `sound: false`.
- `component.combo-badge` (ID bez zmian; brief nazywa go `component.combo`): „Podlewanie” zamiast „Seria ×c” — roślina w doniczce w 5 stopniach (×2 kiełek, ×3 listki, ×4 pąk, ×5 kwiat, ×6+ złoty kwiat z blaskiem), „×c” i trzy krople zapasu (3 − ruchy bez czyszczenia); przy ostatniej kropli roślina lekko więdnie. Nowy stopień: skok i rozbłysk 300 ms; utrata: więdnięcie i opadnięcie 400 ms. Teksty `combo` „Podlewanie ×{c}”, `combo_drops_sr`. Wariant skrócony z r6 (Q199) zastępuje wariant zwarty: ta sama roślina, „×c” i krople, ale krople w kolumnie (niżej).
- `component.praise`: warianty `great`, `wonderful`, `amazing`, `paradise` (drabina, Q233), `flowerbed` (Kolorowa rabata, Q234), `empty-garden` (święto); poprzednie `two`/`three` zastąpione. Teksty `praise_4` „Cudownie!” / „Amazing!”, `praise_5` „Rajski ogród!” / „Paradise!”, `praise_flowerbed` „Kolorowa rabata!” / „Flower bed!”; `praise_empty` z premią 2500.
- `component.move-points`: dopiski „podlewanie +N” (zamiast „seria +N”) i „kolorowa rabata +500” (za każdą linię jednego koloru, zamiast „jeden kolor +…”); reguła braku miejsca bez zmian (zostaje dopisek o większej wartości).
- `component.level-label`, `component.mode-label`: na telefonach w wierszu 24 px pod nagłówkiem, jedna linia „Poziom n · ogród” / „Wyzwanie dnia · data” (Q232); kropka środkowa (`.bg-level-dot`, `.bg-mode-dot`) widoczna tylko w tym wierszu. mac-wide bez zmian.
- Model punktów prototypu (`bloomgrid-rules.js`): linia jednego koloru +500 zamiast ×2 (Q234) — tylko po to, żeby stany i podgląd pokazywały liczby zgodne z decyzją; punktację wdraża aplikacja. Premia Pustej grządki 2500 jest daną stanu (`move.emptyBonus`).
- Runtime: `BG.plantSVG`, `BG.dropSVG`, `BG.plantStage`, `BG.PRAISE`, `BG.praiseRung`, `BG.praiseFor`, `BG.petalBurst`, `BG.screenPetals`, `BG.fx.grow`, `BG.fx.wither`, `BG.fx.emptyGarden` (święto), `play().playMove` (odtwarzanie), `BG.MOTION` (emptyGarden 2500, emptyCount 1500, emptyDeal 1900, emptyLevelDelay 1500, grow 300, wither 400); pasek podglądu z „▶ Odtwórz animację”.

### Zmiana: nagłówek gry i ekran startowy (brief r7, Q232)

- Telefony (także w poziomie): w nagłówku dom, „Muzyka”, „Efekty” i rekord; etykieta poziomu albo wstęga wyzwania w wierszu 24 px pod nagłówkiem, w jednej linii, bez zawijania; gdy brak miejsca, nazwa ogrodu (albo data) skraca się wielokropkiem. Zmierzone (poziom 2504, najdłuższa nazwa ogrodu PL i EN, rekord 9 999 999, wstęga z datą): na każdym targecie i przy 375×548, 390×660, 852×340 jedna linia, bez przycięcia i bez wielokropka (Raport kontroli).
- Najmniejsze odstępy w pionie (Q232): góra i dół 4 px (było 8), wynik pod wierszem poziomu 4 px, trójka pod planszą 8 px (było 12).
  - Odstęp wyniku: proponowałem 0 px, ale wtedy tabliczka wyniku (wystaje 4 px w górę) nachodziła na tabliczkę wiersza poziomu, do 4,5 px na `iphone-se`, 390×660 i 375×548. Dlatego ma 4 px, a tabliczka wiersza ma 20 px i stoi 2 px od jego dołu. Między tabliczkami zostają co najmniej 2 px.
  - Dalej nic nie zmniejszałem. 375×548 nadal mieści się bez przewijania z polem 32 px: układ `phone-merged` potrzebuje dokładnie 548 px.
- Podlewanie w ciasnym miejscu, wariant zwarty: krople w kolumnie, roślina 38 px szerokości, pigułka ok. 78 px zamiast ok. 113 px.
  - Obowiązuje zawsze w wierszu wyniku `phone-merged`, z pigułką przy dolnej krawędzi wyniku, żeby roślina nie sięgała do wiersza poziomu.
  - Na pasku telefonu włącza się, gdy suma i oba dopiski nie mieszczą się obok pełnej pigułki. Dopiero potem działa reguła Q203 (jeden dopisek).
  - `phone-merged`: wiersz wyniku jest 12 px szerszy z każdej strony niż plansza. Dopisek w nim ma 11,5 px, nie ma ikony i zajmuje najwyżej 2 wiersze, bo „kolorowa rabata +500” w 3 wierszach wydłużała ekran 375×548 o 3 px.
- mac-wide: dom, „Muzyka”, „Efekty” po lewej, poziom albo wstęga w środku, rekord po prawej (jak r6, o jeden przycisk szerzej).
- Ekran startowy: para przełączników w prawym górnym rogu; na telefonach w pionie w osobnym rzędzie nad znakiem (znak 56 px niżej, obrazek zmniejsza się na niskich oknach).

### Zmiana: pochwały i święto (dodatek r7, Q233, Q234)

- Jedna pochwała na ruch, pierwszeństwo: Pusta grządka, Kolorowa rabata (linia jednego koloru), drabina według siły ruchu S = L + max(0, c − 1): S = 1 bez pochwały, 2–3 „Świetnie!”, 4–5 „Wspaniale!”, 6 „Cudownie!”, ≥ 7 „Rajski ogród!”. Zastępuje „2 linie Świetnie, 3+ Wspaniale”.
- Drabina: każdy szczebel większy (26 / 30 / 34 / 38 px, mac-wide 34 / 38 / 42 / 48 px) i z mocniejszym blaskiem; „Rajski ogród!” złoto-różowy z rozbłyskiem 16 płatków. Ok. 800 ms nad środkiem planszy, nigdy na trójce; reduced-motion: tylko przezroczystość.
- Kolorowa rabata: różowa pigułka „Kolorowa rabata!” ze złotym błyskiem wzdłuż linii (jak dotąd), dopisek „kolorowa rabata +500”.
- Święto Pustej grządki (ok. 2,5 s, największe w grze): rozkwit planszy falą od środka, płatki lecą przez cały ekran, „Pusta grządka! +N” (32 px, mac-wide 48 px; premia w grze klasycznej max(1000, 500 × poziom), w wyzwaniu dnia 2000 — korekta Lidera; w prototypie liczona z poziomu, na którym zagrano ruch) z doliczaniem wyniku (1,5 s), nowa trójka wjeżdża po napisie (1,9 s); przy awansie w tym samym ruchu plakietka awansu pojawia się 1,5 s później. reduced-motion: bez fali, lotu płatków i skali, tylko przezroczystość.

### Poprawka: poziom → motyw (Q219, tylko dane fixture)

- Poziom 1 to „Kwietna ściana” (Q219). Tło i nazwa ogrodu wynikają wyłącznie z poziomu: poziom n ma motyw kręgu R-5.4 o numerze (n − 1) mod 6.
- Krąg: 1 Kwietna ściana (`blossom-wall`), 2 Staw z liliami (`lily-pond`), 3 Ogród o zmroku (`garden-dusk`), 4 Łąka o świcie (`dawn-meadow`), 5 Żywopłot (`hedge`), 6 Noc świetlików (`firefly-night`), 7 znów Kwietna ściana i dalej co 6.
- Kolejność jest wzięta z R-5.4. W uzupełnieniu Lidera stały numery 4 Ogród o zmroku, 5 Łąka o świcie i 6 Żywopłot. Przy poziomie 1 = Kwietna ściana i kolejności R-5.4 te motywy wypadają na poziomach 3, 4 i 5. Stan na poziomie 6 ma więc „Noc świetlików”.
- Wcześniej prototyp brał początek kręgu z tła stanu, więc ten sam poziom miał różne motywy w różnych stanach (np. poziom 4: „Kwietna ściana” w `game.flower-bed`, „Ogród o zmroku” w `game.watering-wilt`; poziom 6: „Staw z liliami” w `game.praise-paradise`).
- Zmienione pole `background` w fixture, według poziomu stanu po ruchu:
  - poziom 1 → `blossom-wall`: `game.classic-start` (także EN);
  - poziom 3 → `garden-dusk`: `game.line-clear`, `game.level-up`;
  - poziom 4 → `dawn-meadow`: `game.classic-resumed`, `game.dragging-fits`, `game.color-bonus`, `game.combo-color`, `game.save-error`, `game.crash`, `game.music-muted`, `game.level-up-praise`, `game.flower-bed`, `game.watering-wilt`;
  - poziom 5 → `hedge`: `game.combo`, `game.level-5`, `game.empty-garden-level-up`;
  - poziom 6 → `firefly-night`: `game.dragging-line-preview`, `game.over-classic` (także EN), `game.no-moves-classic` (także EN), `game.praise-paradise`;
  - poziom 9 → `garden-dusk`: `game.over-classic-tied`;
  - poziom 10 → `dawn-meadow`: `game.over-classic-new-record`.
  - Bez zmian: `game.praise-great`, `game.praise-wonderful`, `game.praise-amazing`, `game.level-6`, `game.watering-gold`, `game.empty-garden`, stany wyzwania dnia (tło z daty) i ekranu startowego.
- Kontrola `tmp/r6-build/motif7.cjs` obejmuje wszystkie 31 stanów gry klasycznej (fixture `default` i `english`). Sprawdza dane, a w renderze capture na iphone-standard i mac-wide także `data-background`, etykietę poziomu i plakietkę awansu.

### Zmienione stany (bez zmiany ID)

- Wszystkie stany gry: dwa przełączniki w nagłówku; na telefonach wiersz poziomu (albo wstęgi) pod nagłówkiem. Wszystkie stany startowe: dwa przełączniki.
- Stany z serią ≥ 2: roślina Podlewania zamiast „Seria ×c”.
- `game.level-up-praise`: ruch z linią jednego koloru — przy Q234 pochwała to „Kolorowa rabata!” (było „Świetnie!”); wynik 1580 → 2402.
- `game.color-bonus`: wynik przed ruchem 2900 (było 3120), żeby ruch z premią +500 nie przekroczył progu 3500 bez pokazania awansu.
- `game.empty-garden`: poziom 7, premia +3500 (max(1000, 500 × 7)), wynik 9100 → 12 681, bez awansu; tło `blossom-wall` (motyw poziomu 7).
  - Poziom 7 jest jedynym, na którym ruch z premią mieści się w progu bez awansu. Ruch daje premię i 81 punktów za ruch, a zakres poziomu to: 5 — 2500 (premia 2500), 6 — 3000 (premia 3000), 7 — 4000 (premia 3500).
- `game.empty-garden-level-up`: ruch na poziomie 4, premia +2000 (było +2500), wynik 2100 → 4181, awans na poziom 5; tło `hedge` (motyw poziomu 5, poprawka Q219 niżej).

## r6

- Rewizja bazowa: `r5` (zaakceptowana, wdrożona w BLG-13, commit 0615a4f)
- Rewizja docelowa: `r6`
- Migracje ID: brak (`id_migrations: []`); wszystkie ID r5 zachowane, żadne nie zmienia znaczenia. Kontrakt `interaction.game.drag-piece-1…3` jak w r5.
- Wejście: decyzje Q147–Q153 (poziomy), Q175 (stany po ruchu), Q176 (deszcz płatków), Q184 (napis „Ekran startowy”), Q185 (stuknij-stuknij Q154–Q160 wycofane), Q177–Q181 i Q199–Q202 (mieszczenie się w oknie), Q188, Q189, Q197 (progi, plakietka awansu, pusta grządka), Q203 (pochwała pustej grządki, dopiski punktów). Q182, Q186, Q187 — poza zakresem prototypu (niżej).
- Nowy target `iphone-se` 375×667 (Q178): 8 targetów, 34 stany, 272 pary stan × target. Pomiary bez par: 390×660, 375×548, 1280×680, 852×340, 320×449 (README, Raport kontroli).
- Obrazy: bez nowych wywołań generatora w tej rewizji. Trzy nowe tła pochodzą z obrazów wygenerowanych wcześniej na zlecenie Lidera (`tmp/r6-backgrounds`, `process image generate`, model google/gemini-3-pro-image, 0,14 USD za obraz); do paczki weszło 6 z nich (oryginały i pliki pochodzenia w `assets/generated/`, prompty skopiowane do `assets/prompts/` — pole `prompt_file` w plikach pochodzenia wskazuje ich pierwotne miejsce w `tmp/r6-backgrounds/prompts/`):
  - `bg-lily-pond-desktop-v2` → `assets/img/bg-lily-pond-desktop.webp`: wycinek `[72, 92, 1274, 768]` (1202×676, 16:9), bo wariant v2 ma przy krawędziach brzeg papieru; brak brzegu w wycinku sprawdzony wzrokowo i wykrywaniem krawędzi (`tmp/r6-build/edges.cjs`, receipty 741, 756, 758). Prompt `bg-lily-pond-v2.txt`.
  - `bg-lily-pond-phone` → `bg-lily-pond-phone.webp` (pełny kadr). Prompt `bg-lily-pond.txt`.
  - `bg-dawn-meadow-desktop` → `bg-dawn-meadow-desktop.webp` (pełny kadr). Prompt `bg-dawn-meadow.txt`.
  - `bg-dawn-meadow-phone-v2` → `bg-dawn-meadow-phone.webp` (pełny kadr). Wybór v2, nie v1: wariant v1 ma namalowaną białą ramkę (u góry do 459 px, po bokach do 256 px), której wycinek 9:16 nie usuwa bez utraty łąki; v2 jest pełnym kadrem w tym samym stylu i porze dnia. Prompt `bg-dawn-meadow-v2.txt`.
  - `bg-firefly-night-desktop`, `bg-firefly-night-phone` → `bg-firefly-night-desktop.webp`, `bg-firefly-night-phone.webp` (pełne kadry). Prompt `bg-firefly-night.txt`.
  - Kopie oryginałów i promptów do paczki (receipty 742, 743), wycinki i WebP q90 (`slice.cjs`, `cwebp` przez `process command run`, receipty 744–759; 741 i 756–758 to wykrywanie brzegu); pochodzenie każdego pliku w `assets/img/derived.json`. Obrazy ładowane przez grę: 41 plików, 1,83 MB (limit 3 MB).

### Dodane stany (6)

| Stan | Fixture | Targety | Opis |
|---|---|---|---|
| `game.level-up` | default | wszystkie | chwila awansu na poziom 3 (wynik 860): nowe tło `dawn-meadow`, etykieta „Poziom 3 · Łąka o świcie”, plakietka „Poziom 3!” na wyniku (stała w capture; w user_preview znika po 1,5 s) |
| `game.level-5` | default | wszystkie | poziom 5, tło `lily-pond`, wynik 5940; w user_preview kwadrat 2×2 w lewym górnym rogu czyści kolumnę i daje awans na poziom 6 (`garden-dusk`, 6024) z plakietką i przenikaniem |
| `game.level-6` | default | wszystkie | poziom 6, tło `firefly-night`, wynik 6480 (inna gra, inny początek kręgu) |
| `game.level-up-praise` | default | wszystkie | Q188: stan po ruchu, który czyści 2 linie i daje awans na poziom 4 (1580 → 2062, tło `hedge`): plakietka „Poziom 4!” na wyniku i „Świetnie!” nad planszą — naraz, w różnych miejscach |
| `game.empty-garden` | default | wszystkie | Q189, Q203: stan po ruchu, który opróżnia planszę (2100 → 2481, w tym premia +300 z danych stanu; poziom 4 bez awansu): rozkwit na całej planszy, pochwała „Pusta grządka! +300”, punkty ruchu z sumą (bez dopisku premii) |
| `game.combo-color` | default | wszystkie | Q203: ruch w serii czyszczący linię jednego koloru (2240 → 2551): dopiski „seria +150” i „jeden kolor +…”; gdzie się nie mieszczą (mobile-compact, niskie okno w pionie) zostaje dopisek o większej wartości |

Razem 34 stany; z nowym targetem `iphone-se` 272 pary stan × target.

### Usunięte w trakcie r6 (Q185) — ID kandydata r6, nie r5

Stuknij-stuknij (Q154–Q160) było w kandydacie r6 i zostało wycofane decyzją Q185 przed przyjęciem rewizji. Żadne z tych ID nie istniało w r5, więc nie ma migracji:

- stany `game.tap-selected`, `game.tap-preview`, `game.tap-hint`;
- `component.tap-hint`, `element.game.tap-hint`, `element.game.tap-hint.close`, `interaction.game.tap-hint-close`;
- `interaction.game.board-tap` (kontrakt stuknięcia na `element.game.board`; element zostaje, bez interakcji jak w r5);
- wariant klocka `selected`, atrybut slotu `data-selected`, znacznik pola `data-tap="target"`;
- teksty fixture `tap_hint`, `tap_hint_close`, `piece_selected_sr`; pola scenariusza `tap`, `tapHint`;
- runtime: `BG.tapHint`, `BG.centerCell`, ikona `tap`, logika `TAP_PX` / `TAP_MS` (zaznaczanie, podgląd pod stukniętym polem, anulowanie zaznaczenia).
- Q203 (też kandydat r6): `component.empty-garden`, `element.game.empty-garden` (pusta grządka jest teraz wariantem pochwały `component.praise` / `element.game.praise`, `data-variant="empty-garden"`), dopisek punktów `data-note="empty"`, teksty `move_empty`, `empty_garden`, `empty_garden_sr` (zastępuje je `praise_empty` „Pusta grządka! +{n}”).

### Dodane komponenty i ID

- `component.level-label` (Q147, Q151): `element.game.level` — środek nagłówka gry klasycznej, „Poziom n” i nazwa motywu; zwykły tekst (bez `aria-live`).
- `component.level-up-badge` (Q150, Q188): `element.game.level-up` — plakietka awansu na wyniku (nie na planszy ani trójce), `role="status"`, 1,5 s.
- `component.praise`: nowy wariant `data-variant="empty-garden"` (Q189, Q203) — „Pusta grządka! +300” / „Clear garden! +300” nad środkiem pustej planszy, z rozkwitem na całej planszy (warstwa efektów, bez ID); tekst `praise_empty`; pola scenariusza `move.emptyBonus`, `emptyGarden`, `praise`.
- `component.combo-badge`: wariant skrócony w wierszu wyniku (Q199) — ikona i „×c”, pełny tekst dla czytnika (`.bg-combo-full`, `.bg-combo-short`, `.bg-sr`).
- `component.alert`: wariant jednowierszowy `is-line` błędu zapisu (Q201), tekst `save_error_short` „Nie zapisano” / „Not saved”, pełny tekst dla czytnika.
- Runtime: `BG.fitHeight` (dopasowanie do wysokości okna), `BG.MIN_CELL` (32), `data-layout` na powierzchni (`phone`, `phone-merged`, `landscape`, `wide`).
- `element.game.over.level` (Q152): w panelu końca gry klasycznej „Poziom n · nazwa motywu”; w wyzwaniu dnia brak.
- Teksty fixture (pl / en): `level`, `level_up`, `level_up_sr`, `over_level`, `motifs` (nazwy sześciu motywów). Pole scenariusza: `levelUp`.
- Runtime: `BG.CIRCLE`, `BG.levelThreshold`, `BG.levelOf`, `BG.motifOf`, `BG.fx.levelUp`, `BG.fx.crossfade`, `BG.MOTION.levelUp` (1500), `BG.MOTION.crossfade` (800).
- Katalog: sekcje `component.level-label`, `component.level-up-badge` (z „Odtwórz”); krąg sześciu motywów w `foundation.palette`; wiersze 10 i 11 z demo „Odtwórz awans” w `foundation.motion`; poziom w okazach panelu końca; zdanie o interakcji w `component.piece`; plan stanów r6.

### Zmienione stany (bez zmiany ID)

- `game.line-clear`, `game.color-bonus`, `game.combo` (Q175): stan po ruchu — plansza po czyszczeniu (bez bladej ramki i pomniejszonych pól czyszczenia), wynik po ruchu, punkty ruchu, seria. Rozkwit tylko w katalogu (`foundation.motion`) i na żywo.
- Wszystkie stany gry klasycznej: etykieta poziomu w środku nagłówka (był pusty). Poziom wynika z wyniku stanu (Q153), motyw = tło stanu.
- `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-classic-tied`: linia poziomu w panelu (panel +28 px, elementy panelu przesunięte).
- Stany wyzwania dnia: bez zmian (bez poziomów, Q147).

### Zmiana: poziomy (Q147–Q153)

- Krąg sześciu motywów w kolejności `blossom-wall`, `lily-pond`, `garden-dusk`, `dawn-meadow`, `hedge`, `firefly-night` — tła dzienne i wieczorne na przemian, żeby kolejne awanse wyraźnie zmieniały scenę (decyzja Designera o kolejności; brief jej nie ustala). Gra klasyczna zaczyna na losowym motywie kręgu; poziom n ma motyw `CIRCLE[(start + n − 1) mod 6]`.
- Progi (Q197; zastępują 300/800/1500/2500/4000/6000/co 2500 z Q188 i 2000/5000/9000/14 000/20 000/co 8000 z Q149): 300, 800, 2000, 3500, 6000, 9000, dalej co 4000. Wyniki stanów poziomów dopasowane (`game.level-up` 860, `game.level-5` 5940, `game.level-6` 6480, `game.level-up-praise` 1580 → 2062); `levels.cjs` sprawdza, że żaden stan z ruchem nie przekracza progu bez pokazania awansu (`game.combo` 4210 → 4682 zostaje na poziomie 5, wynik jak w r5). Pozostałe stany gry klasycznej mają przy nowych progach wyższe poziomy (np. `game.over-classic` 6842 — poziom 6), motyw = tło stanu. Poziom = 1 + liczba osiągniętych progów; nie jest osobno zapisywany (Q153) — wznowiona gra liczy go z wyniku, a początek kręgu jest częścią zapisu gry jak tło w r5 (interpretacja Designera: zapis gry r5 już przechowuje tło, więc start kręgu nie jest nowym stanem).
- Awans: plakietka 1,5 s na wyniku (Q188: nie zasłania planszy ani trójki; telefony — w wierszu wyniku, mac-wide — na wyniku w kolumnie trójki; wysokość jak wynik), przenikanie tła 800 ms, etykieta wyskakuje. Pochwała z tego samego ruchu stoi jak dotąd nad planszą — oba elementy naraz, w różnych miejscach (wcześniej w kandydacie r6 pochwała była w ruchu z awansem tłumiona). Wynik na mac-wide dostał opakowanie `.bg-score-wrap` jak na telefonach (miejsce plakietki; geometria bez zmian). reduced-motion: tylko przezroczystość, przenikanie 150 ms, plakietka pojawia się i znika po 150 ms.
- Ekran startowy (`blossom-wall`) i tło wyzwania dnia (data modulo 3 z trzech pierwotnych teł, R-5.4) bez zmian — interpretacja Designera: brief zmienia tylko grę klasyczną, a zmiana reguły tła wyzwania zmieniłaby tło zapisanych podejść.
- Nazwy motywów mają najwyżej 14 znaków (PL), żeby etykieta mieściła się w nagłówku mobile-compact bez zawijania i bez zmiany wysokości nagłówka.

### Interakcja klocka (Q182, Q185, Q186, Q187 — poza zakresem prototypu)

Na polecenie Tomasza Designer projektuje wygląd, a logiki gestów nie wdraża. Kod przeciągania w prototypie jest taki jak w r5 (funkcje `start`, `move`, `up`, `cancel` i kontrakt `interaction.game.drag-piece-1…3` bez zmian względem r5; sprawdzone porównaniem z eksportem r5). Katalog (`component.piece`) opisuje interakcję jednym zdaniem: „dotknięcie lub wciśnięcie w slocie podnosi klocek; tylko przeciąganie (dotyk) albo przeciąganie i niesienie (mysz)”. Moment podniesienia (Q182), chwyt całym slotem i `touch-action` (Q186), niesienie myszą (R-1.10, R-1.11) i blokadę przewijania (Q187) wdraża Wykonawca w aplikacji według decyzji Reprezentanta. Robocze wdrożenie chwytu slotem i niesienia w trakcie r6 zostało cofnięte.

### Pusta grządka (Q189, Q203)

Ruch, po którym plansza jest pusta, daje premię +300 (punktację wdraża Wykonawca; w prototypie premia jest daną stanu `move.emptyBonus`). Wygląd: rozkwit na całej planszy — płatki pięciu kolorów na polach, falą od środka (pierścień co 60 ms, płatek 600 ms) — i pochwała „Pusta grządka! +300” nad środkiem pustej planszy, 1200 ms; ma pierwszeństwo przed „Świetnie!” i „Wspaniale!” (jedna pochwała na ruch). Tekst 26 px (mac-wide 40 px), zawija się wyśrodkowany w planszy. reduced-motion: bez fali i skali, płatki i pochwała tylko przezroczystość 150 ms. W `mode=capture` stała klatka (płatki na 24 polach, pochwała). Tabliczka punktów ruchu pokazuje sumę (z premią) bez dopisku „pusta grządka”. Animacja (12) w `foundation.motion` z „Odtwórz”; wiersz 12 w tabeli „Ruch” w `responsive-spec.md`.

### Dopiski punktów ruchu (Q203)

Tabliczka punktów pokazuje sumę oraz dopiski serii i koloru, gdy się mieszczą. Gdy nie (tabliczka wychodzi poza pasek albo wiersz wyniku, wchodzi na wskaźnik serii albo wynik), zostaje jeden dopisek — ten o większej wartości (przy równych: seria). Na szerszych ekranach oba. Stan `game.combo-color`: iphone-standard i szersze — oba dopiski; mobile-compact i 375×548 — „seria +150”.

### Wysokość okna (Q177–Q181, Q199–Q202)

- Zasada r2 „ekran telefonu ma co najmniej 800 px, niższe okno przewija” usunięta. Ekran ma wysokość okna (w aplikacji `100dvh`); każdy ekran — start, gra, krok końca, panel końca, dialog, komunikaty — mieści się bez przewijania do 375×548 w pionie i 852×340 w poziomie (Q181). Mniejsze okna przewijają się, pole planszy nigdy < 32 px.
- Pion: najpierw odstępy (góra 59 → 8, dół 34 → 8, wynik 8 → 4, trójka 16 → 12 px), potem plansza i trójka proporcjonalnie do pola 32 px, potem (Q199) seria i punkty w wierszu wyniku (`phone-merged`; przy szerokości 375 px okno < 578 px). Margines boczny 12 px, gdy przy 16 px pole byłoby < 32 px (okno < 344 px).
- Poziom (Q180, Q200): plansza po lewej na całą wysokość okna, po prawej kolumna 380 px z nagłówkiem (dom, dźwięk, poziom/nazwa trybu, rekord), wynikiem, paskiem i trójką. Ekran startowy w dwóch kolumnach (Q202). Panel końca i dialog z przyciskami obok siebie i mniejszymi odstępami.
- Laptop i mac-wide: plansza od wysokości okna (1280×680: pole 59 px), nagłówek = plansza + 72 + 380 px (siatka Q112); 1440×900 bez zmian.
- Komunikat błędu zapisu (Q201): gdy jego 76 px nie mieści się w kolumnie, leży na wierszu wyniku w wariancie jednowierszowym (ikona, „Nie zapisano”, „Spróbuj ponownie”, 56 px); zasłania wynik, serię i punkty, nigdy przycisków nagłówka, planszy ani trójki.
- Ekran startowy: te same odstępy, potem zmniejsza się obrazek (do 48 px).
- Zmierzone pola planszy: `iphone-se` 38 px (odstępy zmniejszone), 390×660 39 px, 375×548 32 px (`phone-merged`), 852×393 39 px i 852×340 32 px (`landscape`), 1280×680 59 px; 320×449 32 px, ekran przewija się o 87 px (poniżej granicy). Pozostałe targety bez zmian.

### Napis „Ekran startowy” (Q184)

Przycisk `element.game.over.to-home` po polsku: „Ekran startowy” (było „Do startu”); angielski bez zmian („Home”). Mieści się w jednym wierszu, wyśrodkowany, bez przycięcia na każdym targecie i przy 375×667 (pomiar w Raporcie kontroli).

### Poprawka: deszcz płatków (Q176)

Droga spadku płatka = wysokość karty + 48 px (było stałe 520 px). Na mac-wide karta ma 325 px, więc w r5 płatki opuszczały kartę po ok. 60% sekundy; teraz w 250 / 500 / 750 ms na karcie jest 14 / 18 / 18 z 18 płatków na mac-wide i iphone-standard.

### Zmienione geometrie względem r5 (zmierzone, 196 par stanów r5)

2187 różnic. `phone-landscape` (1713): nowy układ obok siebie (Q180, Q200) — zmienione położenia wszystkich elementów ekranu gry i startowego. Pozostałe 6 targetów po 79 (474), wszystkie z tej listy: nowy `element.game.level`; nowy `element.game.over.level` i przesunięte elementy panelu końca gry klasycznej; pola planszy w `game.line-clear`, `game.color-bonus`, `game.combo` (stan po ruchu bez pomniejszenia pól czyszczenia). Na tych targetach nagłówek, przycisk wyjścia, przełącznik dźwięku, rekord, wynik, plansza, trójka, panel wyzwania dnia i ekran startowy bez zmian — dopasowanie do wysokości (Q177) ich nie zmienia, bo mieszczą się w układzie naturalnym.

## r5

- Rewizja bazowa: `r4` (zaakceptowana, wdrożona w BLG-11, commit 1fcf7ab)
- Rewizja docelowa: `r5`
- Migracje ID: brak (`id_migrations: []`); żadne istniejące ID nie zmienia znaczenia
- Wejście: decyzje Reprezentanta Q128–Q139 (koniec gry, animacje), Q143 (przełącznik dźwięku), Q162 (komunikat bez przycisku); poprawka z odbioru BLG-11 (przycięty dopisek punktów)
- Nowy obraz z generatora: `petals` (1 wywołanie, 0,14 USD) → 5 płatków `assets/img/petal-<kolor>.webp`

### Dodane stany (5)

| Stan | Fixture | Opis |
|---|---|---|
| `home.sound-muted` | default | ekran startowy z wyciszonym dźwiękiem (Q143) |
| `game.no-moves-classic` | default | krok końca gry klasycznej: przygaszona plansza, oznaczona trójka, „Nie ma już miejsca na żaden klocek” (Q128, Q129) |
| `game.no-moves-classic.en` | english | jw. po angielsku („No room for any piece”) |
| `game.no-moves-daily` | default | krok końca wyzwania dnia (jeden slot pusty) |
| `game.over-classic-tied` | default | panel końca z „Rekord wyrównany” (wynik = rekord, Q130) |

W `user_preview` stany `game.no-moves-*` po 1,5 s (albo po stuknięciu, kliknięciu, Esc) przechodzą w panel końca; w `mode=capture` zostają na kroku.

### Dodane komponenty i ID

- `component.sound-toggle` (Q143): `element.home.sound` + `interaction.home.sound-toggle`, `element.game.sound` + `interaction.game.sound-toggle`; trwały przełącznik `aria-pressed`, nazwa „Dźwięk” / „Sound”, warianty `on`, `muted`.
- `component.no-moves-step` (Q128, Q131): `element.game.no-moves` + `interaction.game.no-moves-skip` (tap / klik / Escape → panel końca od razu, bez uruchomienia przycisku panelu), `element.game.no-moves.message`.
- `component.praise` (Q139): `element.game.praise` — chwilowa pochwała „Świetnie!” (2 linie) / „Wspaniale!” (3+), tylko na żywo, nie występuje w stanach capture.
- `component.game-over-panel`: nowe elementy `element.game.over.reason` (powód końca, zawsze) i `element.game.over.record-gap` (`data-variant` `gap` — „Do rekordu zabrakło N” — albo `tied` — „Rekord wyrównany”; brak przy nowym rekordzie i po podejściu innego dnia, R-3.6). Nowy parametr szablonu `recordBefore`.
- `component.piece`: nowy wariant `no-fit` (Q129) — tylko w chwili końca gry; slot ze znakiem przekreślonego koła i kreskowaniem. Nazwa dostępna klocka z dopiskiem „ — nie mieści się”.
- Teksty fixture (pl / en): `no_moves`, `no_fit_sr`, `over_reason`, `record_gap`, `record_tied`, `sound`, `praise_2`, `praise_3`. Fixture: `noMoves` w scenariuszu (krok końca), `sound: false` (wyciszony).
- Katalog: sekcje `component.sound-toggle`, `component.no-moves-step`, `foundation.motion` (animacje z przyciskami „Odtwórz”); wariant `no-fit` w `component.piece`; nowe warianty panelu końca.

### Zmienione stany (bez zmiany ID)

- `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-daily`, `game.over-daily.en`, `game.over-daily-new-day`: panel ma linię powodu „Brak ruchów — żaden klocek się nie mieści”; gdy wynik < rekord sprzed gry — „Do rekordu zabrakło …” (over-classic: 11 578, over-daily: 840, EN „11,578 short of your best”); pod panelem plansza przygaszona, klocki trójki oznaczone `no-fit`. Panel jest wyższy (mac-wide +59 px, telefony do +80 px), elementy panelu przesunięte.
- Wszystkie stany gry: przełącznik dźwięku w nagłówku obok przycisku wyjścia. Wszystkie stany startowe: przełącznik w prawym górnym rogu.

### Zmiana: animacje (Q135–Q139)

Dziewięć animacji i pochwała, opis, czasy i krzywe w `responsive-spec.md`, sekcja „Ruch”. Stan po ruchu jest od razu końcowy, a efekty grają na warstwie nad planszą, więc gra nie jest blokowana (r4: przez 340 ms czyszczenia nowe chwycenie nie startowało). Punkty ruchu zostają do następnego położenia (r4: znikały po 1,4 s). reduced-motion: tylko przezroczystość ≤ 150 ms (krok końca nadal 1,5 s). `mode=capture`: bez animacji.

### Poprawki po przeglądzie Reprezentanta

- Tytuł panelu końca w grze klasycznej: „Koniec gry” / „Game over” bez „· Gra klasyczna” / „· Classic” (Q107: tryb domyślny nie ma nazwy). Dotyczy `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-classic-tied` i panelu po grze klasycznej na żywo. W wyzwaniu dnia bez zmian: „Koniec gry · Wyzwanie dnia”. Zmiana tekstu, bez zmiany ID; nieużywany tekst `mode_classic` usunięty z fixture (nie ma go już w żadnym widoku).
- Przełącznik dźwięku na ekranie startowym na telefonach: prawa krawędź na prawej krawędzi treści (przycisków menu), było 4 px dalej w prawo (12 zamiast 16 px od krawędzi kolumny). Tabliczka znaku na telefonach wystaje 6 px w bok (było 10), żeby nie sięgała pod przełącznik. Na mac-wide oś już się zgadzała (x 1228 = prawa krawędź rekordu i trójki ekranu gry).

### Poprawki

- Q162: `component.alert` bez przycisku (`read-error`) — tekst wyśrodkowany w całym komunikacie, ikona przy lewej krawędzi. Na mobile-compact tekst zawija się w 2 wiersze, komunikat ma 59 px (był 40), kolumna menu rośnie w górę.
- Telefony: dopisek punktów ruchu („seria +150” w `game.combo`) był przycięty ramą planszy — punkty ruchu w jednym wierszu (suma, dopiski), zawartość paska wyśrodkowana w górnych 36 px paska 44 px. Zmienione geometrie: `element.game.combo` 4 px wyżej, `element.game.move-points` (telefony, stany z punktami).
- Katalog: okazy trójki na wąskim katalogu (mobile-compact) wychodziły poza ramkę okazu (było już w r4) — teraz w rozmiarze, który się mieści.

### Zmienione geometrie względem r4 (zmierzone, 161 par stanów r4)

Nowe elementy: `element.game.sound` (18 stanów gry × 7), `element.home.sound` (5 × 7), `element.game.over.reason` (6 × 7), `element.game.over.record-gap` (4 × 7). Przesunięte: elementy panelu końca (`element.game.over*`) w stanach końca; `element.game.combo` i `element.game.move-points` na telefonach; `element.home.read-error` na mobile-compact (Q162); `element.home.wordmark` w `home.first-run.en` na mobile-compact (hasło w 2 wierszach, żeby znak nie sięgał pod przełącznik dźwięku). Plansza, trójka, wynik, rekord, przycisk wyjścia i menu bez zmian.

## r4

- Rewizja bazowa: `r3` (zaakceptowana i opublikowana, commit 7166ef6)
- Rewizja docelowa: `r4` (Q114)
- Migracje ID: brak (`id_migrations: []`); stany, komponenty, elementy i interakcje bez zmian
- Wejście: uwagi Tomasza do r3 i decyzje Reprezentanta Q111–Q115
- Nowe obrazy: brak (r4 używa obrazów r3)

### Zmiana: tekst wyśrodkowany w poziomie (Q111)

Wszystkie teksty są wyśrodkowane w poziomie, także wielowierszowe:
- przyciski menu (`component.menu-button`): ikona przy lewej krawędzi, blok tekstu (etykieta i wiersz informacji) wyśrodkowany w całym przycisku; prawy margines bloku równy ikonie z odstępem (46 px po Q115), więc tekst nie nachodzi na ikonę; długie wiersze zawijają się w wyrównane wiersze (`text-wrap: balance`);
- karty dialogu i panelu końca (tytuł, treść, „Wynik nie trafi do rekordu”), ramka informacji wyzwania („Ten sam ciąg klocków obowiązuje do północy.”, wyśrodkowana względem całej ramki mimo ikony po lewej), komunikaty `component.alert`;
- tabliczka rekordu (etykieta i liczba wyśrodkowane w tabliczce), punkty ruchu (suma i dopiski).

### Zmiana: wspólna siatka mac-wide (Q112) i większe elementy nagłówka (Q113)

Tylko mac-wide; telefony bez zmian (siatka nie dotyczy `tablet-narrow` ani `phone-landscape`, bo mają układ telefonu z trójką pod planszą):
- nagłówek ma szerokość 1016 px (plansza 564 + odstęp 72 + kolumna trójki 380): przycisk domu na lewej krawędzi planszy, rekord na prawej krawędzi kolumny trójki, środki na jednej linii;
- przycisk domu 56×56 px (był 44×44) z proporcjonalnie większą ikoną; rekord: etykieta 14 px (była 12), liczba 22 px (była 17);
- wynik, seria i punkty ruchu jeden pod drugim na osi środkowego slotu trójki; pasek serii i punktów ma układ kolumnowy i stałą wysokość 96 px (był 52 px, seria po lewej, punkty po prawej).

Zmienione geometrie względem r3 (mac-wide, wszystkie stany gry): `element.game.exit` 200,34 44×44 → 212,32 56×56; `element.game.record` prawa krawędź 1240 → 1228, wysokość 32,8 → 40,1; `element.game.board` i pola 192 → 196 px od góry (nagłówek wyższy o 8 px); `element.game.score` 330,5 → 312,5; `element.game.combo` x 848 → 982 i y 439,5 → 411,5; `element.game.move-points` x 1144,6 → 996,3 i y 436,5 → 449,5; `element.game.tray` 501,5 → 527,5; klocki w trójce przesunięte razem z trójką; w `game.save-error` komunikat 595,5 → 621,5. W wyzwaniu dnia `element.game.mode` przesunięty razem z nagłówkiem.

### Zmiana: sloty trójki bez szwów (wada z r3)

Przyczyna: slot w r3 był 9-slice (`border-image` z `slot.webp`, slice 40 → szerokość 20 px) na ułamkowych szerokościach i pozycjach slotów (np. 112,33 px na iphone-standard, 118,67 px na mac-wide). Przy skalowaniu wycinków na granicach powstawały szwy, a każdy slot leżał na innym ułamku piksela, więc dostawał inne kreski i inną ramkę (także przy DPR > 1). Naprawa:
- slot to jeden obraz rozciągnięty na cały slot (bez 9-slice);
- sloty mają całkowitą, równą szerokość i stoją na całkowitych pozycjach (iphone 111 px / odstęp 14, mobile-compact 100 / 14, android i mac-wide 118 / 13, mobile-large, tablet-narrow i phone-landscape 128 / 12); pole klocka w trójce i wysokość slotu bez zmian.
Zmienione geometrie: klocki w skrajnych slotach trójki przesunięte o ≤ 0,7 px w poziomie (iphone-standard, mobile-compact; na pozostałych targetach ≤ 0,5 px).

Przy przeglądzie innych elementów 9-slice: ramy z fakturą (rama planszy, karty) w r3 miały `border-image-repeat: round`, który zostawiał widoczne złącza powtórzeń na środku boków (te same drobne kreski) — w r4 `stretch`. Pigułki przycisków i plakietka serii (`stretch`) bez szwów na wycinkach DPR 3.

### Zmiana: wysokości po wyśrodkowaniu tekstu (Q111)

Ramka informacji wyzwania w panelu końca ma symetryczne marginesy (ikona po lewej, tekst wyśrodkowany względem całej ramki), więc na android-standard, mobile-large, tablet-narrow i phone-landscape tekst zawija się na 2 wiersze i panel końca wyzwania (`game.over-daily`, `.en`, `-new-day`) jest wyższy o ok. 18 px; zmienione geometrie `element.game.over` i jego elementów (przesunięcie ≤ 10 px w pionie, ramka informacji pełnej szerokości karty).

### Zmiana: wiersz informacji przycisków menu (Q115)

- „Wyzwanie dnia” ma wiersz informacji tylko z rekordem dnia: pl „Rekord dnia 2980” (było „10 listopada · rekord dnia 2980”), en „Today's best 2,980” (było „November 10 · today's best 2,980”) — `meta_daily` w fixture bez `{date}`. Data zostaje na wstędze w grze (data rozpoczęcia podejścia, R-3.6, Q108).
- Wiersze informacji wszystkich trzech przycisków („Rekord 18 420”, „Rekord dnia 2980”, „Zapisana gra · wynik 2340”) mają 15 px (było 14 px z przezroczystością 0,88) i pełne krycie.
- Odstęp ikona–tekst 10 px (był 14), prawy margines bloku tekstu 46 px, żeby „Zapisana gra · wynik 2340” mieścił się w jednym wierszu na mobile-compact; między „gra” a „·” twarda spacja (pl i en), więc ewentualne zawinięcie nie zaczyna wiersza od kropki.
- Zmienione geometrie: każdy przycisk menu ma 70,6 px wysokości (r3: 69,3) na wszystkich 7 targetach; kolumna menu rośnie w górę o ok. 1,3 px na przycisk (`element.home.continue`, `element.home.new-game`, `element.home.daily`, `element.home.read-error`, 12 różnic na target). Na mobile-compact żaden wiersz informacji się nie zawija (wcześniejsza wersja r4 przed Q115 miała tam 3 wiersze w „Wyzwanie dnia”).

## r3

- Rewizja bazowa: `r2` (zatwierdzona, commit a6ec2ba)
- Rewizja docelowa: `r3`
- Migracje ID: brak (`id_migrations: []`); publiczne ID ekranów, stanów, komponentów, elementów i interakcji bez zmian
- Wejście: decyzje Reprezentanta Q96–Q106 (zakres tylko wygląd; kierunek rastrowy z generatora; kwiaty zamiast symboli; tła sceny; WebP; prompty w repo)

### Zmiana: wygląd

- Pola zajęte: błyszczące kafle z kwiatami (Q103) zamiast koloru z symbolem SVG; mapowanie kluczy (bez zmian w kodzie i DOM): `poppy` → mak, `sun` → słonecznik, `leaf` → koniczyna, `drop` → chaber, `berry` → kwiat wiśni. W trójce (pole 15–20 px) uproszczone kafle małego rozmiaru (Q102 warunek 1).
- Pole puste: wgłębienie w ziemi z obrazu, przyciemnione do 62%; ziemia między polami `#5E321B`.
- Plansza: drewniana skrzynia z obrazu (border-image wysunięty 8 / 10 px poza planszę, bez wpływu na układ).
- Podgląd położenia, linia do wyczyszczenia i linia ×2: te same znaki poza kolorem co w r2 (biała obwódka; zasłona z obwódką ciągłą; paski z obwódką przerywaną i plakietką), obwódki linii podwójne (jasna + ciemna), żeby były widoczne na każdym kaflu. Plakietka „×2” to złota moneta.
- Przyciski (`component.menu-button`, `component.button` primary / secondary / danger), przycisk wyjścia, sloty trójki, karta dialogu i panelu końca, plakietka serii: obrazy z jednego zestawu UI. Tekst przycisku głównego ciemnozielony `#123F14` zamiast białego.
- Tło sceny (Q98, Q104): trzy ilustracje (`blossom-wall`, `garden-dusk`, `hedge`) w kadrach 9:16 i 16:9 zamiast gradientu nieba i pasa ogrodu. Ekran startowy: `blossom-wall`; gra klasyczna: losowane przy nowej grze (w prototypie wynik losowania w scenariuszu stanu, pole `background` w fixture); wyzwanie dnia: z daty ciągu (`daily_date_iso` w fixture; numer dnia od 1970-01-01 modulo 3). Tła stanów: README.md.
- Tekst na tle sceny (rekord, wynik, punkty ruchu, znak z hasłem) na kremowej tabliczce (pseudo-element, bez wpływu na układ).
- Ekran startowy: ilustracja skrzyni z kwiatami (`assets/img/home-hero.webp`) zamiast `home-hero.svg`; znak w kolorach kafli r3.
- Ładowanie (Q105, Q110): wszystkie obrazy ładowane przez grę (30 plików WebP, plus znak SVG; rozmiar w Raporcie kontroli; limit 3 MB dotyczy tych plików, nie oryginałów PNG w `assets/generated/`) wczytywane przed gotowością renderu (`BG.preload`), potem bez sieci.

### Zmiana: teksty nazw kolorów (Q109)

Nazwy kolorów w fixture (`strings.colors`, używane w nazwie dostępnej klocka „Klocek: n pól, <kolor>” i w katalogu) to nazwy kwiatów (Q103, Q109): pl `słońce`, `liść`, `kropla`, `jagoda` → `słonecznik`, `koniczyna`, `chaber`, `kwiat wiśni` (`mak` bez zmian); en `sun`, `leaf`, `drop`, `berry` → `sunflower`, `clover`, `cornflower`, `cherry blossom`. Nazwa dostępna opisuje to, co widać na polu.

### Zmiana: nagłówek gry klasycznej bez nazwy trybu (Q107) — świadomy wyjątek

Gra klasyczna jest trybem domyślnym, więc jej nagłówek nie ma nazwy trybu: `element.game.mode` nie jest renderowany w stanach gry klasycznej (`game.classic-start`, `game.classic-start.en`, `game.classic-resumed`, `game.dragging-fits`, `game.dragging-line-preview`, `game.line-clear`, `game.color-bonus`, `game.combo`, `game.save-error`, `game.crash`, `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`). Nagłówek ma przycisk wyjścia po lewej i rekord klasyczny po prawej (R-3.4); środek jest pusty. `component.mode-label` traci wariant `classic` i zostaje tylko z wariantem `daily`. To wyjątek od „bez zmiany stanów i ID”: usunięcie wariantu i jego instancji w trybie klasycznym, nie migracja ID (`id_migrations: []`); w wyzwaniu dnia `element.game.mode` bez zmian. Pozostałe elementy nagłówka zostają na tych samych miejscach (zmierzone).

### Zmiana: oprawa wyzwania dnia (Q108)

Wariant `daily` istniejących komponentów, bez nowych stanów i bez zmiany układu:
- `component.mode-label` `daily`: „Wyzwanie dnia” i data rozpoczęcia na śliwkowej wstędze ze złotymi lamówkami (`assets/img/daily-ribbon.webp`), tekst kremowy, data złota;
- `component.board` w wyzwaniu: złota listwa na ramie i złote słońca w narożnikach (`assets/img/daily-sun-cap.webp`), tylko na ramie, z dala od pól; podgląd, linie do wyczyszczenia i plakietka „×2” bez zmian i rozróżnialne (pomiar w Raporcie kontroli);
- `component.dialog` (tylko w wyzwaniu) i `component.game-over-panel` `daily`: karta ze złotą listwą i słońcami (`assets/img/daily-card.webp`), treść bez zmian.
Tryb wyzwania jest oznaczony na powierzchni atrybutem `data-game-mode="daily"` (atrybut prototypu, nie publiczne ID).

### Zmiana techniczna po przeglądzie

- Rama planszy i ramy kart powtarzają boki obrazu (`border-image-repeat: round`) zamiast rozciągać fakturę drewna; gładkie pigułki zostają rozciągane. (Cofnięte w r4: złącza powtórzeń były widoczne.)
- Etykieta „Wynik” na mac-wide była zakryta tabliczką cyfr (tabliczka leżała nad etykietą); teraz tabliczka leży pod etykietą i cyframi, kontrast etykiety ≥ 4,5:1 na wszystkich targetach (Raport kontroli).

### Obrazy z generatora (Q862, Q106)

Model `google/gemini-3-pro-image` przez `process image generate`; prompt w `assets/prompts/`, pochodzenie (model, prompt, wzorce, proporcja, koszt) w `assets/generated/<obraz>.json`, oryginał PNG w `assets/generated/<obraz>.png`:

| Obraz | Prompt | Wzorce | Proporcja | Koszt USD |
|---|---|---|---|---|
| `tiles` | `tiles.txt` | — | 16:9 | 0,1388 |
| `ui-kit` | `ui-kit.txt` | `tiles.png` | 16:9 | 0,1401 |
| `bg-blossom-wall-desktop`, `-phone` | `bg-blossom-wall.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1404 + 0,1406 |
| `bg-garden-dusk-desktop`, `-phone` | `bg-garden-dusk.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1407 + 0,1413 |
| `bg-hedge-desktop`, `-phone` | `bg-hedge.txt` | `tiles.png`, `ui-kit.png` | 16:9, 9:16 | 0,1408 + 0,1404 |
| `home-hero` | `home-hero.txt` | `tiles.png`, `ui-kit.png` | 16:9 | 0,1408 |
| `tiles-small` | `tiles-small.txt` | `tiles.png` | 21:9 | 0,1395 |
| `daily-ribbon` | `daily-ribbon.txt` | `ui-kit.png` | 21:9 | 0,1394 |
| `daily-card` | `daily-card.txt` | `ui-kit.png` | 4:3 | 0,1389 |
| `daily-sun-cap` | `daily-sun-cap.txt` | `ui-kit.png` | 1:1 | 0,1390 |
| `daily-board-frame` (nieużyty) | `daily-board-frame.txt` | `ui-kit.png` | 1:1 | 0,1395 |

Razem 14 wywołań, 1,96 USD. `daily-board-frame` (cała rama ze złotymi słońcami) nie nadawał się na border-image — słońca wystawały poza ramę na pola — więc akcent ramy powstał z osobnego słońca `daily-sun-cap` i listwy CSS; obraz i jego pochodzenie zostają jako ślad wywołania. Prompty klocków, zestawu UI i teł wychodzą z wzorców zaakceptowanych przez Tomasza (`tmp/image-gen/prompts/03`–`07`); w promptach teł dopisany zakaz rysowania kafli i kwadratowych ikon (wersje telefonowe wzorca miały dorysowane kwiaty-klocki). Pliki WebP ładowane przez prototyp (`assets/img/*.webp`) to wycinki tych obrazów; wycinek, usunięcie białego tła, filtr (tylko kafel koniczyny: przesunięcie odcienia do szmaragdu, Q99) i kodowanie opisuje `assets/img/derived.json`.

### Usunięte zasoby

`assets/symbol-poppy|sun|leaf|drop|berry.svg`, `assets/garden-border.svg`, `assets/home-hero.svg` (zastąpione obrazami r3). Nie były publicznymi ID.

### Bez zmian

Zachowanie, stany (23), targety (7), komponenty (15), publiczne ID (poza nierenderowanym `element.game.mode` w grze klasycznej, Q107), interakcje i ich kontrakty, układ: położenia i rozmiary pozostałych elementów z `data-element-id` w 161 parach stan × target jak w r2 (pomiar w Raporcie kontroli).

## r2

- Rewizja bazowa: `r1` (zatwierdzona, commit 1aae26a)
- Rewizja docelowa: `r2`
- Migracje ID: brak (`id_migrations: []`)
- Wejście: decyzja Reprezentanta Q65, wariant A

### Zmiana

Reguła układu dla szerokości okna spoza targetów (`responsive-spec.md`, sekcja „Reguła układu”; działa w prototypie):
- okno < 1024 px — układ telefonu w kolumnie do 440 px, wyśrodkowanej, tło ogrodu na całą szerokość;
- okno ≥ 1024 px — układ mac-wide (wcześniej próg 1000 px, bez wpływu na targety r1);
- niskie okno (telefon w poziomie) — układ telefonu z przewijaniem strony; ekran telefonu ma co najmniej 800 px wysokości.

Technicznie: ekran leży w przewijanym obszarze na całą powierzchnię; nakładki zostają na powierzchni; przeciągany klocek leży na ekranie i przewija się z planszą; karta na zasłonie przewija się, gdy jest wyższa niż okno.

### Dodane

Targety: `tablet-narrow` 820×1180 (okno < 1024 px, wysokie), `phone-landscape` 852×393 (telefon w poziomie, przewijanie). Wszystkie 23 stany działają na nowych targetach.

### Bez zmian

Stany, komponenty, teksty, fixture i publiczne ID z r1. Układ na 5 targetach r1 jest identyczny (zmierzone położenia planszy, trójki, komunikatu zapisu i menu takie same jak w r1).

## r1

- Rewizja bazowa: `r1-katalog` (zaakceptowana przez Reprezentanta, commit 497956f, Q57–Q61)
- Rewizja docelowa: `r1`
- Migracje ID: brak (`id_migrations: []`); żadne publiczne ID z `r1-katalog` nie zmieniło nazwy ani znaczenia
- Wejście: decyzje Q57–Q61, polecenie Lidera po akceptacji, wymagania R-2.5 (Q54), R-4.5, R-4.6, R-5.3

### Zmiany po akceptacji katalogu

1. Q59: plakietka „×2” nie zasłania żadnego pola. Rząd: od prawej ramki na wysokości rzędu; kolumna: nad górną ramką nad kolumną. 22×18 px, bez ikony gwiazdki; tekst „×2” oraz paski i przerywana obwódka pól linii pozostają rozróżnieniem nie tylko kolorem.
2. Klucze kolorów (decyzja Lidera): `poppy`, `sun`, `leaf`, `drop`, `berry`, w tej kolejności, w regułach (`BGRules.COLORS`), fixture i wartościach `data-color`. `petal` → `poppy`; plik `assets/symbol-petal.svg` → `assets/symbol-poppy.svg` (ta sama grafika). To nie są ID elementów, więc bez migracji.
3. Sloty trójki mają prawie nieprzezroczyste tło (90%; puste 60%), więc łodygi pasa ogrodu nie prześwitują przez klocki.
4. Panel końca gry: przyciski na pełną szerokość karty (zgodnie z katalogiem); w okazach katalogu nagłówki nie przejmują stylu katalogu.
5. Formatowanie liczb według R-2.5 (Q54): równoważne `Intl.NumberFormat` — pl od 10 000, en od 1 000.
6. R-3.6 (Q44), po pierwszym odbiorze r1: `game.over-daily-new-day` i szablon `component.game-over-panel` przy `dailyInfo=new-available` nie pokazują wiersza rekordu (`element.game.over.record`) ani „Nowy rekord!” (`element.game.over.new-record`). Panel ma wynik, „Nowe wyzwanie dnia jest już dostępne”, „Zagraj ponownie” i „Do startu”. Nagłówek gry zostaje: „Rekord dnia 2980” to rekord daty rozpoczęcia podejścia. Fixture: `over.record` `null`, `over.newRecord` `false`.
7. Nagłówek ekranu gry pod panelem końca (uwagi Reprezentanta 4a, 4b): w `game.over-daily-new-day` nagłówek nie ma rekordu dnia (`element.game.record` nie występuje; tytuł „Wyzwanie dnia · 10 listopada” zostaje, R-3.6). Przy nowym rekordzie nagłówek pokazuje ten sam nowy rekord co panel (R-4.1, R-3.4): `game.over-classic-new-record` „Rekord 21 360”. Reguła działa w obu trybach i w grze na żywo; `game.over-daily` nie ma nowego rekordu, więc bez zmian.
8. Karta dialogu i panelu końca na `mac-wide` ma do 460 px, a etykiety przycisków się nie łamią („Zagraj ponownie” w jednym wierszu).

### Dodane ID

Komponent: `component.alert` (warianty `save-error`, `read-error`, `crash`; R-4.5, R-4.6, R-5.3). Nowy fragment katalogu do akceptacji razem z r1.

Ekran: `screen.home`

Stany (22 nowe, razem 23): `home.first-run`, `home.first-run.en`, `home.with-records`, `home.resume-available`, `home.read-error`, `game.classic-start.en`, `game.classic-resumed`, `game.daily-start`, `game.dragging-fits`, `game.dragging-line-preview`, `game.line-clear`, `game.color-bonus`, `game.combo`, `game.daily-exit-confirm`, `game.save-error`, `game.crash`, `game.over-classic`, `game.over-classic.en`, `game.over-classic-new-record`, `game.over-daily`, `game.over-daily.en`, `game.over-daily-new-day`

Elementy (`screen.home`): `element.home.wordmark`, `element.home.read-error`, `element.home.continue`, `element.home.new-game`, `element.home.daily`

Elementy (`screen.game`): `element.game.save-error`, `element.game.save-error.retry`, `element.app.crash`, `element.app.crash.restart`, `element.game.confirm`, `element.game.confirm.keep`, `element.game.confirm.end`, `element.game.over`, `element.game.over.score`, `element.game.over.record`, `element.game.over.new-record`, `element.game.over.daily-info`, `element.game.over.play-again`, `element.game.over.to-home`

Interakcje: `interaction.home.continue`, `interaction.home.new-game`, `interaction.home.daily`, `interaction.game.save-retry`, `interaction.app.crash-restart`, `interaction.game.confirm.keep`, `interaction.game.confirm.end`, `interaction.game.over.play-again`, `interaction.game.over.to-home`

Fixture: `default` i `english` mają rejestr `scenarios` (klucz = `state_id` bez `.en`); `records` z poziomu fixture przeniesione do scenariuszy i `catalog.records`.

Grafika: `assets/home-hero.svg` (ilustracja ekranu startowego).

### Zmienione

- `game.classic-start`: bez zmian układu; dane z `scenarios["game.classic-start"]`.

### Usunięte

- Brak publicznych ID. Usunięty plik `assets/symbol-petal.svg` (zastąpiony `symbol-poppy.svg`).

## r1-katalog

- Rewizja bazowa: brak (greenfield)
- Rewizja docelowa: `r1-katalog`
- Migracje ID: brak (`id_migrations: []`)
- Wejście: BLOOMGRID-DESIGNER-BRIEF-001, decyzje Q19–Q32, wymagania R-1–R-5 (w tym R-1.8, R-1.9, R-2.6, R-2.7, R-3.5, R-3.6, R-4.4).

### Dodane ID

Komponenty (14): `component.board`, `component.board-cell`, `component.piece`, `component.piece-tray`, `component.score-display`, `component.combo-badge`, `component.move-points`, `component.mode-label`, `component.icon-button`, `component.menu-button`, `component.button`, `component.wordmark`, `component.dialog`, `component.game-over-panel`

Ekran i stan: `screen.game`, `game.classic-start`

Elementy (`screen.game`): `element.game.exit`, `element.game.mode`, `element.game.record`, `element.game.score`, `element.game.combo` (tylko przy serii ≥ 2), `element.game.move-points` (tylko po ruchu z czyszczeniem), `element.game.board`, `element.game.board.cell-r1-c1`…`element.game.board.cell-r8-c8`, `element.game.tray`, `element.game.piece-1`…`element.game.piece-3`

Interakcje: `interaction.game.exit`, `interaction.game.drag-piece-1`…`interaction.game.drag-piece-3`

Zarezerwowane w katalogu dla ekranów r1 (jeszcze bez stanu): `element.game.confirm.keep`, `element.game.confirm.end`, `interaction.game.confirm.keep`, `interaction.game.confirm.end`, `element.game.over.play-again`, `element.game.over.to-home`, `interaction.game.over.play-again`, `interaction.game.over.to-home`

Fixture: `default` (pl), `english` (en)

Targety: `mac-wide`, `iphone-standard`, `android-standard`, `mobile-compact`, `mobile-large`

Narzędzia prototypu (poza powierzchnią): `data-prototype-tool="preview-toolbar"`, `"preview-toast"`, `"catalog-fixture"`, `"catalog-demo-reset"`

### Zmiany względem hipotezy stanów z briefu

- Usunięty `game.dragging-blocked` (Q24: nad miejscem bez zmieszczenia nic nie jest podświetlone).
- Planowane dodatkowo: `game.classic-resumed`, `game.daily-start`, `game.dragging-line-preview`, `game.daily-exit-confirm`, `game.over-classic-new-record`, `game.over-daily-new-day`. Pełny plan: `catalog.html#states-plan`.
