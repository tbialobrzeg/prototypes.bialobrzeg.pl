/* Bloomgrid r1-katalog — wspólny runtime widoku (index.html i catalog.html): komponenty katalogu, przeciąganie, pasek podglądu.
   Reguły gry są w assets/bloomgrid-rules.js (BGRules). Render nie używa sieci, czasu ani losowości; liczniki czasu startują tylko po interakcji. */
(function () {
  'use strict';
  var R = window.BGRules;
  var BG = {};

  function h(tag, attrs) {
    var el = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function (k) {
      var v = a[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'style' && typeof v === 'object') {
        Object.keys(v).forEach(function (sk) { if (sk.indexOf('--') === 0) el.style.setProperty(sk, v[sk]); else el.style[sk] = v[sk]; });
      } else if (k.indexOf('on') === 0 && typeof v === 'function') {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === 'html') {
        el.innerHTML = v;
      } else {
        el.setAttribute(k, v === true ? '' : String(v));
      }
    });
    (function add(list) {
      list.forEach(function (c) {
        if (c === null || c === undefined || c === false) return;
        if (Array.isArray(c)) return add(c);
        el.append(c instanceof Node ? c : document.createTextNode(String(c)));
      });
    })(Array.prototype.slice.call(arguments, 2));
    return el;
  }
  BG.h = h;
  BG.fmt = function (t, v) { return String(t).replace(/\{(\w+)\}/g, function (_, k) { return v[k] === undefined ? '' : v[k]; }); };
  BG.num = function (n, loc) { return R.formatNumber(n, loc); };
  BG.cellsWord = function (n, S) {
    if (n === 1) return S.cells_one;
    var d = n % 10, dd = n % 100;
    return d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? S.cells_few : S.cells_many;
  };
  function merge(a, b) { var r = {}; [a, b].forEach(function (x) { Object.keys(x || {}).forEach(function (k) { r[k] = x[k]; }); }); return r; }
  function ia(o) { return o.interactionId ? { 'data-interaction-id': o.interactionId, 'data-action': o.action, 'data-expected-effect': o.expected } : {}; }

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 11.2 12 4.5l8 6.7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 10v9.5h4.2v-5.3h2.6v5.3h4.2V10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="15" r="2" fill="currentColor"/></svg>',
    sprout: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 21v-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M12 13.5C11.6 9 8.6 6.6 4.5 6.8c.2 4.3 3.3 6.8 7.5 6.7ZM12.2 11.6c.6-4.2 3.6-6.4 7.4-6-.4 4-3.5 6.2-7.4 6Z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    resume: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M19 12a7 7 0 1 1-2.1-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M17.8 3.6v4.2h-4.2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7Z" fill="currentColor"/></svg>',
    warn: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3.5 21.5 20h-19Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M12 10v4.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17.3" r="1.3" fill="currentColor"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M12 2.5c.8 5 2.5 6.7 7.5 7.5-5 .8-6.7 2.5-7.5 7.5-.8-5-2.5-6.7-7.5-7.5 5-.8 6.7-2.5 7.5-7.5Z" fill="currentColor"/></svg>',
    /* r5 (Q143): głośnik włączony / wyciszony; (Q129): klocek się nie mieści — koło z ukośną kreską. */
    'sound-on': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    'sound-off': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m15.5 9.5 5 5M20.5 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    /* r7: muzyka — nuta ósemkowa; wyciszona — ta sama nuta przekreślona ukośną kreską (z jasnym obrysem, czytelna na kremowym przycisku). */
    'music-on': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 17.5V5.5l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="6.6" cy="17.6" rx="3.1" ry="2.5" fill="currentColor"/><ellipse cx="16.6" cy="15.1" rx="3.1" ry="2.5" fill="currentColor"/></svg>',
    'music-off': '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M9 17.5V5.5l10-2v11.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="6.6" cy="17.6" rx="3.1" ry="2.5" fill="currentColor"/><ellipse cx="16.6" cy="15.1" rx="3.1" ry="2.5" fill="currentColor"/><path d="M3.5 3.5 20.5 20.5" stroke="#F2DDB4" stroke-width="4.4" stroke-linecap="round"/><path d="M3.5 3.5 20.5 20.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    'no-fit': '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2.8"/><path d="M6 18 18 6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>'
  };
  BG.icon = function (name, size) {
    var w = h('span', { 'class': 'bg-ic', 'aria-hidden': 'true', html: ICONS[name] });
    w.style.display = 'inline-flex';
    if (size) { w.firstChild.setAttribute('width', size); w.firstChild.setAttribute('height', size); }
    return w;
  };
  /* r3 (Q105): wszystkie obrazy ładowane na starcie, przed gotowością renderu; potem gra działa bez sieci. */
  /* Tła z R-5.4: ekran startowy i wyzwanie dnia (data modulo 3). */
  BG.BACKGROUNDS = ['blossom-wall', 'garden-dusk', 'hedge'];
  BG.HOME_BACKGROUND = 'blossom-wall';
  /* r6 (Q147, Q148): krąg 6 motywów poziomów gry klasycznej. Poziom n ma motyw CIRCLE[(start + n − 1) mod 6].
     r7.1 (Q237, „dzień w podróży”): kolejność Łąka o świcie, Kwietna ściana, Staw z liliami, Żywopłot, Ogród o zmroku, Noc świetlików;
     start 0 (Q219: motyw wynika wyłącznie z poziomu, poziom 1 ma inne tło niż ekran startowy). */
  BG.CIRCLE = ['dawn-meadow', 'blossom-wall', 'lily-pond', 'hedge', 'garden-dusk', 'firefly-night'];
  /* r7.4 (Q394–Q402, R-2.11; zastępuje progi Q197/Q371): nowy poziom co 10X = 800 punktów — poziom = 1 + ⌊wynik / 800⌋; próg awansu na poziom k + 1 to 800 · k. */
  BG.levelThreshold = function (k) { return 10 * R.X * k; };
  BG.levelOf = R.levelOf;
  BG.motifOf = function (start, level) { return BG.CIRCLE[(start + level - 1) % BG.CIRCLE.length]; };
  BG.assets = ['assets/bloomgrid-mark.svg', 'assets/img/home-hero.webp', 'assets/img/board-frame.webp', 'assets/img/cell-empty.webp', 'assets/img/slot.webp', 'assets/img/card.webp',
    'assets/img/btn-primary.webp', 'assets/img/btn-secondary.webp', 'assets/img/btn-danger.webp', 'assets/img/icon-home.webp', 'assets/img/badge-combo.webp', 'assets/img/badge-coin.webp',
    'assets/img/daily-ribbon.webp', 'assets/img/daily-sun-cap.webp', 'assets/img/daily-card.webp',
    /* r7.3 (Q355, Q358): kwiatek Podlewania w 3 stopniach (0 kropelek kiełek, 1 pąk, 2 kwiat); listki, mały złoty kwiat i zwiędła roślina usunięte. */
    'assets/img/plant-1.webp', 'assets/img/plant-3.webp', 'assets/img/plant-4.webp',
    /* r7.3: ostre obrazy powiększonego kwiatka wskaźnika w święcie pełnego podlania (pąk, kwiat, złoty kwiat; wycinki z tych samych
       oryginałów, 352×384). */
    'assets/img/plant-3-big.webp', 'assets/img/plant-4-big.webp', 'assets/img/plant-5-big.webp']
    .concat(['poppy', 'sun', 'leaf', 'drop', 'berry'].reduce(function (a, c) { return a.concat(['assets/img/tile-' + c + '.webp', 'assets/img/tile-' + c + '-s.webp', 'assets/img/petal-' + c + '.webp']); }, []))
    .concat(BG.CIRCLE.reduce(function (a, b) { return a.concat(['assets/img/bg-' + b + '-phone.webp', 'assets/img/bg-' + b + '-desktop.webp']); }, []));
  /* Tło wyzwania dnia (Q104): wyliczane z daty ciągu (RRRR-MM-DD): numer dnia od 1970-01-01 modulo 3 w kolejności BG.BACKGROUNDS. */
  BG.dailyBackground = function (iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return null;
    return BG.BACKGROUNDS[Math.floor(Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000) % BG.BACKGROUNDS.length];
  };
  BG.preload = function () {
    return Promise.all(BG.assets.map(function (src) { var i = new Image(); i.src = src; return i.decode().catch(function () {}); }));
  };

  /* Geometria według targetu (responsive-spec.md). */
  /* Reguła układu (r2, Q65): szerokość okna < 1024 px — układ telefonu w kolumnie do 440 px, wyśrodkowanej;
     od 1024 px — układ mac-wide. Wysokość nie zmienia układu: przy niskim oknie (telefon w poziomie) strona się przewija. */
  BG.WIDE_MIN = 1024;
  BG.PHONE_COL_MAX = 440;
  BG.geometry = function (tg) {
    var wide = tg.width >= BG.WIDE_MIN, pad = wide ? 8 : 6, gap = wide ? 4 : 3;
    var colW = wide ? 1040 : Math.min(tg.width, BG.PHONE_COL_MAX);
    /* r6 (Q181): margines boczny telefonu 16 px; gdy przy nim pole planszy wyszłoby < 32 px (okno węższe niż 344 px), margines 12 px. */
    var padX = 16;
    if (!wide && Math.floor((colW - 32 - 9 * gap - 2 * pad) / 8) < BG.MIN_CELL) padX = 12;
    var contentW = wide ? 1040 : colW - 2 * padX;
    var cell = wide ? 64 : Math.floor((Math.min(contentW, 420) - 9 * gap - 2 * pad) / 8);
    var boardW = 8 * cell + 9 * gap + 2 * pad;
    var trayW = wide ? 380 : contentW, trayGap = 12, slotW = (trayW - 2 * trayGap) / 3, pg = 2;
    var pc = Math.floor((slotW - 16 - 4 * pg) / 5);
    /* r4: sloty o całkowitej szerokości i na całkowitych pozycjach (szerokość tak dobrana, żeby oba odstępy były równe i całkowite),
       więc trzy sloty rysują się piksel w piksel tak samo: iphone 111 / odstęp 14, mobile-compact 100 / 14, android i mac-wide 118 / 13,
       mobile-large, tablet-narrow i phone-landscape 128 / 12. Pole klocka w trójce bez zmian; klocek 5×5 dalej się mieści. */
    var slotPx = Math.floor(slotW);
    if ((trayW - 3 * slotPx) % 2) slotPx -= 1;
    var base = { wide: wide, colW: colW, padX: padX, pad: pad, gap: gap, cell: cell, boardW: boardW, pc: pc, pg: pg, slotH: 5 * pc + 4 * pg + 18, trayGap: trayGap, slotPx: slotPx, slotGap: (trayW - 3 * slotPx) / 2, lift: Math.max(44, cell + 8) };
    return tg.height ? BG.fitHeight(base, tg) : base;
  };

  /* r6 (Q177–Q181, Q199–Q202): dopasowanie do wysokości okna — ekran mieści się bez przewijania do 375×548 (pion) i 852×340 (poziom).
     Kolejność (Q179): najpierw odstępy i ozdobne marginesy, potem (pion, Q199) seria i punkty w wierszu wyniku, potem plansza i trójka
     proporcjonalnie. Pole planszy nigdy < 32 px — niższe okno przewija ekran (minH). Wynik: layout, odstępy (sp), cell, pc, minH. */
  BG.MIN_CELL = 32;
  BG.fitHeight = function (g, tg) {
    var W = tg.width, H = tg.height, MIN = BG.MIN_CELL;
    var B = function (c) { return 8 * c + 9 * g.gap + 2 * g.pad; }, S = function (p) { return 5 * p + 4 * g.pg + 18; };
    function withSizes(c, p, extra) {
      var o = {}; for (var k in g) o[k] = g[k];
      o.cell = c; o.boardW = B(c); o.pc = p; o.slotH = S(p); o.lift = Math.max(44, c + 8);
      for (var e in extra) o[e] = extra[e];
      return o;
    }
    if (g.wide) {
      /* mac-wide i laptop: siatka Q112; plansza od wysokości: 32 + nagłówek 56 + 16 + plansza z ramą (2 × 10) + 32 ≤ H. */
      var cw = Math.max(MIN, Math.min(g.cell, Math.floor((H - 156 - 9 * g.gap - 2 * g.pad) / 8)));
      /* r7.3: kolumna trójki = wynik 79 + pasek Podlewania 76 + trójka 116 + 3 odstępy 24 (343 px) + gniazdo karty ruchu (do 216 px);
         miejsce na kolumnę = H − 64 − 56. Gniazdo maleje na niskim oknie; komunikat zapisu (88 px), gdy się nie mieści, leży na wierszu wyniku (Q201). */
      var colH = H - 120, slotH = Math.max(150, Math.min(216, colH - 343));
      return withSizes(cw, g.pc, { layout: 'wide', sp: { t: 32, b: 32 }, minH: B(cw) + 156, cardSlotH: slotH, saveOver: colH < 343 + slotH + 88 });
    }
    if (W > H) {
      /* Telefon w poziomie (Q180, Q200): plansza po lewej na całą wysokość, po prawej kolumna 380 px: nagłówek, wynik, pasek, trójka. */
      var cl = Math.floor((H - 24 - 16 - 9 * g.gap - 2 * g.pad) / 8);
      cl = Math.max(MIN, Math.min(46, cl, Math.floor((W - 460 - 9 * g.gap - 2 * g.pad) / 8)));
      var sideW = 380, slotWl = (sideW - 24) / 3, pl = Math.floor((slotWl - 16 - 4 * g.pg) / 5), spx = Math.floor(slotWl);
      if ((sideW - 3 * spx) % 2) spx -= 1;
      /* r7 (Q232): kolumna = nagłówek 48 + wiersz poziomu 24 + wynik 58 + pasek 44 + trójka, przerwy 4 px. */
      var side = 48 + 24 + 58 + 44 + 4 * 4 + S(pl);
      return withSizes(cl, pl, { layout: 'landscape', sideW: sideW, slotPx: spx, slotGap: (sideW - 3 * spx) / 2, sp: { t: 12, b: 12 }, minH: Math.max(B(cl) + 40, side + 24), saveOver: true });
    }
    /* Telefon w pionie. Wysokości: nagłówek 48, wynik 58, pasek 2 + 44, rama planszy wystaje 8 px. */
    /* r7 (Q232): wiersz poziomu 24 px pod nagłówkiem; najmniejsze odstępy: góra i dół 4, wynik 4, trójka 8 px.
       Wynik 4 px (nie 0): tabliczka wyniku wystaje 4 px w górę, tabliczka wiersza kończy się 2 px nad jego dołem — zostaje 2 px przerwy. */
    var NAT = { t: 59, b: 34, s: 8, g: 16 }, MINSP = { t: 4, b: 4, s: 4, g: 8 };
    /* r7.3 (Q345): pasek Podlewania 2 + 54 px (było 2 + 44) — większa roślina (56×61) i odstęp od wyniku. */
    var need = function (sp, c, p, merged) { return sp.t + 48 + 24 + sp.s + 58 + (merged ? 12 : 56) + B(c) + sp.g + S(p) + sp.b; };
    var c0 = g.cell, p0 = g.pc, alert = 76;
    if (H >= need(NAT, c0, p0)) return withSizes(c0, p0, { layout: 'phone', sp: NAT, minH: need(NAT, c0, p0), saveOver: H < need(NAT, c0, p0) + alert });
    var slack = H - need(MINSP, c0, p0);
    if (slack >= 0) {
      var k = slack / (need(NAT, c0, p0) - need(MINSP, c0, p0)), sp = {};
      for (var key in NAT) sp[key] = Math.round(MINSP[key] + (NAT[key] - MINSP[key]) * k);
      return withSizes(c0, p0, { layout: 'phone', sp: sp, minH: need(sp, c0, p0), saveOver: true });
    }
    for (var c = c0 - 1; c >= MIN; c--) {
      var p = Math.floor(p0 * c / c0);
      if (need(MINSP, c, p) <= H) return withSizes(c, p, { layout: 'phone', sp: MINSP, minH: need(MINSP, c, p), saveOver: true });
    }
    /* Q199: seria i punkty ruchu w wierszu wyniku; pole 32 px; okno niższe niż ten układ przewija ekran (Q181: granica 375×548). */
    var pm = Math.floor(p0 * MIN / c0);
    return withSizes(MIN, pm, { layout: 'phone-merged', sp: MINSP, minH: need(MINSP, MIN, pm, true), saveOver: true });
  };

  /* component.board-cell */
  BG.cell = function (o) {
    return h('div', { 'class': 'bg-cell', 'data-component-id': 'component.board-cell', 'data-element-id': o.elementId, 'data-variant': o.color ? 'filled' : 'empty', 'data-color': o.color || null, 'data-preview': o.preview || null, 'data-line': o.line || null, 'data-clearing': o.clearing ? 'true' : null });
  };
  function paintCell(el, s) {
    el.setAttribute('data-variant', s.color ? 'filled' : 'empty');
    var col = s.color || s.previewColor;
    if (col) el.setAttribute('data-color', col); else el.removeAttribute('data-color');
    if (s.preview) el.setAttribute('data-preview', s.preview); else el.removeAttribute('data-preview');
    if (s.line) el.setAttribute('data-line', s.line); else el.removeAttribute('data-line');
    if (s.clearing) el.setAttribute('data-clearing', 'true'); else el.removeAttribute('data-clearing');
  }

  /* component.board */
  BG.board = function (o) {
    var g = o.geo, S = o.S, prefix = o.elementPrefix;
    var grid = h('div', { 'class': 'bg-grid' });
    var badges = h('div', { 'class': 'bg-badges' });
    /* r5: warstwa efektów (płatki, złoty błysk, kopie plakietek) — dekoracja nad polami, bez ID i bez wpływu na układ. */
    var fx = h('div', { 'class': 'bg-fx', 'aria-hidden': 'true' });
    var el = h('div', { 'class': 'bg-board', 'data-component-id': 'component.board', 'data-element-id': o.elementId, role: 'img', style: { '--cell': g.cell + 'px', '--gap': g.gap + 'px', '--pad': g.pad + 'px', width: g.boardW + 'px' } }, grid, badges, fx);
    var cells = [];
    for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
      var ce = BG.cell({ elementId: prefix + 'cell-r' + (r + 1) + '-c' + (c + 1) });
      cells.push(ce); grid.append(ce);
    }
    var api = { el: el, grid: grid, cells: cells, fx: fx, geo: g };
    /* Położenie pola i plakietki „×2” w układzie planszy (px od lewego górnego rogu planszy). */
    api.cellBox = function (i) { var pitch = g.cell + g.gap, start = g.pad + g.gap; return { x: start + (i % 8) * pitch, y: start + Math.floor(i / 8) * pitch, s: g.cell }; };
    api.badgePos = function (l) {
      var pitch = g.cell + g.gap, start = g.pad + g.gap;
      return { x: l.kind === 'row' ? g.boardW - start + 1 : start + l.index * pitch + g.cell / 2, y: l.kind === 'row' ? start + l.index * pitch + g.cell / 2 : start - 1 };
    };
    api.render = function (board, view) {
      view = view || {};
      var place = {}, line = {}, clearing = {};
      if (view.preview) {
        view.preview.cells.forEach(function (i) { place[i] = true; });
        view.preview.lines.forEach(function (l) { l.cells.forEach(function (i) { if (line[i] !== 'bonus') line[i] = l.mono ? 'bonus' : 'clear'; }); });
      }
      (view.clearing || []).forEach(function (i) { clearing[i] = true; });
      cells.forEach(function (ce, i) {
        paintCell(ce, { color: place[i] ? null : board[i], previewColor: place[i] ? view.previewColor : null, preview: place[i] ? 'place' : null, line: line[i], clearing: clearing[i] });
      });
      badges.replaceChildren();
      /* Korekta Q366 (Lider): plakietka „+500” tylko w podglądzie przeciągania (R-1.4); po ruchu premię pokazuje karta 3, nie plansza. */
      var lines = view.preview ? view.preview.lines : [];
      lines.filter(function (l) { return l.mono; }).forEach(function (l) {
        /* Plakietka nie zasłania żadnego pola (Q59): rząd — od prawej krawędzi ramki na wysokości rzędu;
           kolumna — nad górną krawędzią ramki nad kolumną. Pola zaczynają się pad + gap od krawędzi planszy. */
        var bp = api.badgePos(l);
        badges.append(h('span', { 'class': 'bg-badge is-' + l.kind, style: { left: bp.x + 'px', top: bp.y + 'px' } }, h('span', { 'aria-hidden': 'true' }, S.bonus_badge), h('span', { 'class': 'bg-sr' }, S.bonus_sr)));
      });
      var filled = board.filter(function (x) { return x; }).length;
      el.setAttribute('aria-label', BG.fmt(S.board_sr, { n: filled }));
    };
    return api;
  };

  /* component.piece */
  BG.piece = function (o) {
    var sh = R.shape(o.piece.shape), S = o.S, n = sh.cells.length;
    var on = {}; sh.cells.forEach(function (p) { on[p[0] * 10 + p[1]] = true; });
    var el = h('div', merge({ 'class': 'bg-piece', 'data-component-id': 'component.piece', 'data-element-id': o.elementId, 'data-variant': o.variant || 'tray', 'data-shape': sh.id, 'data-color': o.piece.color, role: 'img', 'aria-roledescription': S.piece_role, 'aria-label': BG.fmt(S.piece_sr, { n: n, cells: BG.cellsWord(n, S), color: S.colors[o.piece.color] }), style: { '--w': sh.w, '--cell': o.cell + 'px', '--gap': o.gap + 'px' } }, ia(o)));
    for (var y = 0; y < sh.h; y++) for (var x = 0; x < sh.w; x++) {
      var c = h('div', { 'class': 'bg-cell' + (on[y * 10 + x] ? '' : ' is-gap'), 'data-variant': on[y * 10 + x] ? 'filled' : 'empty', 'data-color': on[y * 10 + x] ? o.piece.color : null, 'aria-hidden': 'true' });
      el.append(c);
    }
    el._shape = sh;
    return el;
  };

  /* component.piece-tray */
  BG.tray = function (o) {
    var g = o.geo;
    var el = h('div', { 'class': 'bg-tray', 'data-component-id': 'component.piece-tray', 'data-element-id': o.elementId, role: 'group', 'aria-label': o.S.tray_sr, style: { '--slot-h': g.slotH + 'px', '--tray-gap': g.slotGap + 'px', '--slot-w': g.slotPx + 'px' } });
    var slots = [0, 1, 2].map(function () { var s = h('div', { 'class': 'bg-slot' }); el.append(s); return s; });
    return {
      el: el, slots: slots, pieces: [null, null, null],
      render: function (tray, makePiece) {
        var self = this;
        tray.forEach(function (p, i) {
          slots[i].replaceChildren();
          slots[i].setAttribute('data-variant', p ? 'filled' : 'empty');
          if (!p) { slots[i].append(h('span', { 'class': 'bg-sr' }, o.S.slot_empty_sr)); self.pieces[i] = null; return; }
          var pe = makePiece(p, i);
          slots[i].append(pe); self.pieces[i] = pe;
        });
      }
    };
  };

  /* component.score-display */
  BG.scoreDisplay = function (o) {
    var val = h('span', { 'class': 'bg-score-value' });
    var el = h('div', { 'class': 'bg-score', 'data-component-id': 'component.score-display', 'data-element-id': o.elementId, 'data-variant': o.variant || 'score' },
      h('span', { 'class': 'bg-score-label' }, o.label), val);
    var api = { el: el, set: function (n) { val.textContent = BG.num(n, o.loc); } };
    api.set(o.value);
    return api;
  };

  /* r7: roślina „Podlewania” — własny rysunek SVG w stylu kafli (gradienty, połysk, ciemny obrys). Stopnie: 1 kiełek (×2), 2 listki (×3),
     3 pąk (×4), 4 kwiat (×5), 5 złoty kwiat z blaskiem (×6+). Stopień czytelny z kształtu (liczba liści, pąk, płatki, promienie blasku). */
  var plantSeq = 0;
  BG.plantSVG = function (stage) {
    var u = 'pl' + (++plantSeq);
    var stemTop = [0, 25, 19, 15, 13, 12][stage];
    var defs = '<defs>' +
      '<linearGradient id="' + u + 'p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F08A55"/><stop offset=".55" stop-color="#D2582B"/><stop offset="1" stop-color="#9C3A17"/></linearGradient>' +
      '<radialGradient id="' + u + 'l" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#C8F27A"/><stop offset=".55" stop-color="#58C042"/><stop offset="1" stop-color="#23862F"/></radialGradient>' +
      '<radialGradient id="' + u + 'f" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FFD3E6"/><stop offset=".5" stop-color="#FF7FB5"/><stop offset="1" stop-color="#D4306F"/></radialGradient>' +
      '<radialGradient id="' + u + 'g" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#FFF6C2"/><stop offset=".5" stop-color="#FFD24A"/><stop offset="1" stop-color="#E08E0B"/></radialGradient>' +
      '<radialGradient id="' + u + 'h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF3A0" stop-opacity=".95"/><stop offset="1" stop-color="#FFD24A" stop-opacity="0"/></radialGradient>' +
      '</defs>';
    var leaf = function (x, y, rot, s) {
      return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ')"><path d="M0 0C3 -5 10 -6 13 -2C10 2 4 3 0 0Z" fill="url(#' + u + 'l)" stroke="#1E5E22" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<path d="M2 -1.2C5 -3 8 -3.4 10 -2.6" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1" stroke-linecap="round"/></g>';
    };
    var plant = '<path d="M20 34V' + stemTop + '" stroke="#2E7D32" stroke-width="2.6" stroke-linecap="round"/><path d="M19.2 33V' + (stemTop + 2) + '" stroke="#8BD66A" stroke-width=".9" stroke-linecap="round"/>';
    if (stage === 1) plant += leaf(20, 27, -150, .8) + leaf(20, 27, -30, .8);
    if (stage >= 2) plant += leaf(20, 29, -155, .95) + leaf(20, 29, -25, .95) + leaf(20, 23, -140, .75) + leaf(20, 23, -40, .75);
    if (stage === 3) plant += '<path d="M16.5 15C16.5 10 20 7 20 7S23.5 10 23.5 15C23.5 17 22 18 20 18S16.5 17 16.5 15Z" fill="url(#' + u + 'f)" stroke="#8E1E4A" stroke-width="1.1"/>' +
      '<path d="M16.6 15.5L14.8 18.5M23.4 15.5L25.2 18.5" stroke="#2E7D32" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="18.7" cy="11.5" rx="1" ry="2" fill="#fff" opacity=".75"/>';
    if (stage >= 4) {
      var gold = stage >= 5, fill = 'url(#' + u + (gold ? 'g' : 'f') + ')', edge = gold ? '#9A5A06' : '#8E1E4A', cy = stemTop - 1;
      if (gold) plant = '<circle cx="20" cy="' + cy + '" r="15" fill="url(#' + u + 'h)"/>' +
        [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return '<path d="M20 ' + (cy - 12) + 'V' + (cy - 15) + '" stroke="#FFD24A" stroke-width="1.6" stroke-linecap="round" transform="rotate(' + a + ' 20 ' + cy + ')"/>'; }).join('') + plant;
      for (var i = 0; i < 5; i++) plant += '<ellipse cx="20" cy="' + (cy - 5) + '" rx="3.6" ry="5" fill="' + fill + '" stroke="' + edge + '" stroke-width="1" transform="rotate(' + (i * 72) + ' 20 ' + cy + ')"/>';
      plant += '<circle cx="20" cy="' + cy + '" r="3.2" fill="' + (gold ? '#F07A12' : '#FFD24A') + '" stroke="' + edge + '" stroke-width="1"/><circle cx="19" cy="' + (cy - 1) + '" r="1" fill="#fff" opacity=".8"/>';
    }
    var pot = '<path d="M12 33H28L26.2 43H13.8Z" fill="url(#' + u + 'p)" stroke="#6E260D" stroke-width="1.1" stroke-linejoin="round"/>' +
      '<rect x="10.5" y="31" width="19" height="4.2" rx="1.6" fill="url(#' + u + 'p)" stroke="#6E260D" stroke-width="1.1"/>' +
      '<path d="M13 32.4H22" stroke="#FFD0B0" stroke-width="1" stroke-linecap="round" opacity=".8"/><ellipse cx="20" cy="31.3" rx="7.5" ry="1.4" fill="#5A3218"/>';
    return '<svg class="bg-plant-svg" viewBox="0 0 40 44" aria-hidden="true">' + defs + '<g class="bg-plant-top">' + plant + '</g>' + pot + '</svg>';
  };
  BG.dropSVG = function (full) {
    return '<svg viewBox="0 0 10 13" aria-hidden="true"><path d="M5 .8C5 .8 1 5.6 1 8.4A4 4 0 0 0 9 8.4C9 5.6 5 .8 5 .8Z" fill="' + (full ? '#4FB3F2' : 'none') + '" stroke="' + (full ? '#145C9E' : '#7A6A55') + '" stroke-width="1.2"' + (full ? '' : ' stroke-dasharray="2 1.4"') + '/>' +
      (full ? '<ellipse cx="3.8" cy="7.4" rx=".9" ry="1.6" fill="#fff" opacity=".8"/>' : '') + '</svg>';
  };
  /* r7.3 (Q355–Q359): stopień rośliny z liczby kropelek: 0 — kiełek (plant-1), 1 — pąk (plant-3), 2 — kwiat (plant-4),
     3 (tylko w święcie) — kwiat, który rozkwita w złoty (plant-5). Obraz listków (plant-2) i zwiędłej rośliny nie są już używane. */
  BG.plantStage = function (d) { return d >= 3 ? 4 : [1, 3, 4][Math.max(0, d)]; };
  /* component.combo-badge — „Podlewanie” (r7.3, Q355–Q359): kwiatek w doniczce i trzy kropelki (pełne = zebrane, puste = brakujące).
     Kwiatek rośnie z liczbą kropelek; zawsze widoczny w grze (także 0 kropelek); bez „×c”, bez więdnięcia. Przy 3 kropelkach — święto
     (component.full-watering), potem 0 i nadmiar. o: { drops 0–3, S, elementId } */
  BG.comboBadge = function (o) {
    var drops = Math.max(0, Math.min(3, o.drops || 0)), stage = BG.plantStage(drops);
    var plant = h('span', { 'class': 'bg-plant', 'data-img': String(stage) },
      h('img', { src: 'assets/img/plant-' + stage + '.webp', alt: '', draggable: 'false' }));
    var dropEls = h('span', { 'class': 'bg-drops', 'aria-hidden': 'true' }, [0, 1, 2].map(function (i) { return h('span', { 'class': 'bg-drop', 'data-full': i < drops ? 'true' : 'false', html: BG.dropSVG(i < drops) }); }));
    return h('div', { 'class': 'bg-combo', 'data-component-id': 'component.combo-badge', 'data-element-id': o.elementId, 'data-stage': stage, 'data-drops': drops },
      plant, dropEls, h('span', { 'class': 'bg-sr' }, BG.fmt(o.S.watering_sr, { d: drops })));
  };

  /* r7.3 (Q368): podpis karty punktów mówi tylko, co gracz zrobił — bez rachunku pól: „1 linia”, „3 linie naraz”, „5 linii naraz”,
     ruch bez linii „położony klocek”; dopisek „· Kolorowa rabata +720” / „· Pusta grządka +N”, gdy ruch je dał. */
  BG.lineLabel = function (S, k) {
    if (!k) return S.card_place;
    var key = k === 1 ? 'card_line_1' : (k % 10 >= 2 && k % 10 <= 4 && (k % 100 < 12 || k % 100 > 14)) ? 'card_lines_few' : 'card_lines_many';
    return BG.fmt(S[key], { k: k });
  };
  BG.pointsSub = function (p, S, loc) {
    var parts = [BG.lineLabel(S, p.cleared)];
    if (p.mono) parts.push(BG.fmt(S.card_flowerbed, { n: BG.num(p.mono, loc) }));
    if (p.empty) parts.push(BG.fmt(S.card_empty, { n: BG.num(p.empty, loc) }));
    return parts.join(' · ');
  };
  /* Punkty karty: przyrost wyniku bez premii „Pełne podlanie” (ma własną kartę „+480”, r7.4, więc suma kart = przyrost wyniku). */
  BG.pointsOf = function (p) { return p.total - (p.full || 0); };
  /* component.move-card — r7.3 (Q366–Q368): jedyny komponent komunikatów chwilowych, jedno miejsce, wspólna ramka i typografia, trzy wiersze tekstu obok ilustracji:
     nagłówek (opcjonalny), duża liczba (opcjonalna), podpis drobnym drukiem (opcjonalny); pusty wiersz się nie pokazuje.
     Osiem treści (data-step / data-variant):
       1 points        — / „+80” / „1 linia”
       2 points+praise „Świetnie!” | „Wspaniale!” | „Cudownie!” | „Rajski ogród!” / „+720” / „3 linie naraz”
       3 flowerbed     „Kolorowa rabata!” / „+800” / „1 linia · Kolorowa rabata +720” (r7.4)
       4 empty-garden  „Pusta grządka!” / „+1200” / „2 linie naraz · Pusta grządka +960”
       5 drops         „+1 kropelka” | „+2 kropelki” / — / „3 kropelki = Pełne podlanie”
       6 full          „Pełne podlanie!” / „+480” (r7.4) / „kwiatek zaczyna od nowa”
       7 record        „Nowy rekord!” / „18 421” / —
       8 level         „Nowy poziom!” / „4” / „Żywopłot”
     Korekta Q366: każda treść ma własną ilustrację, kolor, animację i dźwięk (BG.cardArt, data-art 1–8; obwódka pochwały rośnie ze szczeblem, data-rung). Publiczne ID nagłówka i liczby zostają z wcześniejszych
     wersji (element.game.praise, element.game.move-points, element.game.drops-gain, element.game.full-watering, element.game.new-record,
     element.game.level-up). Bez interakcji (pointer-events: none). o: { step, praise, points, gain, dropsAfter, score, level: { n, motif }, ids } */
  BG.dropsLabel = function (S, n) { return BG.fmt(S[n === 1 ? 'card_drops_1' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? 'card_drops_few' : 'card_drops_many'], { n: n }); };
  BG.PRAISE_TEXT = { great: 'praise_2', wonderful: 'praise_3', amazing: 'praise_4', paradise: 'praise_5', flowerbed: 'praise_flowerbed' };
  BG.cardContent = function (o) {
    var S = o.S, loc = o.loc, step = o.step || 'points', c = { head: null, num: null, sub: null, variant: step, headId: null, numId: null, rung: '0' };
    if (step === 'points') {
      var p = Object.assign({}, o.points, { empty: o.points.empty || 0 });
      c.num = '+' + BG.num(BG.pointsOf(p), loc); c.numId = 'points'; c.sub = BG.pointsSub(p, S, loc);
      if (p.empty) { c.head = S.card_empty_head; c.headId = 'praise'; c.variant = 'empty-garden'; }
      else if (o.praise) { c.head = S[BG.PRAISE_TEXT[o.praise]]; c.headId = 'praise'; c.variant = o.praise; c.rung = String(({ great: 1, wonderful: 2, amazing: 3, paradise: 4 })[o.praise] || 0); }
    } else if (step === 'drops') { c.head = BG.dropsLabel(S, o.gain); c.headId = 'drops'; c.sub = S.card_drops_hint; }
    else if (step === 'full') { c.head = S.full_watering; c.headId = 'full'; c.num = '+' + BG.num(6 * R.X * (o.count || 1), loc); c.sub = S.card_full_sub; }
    else if (step === 'record') { c.head = S.new_record; c.headId = 'record'; c.num = BG.num(o.score, loc); }
    else if (step === 'level') { c.head = S.card_level_head; c.headId = 'level'; c.num = String(o.level.n); c.sub = S.motifs[o.level.motif]; }
    return c;
  };
  /* r7.3, korekta Q366 (Tomasz zaakceptował sekcję katalogu „Komunikaty chwilowe”): osiem kart, każda z własną ilustracją (data-art 1–8),
     kolorem, animacją wejścia i efektem oraz dźwiękiem; wspólne miejsce, ramka, fonty i rozmiary. Karty 1–4 to warianty karty punktów
     ruchu (jedna na ruch, pierwszeństwo R-2.9: Pusta grządka, Kolorowa rabata, pochwała z liczby linii, zwykłe punkty).
     Ilustracje: własne SVG i istniejące obrazy (kafle, płatki, rośliny, tła), bez nowych obrazów z generatora.
     Bez klasy is-play każdy element ilustracji stoi w klatce szczytowej (capture); is-play odtwarza wejście i efekt. */
  var MC_IMG = 'assets/img/', MC_COLS = ['poppy', 'sun', 'leaf', 'drop', 'berry'];
  function mcImg(src, cls, style) { return '<img class="' + cls + '" src="' + MC_IMG + src + '" alt="" style="' + (style || '') + '">'; }
  function mcStar(cls, style) { return '<svg class="' + cls + '" style="' + (style || '') + '" viewBox="0 0 24 24"><path d="M12 1.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 8.7l7.1-.6z" fill="#FFE070" stroke="#B5730E" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 5.5l1.6 3.8 3.9.3" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/></svg>'; }
  function mcSpark(cls, style) { return '<svg class="' + cls + '" style="' + (style || '') + '" viewBox="0 0 20 20"><path d="M10 0c.6 5 4.4 8.8 10 10-5.6 1.2-9.4 5-10 10-.6-5-4.4-8.8-10-10 5.6-1.2 9.4-5 10-10z" fill="#fff"/></svg>'; }
  var mcUid = 0;
  BG.CARD_ART = {
    /* 1 · punkty: pięć kwiatów na pasie ziemi, przez który przechodzi świetlny błysk. */
    1: function () { return '<div class="mcx-strip">' + MC_COLS.map(function (c, i) { return mcImg('tile-' + c + '-s.webp', 'mcx-tile', 'animation-delay:' + (i * 70) + 'ms'); }).join('') + '<span class="mcx-sweep"></span></div>' + mcSpark('mcx-spark', 'right:2%;top:14%'); },
    /* 2 · pochwała: złota rozeta ze wstążkami na obracających się promieniach; gwiazdki według szczebla (1–3, „Rajski ogród!” 3 i płatki). */
    2: function (o, c) {
      var g = 'mcxg2-' + (++mcUid), d = '';
      for (var i = 0; i < 24; i++) { var a = i / 24 * Math.PI * 2, r = i % 2 ? 36 : 42; d += (i ? 'L' : 'M') + (50 + Math.cos(a) * r).toFixed(1) + ' ' + (46 + Math.sin(a) * r).toFixed(1); }
      var stars = [['left:-2%;top:6%;width:30%', ''], ['right:-4%;top:30%;width:24%', ' s2'], ['left:4%;bottom:2%;width:20%', ' s3']].slice(0, Math.min(3, +c.rung || 1));
      return '<span class="mcx-rays"></span><svg class="mcx-rosette" viewBox="0 0 100 100"><defs><radialGradient id="' + g + '" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FFF6C2"/><stop offset=".55" stop-color="#FFD24A"/><stop offset="1" stop-color="#E08E0B"/></radialGradient></defs><path d="M30 70l-10 26 13-6 7 12 8-26zM70 70l10 26-13-6-7 12-8-26z" fill="#D4306F" stroke="#7A1E4A" stroke-width="2" stroke-linejoin="round"/><path d="' + d + 'Z" fill="url(#' + g + ')" stroke="#9A5A06" stroke-width="2.4" stroke-linejoin="round"/><circle cx="50" cy="46" r="25" fill="#FFF3C4" stroke="#C98A12" stroke-width="2"/><path d="M50 30l5 10.5 11.5 1-8.7 7.6 2.6 11.3L50 54.5l-10.4 5.9 2.6-11.3-8.7-7.6 11.5-1z" fill="#FFB020" stroke="#9A5A06" stroke-width="1.8" stroke-linejoin="round"/></svg>'
        + stars.map(function (s) { return mcStar('mcx-star' + s[1], s[0]); }).join('')
        + (c.rung === '4' ? [0, 1, 2, 3].map(function (i) { return mcImg('petal-' + MC_COLS[i] + '.webp', 'mcx-confetti', 'left:' + [70, 8, 78, 40][i] + '%;top:' + [4, 70, 70, -2][i] + '%;--rot:' + (i * 80) + 'deg;animation-delay:' + (300 + i * 80) + 'ms'); }).join('') : '');
    },
    /* 3 · Kolorowa rabata: łuk pięciu jednakowych kwiatów wiśni w różowej poświacie, złota smuga i iskry. */
    3: function () { return '<span class="mcx-glow pink"></span><div class="mcx-arc">' + [0, 1, 2, 3, 4].map(function (i) { return mcImg('tile-berry-s.webp', 'mcx-tile', 'animation-delay:' + (i * 80) + 'ms;transform:translateY(' + [8, 2, 0, 2, 8][i] + 'px) rotate(' + [-14, -7, 0, 7, 14][i] + 'deg)'); }).join('') + '<span class="mcx-sweep gold"></span></div>' + mcSpark('mcx-spark', 'left:4%;top:4%') + mcSpark('mcx-spark s2', 'right:6%;bottom:8%'); },
    /* 4 · Pusta grządka: mini-plansza w drewnianej ramie rozkwita płatkami falą od środka; złota poświata. */
    4: function () { var cells = ''; for (var i = 0; i < 16; i++) { var r = Math.floor(i / 4), c = i % 4, ring = Math.max(Math.abs(r - 1.5), Math.abs(c - 1.5)); cells += '<span class="mcx-cell">' + ((i * 7) % 3 !== 1 ? mcImg('petal-' + MC_COLS[(i * 3) % 5] + '.webp', 'mcx-bloom', 'animation-delay:' + Math.round(ring * 140) + 'ms;transform:rotate(' + ((i * 47) % 360) + 'deg)') : '') + '</span>'; } return '<span class="mcx-glow gold"></span><div class="mcx-board">' + cells + '</div>'; },
    /* 5 · kropelki: konewka podlewa pąk w doniczce, dwie krople w locie, pod spodem licznik kropelek po ruchu (z 3). */
    5: function (o) { var n = Math.max(0, Math.min(3, o.dropsAfter != null ? o.dropsAfter : (o.gain || 1))); return '<span class="mcx-glow blue"></span>' + mcImg('plant-3-big.webp', 'mcx-pot') + '<svg class="mcx-can" viewBox="0 0 64 44"><path d="M10 14h26l4 24H14z" fill="#5FB0E8" stroke="#145C9E" stroke-width="2.4" stroke-linejoin="round"/><path d="M36 20l20-10 3 4-21 13" fill="#5FB0E8" stroke="#145C9E" stroke-width="2.4" stroke-linejoin="round"/><path d="M14 14c0-9 18-9 18 0" fill="none" stroke="#145C9E" stroke-width="3" stroke-linecap="round"/><path d="M16 22h16" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/></svg><span class="mcx-drop d1">' + BG.dropSVG(true) + '</span><span class="mcx-drop d2">' + BG.dropSVG(true) + '</span><span class="mcx-meter">' + [0, 1, 2].map(function (i) { return '<span class="bg-drop' + (i === n - 1 ? ' is-new' : '') + '">' + BG.dropSVG(i < n) + '</span>'; }).join('') + '</span>'; },
    /* 6 · Pełne podlanie: kwiat rozkwita z pąka w złoty kwiat na złotych promieniach, rozbłysk płatków (girlanda na ramce karty). */
    6: function () { return '<span class="mcx-rays gold"></span><span class="mcx-glow gold"></span>' + [3, 4, 5].map(function (s) { return mcImg('plant-' + s + '-big.webp', 'mcx-plant p' + s); }).join('') + '<span class="mcx-burst">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) { var a = i / 8 * Math.PI * 2; return mcImg('petal-' + MC_COLS[i % 5] + '.webp', 'mcx-bpetal', '--dx:' + Math.round(Math.cos(a) * 46) + '%;--dy:' + Math.round(Math.sin(a) * 40 - 14) + '%;--rot:' + (i * 50) + 'deg;animation-delay:' + (500 + i * 20) + 'ms'); }).join('') + '</span>'; },
    /* 7 · nowy rekord: złoty puchar z gwiazdą w wieńcu laurowym, konfetti z płatków, błysk przez puchar. */
    7: function () { var g = 'mcxg7-' + (++mcUid); return '<span class="mcx-rays soft"></span><svg class="mcx-cup" viewBox="0 0 80 80"><defs><linearGradient id="' + g + '" x1="0" x2="1"><stop offset="0" stop-color="#E9A23A"/><stop offset=".45" stop-color="#FFE48A"/><stop offset="1" stop-color="#C9851A"/></linearGradient></defs><path d="M14 20c-12 2-10 22 8 22M66 20c12 2 10 22-8 22" fill="none" stroke="#B5730E" stroke-width="4" stroke-linecap="round"/><path d="M20 12h40c0 24-6 36-20 38C26 48 20 36 20 12z" fill="url(#' + g + ')" stroke="#8A5206" stroke-width="2.6" stroke-linejoin="round"/><path d="M36 50h8v10h-8z" fill="#E9A23A" stroke="#8A5206" stroke-width="2.4"/><path d="M26 60h28l3 10H23z" fill="#7A3A10" stroke="#4A2008" stroke-width="2.4" stroke-linejoin="round"/><path d="M40 20l3.6 7.4 8 .7-6 5.3 1.8 7.9L40 37.2l-7.4 4.1 1.8-7.9-6-5.3 8-.7z" fill="#fff8d0" stroke="#B5730E" stroke-width="1.4"/><path d="M8 66c4-12 10-20 18-24M72 66c-4-12-10-20-18-24" fill="none" stroke="#3E8E3A" stroke-width="3" stroke-linecap="round"/><g fill="#5DBB4A" stroke="#2E6E2A" stroke-width="1">' + [0, 1, 2].map(function (i) { return '<ellipse cx="' + (10 + i * 4) + '" cy="' + (60 - i * 7) + '" rx="5" ry="2.6" transform="rotate(-50 ' + (10 + i * 4) + ' ' + (60 - i * 7) + ')"/><ellipse cx="' + (70 - i * 4) + '" cy="' + (60 - i * 7) + '" rx="5" ry="2.6" transform="rotate(50 ' + (70 - i * 4) + ' ' + (60 - i * 7) + ')"/>'; }).join('') + '</g><path class="mcx-shine" d="M26 14l6 0-8 28-4 0z" fill="#fff" opacity=".55"/></svg>' + [0, 1, 2, 3, 4, 5].map(function (i) { return mcImg('petal-' + MC_COLS[(i + 1) % 5] + '.webp', 'mcx-confetti', 'left:' + (6 + i * 16) + '%;--rot:' + ((i % 2 ? 1 : -1) * (160 + i * 30)) + 'deg;top:' + [4, 64, 20, 72, 8, 58][i] + '%;animation-delay:' + (i * 90) + 'ms'); }).join(''); },
    /* 8 · nowy poziom: okno w łuku, w którym ogród poprzedniego poziomu przechodzi w ogród nowego (miniatury teł motywów). */
    8: function (o) { var n = o.level.n, old = BG.motifOf(0, Math.max(1, n - 1)); return '<span class="mcx-rays soft"></span><span class="mcx-window"><span class="mcx-scene old" style="background-image:url(' + MC_IMG + 'bg-' + old + '-phone.webp)"></span><span class="mcx-scene new" style="background-image:url(' + MC_IMG + 'bg-' + o.level.motif + '-phone.webp)"></span></span>' + mcSpark('mcx-spark', 'right:4%;top:2%') + mcSpark('mcx-spark s2', 'left:2%;bottom:14%'); }
  };
  /* Ilustracja i dźwięk (R-6.1; nazwy z source/app/sound/output/sound-output.ts) karty z treści. */
  BG.cardArt = function (o, c) {
    var step = o.step || 'points';
    if (step === 'points') {
      if (c.variant === 'empty-garden') return { art: 4, sound: 'empty-garden' };
      if (c.variant === 'flowerbed') return { art: 3, sound: 'flower-bed' };
      if (c.headId === 'praise') return { art: 2, sound: 'praise-' + c.variant };
      return { art: 1, sound: o.points && o.points.cleared > 0 ? 'line' : 'place' };
    }
    return ({ drops: { art: 5, sound: 'watering-drop' }, full: { art: 6, sound: 'watering-grow' }, record: { art: 7, sound: 'new-record' }, level: { art: 8, sound: 'level-up' } })[step];
  };
  /* Czas karty (korekta Q366): tyle, ile trzeba na przeczytanie — max(2000, 1200 + 40 ms × liczba znaków treści), zaokrąglony do 100 ms;
     karty z największym efektem (4 Pusta grządka, 6 Pełne podlanie, 8 Nowy poziom) co najmniej 3000 ms. */
  BG.cardMs = function (c, art) {
    var n = [c.head, c.num, c.sub].filter(Boolean).join(' ').length, ms = Math.max(2000, 1200 + 40 * n);
    if (art === 4 || art === 6 || art === 8) ms = Math.max(3000, ms);
    return Math.round(ms / 100) * 100;
  };
  BG.moveCard = function (o) {
    var ids = o.ids || {}, c = BG.cardContent(o), a = BG.cardArt(o, c);
    var headIds = { praise: ids.praise, drops: ids.drops, full: ids.full || 'element.game.full-watering', record: ids.record, level: ids.level };
    var head = c.head ? h('span', { 'class': 'bg-mcard-head', 'data-element-id': headIds[c.headId] || null, 'data-component-id': c.headId === 'praise' ? 'component.praise' : null, 'data-variant': c.headId === 'praise' ? c.variant : null }, c.head) : null;
    var num = c.num ? h('span', { 'class': 'bg-mcard-num', 'data-element-id': c.numId === 'points' ? ids.points : null, 'data-component-id': c.numId === 'points' ? 'component.move-points' : null }, c.num) : null;
    var sub = c.sub ? h('span', { 'class': 'bg-mcard-sub' }, c.sub) : null;
    var garland = (a.art === 4 || a.art === 6) ? h('span', { 'class': 'mcx-garland', 'aria-hidden': 'true', html: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { var p = i < 5 ? 'left:' + (8 + i * 21) + '%;top:-7px' : 'left:' + (8 + (i - 5) * 21) + '%;bottom:-7px'; return mcImg('petal-' + MC_COLS[i % 5] + '.webp', 'mcx-gpetal', p + ';--rot:' + (i * 61) + 'deg;animation-delay:' + (i * 60) + 'ms'); }).join('') }) : null;
    var fall = a.art === 4 ? h('span', { 'class': 'mcx-fall', 'aria-hidden': 'true', html: [0, 1, 2, 3, 4, 5].map(function (i) { return mcImg('petal-' + MC_COLS[(i + 2) % 5] + '.webp', 'mcx-fpetal', 'left:' + (12 + i * 15) + '%;top:' + [10, 60, 25, 70, 15, 50][i] + '%;--rot:' + (i * 70) + 'deg;animation-delay:' + (i * 120) + 'ms'); }).join('') }) : null;
    return h('div', { 'class': 'bg-mcard', 'data-component-id': 'component.move-card', 'data-element-id': ids.card, 'data-step': o.step || 'points', 'data-variant': c.variant, 'data-rung': c.rung,
      'data-art': String(a.art), 'data-sound': a.sound, 'data-duration-ms': String(BG.cardMs(c, a.art)), role: 'status', 'aria-live': 'polite' },
      garland, fall, h('span', { 'class': 'mcx-art', 'aria-hidden': 'true', html: BG.CARD_ART[a.art](o, c) }), h('span', { 'class': 'bg-mcard-text' }, head, num, sub));
  };
  /* Kroki kolejki jednego ruchu (Q356, Q360): (1) punkty — tylko przy ruchu z czyszczeniem (r7.4, Q394–Q402: ruch bez linii daje 0 punktów,
     więc nie ma karty punktów ani awansu i rekordu); (2) kropelki („+n”) albo święto „full” (3 kropelki, Q357); (3) nowy rekord; (4) nowy poziom — zawsze ostatni.
     Kroków, których ruch nie ma, nie ma w liście. ms: { level, record, empty } */
  BG.stepsFor = function (mv, ms) {
    ms = ms || {};
    var p = mv.points, steps = [], clear = p.cleared > 0;
    var pv = clear ? BG.praiseFor(mv, !!ms.empty) : null;
    if (pv === 'empty-garden') pv = null;
    var points = Object.assign({}, p, { empty: ms.empty || p.empty || 0 });
    if (clear) steps.push({ step: 'points', praise: pv, points: points });
    if (p.fullCount > 0) steps.push({ step: 'full', count: p.fullCount, dropsBefore: p.dropsBefore, dropsAfter: p.dropsAfter });
    else if (p.dropsGain > 0) steps.push({ step: 'drops', gain: p.dropsGain, dropsAfter: p.dropsAfter });
    if (ms.record) steps.push({ step: 'record', score: ms.score });
    if (ms.level) steps.push({ step: 'level', level: ms.level });
    return steps;
  };

  /* component.icon-button */
  BG.iconButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-icon-btn', 'data-component-id': 'component.icon-button', 'data-element-id': o.elementId, 'aria-label': o.label, title: o.label, 'data-demo': o.demo, onclick: o.onClick }, ia(o)), BG.icon(o.icon || 'home'));
  };
  /* component.sound-toggle (r5, Q143) — trwały przełącznik: aria-pressed="true" = dźwięk włączony. Prototyp dźwięku nie odtwarza. */
  /* r7: dwa przełączniki — kind 'music' (nuta, „Muzyka”) i 'effects' (głośnik, „Efekty”); data-kind = wariant katalogu music / effects. */
  BG.soundToggle = function (o) {
    var on = o.on !== false, music = o.kind === 'music', label = music ? o.S.music : o.S.sound, ic = music ? 'music' : 'sound';
    var btn = h('button', merge({ type: 'button', 'class': 'bg-sound-btn', 'data-component-id': 'component.sound-toggle', 'data-element-id': o.elementId, 'data-kind': music ? 'music' : 'effects', 'data-variant': on ? 'on' : 'muted', 'aria-pressed': on ? 'true' : 'false', 'aria-label': label, title: label, 'data-demo': o.demo }, ia(o)), BG.icon(ic + (on ? '-on' : '-off'), 22));
    btn.addEventListener('click', function () {
      if (o.inert) return;
      on = !on;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('data-variant', on ? 'on' : 'muted');
      btn.replaceChildren(BG.icon(ic + (on ? '-on' : '-off'), 22));
      if (o.onChange) o.onChange(on);
    });
    return btn;
  };
  /* component.no-moves-step (r5, Q128–Q131) — krok końca gry: warstwa na całą powierzchnię (stuknięcie, klik albo Esc pokazuje panel od razu)
     z komunikatem nad trójką. Komunikat ustawia layout() nad górną krawędzią trójki. */
  BG.noMovesStep = function (o) {
    var msg = h('div', { 'class': 'bg-nomoves-msg', 'data-element-id': o.elementId + '.message', role: 'status', 'aria-live': 'assertive' }, o.S.no_moves);
    var el = h('div', merge({ 'class': 'bg-nomoves', 'data-component-id': 'component.no-moves-step', 'data-element-id': o.elementId }, ia(o)), msg);
    el._msg = msg;
    return el;
  };
  /* Korekta Q366 (r7.3): napis i płatki Pustej grządki na planszy (BG.emptyGarden, BG.emptyBloomFrame) usunięte — efekt jest w karcie 4. */
  /* r7.3 (Q361; szczegóły Q363 czekają na Reprezentanta): drabina pochwał tylko z liczby linii naraz L:
     L = 1 bez pochwały, 2 „Świetnie!”, 3 „Wspaniale!”, 4 „Cudownie!”, ≥ 5 „Rajski ogród!” (r7: siła ruchu z serią). */
  BG.PRAISE = [null, 'great', 'wonderful', 'amazing', 'paradise'];
  BG.praiseRung = function (L) { return L >= 5 ? 4 : L === 4 ? 3 : L === 3 ? 2 : L === 2 ? 1 : 0; };
  /* Q234: jedna pochwała na ruch; pierwszeństwo: Pusta grządka, Kolorowa rabata (linia jednego koloru), drabina. */
  BG.praiseFor = function (mv, emptyBoard) {
    if (emptyBoard) return 'empty-garden';
    if (mv.lines.some(function (l) { return l.mono; })) return 'flowerbed';
    return BG.PRAISE[BG.praiseRung(mv.points.cleared)];
  };
  /* component.praise (r5, Q139; r7) — chwilowa pochwała nad środkiem planszy (ok. 800 ms), bez interakcji, nigdy na trójce.
     Warianty: great, wonderful, amazing, paradise (każdy szczebel większy i z mocniejszym blaskiem, paradise z rozbłyskiem płatków),
     flowerbed („Kolorowa rabata!”), empty-garden (BG.emptyGarden). */
  BG.praise = function (o) {
    var v = o.variant || (o.lines >= 3 ? 'wonderful' : 'great');
    var text = { great: o.S.praise_2, wonderful: o.S.praise_3, amazing: o.S.praise_4, paradise: o.S.praise_5, flowerbed: o.S.praise_flowerbed }[v];
    return h('div', { 'class': 'bg-praise', 'data-component-id': 'component.praise', 'data-element-id': o.elementId, 'data-variant': v, role: 'status', 'aria-live': 'polite' }, text);
  };
  /* Rozbłysk płatków wokół środka hosta (paradise) i płatki przez cały ekran (święto Pustej grządki). Dekoracja bez ID. */
  var PCOLS = ['berry', 'poppy', 'sun', 'drop', 'leaf'];
  BG.petalBurst = function (n) {
    var layer = h('div', { 'class': 'fx-burst', 'aria-hidden': 'true' });
    for (var i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, d = 70 + (i * 37) % 50;
      layer.append(h('img', { 'class': 'fx-burst-petal', src: 'assets/img/petal-' + PCOLS[i % 5] + '.webp', alt: '',
        style: { '--dx': Math.round(Math.cos(a) * d) + 'px', '--dy': Math.round(Math.sin(a) * d * 0.75) + 'px', '--rot': ((i % 2 ? 1 : -1) * (140 + i * 23 % 140)) + 'deg', animationDelay: (i % 4) * 30 + 'ms' } }));
    }
    return layer;
  };
  BG.screenPetals = function (n, animated) {
    var layer = h('div', { 'class': 'fx-screen-rain' + (animated ? ' is-anim' : ''), 'aria-hidden': 'true' });
    for (var i = 0; i < n; i++) {
      layer.append(h('img', { 'class': 'fx-screen-petal', src: 'assets/img/petal-' + PCOLS[i % 5] + '.webp', alt: '',
        style: { left: ((i * 37) % 100) + '%', top: animated ? '-30px' : ((i * 53) % 90 + 3) + '%', animationDelay: ((i * 71) % 900) + 'ms', '--rot': ((i % 2 ? 1 : -1) * (120 + i * 29 % 200)) + 'deg' } }));
    }
    return layer;
  };
  /* r7.3 (Q366, Q367): component.full-watering usunięty — komunikat „Pełne podlanie!” to karta 6 (component.move-card); promienie,
     poświata, płatki w tle, girlanda i osobny napis usunięte. Zostaje rozkwit kwiatka wskaźnika (element.game.combo) w czasie tej karty. */
  /* mac-wide 1,35×: największe powiększenie, przy którym kwiatek nie wchodzi na tabliczkę wyniku (prześwit ≥ 1 px). */
  BG.FW_SCALE = { wide: 1.35, phone: 2 };
  BG.FW_STAGES = [[0, 3], [300, 4], [600, 5]];
  /* Rozkwit kwiatka wskaźnika (ten sam element) w czasie karty „Pełne podlanie!”. mode 'anim': przez czas karty 6 (3000 ms) roślina rośnie od dna
     doniczki (0–900 ms, 30% czasu, do BG.FW_SCALE, ease-out), rozkwita — obraz pąk → kwiat → złoty kwiat (0 / 300 / 600 ms, wycinki 352×384,
     ostre przy powiększeniu), świeci złotą poświatą (pulsuje 2×), od 2400 ms (80%) wraca do zwykłego rozmiaru; potem zwykły obraz. 'still': stała klatka szczytu
     (powiększony złoty kwiat z poświatą). 'reduced': bez wzrostu i zmiany obrazu, tylko poświata (przezroczystość). Zwraca restore(). */
  BG.fwPill = function (pill, mode, timers, ms) {
    var pl = pill && pill.querySelector('.bg-plant'), img = pl && pl.querySelector('img');
    if (!pl || !img) return function () {};
    var src0 = img.getAttribute('src');
    /* Korekta Q366: rozkwit trwa tyle co karta 6 (data-duration-ms, domyślnie 3000 ms). */
    if (ms) { pill.style.animationDuration = ms + 'ms'; pl.style.animationDuration = ms + 'ms'; }
    pill.classList.add('is-fw', mode === 'still' ? 'is-fw-still' : mode === 'reduced' ? 'is-fw-reduced' : 'is-fw-anim');
    if (mode === 'still') img.setAttribute('src', 'assets/img/plant-5-big.webp');
    if (mode === 'anim') BG.FW_STAGES.forEach(function (s) {
      var f = function () { img.setAttribute('src', 'assets/img/plant-' + s[1] + '-big.webp'); };
      if (s[0]) timers.push(setTimeout(f, s[0])); else f();
    });
    return function () { pill.classList.remove('is-fw', 'is-fw-still', 'is-fw-reduced', 'is-fw-anim', 'is-fw-skip'); img.setAttribute('src', src0); };
  };
  /* component.level-label (r6, Q147, Q152) — środek nagłówka gry klasycznej: „Poziom n” i nazwa motywu; ta sama budowa co nazwa trybu wyzwania. */
  BG.levelLabel = function (o) {
    var num = h('span', { 'class': 'bg-level-num' }), name = h('span', { 'class': 'bg-level-name' });
    /* Zwykły tekst czytany „Poziom n: nazwa” (separator tylko dla czytnika); awans ogłasza plakietka awansu (role=status), etykieta nie ogłasza drugi raz. */
    var sep = h('span', { 'class': 'bg-sr' }, ': ');
    /* r7 (Q232): na telefonach etykieta stoi w wierszu pod nagłówkiem, w jednej linii „Poziom n · ogród” (kropka środkowa widoczna tylko tam). */
    var dot = h('span', { 'class': 'bg-level-dot', 'aria-hidden': 'true' }, ' · ');
    var el = h('div', { 'class': 'bg-level', 'data-component-id': 'component.level-label', 'data-element-id': o.elementId }, num, sep, dot, name);
    var api = { el: el, set: function (n, motif) {
      num.textContent = BG.fmt(o.S.level, { n: n }); name.textContent = o.S.motifs[motif];
      el.setAttribute('data-level', n); el.setAttribute('data-motif', motif);
    } };
    api.set(o.level, o.motif);
    return api;
  };
  /* r7.3 (Q342): component.level-up-badge (plakietka awansu na wyniku) usunięty — awans jest wpisem karty ruchu (BG.moveCard). */
  /* component.mode-label */
  BG.modeLabel = function (o) {
    return h('div', { 'class': 'bg-mode', 'data-component-id': 'component.mode-label', 'data-element-id': o.elementId, 'data-variant': o.variant },
      h('span', {}, o.S.mode_daily),
      o.variant === 'daily' ? h('span', { 'class': 'bg-mode-dot', 'aria-hidden': 'true' }, ' · ') : null,
      o.variant === 'daily' ? h('span', { 'class': 'bg-mode-sub' }, o.S.daily_date) : null);
  };
  /* component.menu-button */
  BG.menuButton = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-menu-btn', 'data-component-id': 'component.menu-button', 'data-element-id': o.elementId, 'data-variant': o.variant || 'secondary', 'data-demo': o.demo, onclick: o.onClick }, ia(o)),
      h('span', { 'class': 'bg-menu-btn-ic' }, BG.icon(o.icon, 24)),
      h('span', { 'class': 'bg-menu-btn-text' }, h('span', { 'class': 'bg-menu-btn-label' }, o.label), o.meta ? h('span', { 'class': 'bg-menu-btn-meta' }, o.meta) : null));
  };
  /* component.button */
  BG.button = function (o) {
    return h('button', merge({ type: 'button', 'class': 'bg-btn', 'data-component-id': 'component.button', 'data-element-id': o.elementId, 'data-variant': o.variant || 'primary', 'data-demo': o.demo, onclick: o.onClick }, ia(o)), o.label);
  };
  /* component.wordmark */
  BG.wordmark = function (o) {
    return h('div', { 'class': 'bg-wordmark', 'data-component-id': 'component.wordmark', 'data-element-id': o.elementId, style: o.style || null },
      h('div', { 'class': 'bg-wordmark-row' }, h('img', { src: 'assets/bloomgrid-mark.svg', alt: '', draggable: 'false' }), h('h1', { 'class': 'bg-wordmark-name', style: { margin: 0 } }, o.S.app_name)),
      o.tagline === false ? null : h('span', { 'class': 'bg-wordmark-tag' }, o.S.tagline));
  };
  /* component.dialog — potwierdzenie końca podejścia (R-3.5) */
  BG.dialog = function (o) {
    var S = o.S, tid = o.elementId + '.title', bid = o.elementId + '.body';
    var ip = o.prefix.indexOf('element.') === 0 ? o.prefix.replace('element.', 'interaction.') : null;
    var keep = BG.button({ elementId: o.prefix + 'keep', variant: 'primary', label: S.confirm_keep, interactionId: ip && ip + 'keep', action: 'tap / Escape', expected: 'zamyka dialog; gra trwa bez zmian', onClick: o.onKeep, demo: o.demoKeep });
    var end = BG.button({ elementId: o.prefix + 'end', variant: 'danger', label: S.confirm_end, interactionId: ip && ip + 'end', action: 'tap', expected: 'kończy podejście bez zapisu wyniku do rekordu; navigate screen.home', onClick: o.onEnd });
    var card = h('div', { 'class': 'bg-card' + (o.row ? ' is-row' : ''), 'data-component-id': 'component.dialog', 'data-element-id': o.elementId, role: 'alertdialog', 'aria-modal': 'true', 'aria-labelledby': tid, 'aria-describedby': bid },
      h('h2', { id: tid }, S.confirm_title), h('p', { id: bid }, S.confirm_body), h('div', { 'class': 'bg-actions' }, keep, end));
    card.addEventListener('keydown', function (e) { if (e.key === 'Escape' && o.onKeep) { e.preventDefault(); o.onKeep(); } });
    return o.scrim === false ? card : h('div', { 'class': 'bg-scrim' }, card);
  };
  /* component.game-over-panel — szablon: mode, score, record, newRecord, dailyInfo (until-midnight | new-available) (R-3.4) */
  BG.gameOverPanel = function (o) {
    var S = o.S, loc = o.loc, tid = o.elementId + '.title', p = o.prefix, ip = p.indexOf('element.') === 0 ? p.replace('element.', 'interaction.') : null;
    var newDay = o.mode === 'daily' && o.dailyInfo === 'new-available';
    var again = BG.button({ elementId: p + 'play-again', variant: 'primary', label: S.play_again, interactionId: ip && ip + 'play-again', action: 'tap', expected: o.mode === 'daily' ? 'navigate game.daily-start (nowe podejście, ciąg bieżącej daty)' : 'navigate game.classic-start (nowa gra klasyczna; r7.3, Q364: kwiatek zachowuje kropelki — przy kropelkach game.classic-start-drops)', onClick: o.onAgain, demo: o.demoAgain });
    var home = BG.button({ elementId: p + 'to-home', variant: 'secondary', label: S.to_home, interactionId: ip && ip + 'to-home', action: 'tap', expected: 'navigate screen.home', onClick: o.onHome });
    /* r5 (Q130): różnica do rekordu sprzed gry (recordBefore) — „Do rekordu zabrakło N”, przy równym wyniku „Rekord wyrównany”;
       przy nowym rekordzie plakietka „Nowy rekord!”; po podejściu innego dnia (R-3.6) bez różnicy. */
    var before = o.recordBefore, gap = null;
    if (!newDay && !o.newRecord && typeof before === 'number' && before > 0) {
      gap = o.score === before ? h('div', { 'class': 'bg-over-gap', 'data-element-id': p + 'record-gap', 'data-variant': 'tied' }, S.record_tied)
        : o.score < before ? h('div', { 'class': 'bg-over-gap', 'data-element-id': p + 'record-gap', 'data-variant': 'gap' }, BG.fmt(S.record_gap, { n: BG.num(before - o.score, loc) })) : null;
    }
    var card = h('div', { 'class': 'bg-card bg-over' + (o.row ? ' is-row' : ''), 'data-component-id': 'component.game-over-panel', 'data-element-id': o.elementId, 'data-variant': o.mode, role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': tid, 'aria-describedby': p + 'reason' },
      /* r5 (Q107): gra klasyczna to tryb domyślny — tytuł bez nazwy trybu; wyzwanie dnia z nazwą. */
      h('h2', { id: tid, 'class': 'bg-over-title' }, o.mode === 'daily' ? S.game_over + ' · ' + S.mode_daily : S.game_over),
      /* r5 (Q130): powód końca — zawsze (także po podejściu innego dnia). */
      h('p', { id: p + 'reason', 'class': 'bg-over-reason', 'data-element-id': p + 'reason' }, BG.icon('no-fit', 16), h('span', {}, S.over_reason)),
      /* R-3.6 (Q44): podejście zakończone innego dnia nie zmienia rekordu — panel nie pokazuje rekordu ani „Nowy rekord!”. */
      o.newRecord && !newDay ? h('span', { 'class': 'bg-newrec', 'data-element-id': p + 'new-record' }, BG.icon('star', 18), S.new_record) : null,
      h('div', { 'class': 'bg-over-score', 'data-element-id': p + 'score' }, BG.num(o.score, loc)),
      newDay ? null : h('div', { 'class': 'bg-over-record', 'data-element-id': p + 'record' }, (o.mode === 'daily' ? S.record_daily : S.record) + ' ' + BG.num(o.record, loc)),
      gap,
      /* r6 (sugestia do Q151): osiągnięty poziom w panelu końca gry klasycznej. */
      o.mode !== 'daily' && o.level ? h('div', { 'class': 'bg-over-level', 'data-element-id': p + 'level' }, BG.fmt(S.over_level, { n: o.level, name: S.motifs[o.motif] })) : null,
      /* r7.3 (Q364, Q365): w grze klasycznej kropelki kwiatka (0–2) przechodzą do następnej gry — panel pokazuje zebrane krople
         i „2 z 3 kropelek — dokończ w następnej grze”, gdy są; wyzwanie dnia ma własny kwiatek od zera w każdym podejściu (bez wiersza). */
      o.mode !== 'daily' && o.drops > 0 ? h('div', { 'class': 'bg-over-drops', 'data-element-id': p + 'drops' },
        h('span', { 'class': 'bg-drops', 'aria-hidden': 'true' }, [0, 1, 2].map(function (i) { return h('span', { 'class': 'bg-drop', html: BG.dropSVG(i < o.drops) }); })),
        h('span', {}, BG.fmt(S.over_drops, { d: o.drops }))) : null,
      o.mode === 'daily' ? h('div', { 'class': 'bg-daily-info', 'data-element-id': p + 'daily-info', 'data-variant': o.dailyInfo }, BG.icon('calendar', 20), o.dailyInfo === 'new-available' ? S.daily_new_available : S.daily_until_midnight) : null,
      h('div', { 'class': 'bg-actions' }, again, home));
    return o.scrim === false ? card : h('div', { 'class': 'bg-scrim' }, card);
  };

  /* component.alert — komunikaty błędów: save-error (R-4.5), read-error (R-4.6), crash (R-5.3) */
  BG.alert = function (o) {
    var S = o.S, v = o.variant;
    var text = { 'save-error': S.save_error, 'read-error': S.read_error, crash: S.crash }[v];
    /* r6 (Q201): wariant w jednym wierszu (krótki tekst) — na niskich oknach komunikat zapisu leży na wierszu wyniku. */
    if (o.line && v === 'save-error') text = S.save_error_short;
    var action = null;
    if (v === 'save-error') action = BG.button({ elementId: o.elementId + '.retry', variant: 'secondary', label: S.retry, interactionId: o.interactionId, action: 'tap', expected: 'ponawia zapis gry; po udanym zapisie komunikat znika, po nieudanym zostaje; gra trwa', onClick: o.onAction, demo: o.demo });
    if (v === 'crash') action = BG.button({ elementId: o.elementId + '.restart', variant: 'light', label: S.restart, interactionId: o.interactionId, action: 'tap', expected: 'przeładowuje grę z ostatnim zapisem: ekran startowy (home.resume-available, gdy zapis gry klasycznej istnieje)', onClick: o.onAction, demo: o.demo });
    return h('div', { 'class': 'bg-alert' + (action ? '' : ' is-plain') + (o.line ? ' is-line' : ''), 'data-component-id': 'component.alert', 'data-element-id': o.elementId, 'data-variant': v, role: 'alert' },
      h('span', { 'class': 'bg-alert-ic' }, BG.icon('warn', 20)), h('span', { 'class': 'bg-alert-text', 'aria-hidden': o.line ? 'true' : null }, text),
      o.line ? h('span', { 'class': 'bg-sr' }, S.save_error) : null, action);
  };

  /* r5 (Q135–Q139): animacje. Czasy i krzywe: responsive-spec.md, sekcja „Ruch”. Każda animacja leży na warstwie efektów
     albo na klasie elementu, którą zdejmuje timer — stan gry jest już końcowy, więc animacje nie blokują gry (Q136).
     reduced = prefers-reduced-motion: wyłącznie zmiana przezroczystości do 150 ms. mode=capture: animacji nie ma. */
  /* r7.3 (Q360, Q366, Q367): card — czas karty komunikatu z BG.cardMs (korekta Q366: 2000–3400 ms, min. 2000; card to wartość domyślna),
     zanik 300 ms na końcu; wejście i efekt własne dla karty (CSS .bg-mcard[data-art]). emptyGarden 2500, emptyWave usunięte (bez płatków na polach). Usunięte: praise 800, levelUp 1500, wither 400,
     cardDelay, fullWatering 3000, fullGrow, skip (święto pełnego podlania i jego pominięcie). */
  BG.MOTION = { settle: 150, bloom: 450, mono: 600, pop: 250, countUp: 400, deal: 240, dealStep: 80, rain: 1000, dim: 300, step: 1500, fade: 150, crossfade: 800, emptyCount: 1500, emptyDeal: 1900, emptySkip: 600, grow: 300,
    card: 2000, cardIn: 250, cardOut: 300, cardPraise: 350 };
  BG.fx = {
    reduced: function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); },
    /* Klasa animacji na elemencie, zdejmowana po czasie (restart przy powtórzeniu). */
    play: function (el, cls, ms, delay) {
      if (!el) return;
      el.classList.remove(cls); void el.offsetWidth;
      if (delay) el.style.animationDelay = delay + 'ms';
      el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); if (delay) el.style.animationDelay = ''; }, ms + (delay || 0) + 30);
    },
    fade: function (el) { BG.fx.play(el, 'fx-fade', BG.MOTION.fade); },
    /* (1) Osadzenie: położone pola lekko sprężynują, 150 ms. */
    settle: function (cells, reduced) { cells.forEach(function (c) { if (reduced) BG.fx.fade(c); else BG.fx.play(c, 'fx-settle', BG.MOTION.settle); }); },
    /* (2) Rozkwit: kopia kafla na warstwie efektów rozchyla się i znika, 3 płatki w kolorze kafla opadają; 450 ms. */
    bloom: function (board, indices, colorOf, reduced, ms) {
      ms = ms || BG.MOTION.bloom;
      indices.forEach(function (i, n) {
        var b = board.cellBox(i), col = colorOf(i);
        var tile = h('div', { 'class': 'bg-cell fx-tile' + (reduced ? ' fx-fadeout' : ' fx-bloom'), 'data-variant': 'filled', 'data-color': col, style: { left: b.x + 'px', top: b.y + 'px', width: b.s + 'px', height: b.s + 'px', '--cell': b.s + 'px', animationDuration: (reduced ? BG.MOTION.fade : ms) + 'ms' } });
        board.fx.append(tile);
        setTimeout(function () { tile.remove(); }, (reduced ? BG.MOTION.fade : ms) + 40);
        if (reduced) return;
        for (var k = 0; k < 3; k++) {
          var a = ((i * 47 + k * 120 + n * 13) % 360) * Math.PI / 180, size = Math.round(b.s * 0.5);
          var pe = h('img', { 'class': 'fx-petal', src: 'assets/img/petal-' + col + '.webp', alt: '', style: { left: (b.x + b.s / 2) + 'px', top: (b.y + b.s / 2) + 'px', width: size + 'px', height: size + 'px', animationDuration: ms + 'ms',
            '--dx': Math.round(Math.cos(a) * b.s * 0.75) + 'px', '--dy': Math.round(Math.sin(a) * b.s * 0.35 + b.s * 0.8) + 'px', '--rot': ((k ? 1 : -1) * (90 + (i * 31) % 120)) + 'deg' } });
          board.fx.append(pe);
          (function (x) { setTimeout(function () { x.remove(); }, ms + 40); })(pe);
        }
      });
    },
    /* (3) Linia jednego koloru: złoty błysk przesuwa się wzdłuż linii; 600 ms (jeden błysk na linię). Korekta Q366 (Lider): bez plakietki „+500” po ruchu — premię pokazuje karta 3. */
    sweep: function (board, line, S, reduced) {
      var g = board.geo, pitch = g.cell + g.gap, start = g.pad + g.gap, len = 8 * g.cell + 7 * g.gap;
      var box = line.kind === 'row' ? { left: start, top: start + line.index * pitch, width: len, height: g.cell } : { left: start + line.index * pitch, top: start, width: g.cell, height: len };
      if (!reduced) {
        var sw = h('div', { 'class': 'fx-sweep is-' + line.kind, style: { left: box.left + 'px', top: box.top + 'px', width: box.width + 'px', height: box.height + 'px', animationDuration: BG.MOTION.mono + 'ms' } });
        board.fx.append(sw); setTimeout(function () { sw.remove(); }, BG.MOTION.mono + 40);
      }
    },
    /* (4) Plakietka serii wyskakuje, 250 ms. */
    pop: function (el, reduced) { if (reduced) BG.fx.fade(el); else BG.fx.play(el, 'fx-pop', BG.MOTION.pop); },
    /* (6) Wynik dolicza się do nowej wartości (ease-out), najwyżej 400 ms. */
    countUp: function (api, from, to, reduced, msOpt) {
      if (reduced || from === to) { api.set(to); return; }
      var t0 = null, ms = msOpt || BG.MOTION.countUp;
      if (api._raf) cancelAnimationFrame(api._raf);
      var step = function (t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        api.set(Math.round(from + (to - from) * e));
        if (k < 1) api._raf = requestAnimationFrame(step); else api._raf = null;
      };
      api._raf = requestAnimationFrame(step);
    },
    /* (7) Nowa trójka wjeżdża do slotów kolejno: start co 80 ms, każdy wjazd 240 ms. */
    deal: function (pieces, reduced) {
      pieces.forEach(function (pe, i) { if (!pe) return; if (reduced) BG.fx.fade(pe); else BG.fx.play(pe, 'fx-deal', BG.MOTION.deal, i * BG.MOTION.dealStep); });
    },
    /* r7.3: karta ruchu (Q340) — wejście 250 ms (8 px w górę, skala 0,96 → 1; pochwała w niej wyskakuje 0,7 → 1,08 → 1 w 350 ms),
       postój, zanik w ostatnich 300 ms; razem 2400 ms. Przy „Rajski ogród!” rozbłysk 16 płatków z pochwały. Zwraca uchwyt { el, stop }:
       stop() zdejmuje kartę od razu (zastąpienie kartą następnego ruchu, bez kolejki). reduced-motion: tylko przezroczystość 150 ms. */
    card: function (host, el, reduced, place, onEnd) {
      host.append(el);
      if (place) place(el);
      /* Korekta Q366: każda karta ma własne wejście i efekt (klasa is-play, CSS .bg-mcard[data-art]) i własny czas (data-duration-ms);
         w ostatnich 300 ms klasa is-play schodzi (ilustracja w klatce szczytowej) i karta gaśnie. reduced-motion: tylko przezroczystość 150 ms. */
      el.classList.add(reduced ? 'fx-card-in-reduced' : 'is-play');
      var M = BG.MOTION, timers = [], ms = +el.getAttribute('data-duration-ms') || M.card;
      var outAt = ms - (reduced ? M.fade : M.cardOut);
      timers.push(setTimeout(function () { el.classList.remove('is-play'); el.classList.add(reduced ? 'fx-card-out-reduced' : 'fx-card-out'); }, outAt));
      var end = function () { timers.forEach(clearTimeout); el.remove(); if (onEnd) onEnd(); };
      timers.push(setTimeout(end, ms + 20));
      /* skip(): pominięcie stuknięciem (Pusta grządka, Q241) — karta znika od razu i rusza następny krok kolejki. */
      return { el: el, ms: ms, stop: function () { timers.forEach(clearTimeout); el.remove(); }, skip: end };
    },
    /* Podlewanie: nowy stopień — skok i rozbłysk 300 ms; utrata — więdnięcie i opadnięcie 400 ms, potem usunięcie. */
    grow: function (el, reduced) {
      if (reduced) { BG.fx.fade(el); return; }
      BG.fx.play(el, 'fx-grow', BG.MOTION.grow);
    },
    /* r7.3 (Q358, Q362): więdnięcie (wither) usunięte — kwiatek nie traci kropelek. */
    /* (12) Święto Pustej grządki (r7, ok. 2,5 s, największe w grze): rozkwit planszy falą od środka, płatki przez cały ekran, duża pochwała
       „Pusta grządka! +2500” z doliczaniem wyniku (1,5 s); o.after() po napisie (wjazd nowej trójki, 1,9 s).
       reduced-motion: bez fali i lotu płatków — płatki na planszy i pochwała tylko przezroczystość, wynik od razu. */
    /* r7.3 (Q366, Q367, korekta Q366): święto Pustej grządki to karta 4 w kolejce. Poza kartą nie ma efektów (bez płatków na polach,
       napisu na planszy i płatków przez ekran); zostaje zwykły rozkwit czyszczonych linii, doliczanie wyniku (1500 ms) i pauza trójki
       (Q241, wyjątek od Q136): nowa trójka pojawia się po 1900 ms, także przy reduced-motion (Q254); stuknięcie albo klik w ekran gry
       po 600 ms kończy pauzę od razu (o.skip — karta 4 znika i rusza następny krok kolejki). */
    emptyGarden: function (board, cleared, colorOf, reduced, o) {
      o = o || {};
      if (cleared.length) BG.fx.bloom(board, cleared, colorOf, reduced, BG.MOTION.bloom);
      if (o.score) BG.fx.countUp(o.score, o.from, o.to, reduced, BG.MOTION.emptyCount);
      var t0 = Date.now(), done = false, tm = null, host = o.screen;
      var release = function (tapped) {
        if (done) return; done = true; clearTimeout(tm);
        if (host) { host.removeEventListener('pointerdown', onTap, true); ['data-interaction-id', 'data-action', 'data-expected-effect'].forEach(function (k) { host.removeAttribute(k); }); }
        if (o.after) o.after();
        if (tapped && o.skip) o.skip();
      };
      var onTap = function () { if (Date.now() - t0 >= BG.MOTION.emptySkip) release(true); };
      if (host) {
        host.addEventListener('pointerdown', onTap, true);
        host.setAttribute('data-interaction-id', 'interaction.game.empty-garden-skip'); host.setAttribute('data-action', 'tap / klik w ekran gry (po 600 ms)');
        host.setAttribute('data-expected-effect', 'kończy pauzę Pustej grządki: karta „Pusta grządka!” znika, nowa trójka wjeżdża od razu, rusza następna karta kolejki');
      }
      tm = setTimeout(function () { release(false); }, BG.MOTION.emptyDeal);
    },
    /* r7.3 (Q366, Q367): święto pełnego podlania (warstwy, napis, pominięcie stuknięciem) usunięte — karta 6 i rozkwit kwiatka (BG.fwPill). */
    /* (11) Przenikanie tła przy awansie (Q150): stare tło na warstwie nad tłem powierzchni gaśnie w 800 ms (reduced: 150 ms). */
    crossfade: function (surface, setNew, reduced) {
      var old = h('div', { 'class': 'bg-bgfade', 'aria-hidden': 'true' });
      var cs = getComputedStyle(surface);
      old.style.backgroundImage = cs.backgroundImage; old.style.backgroundSize = cs.backgroundSize; old.style.backgroundPosition = cs.backgroundPosition; old.style.backgroundColor = cs.backgroundColor;
      surface.insertBefore(old, surface.firstChild);
      setNew();
      var ms = reduced ? BG.MOTION.fade : BG.MOTION.crossfade;
      old.style.animationDuration = ms + 'ms';
      old.classList.add('fx-bgfade');
      setTimeout(function () { old.remove(); }, ms + 40);
    },
    /* (8) Nowy rekord: deszcz płatków na panelu, 1 s. r6 (Q176): droga spadku = wysokość karty + 48 px, więc płatki są widoczne
       na karcie przez cały czas animacji na każdym targecie (w r5 stała droga 520 px przechodziła przez niską kartę mac-wide w ~60% czasu). */
    rain: function (card, reduced) {
      if (reduced) return;
      var layer = h('div', { 'class': 'fx-rain', 'aria-hidden': 'true', style: { '--fall': (card.offsetHeight + 48) + 'px' } });
      var cols = ['berry', 'poppy', 'sun', 'drop', 'leaf'];
      for (var i = 0; i < 18; i++) {
        layer.append(h('img', { 'class': 'fx-rain-petal', src: 'assets/img/petal-' + cols[i % 5] + '.webp', alt: '', style: { left: ((i * 53) % 100) + '%', animationDelay: ((i * 37) % 400) + 'ms', animationDuration: (600 - (i * 37) % 400 + 400) + 'ms', '--rot': ((i % 2 ? 1 : -1) * (120 + i * 17 % 160)) + 'deg' } }));
      }
      card.append(layer);
      setTimeout(function () { layer.remove(); }, BG.MOTION.rain + 60);
    }
  };

  /* Rozgrywka na żywo: plansza + trójka + wynik + seria + punkty ruchu, przeciąganie (R-1.4, R-1.5, R-1.8). */
  BG.play = function (o) {
    var g = o.geo, S = o.S, loc = o.loc, st = o.state, next = R.rng(o.seed), surface = o.surface, ids = o.ids;
    var board = o.board, tray = o.tray, scoreApi = o.score, strip = o.strip;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var busy = false, drag = null;
    /* r7.3: w pasku zostaje tylko Podlewanie; punkty ruchu są w karcie ruchu (o.card: { host, place(el) }; bez o.card karta stoi pod paskiem). */
    var comboHost = h('div', { 'class': 'bg-strip-left' }), pointsHost = h('div', { 'class': 'bg-strip-right' });
    strip.replaceChildren(comboHost, pointsHost);
    var cardCfg = o.card || { host: pointsHost, place: null }, cardNow = null, fwNow = null;
    var cardIds = o.cardIds || { card: ids.card || 'element.game.move-card', praise: ids.praise || 'element.game.praise', points: ids.points, drops: ids.drops || 'element.game.drops-gain', level: ids.level || 'element.game.level-up', record: ids.record || 'element.game.new-record' };
    /* r7.3 (Q356, Q360, Q366): kolejka komunikatów — każdy krok to ta sama karta (2000 ms), nigdy kilka naraz; kroki następnego
       ruchu dołączają na koniec kolejki; gra się nie zatrzymuje. Kropelki w pigułce zmieniają się, gdy zaczyna się krok kropelek;
       w kroku „Pełne podlanie!” kwiatek wskaźnika rozkwita (BG.fwPill) przez czas karty, potem zaczyna od nowa;
       nowy poziom (tło, etykieta) — gdy zaczyna się krok poziomu (o.onLevelStep). */
    var queue = [], running = false;
    function cardEl(spec) { return BG.moveCard({ S: S, loc: loc, step: spec.step, praise: spec.praise, points: spec.points, gain: spec.gain, dropsAfter: spec.dropsAfter, count: spec.count, score: spec.score, level: spec.level, ids: cardIds }); }
    function enqueue(steps) { queue = queue.concat(steps); if (!running) nextStep(); }
    function nextStep() {
      cardNow = null;
      var s = queue.shift();
      if (!s) { running = false; return; }
      running = true;
      var after = nextStep, el = cardEl(s), ms = +el.getAttribute("data-duration-ms");
      if (s.step === 'full') {
        paintCombo(3, false);
        var rs = BG.fwPill(comboHost.firstChild, reduced ? "reduced" : "anim", [], ms);
        fwNow = { stop: function () { rs(); fwNow = null; } };
        after = function () { if (fwNow) fwNow.stop(); paintCombo(s.dropsAfter, true); nextStep(); };
      }
      if (s.step === 'drops') paintCombo(s.dropsAfter, true);
      if (s.step === 'level' && o.onLevelStep) o.onLevelStep(s.level.n);
      cardNow = BG.fx.card(cardCfg.host, el, reduced, cardCfg.place, after);
    }
    /* Stała klatka (capture i stany bez odtwarzania): jeden krok kolejki; w user_preview znika po swoim czasie. */
    function showStatic(spec) {
      var el = cardEl(spec);
      cardCfg.host.append(el); if (cardCfg.place) cardCfg.place(el);
      cardNow = { el: el, stop: function () { el.remove(); } };
      if (o.animate) { var tm = setTimeout(function () { el.classList.add(reduced ? 'fx-card-out-reduced' : 'fx-card-out'); setTimeout(function () { el.remove(); }, BG.MOTION.cardOut); }, (+el.getAttribute("data-duration-ms") || BG.MOTION.card) - BG.MOTION.cardOut);
        cardNow.stop = function () { clearTimeout(tm); el.remove(); }; }
    }
    /* Karta przygasa, gdy przeciągany klocek jest nad obszarem pod nią (Q348): podgląd i wyróżnienie linii (R-1.4) zostają czytelne. */
    function dimCard(gh) {
      var el = cardNow && cardNow.el; if (!el || !el.isConnected) return;
      var on = false;
      if (gh) { var a = gh.getBoundingClientRect(), b = el.getBoundingClientRect(); on = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top; }
      el.classList.toggle('is-dimmed', on);
    }
    /* Stała klatka kroku „Pełne podlanie!”: kwiatek wskaźnika w szczycie rozkwitu (r7.3, Q367: bez osobnego święta). */
    function fullWatering(still) {
      if (fwNow) fwNow.stop();
      var rs = BG.fwPill(comboHost.firstChild, 'still', []);
      fwNow = { stop: function () { rs(); fwNow = null; } };
    }

    function expected(i) {
      return 'przeciąganie: klocek w rozmiarze pól planszy (dotyk: nad palcem); nad miejscem, gdzie się mieści, podświetla pola i linie do wyczyszczenia (×2 inaczej); puszczenie tam kładzie klocek, inaczej wraca do slotu ' + (i + 1);
    }
    function makePiece(p, i) {
      var pe = BG.piece({ piece: p, cell: g.pc, gap: g.pg, S: S, elementId: ids.piece + (i + 1), variant: o.interactive ? 'tray' : 'static', interactionId: ids.drag + (i + 1), action: 'drag (dotyk albo mysz)', expected: expected(i) });
      if (o.interactive) pe.addEventListener('pointerdown', function (e) { start(e, i, pe); });
      return pe;
    }
    /* r7.3: Podlewanie — kwiatek z kropelkami (0–3); nowy stopień: skok i rozbłysk (300 ms), ten sam stopień: podbicie (250 ms). */
    var shownDrops = st.drops || 0;
    function paintCombo(d, bump) {
      var old = comboHost.firstChild, oldStage = old ? +old.getAttribute('data-stage') : 0;
      shownDrops = d;
      var cb = BG.comboBadge({ drops: d, S: S, elementId: ids.combo });
      comboHost.replaceChildren(cb);
      if (bump && o.animate) { if (+cb.getAttribute('data-stage') !== oldStage) BG.fx.grow(cb, reduced); else BG.fx.pop(cb, reduced); }
    }
    var staticGhost = null, staticView = false;
    /* Widok stanu z fixture: zwykła plansza, klatka czyszczenia (frame) albo statyczne przeciąganie (drag). */
    function paintAll() {
      var v = o.view || {};
      if (v.frame) board.render(v.frame.placedBoard, { clearing: v.frame.clearing, bonusLines: v.frame.lines });
      else board.render(st.board, {});
      tray.render(st.tray, makePiece);
      scoreApi.set(st.score);
      paintCombo(v.drops != null ? v.drops : (st.drops || 0), false);
      if (v.card) showStatic(v.card);
      if (v.drag) staticDrag(v.drag);
      staticView = !!(v.frame || v.drag);
    }
    /* Pierwsza interakcja w user_preview zastępuje statyczną klatkę stanem gry. */
    function clearStatic() {
      if (!staticView) return;
      staticView = false; staticGone = true;
      if (staticGhost) { staticGhost.remove(); staticGhost = null; dimCard(null); }
      if (fwNow && (o.view || {}).fullWatering) { fwNow.stop(); fwNow = null; }
      board.render(st.board, {});
      tray.render(st.tray, makePiece);
    }
    /* r7.3: punkty ruchu z dopiskami w pasku (r5–r7.2, reguła Q203 i zwarte Podlewanie is-tight na pasku) zastąpiła karta ruchu.
       Stała klatka święta (capture) liczy położenia z gotowego układu, więc powstaje w layout(). */
    function relayout() {
      if (cardNow && cardNow.el.isConnected && cardCfg.place) cardCfg.place(cardNow.el);
      if ((o.view || {}).fullWatering && !staticGone) fullWatering(true);
      if (staticGhostPos) staticGhostPos();
    }
    var staticGone = false, staticGhostPos = null;

    function local(e) {
      var r = surface.getBoundingClientRect(), k = r.width / surface.offsetWidth;
      return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k, k: k, r: r };
    }
    function gridOrigin(L) {
      var gr = board.grid.getBoundingClientRect();
      return { x: (gr.left - L.r.left) / L.k + g.gap, y: (gr.top - L.r.top) / L.k + g.gap };
    }
    function ghostFor(p) {
      return BG.piece({ piece: p, cell: g.cell, gap: g.gap, S: S, elementId: null, variant: 'dragging' });
    }
    function size(sh) { return { w: sh.w * g.cell + (sh.w - 1) * g.gap, h: sh.h * g.cell + (sh.h - 1) * g.gap }; }
    function locate(tl, origin, sh, p) {
      var pitch = g.cell + g.gap;
      var col = Math.round((tl.x - origin.x) / pitch), row = Math.round((tl.y - origin.y) / pitch);
      var a = R.analyze(st.board, sh, p.color, row, col);
      return a ? { row: row, col: col, a: a } : null;
    }
    /* Statyczne przeciąganie (stany capture): klocek narysowany nad polami docelowymi, bez wskaźnika (R-1.8: palec jest pod klockiem). */
    function staticDrag(d) {
      /* r7.3: d.carry — klocek niesiony poza planszą (bez podglądu), np. nad kartą ruchu (game.dragging-under-card). */
      var p = st.tray[d.slot], sh = R.shape(p.shape), a = d.carry ? null : R.analyze(st.board, sh, p.color, d.row, d.col);
      tray.pieces[d.slot].setAttribute('data-variant', 'lifted');
      board.render(st.board, a ? { preview: a, previewColor: p.color } : {});
      var gh = ghostFor(p); surface.append(gh); staticGhost = gh;
      var pos = function () {
        var sr = surface.getBoundingClientRect(), k = sr.width / surface.offsetWidth, gr = board.grid.getBoundingClientRect();
        var pitch = g.cell + g.gap;
        /* Klocek podąża za palcem bez przyciągania; w klatce stoi 0,3 pola w lewo i w górę od pól docelowych, które pozostają widoczne. */
        gh.style.left = ((gr.left - sr.left) / k + g.gap + (d.col - 0.3) * pitch) + 'px';
        gh.style.top = ((gr.top - sr.top) / k + g.gap + (d.row - 0.3) * pitch) + 'px';
        dimCard(gh);
      };
      o.afterLayout = pos;
    }

    function start(e, i, pe) {
      if (busy || drag || e.button > 0 || (o.blocked && o.blocked())) return;
      e.preventDefault();
      clearStatic();
      pe = tray.pieces[i];
      var p = st.tray[i]; if (!p || !pe) return;
      var sh = R.shape(p.shape), L = local(e), sz = size(sh), touch = e.pointerType !== 'mouse';
      var off;
      if (touch) off = { x: sz.w / 2, y: sz.h + g.lift };
      else {
        var pr = pe.getBoundingClientRect(), tpitch = g.pc + g.pg, bpitch = g.cell + g.gap;
        off = { x: ((e.clientX - pr.left) / L.k) / tpitch * bpitch, y: ((e.clientY - pr.top) / L.k) / tpitch * bpitch };
      }
      var gh = ghostFor(p); surface.append(gh);
      try { pe.setPointerCapture(e.pointerId); } catch (_) {}
      pe.setAttribute('data-variant', 'lifted');
      drag = { i: i, p: p, sh: sh, pe: pe, gh: gh, off: off, id: e.pointerId, origin: gridOrigin(L), hit: null };
      move(e);
      pe.addEventListener('pointermove', move);
      pe.addEventListener('pointerup', up);
      pe.addEventListener('pointercancel', cancel);
      pe.addEventListener('lostpointercapture', cancel);
    }
    function move(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var L = local(e), tl = { x: L.x - drag.off.x, y: L.y - drag.off.y };
      drag.gh.style.left = tl.x + 'px'; drag.gh.style.top = tl.y + 'px';
      dimCard(drag.gh);
      drag.hit = locate(tl, drag.origin, drag.sh, drag.p);
      board.render(st.board, drag.hit ? { preview: drag.hit.a, previewColor: drag.p.color } : {});
    }
    function end() {
      var d = drag; drag = null;
      d.pe.removeEventListener('pointermove', move);
      d.pe.removeEventListener('pointerup', up);
      d.pe.removeEventListener('pointercancel', cancel);
      d.pe.removeEventListener('lostpointercapture', cancel);
      d.gh.remove();
      dimCard(null);
      return d;
    }
    function cancel(e) {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      var d = end();
      d.pe.setAttribute('data-variant', 'tray');
      board.render(st.board, {});
    }
    function up(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = end();
      if (!d.hit) { d.pe.setAttribute('data-variant', 'tray'); board.render(st.board, {}); return; } /* R-1.5 */
      var res = R.play(st, d.i, d.hit.row, d.hit.col, next, { daily: !o.levels });
      commit(res);
    }
    /* r5: stan po ruchu jest od razu końcowy (plansza po czyszczeniu, nowa trójka, wynik), a animacje grają na warstwie efektów (Q136). */
    function commit(res, x) {
      x = x || {};
      var mv = res.move, before = st.score;
      st = res.state;
      board.render(st.board, {});
      tray.render(st.tray, makePiece);
      var anim = !!o.animate;
      var emptyPts = mv.points.empty || 0;
      if (anim && emptyPts) {
        /* r7 / korekta Q366, r7.4: Pusta grządka (premia z reguły R-2.10 w R.play) — komunikat to karta 4; nowa trójka po 1900 ms albo po stuknięciu (od 600 ms). */
        var hid = tray.pieces.filter(Boolean); hid.forEach(function (pe) { pe.style.visibility = 'hidden'; });
        BG.fx.settle(mv.cells.map(function (i) { return board.cells[i]; }).filter(Boolean), reduced);
        BG.fx.emptyGarden(board, mv.clearedCells, function (i) { return mv.placedBoard[i]; }, reduced,
          { screen: surface, score: scoreApi, from: before, to: st.score, after: function () { hid.forEach(function (pe) { pe.style.visibility = ''; }); if (mv.dealt) BG.fx.deal(tray.pieces, reduced); },
            skip: function () { if (cardNow && cardNow.el.getAttribute('data-art') === '4' && cardNow.skip) cardNow.skip(); } });
      } else if (anim) {
        var cleared = {}; mv.clearedCells.forEach(function (i) { cleared[i] = true; });
        BG.fx.settle(mv.cells.filter(function (i) { return !cleared[i]; }).map(function (i) { return board.cells[i]; }), reduced);       /* (1) */
        var monoLines = mv.lines.filter(function (l) { return l.mono; });
        if (mv.clearedCells.length) BG.fx.bloom(board, mv.clearedCells, function (i) { return mv.placedBoard[i]; }, reduced, monoLines.length ? BG.MOTION.mono : BG.MOTION.bloom); /* (2) */
        monoLines.forEach(function (l) { BG.fx.sweep(board, l, S, reduced); });                                                   /* (3) */
        if (mv.dealt) BG.fx.deal(tray.pieces, reduced);                                                                          /* (7) */
        BG.fx.countUp(scoreApi, before, st.score, reduced);                                                                      /* (6) */
      } else scoreApi.set(st.score);
      /* r7.3 (Q356, Q360): kroki tego ruchu na koniec kolejki komunikatów (najwyżej 4: punkty → kropelki albo Pełne podlanie → rekord → poziom). */
      var ms = o.milestones ? o.milestones(st, before, x) : {};
      ms.empty = emptyPts;
      var steps = BG.stepsFor(mv, ms);
      /* r7.3 (Q366, Q367): Pusta grządka to karta 4 jak każda inna — kolejka startuje od razu. */
      if (anim) enqueue(steps);
      else {
        paintCombo(st.drops || 0, false);
        if (ms.level && o.onLevelStep) o.onLevelStep(ms.level.n);
      }
      if (o.onMove) o.onMove(st, before, x);
      /* Koniec gry (Q128): krok końca zaczyna się po animacji ruchu. */
      if (st.over && o.onOver) {
        var wait = !anim ? 0 : reduced ? BG.MOTION.fade : !mv.clearedCells.length ? BG.MOTION.settle : mv.lines.some(function (l) { return l.mono; }) ? BG.MOTION.mono : BG.MOTION.bloom;
        busy = true;
        setTimeout(function () { o.onOver(st, tray); }, wait);
      }
    }
    paintAll();
    /* r7: „Odtwórz” w user_preview — stan zaczyna się sprzed ruchu i prototyp sam wykonuje ruch ze scenariusza, więc widać jego animacje.
       r7.4: premię Pustej grządki liczy R.play z reguły (R-2.10), bez danych stanu. */
    function playMove(m, x) {
      x = x || {};
      clearStatic();
      var res = R.play(st, m.slot, m.row, m.col, next, { daily: !o.levels });
      commit(res, x);
    }
    staticGhostPos = function () { if (o.afterLayout) o.afterLayout(); };
    return { get state() { return st; }, playMove: playMove, layout: relayout };
  };

  /* Pasek narzędzi podglądu (standard paczki) — narzędzie prototypu poza element.product-work-surface; tylko user_preview i katalog. */
  var NOTES_KEY = 'bloomgrid.prototype.notes';
  function readNotes() { try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}') || {}; } catch (_) { return {}; } }
  function writeNotes(n) { try { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); } catch (_) {} }
  BG.previewToolbar = function (o) {
    var states = o.states || null, noteKey = o.noteStateId + '|' + o.targetId;
    var bar = h('div', { 'class': 'pt-bar', 'data-prototype-tool': 'preview-toolbar', role: 'region', 'aria-label': 'Pasek narzędzi podglądu' });
    var row1 = h('div', { 'class': 'pt-row' });
    row1.append(h('a', { 'class': 'pt-link', href: o.catalogHref, 'aria-current': o.catalogCurrent ? 'page' : null }, 'Katalog komponentów'));
    if (o.backHref) row1.append(h('a', { 'class': 'pt-link', href: o.backHref }, 'Prototyp'));
    /* r7: „Odtwórz” — stany z animacją (pochwała, Podlewanie, Kolorowa rabata, święto, awans) zaczynają od nowa i odtwarzają ruch. */
    if (o.replay) row1.append(h('button', { type: 'button', 'class': 'pt-btn', 'data-prototype-tool': 'replay', onclick: function () { location.reload(); } }, '▶ Odtwórz animację'));
    if (states) {
      var idx = states.map(function (s) { return s.state_id; }).indexOf(o.stateId);
      var groups = {}, order = [];
      states.forEach(function (s) { var k = s.screen_id || ''; if (!groups[k]) { groups[k] = []; order.push(k); } groups[k].push(s); });
      var sel = h('select', { id: 'pt-state', 'class': 'pt-select', onchange: function (e) { o.onState(e.target.value); } },
        order.map(function (k) { return h('optgroup', { label: k }, groups[k].map(function (s) { return h('option', { value: s.state_id, selected: s.state_id === o.stateId }, s.state_id); })); }));
      var go = function (d) { var n = states.length; o.onState(states[(idx + d + n) % n].state_id); };
      row1.append(h('span', { 'class': 'pt-group' },
        h('label', { 'for': 'pt-state', 'class': 'pt-label' }, 'Ekran / stan'), sel,
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Poprzedni stan', onclick: function () { go(-1); } }, '‹'),
        h('button', { type: 'button', 'class': 'pt-btn pt-arrow', 'aria-label': 'Następny stan', onclick: function () { go(1); } }, '›'),
        h('span', { 'class': 'pt-count', 'aria-label': 'Stan ' + (idx + 1) + ' z ' + states.length }, (idx + 1) + ' / ' + states.length)));
    }
    var row2 = h('div', { 'class': 'pt-row', role: 'group', 'aria-label': 'Profil podglądu' },
      o.targets.map(function (t) {
        var on = t.target_id === o.targetId;
        return h('button', { type: 'button', 'class': 'pt-btn pt-profile', 'aria-pressed': on ? 'true' : 'false', onclick: function () { if (!on) o.onTarget(t.target_id); } }, t.target_id + ' ' + t.width + '×' + t.height);
      }));
    var ta = h('textarea', { id: 'pt-notes', 'class': 'pt-notes', rows: '1', placeholder: o.noteStateId + ' · ' + o.targetId });
    ta.value = readNotes()[noteKey] || '';
    ta.addEventListener('input', function () { var n = readNotes(); if (ta.value) n[noteKey] = ta.value; else delete n[noteKey]; writeNotes(n); });
    var copyBtn = h('button', { type: 'button', 'class': 'pt-btn', onclick: function () {
      var n = readNotes(), keys = Object.keys(n).sort();
      var text = keys.length ? keys.map(function (k) { var p = k.split('|'); return 'state_id: ' + p[0] + '\ntarget_id: ' + p[1] + '\n' + n[k]; }).join('\n\n') : '(brak uwag)';
      var done = function (ok) { copyBtn.textContent = ok ? 'Skopiowano' : 'Nie skopiowano'; setTimeout(function () { copyBtn.textContent = 'Kopiuj'; }, 1500); };
      var fallback = function () { var t = h('textarea', { style: { position: 'fixed', opacity: '0' } }); t.value = text; document.body.append(t); t.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (_) {} t.remove(); done(ok); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback); else fallback();
    } }, 'Kopiuj');
    var row3 = h('div', { 'class': 'pt-row pt-row-notes' },
      h('label', { 'for': 'pt-notes', 'class': 'pt-label' }, 'Uwagi do tego stanu'), ta,
      h('span', { 'class': 'pt-group' },
        h('button', { type: 'button', 'class': 'pt-btn', onclick: function () { ta.value = ''; var n = readNotes(); delete n[noteKey]; writeNotes(n); ta.focus(); } }, 'Wyczyść'),
        copyBtn));
    bar.append(row1, row2, row3);
    return bar;
  };

  window.BG = BG;
})();
