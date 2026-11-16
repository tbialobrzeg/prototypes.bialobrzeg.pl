# VirtualTutor V4 - prototyp VT-VIRTUALTUTOR-PROTOTYPE-R12-RC2

- **Rewizja:** `VT-VIRTUALTUTOR-PROTOTYPE-R12-RC2` (ta sama w `prototype-manifest.json → revision_id`, `index.html`, `catalog.html`, `responsive-spec.md` i `changelog.md`).
- **Baza:** `VT-VIRTUALTUTOR-PROTOTYPE-R12-RC1` (zaakceptowana, opublikowana).
- **Brief:** `VT-DESIGNER-BRIEF-013` - szybkie przełączanie stanów w podglądzie (bramka pytań: „Brak pytań”). Wcześniej: `VT-DESIGNER-BRIEF-012`. Decyzja Użytkownika: **4a Porcelana** (po 1a Nokturn i 1c Aura), „zmień tylko wygląd, nie logikę”. Wersje Nokturn i Aura: osobne paczki `-nokturn.zip`, `-aura.zip`.
- **Standard:** manifest v3; paczka 10 plików (wyjątek Lidera dla `assets/voice_help/*.png`, bez zmian).
- **Status:** kandydat do odbioru, niezaakceptowany (R12-RC1 zaakceptowana i opublikowana).
- **Zakres R12-RC2:** wyłącznie mechanizm przełączania w podglądzie: ramka ładuje `index.html` raz, a wybór stanu, strzałki i profil przełączają stan w już załadowanym dokumencie (`VirtualTutorPrototype.go`). Brak dodanych, zmienionych i usuniętych ID (`id_migrations: []`). Wygląd, treść, logika, stany, fixture, katalog i strona WWW jak w R12-RC1. Szczegóły: `changelog.md`.

## Otwarte

- **Teksty Amelii Earhart:** napisane przez projektanta, do akceptacji.
- **Pisma 31 języków:** osadzone kroje Instrument Serif / Instrument Sans mają łacinę (bez wietnamskich liter z tonami); cyrylica: Onest (osadzony). Greka, wietnamski, japoński, chiński (SC/TC), koreański, tajski i dewanagari używają krojów systemowych macOS przez reguły `[lang|=…]` - łańcuch i wagi w `responsive-spec.md`. Nie osadzono nowych krojów.
- **Wygląd:** jasna Porcelana, jeden wariant.

## Raport kontroli R12-RC2 (2026-11-16)

| Kontrola | Wynik |
| --- | --- |
| Struktura ZIP: katalog `prototype/` w korzeniu, 10 plików (8 plików standardu + `assets/voice_help/*.png`); `checksums.sha256` zgodne po rozpakowaniu | OK |
| `prototype-manifest.json` parsuje się, `schema_version` 3, `revision_id` = `VT-VIRTUALTUTOR-PROTOTYPE-R12-RC2`, `id_migrations: []` | OK |
| Macierz capture: 92 stany × 5 profili, świeże otwarcie każdego adresu `?mode=capture&state=…&target=…`: gotowość `data-prototype-ready` na jedynym `element.product-work-surface`, zgodny `data-state-id`, rozmiar = target, brak błędów konsoli, brak „—”, interlinia ≥ 1,4 | **460/460**, 0 błędów (wynik jak w R12-RC1) |
| Podgląd: 20 przełączeń, 12 różnych stanów (`welcome`, `chat-idle`, `chat-time-unknown`, `wizard-voice-f`, `profile-level`, `profile-edit-name`, `training-active`, `landing-default`, `chat-reply-correction`, `chat-reply-correction-natural`, `wizard-voice-basic-selected`, `characters`); listą (9), strzałkami ← → (6), zmianą profilu na wszystkie 5 targetów (5) | wszystkie w tym samym dokumencie ramki |
| Żądania sieciowe `index.html` przy przełączaniu (Resource Timing i Navigation Timing ramki) | **0**; jedyne pobranie to pierwsze załadowanie ramki |
| Czas od wyboru do gotowego stanu (`data-prototype-ready="true"`, właściwy stan i szerokość), mac-wide i telefony | 13-95 ms (wymóg < 1 s) |
| Wygląd przełączonego stanu = wygląd jego adresu capture: porównanie `outerHTML` `element.product-work-surface`, wartości pól i przewinięć z tym samym stanem otwartym od nowa | 20/20 identyczne |
| Błędy konsoli w ramce podglądu podczas przełączania | 0 |

Uwagi:
- Pierwsze załadowanie podglądu nadal pobiera `index.html` (poza zakresem, §4). Podczas startu dokument raz odczytuje własne źródło (`fetch` tego samego adresu, jak w R12-RC1); przy przełączaniu nic się nie pobiera.
- Pomiar wykonano w środowisku projektowym, nie na GitHub Pages. Przełączanie nie zależy od sieci, więc czas na Pages powinien być taki sam; potwierdzić po publikacji.
- Gdy wybranej pary stan + target nie da się przełączyć w dokumencie, podgląd przeładowuje ramkę jak w R12-RC1. W obecnym manifeście każdy stan jest dostępny na każdym z 5 targetów, więc ta ścieżka nie występuje.

## Raport kontroli R12-RC1 (poprzednia rewizja)

| Kontrola | Wynik |
| --- | --- |
| Macierz: 92 stany × 5 profili (`mode=capture`: mac-wide, iphone-16, pixel-8, galaxy-s20, iphone-16-pro-max), gotowość `data-prototype-ready`, zgodny `data-state-id`, rozmiar `element.product-work-surface` = target, brak błędów konsoli, brak „—” w widocznym tekście i w `aria-label` / `placeholder` / `title`, brak „Alicja”, „Dorota z”, „Rozmowy o wyzwaniach”, każdy element z tekstem tłumaczonym ma interlinię ≥ 1,4 (pomiar na żywym DOM, poza `lang="en"`, liczbami i ikonami) | **460/460**, 0 błędów (2026-11-15, runda 2 uwag Lidera; `wizard-voice-unavailable-with-fallbacks` na mac-wide za pierwszym razem nie załadował się w 20 s, przy ponownym sprawdzeniu przeszedł) |
| `catalog.html` ładuje się, 51 `component_id` | OK |
| Stare ID z tabeli B w `index.html` i `catalog.html` | 0 wystąpień |
| Nowe ID: `chat-names-notice` (5), `dialect-note-explanation` (2), `learner-language-explanation` (1 + 2 w katalogu), `cat-names-notice` (1), `corrExplanation` / `dialExplanation` (po 2) | OK |
| „Translation to Polish”, „Tłumaczenie na polski”, „polskich imion”, „Polish names” | 0 wystąpień |
| `font-style: italic` w interfejsie | 0 wystąpień |
| Kroje Plus Jakarta Sans / Lora | usunięte; Instrument Serif + Instrument Sans osadzone, cyrylica: Onest (`data:` WOFF2); pozostałe pisma: kroje systemowe macOS |
| Kontrast kluczowych par tekstu (responsive-spec, sekcja R12) | ≥ 4,5:1 |
| Karta korekty: tytuł-przełącznik, „Say “…””, wyjaśnienie, „Odsłuchaj komunikat korekty”, „Potrenuj z tutorem”, bez przekreślonej formy | jak w RC11 |

Zgoda na głos Podstawowy i inne interakcje: kod logiki nie był zmieniany (zmieniono wartości kolorów, krojów i rozmiarów w stylach, teksty Amelii Earhart i „Dorotka” wg uwag Lidera), więc wyniki interakcji RC11 obowiązują; nie powtarzano ręcznie 28 interakcji zgody.

Pisma: nagłówek powitania, karta korekty i dock sprawdzone z tymczasowo wstawionymi zdaniami w el, vi, ja, th, hi (krój systemowy, interlinia, waga, brak nachodzenia znaków). Podgląd nie był uruchomiony na macOS - kroje SF Pro / Hiragino / Thonburi / Kohinoor zastąpiła przeglądarka; zgodność z macOS do potwierdzenia na Macu.

## Pliki

| Plik | Rola |
| --- | --- |
| `index.html` | Produkt: 92 stany (91 aplikacji + `landing-default`), tryby `capture` i `user_preview`; zawiera kod strony WWW do publikacji (wygląd Porcelana, treść jak w RC11 poza Amelią Earhart) |
| `catalog.html` | Katalog komponentów (51 `component_id`); nowy wpis „Jakość głosu, głosy do pobrania i zgoda” w sekcji wyboru głosu |
| `prototype-manifest.json` | Manifest v3; 93 wpisy `states[]` (z `catalog`) |
| `responsive-spec.md` | Specyfikacja responsywności (nowy §5.21) |
| `assets/fixtures.json` | 92 wpisy; 6 nowych `fx-wizard-voice-*` |
| `assets/voice_help/*.png` | bez zmian |
| `changelog.md` | Zmiany R12-RC1 (wygląd Porcelana, tabela B, poprawki po uwagach Lidera 2026-11-15), historia |
| `checksums.sha256` | SHA-256 pozostałych 9 plików |

## Jakość głosów (brief 011)

- **Dane głosu:** imię (bez przyrostka jakości), płeć, jakość `q` (`premium` | `enhanced` | `default`), odmiana. W interfejsie: Premium / Rozszerzony / Podstawowy.
- **Źródło grupy do pobrania:** lista znanych głosów w aplikacji (`KNOWN_BETTER_VOICES` w `index.html`, wartości przykładowe do zastąpienia listą produktu). Pozycja jest w grupie, gdy dla tej odmiany i płci nie ma zainstalowanego głosu o tym samym imieniu i tej samej jakości.
- **Zgoda:** `wizard.basicConsentId` = ID głosu, na który użytkownik się zgodził; ważna tylko, gdy równa bieżącemu wyborowi.
- **Fixture:** opcjonalne `voiceInventory` zastępuje zainstalowane głosy prototypu (`{ US:{F,M}, UK:{F,M}, OTHER:{F,M} }`).
- **Geometria listy:** bez zmian. Uwaga do odbioru: brief podaje 560×338; w produkcie `voice-list-scroll` ma 560×368 (responsive-spec §5.12, E3), a 338 px ma przykład w katalogu. Obie wartości zostały bez zmian.

## Adresy

- **Nowe stany:** `index.html?mode=capture&state=<state_id>&target=<target_id>` dla `wizard-voice-basic-only`, `wizard-voice-quality-mixed`, `wizard-voice-basic-selected`, `wizard-voice-basic-consented`, `wizard-voice-premium-installed`, `wizard-voice-all-better-installed` (ekran `wizard-voice-select`). Są też na liście „Wybierz ekran”.
- **Strona WWW i pozostałe adresy:** jak w RC11 (`index.html` → „Aplikacja | Strona WWW”, `landing-default`).

## Publikacja strony (brief §7)

Kod strony leży wyłącznie w `index.html`, w dwóch blokach (bloku skryptu nie ma — strona go nie potrzebuje):

1. **Styl** — `<style id="vt-landing-style"> … </style>`, ostatni element `<head>` (poprzedza go komentarz `vt-landing: blok stylu`). Zawiera fonty jako `data:` (Instrument Serif i Instrument Sans (WOFF2, OFL), wspólne z aplikacją); ok. 575 KB. Portrety tutorów (12 × WebP 288 px, ok. 160 KB) są `data:` w fragmencie. **Żaden `<link>` do fontów nie jest potrzebny.**
2. **Fragment** — od `<!-- vt-landing:start -->` do `<!-- vt-landing:end -->` włącznie: dokładnie jeden `<main id="vt-landing" data-screen-id="landing" data-state-id="landing-default">`. W prototypie fragment leży w `<template id="vt-landing-source">` tuż przed `</body>` (chrom klonuje go do zakładki) — kopiuje się tylko tekst między komentarzami, bez znacznika `<template>`.

Złożenie (zamień `STYL` i `FRAGMENT` na skopiowane bloki):

```html
<!doctype html><html lang="pl"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>VirtualTutor — rozmowy po angielsku z tutorami-postaciami na Macu</title>
<meta name="description" content="Rozmawiaj po angielsku o tym, co Cię ciekawi — z Sherlockiem Holmesem, Kleopatrą i innymi tutorami. Tutor przy okazji poprawia błędy i tłumaczy na polski.">
STYL
</head><body>
FRAGMENT
</body></html>
```

- **Tytuł:** `VirtualTutor — rozmowy po angielsku z tutorami-postaciami na Macu`
- **Opis:** `Rozmawiaj po angielsku o tym, co Cię ciekawi — z Sherlockiem Holmesem, Kleopatrą i innymi tutorami. Tutor przy okazji poprawia błędy i tłumaczy na polski.`

### Wartości do podstawienia

| Wartość | Miejsca we fragmencie | Przykład w zakładce |
| --- | --- | --- |
| `[[VT_DOWNLOAD_URL_MAC]]` | `href` w `landing-hero-download-mac` i `landing-download-mac` (2) | bez podstawienia; kliknięcie przechwytuje chrom |
| `[[VT_APP_VERSION]]` | `landing-hero-meta` („Wersja …”), parametr „Wersja” w `landing-platform-mac` (2) | 1.0.0 |
| `[[VT_DMG_SIZE]]` | `landing-hero-meta`, `landing-install-step-1` („Plik VirtualTutor.dmg ma …”), parametr „Plik” w `landing-platform-mac` (3) | 28 MB |
| `[[VT_MIN_MACOS]]` | `landing-hero-meta` („… lub nowszy”), parametr „Wymagania” w `landing-platform-mac` (2) | macOS 10.15 |

Przykłady pochodzą z `fx-landing-default` i są wstawiane przez chrom tylko w tekście kopii w zakładce; źródło w `index.html` zawiera znaczniki. Linki `download="VirtualTutor.dmg"` pomagają przy tym samym pochodzeniu; przy Cloudflare o nazwie pliku decyduje serwer.

### Izolacja

- Wszystkie selektory zaczynają się od `#vt-landing`; brak reguł dla `html`, `body`, `*`, `:root` i klas prototypu; tokeny `--vtl-*` zdefiniowane na `#vt-landing` (wartości z R11). Jedyne `@media` to `prefers-reduced-motion`; układ — `@container vtl`.
- `#vt-landing` ma `position:absolute; top:0; left:0; right:0; min-height:100%`: domyślny margines `body` pustej strony i tło `body` prototypu nie wpływają na wygląd; dokument przewija się normalnie (nawigacja `sticky`).
- Fragment nie zawiera `{{ }}`, `sc-*`, skryptów, atrybutów `style`, obrazów zewnętrznych ani odwołań do prototypu; ikony i flagi to inline SVG, portrety `data:image/webp`. Atrybuty `data-element-id` / `data-component-id` zostają.

## Raport kontroli (kontrola eksportu R12-RC1, 03.11.2026, wersja końcowa)

Kontrola wykonana na plikach tej paczki, po ostatnich zmianach (plakietki bez ikony, długi myślnik), przed liczeniem checksum.

- **Bramka:** odpowiedzi `VT-DESIGNER-BRIEF-011-answers.md` i `VT-DESIGNER-BRIEF-011-answers-2.md` (03.11.2026) wdrożone; uwagi Użytkownika z 03.11 (opis przy każdym głosie, ikona plakietki) wdrożone (`changelog.md`).
- **Struktura ZIP-a:** katalog główny `prototype/`, 10 plików (8 plików standardu + 2 obrazy `assets/voice_help/`).
- **Checksumy:** `checksums.sha256` obejmuje 9 plików; liczone na plikach zapisanych do ZIP-a.
- **Manifest v3:** JSON parsuje się; `schema_version: 3`; `revision_id` = `VT-VIRTUALTUTOR-PROTOTYPE-R12-RC1`; `id_migrations: []`; 5 targetów; 92 stany (+ `catalog`), każdy `fixture_id` ma dane.
- **Macierz stanów (capture):** 92 × 5 = **460/460** (R12-RC1, 2026-11-15, po rundzie 2 uwag Lidera), w tym interlinia ≥ 1,4 każdego tekstu tłumaczonego.
- **Interlinia w katalogu:** pomiar na żywym DOM całego `catalog.html` - 0 elementów z tekstem poniżej 1,4. Dla każdej pary: `body[data-prototype-state]` = stan, jeden `element.product-work-surface` z `data-prototype-ready="true"` i rozmiarem targetu, `[data-state-id]` stanu, 0 błędów skryptu, **brak „—”** w widocznym tekście i w `aria-label`, `placeholder`, `title`.
- **Stany wyboru głosu (12 stanów × 5 targetów = 60/60):** `voice-list-scroll` 368 px (bez zmian); wiersze nie wychodzą poza listę ani nie przewijają się w poziomie; dokument bez poziomego przewijania (360-1440 px); każdy wiersz ma plakietkę; brak opisu jakości w wierszach; opis nad listą zawiera wyjaśnienie plakietek; wiersz głosu ≤ 56 px na 1440 px i ≤ 72 px na wąskich; liczba głosów do pobrania zgodna z danymi (3, 2, 3, 3, 7, 2, 3, 3, 2, 0); nagłówek grupy tylko gdy grupa niepusta; zgoda tylko przy zaznaczonym głosie Podstawowym; `aria-checked` i `voice-confirm[aria-disabled]` zgodne ze stanem; cele w zgodzie ≥ 44 px.
- **Interakcje zgody (`user_preview`, 28/28; mac-wide i galaxy-s20):** kliknięcie zablokowanego CTA nie zapisuje i przenosi fokus na zgodę; zaznaczenie zgody odblokowuje CTA; wybór innego głosu Podstawowego kasuje zgodę i podmienia imię; głos Rozszerzony bez zgody; powrót do Podstawowego wymaga zgody ponownie; „Jak pobrać lepszy głos” i „Pokaż jak” rozwijają `voice-download-callout`, przewijają listę na górę (fokus na nagłówku calloutu); zgoda + CTA przechodzi do głosu męskiego; zmiana głosu z rozmowy: bez zgody zostaje na ekranie, ze zgodą wraca do rozmowy; Premium zatwierdza się bez zgody; dwa „Daniel”: Rozszerzony bez zgody, Podstawowy ze zgodą.
- **Katalog:** wczytuje się (`data-prototype-ready="true"`), 0 błędów konsoli; wpis `voice-quality` z `voice-quality-badge`, `voice-download-option`, `voice-basic-consent`.
- **Strona WWW:** R12-RC1 zmienia wygląd (Porcelana), atrapy „Odsłuchaj” / „Przetłumacz” / „Potrenuj z tutorem” jak w aplikacji, kontrast tekstu (bez złotego tekstu) oraz kartę Amelii Earhart; `landing-default` sprawdzona w macierzy na 5 profilach.
- **Ograniczenia:** zrzuty referencyjne i porównania pikselowe nie wykonane.
