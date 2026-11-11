/* ===== Shared framework for all tests (runs fully in the browser, no server needed) =====
   Languages: vi (default), en, zh (Simplified Chinese). Choose on the start page or on each test's intro screen. */
const $ = (s, r = document) => r.querySelector(s);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const nextFrame = () => new Promise(r => requestAnimationFrame(r));
const now = () => performance.now();
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const r1 = x => (x == null || isNaN(x)) ? '' : Math.round(x * 10) / 10;
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : NaN;
const pct = (n, d) => d ? Math.round(n / d * 1000) / 10 : 0;
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- i18n ---------- */
const LANGS = { vi: 'Tiếng Việt', en: 'English', zh: '简体中文' };
const LOCALE = { vi: 'vi-VN', en: 'en-US', zh: 'zh-CN' };
function initialLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q && LANGS[q]) return q;
  try { const s = localStorage.getItem('edu_lang'); if (s && LANGS[s]) return s; } catch (e) { }
  return 'vi';
}
let LANG = initialLang();
function setLang(l) {
  LANG = LANGS[l] ? l : 'vi';
  try { localStorage.setItem('edu_lang', LANG); } catch (e) { }
  document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : LANG;
  const u = new URL(location.href); u.searchParams.set('lang', LANG); history.replaceState(null, '', u);
}
document.documentElement.lang = LANG === 'zh' ? 'zh-CN' : LANG;
const fmtMs = x => (x == null || isNaN(x)) ? '—' : Math.round(x).toLocaleString(LOCALE[LANG]);
const K = k => `<span class="key">${k}</span>`;

const COMMON_TXT = {
  vi: {
    continue: 'Tiếp tục', spaceKey: 'Cách', orSpace: p => `(hoặc nhấn phím ${K(p.k)})`,
    restTitle: 'Nghỉ giải lao', restDone: p => `Bạn đã hoàn thành <b>${p.d}/${p.t}</b> phần. Làm tốt lắm!`,
    restRelax: 'Hãy thả lỏng, chớp mắt, nhìn ra xa và hít thở sâu.', seconds: 'giây',
    restOver: 'Hết giờ nghỉ. Khi sẵn sàng, hãy bấm nút hoặc nhấn phím Cách.', ready: 'Tôi đã sẵn sàng – Tiếp tục',
    getReady: 'Chuẩn bị…',
    estimate: p => `⏱ Thời gian dự kiến: <b>${p.e}</b>. Hãy ngồi thoải mái, cách màn hình khoảng một cánh tay, đeo kính (nếu có).`,
    pidLabel: 'Mã người tham gia (do nghiên cứu viên nhập)', pidPh: 'VD: P01', fullscreen: '⛶ Toàn màn hình', startPractice: 'Bắt đầu làm thử',
    checking: 'Đang kiểm tra màn hình…',
    rinfo: p => `Dành cho nghiên cứu viên: tần số quét màn hình đo được ≈ <b>${p.hz} Hz</b> (1 khung hình ≈ ${p.fm} ms). `,
    rwarn: 'Khuyến nghị dùng màn hình 60 Hz; thời lượng kích thích sẽ được quy đổi theo khung hình của màn hình này.',
    rdl: ' Kết quả có thể tải về dạng CSV/JSON ở màn hình cuối.',
    back: '← Tất cả bài test', langLabel: 'Ngôn ngữ',
    tActive: 'Thời gian làm bài thực (không tính nghỉ)', tRest: 'Thời gian nghỉ', times: 'lần', tMain: 'Tổng thời gian phần chính (kể cả nghỉ)',
    tSession: 'Tổng thời gian cả phiên (kể cả hướng dẫn, làm thử)',
    doneTitle: 'Hoàn thành! Cảm ơn bạn đã tham gia 🌿', forResearcher: 'Kết quả dưới đây dành cho nghiên cứu viên.', detailTitle: 'Chi tiết từng câu',
    dlCsv: '⬇ Tải CSV', dlJson: '⬇ Tải JSON', next: '↺ Người tiếp theo', confirmNext: 'Bắt đầu lại cho người tiếp theo? Hãy chắc chắn bạn đã tải kết quả.',
    pid: 'Mã người tham gia', test: 'Bài test', started: 'Bắt đầu', language: 'Ngôn ngữ',
    ok: 'Đúng', bad: 'Sai', mKey: 'phím', mMouse: 'chuột', mTimeout: 'hết giờ',
    practice: 'Làm thử', practiceEnd: 'Kết thúc phần làm thử', startMain: 'Bắt đầu bài chính', start: 'Bắt đầu',
    fbOk: '✓ Đúng', fbBad: '✗ Chưa đúng',
    cTrial: 'Lượt', cBlock: 'Phần', cAnswer: 'Đáp án', cResp: 'Trả lời', cResult: 'Kết quả', cMethod: 'Cách trả lời', cQ: 'Câu',
    score: 'Số câu đúng (điểm)', rtCorrect: 'RT trung bình (câu đúng)', rtAll: 'RT trung bình (mọi câu)',
  },
  en: {
    continue: 'Continue', spaceKey: 'Space', orSpace: p => `(or press ${K(p.k)})`,
    restTitle: 'Take a break', restDone: p => `You have completed <b>${p.d}/${p.t}</b> parts. Well done!`,
    restRelax: 'Relax, blink, look into the distance and take a deep breath.', seconds: 'seconds',
    restOver: 'The break is over. When you are ready, click the button or press Space.', ready: "I'm ready – Continue",
    getReady: 'Get ready…',
    estimate: p => `⏱ Estimated time: <b>${p.e}</b>. Sit comfortably, about an arm's length from the screen, and wear your glasses if you use them.`,
    pidLabel: 'Participant ID (entered by the researcher)', pidPh: 'e.g. P01', fullscreen: '⛶ Full screen', startPractice: 'Start practice',
    checking: 'Checking the screen…',
    rinfo: p => `For the researcher: measured screen refresh rate ≈ <b>${p.hz} Hz</b> (1 frame ≈ ${p.fm} ms). `,
    rwarn: 'A 60 Hz screen is recommended; stimulus durations will be converted to the frames of this screen.',
    rdl: ' Results can be downloaded as CSV/JSON on the final screen.',
    back: '← All tests', langLabel: 'Language',
    tActive: 'Active test time (excluding breaks)', tRest: 'Break time', times: 'times', tMain: 'Main test total (including breaks)',
    tSession: 'Whole session (including instructions and practice)',
    doneTitle: 'Finished! Thank you for taking part 🌿', forResearcher: 'The results below are for the researcher.', detailTitle: 'Trial-by-trial details',
    dlCsv: '⬇ Download CSV', dlJson: '⬇ Download JSON', next: '↺ Next participant', confirmNext: 'Start again for the next participant? Make sure you have downloaded the results.',
    pid: 'Participant ID', test: 'Test', started: 'Started', language: 'Language',
    ok: 'Correct', bad: 'Wrong', mKey: 'key', mMouse: 'mouse', mTimeout: 'timeout',
    practice: 'Practice', practiceEnd: 'Practice complete', startMain: 'Start the main test', start: 'Start',
    fbOk: '✓ Correct', fbBad: '✗ Not correct',
    cTrial: 'Trial', cBlock: 'Block', cAnswer: 'Correct answer', cResp: 'Response', cResult: 'Result', cMethod: 'Input', cQ: 'Item',
    score: 'Correct (score)', rtCorrect: 'Mean RT (correct)', rtAll: 'Mean RT (all)',
  },
  zh: {
    continue: '继续', spaceKey: '空格', orSpace: p => `（或按 ${K(p.k)} 键）`,
    restTitle: '休息一下', restDone: p => `您已完成 <b>${p.d}/${p.t}</b> 部分，做得很好！`,
    restRelax: '请放松，眨眨眼，望向远处，深呼吸。', seconds: '秒',
    restOver: '休息结束。准备好后，请点击按钮或按空格键。', ready: '我准备好了 – 继续',
    getReady: '准备…',
    estimate: p => `⏱ 预计用时：<b>${p.e}</b>。请舒适地坐好，与屏幕保持约一臂距离，如需戴眼镜请戴上。`,
    pidLabel: '被试编号（由研究人员填写）', pidPh: '例如：P01', fullscreen: '⛶ 全屏', startPractice: '开始练习',
    checking: '正在检测屏幕…',
    rinfo: p => `研究人员参考：屏幕刷新率约为 <b>${p.hz} Hz</b>（1 帧 ≈ ${p.fm} 毫秒）。`,
    rwarn: '建议使用 60 Hz 屏幕；刺激呈现时间将按本屏幕的帧数换算。',
    rdl: '测试结束后可在最后一页下载 CSV/JSON 结果。',
    back: '← 全部测试', langLabel: '语言',
    tActive: '实际答题时间（不含休息）', tRest: '休息时间', times: '次', tMain: '正式测试总时长（含休息）',
    tSession: '整个流程总时长（含说明和练习）',
    doneTitle: '完成！感谢您的参与 🌿', forResearcher: '以下结果供研究人员使用。', detailTitle: '逐题详情',
    dlCsv: '⬇ 下载 CSV', dlJson: '⬇ 下载 JSON', next: '↺ 下一位被试', confirmNext: '要为下一位被试重新开始吗？请确认已下载结果。',
    pid: '被试编号', test: '测试', started: '开始时间', language: '语言',
    ok: '正确', bad: '错误', mKey: '按键', mMouse: '鼠标', mTimeout: '超时',
    practice: '练习', practiceEnd: '练习结束', startMain: '开始正式测试', start: '开始',
    fbOk: '✓ 正确', fbBad: '✗ 不正确',
    cTrial: '试次', cBlock: '组块', cAnswer: '正确答案', cResp: '回答', cResult: '结果', cMethod: '作答方式', cQ: '题号',
    score: '正确数（得分）', rtCorrect: '平均反应时（正确）', rtAll: '平均反应时（全部）',
  },
};
function t(key, p = {}) {
  const T = (typeof TXT !== 'undefined' ? TXT : {});
  let v = T[LANG]?.[key] ?? COMMON_TXT[LANG]?.[key] ?? T.vi?.[key] ?? COMMON_TXT.vi[key];
  if (v == null) return key;
  return typeof v === 'function' ? v(p) : v;
}

/* ---------- session state ---------- */
const S = {
  test: TEST_META.code, pid: '',
  startedISO: null, tSession: null, tMainStart: null, tMainEnd: null,
  rests: [], frameMs: 1000 / 60, refreshHz: 60, running: false, suffix: '',
};

/* ---------- screens ---------- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $('#stage').classList.remove('active');
  if (id === 'stage') $('#stage').classList.add('active'); else $('#' + id).classList.add('active');
  const tb = $('#topbar'); if (tb) tb.style.display = id === 'intro' ? 'flex' : 'none';
  window.scrollTo(0, 0);
}
function stage(html) { const st = $('#stage'); st.innerHTML = html; if (!st.classList.contains('active')) showScreen('stage'); return st; }

/* ---------- beep ---------- */
let _ac;
function beep(freq = 440, dur = 180, vol = 0.25) {
  try {
    _ac = _ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = _ac.createOscillator(), g = _ac.createGain();
    o.frequency.value = freq; o.type = 'sine'; g.gain.value = vol;
    o.connect(g); g.connect(_ac.destination); o.start();
    g.gain.exponentialRampToValueAtTime(0.0001, _ac.currentTime + dur / 1000); o.stop(_ac.currentTime + dur / 1000 + 0.02);
  } catch (e) { }
}

/* ---------- refresh rate & frame-accurate timing ---------- */
async function measureRefresh() {
  const ts = []; for (let i = 0; i < 70; i++) ts.push(await nextFrame());
  const d = []; for (let i = 11; i < ts.length; i++) d.push(ts[i] - ts[i - 1]);
  d.sort((a, b) => a - b); const med = d[Math.floor(d.length / 2)];
  S.frameMs = med; S.refreshHz = Math.round(1000 / med); return S.refreshHz;
}
async function holdFrames(n) { const onset = await nextFrame(); let tt = onset; for (let i = 0; i < n; i++) tt = await nextFrame(); return { onset, dur: tt - onset }; }
async function holdMs(ms) { const onset = await nextFrame(); let tt = onset; while (tt - onset < ms - S.frameMs / 2) tt = await nextFrame(); return { onset, dur: tt - onset }; }

/* ---------- wait for a response (key or mouse/touch). RT is measured from stimulus onset. ---------- */
function waitResponse({ keys = {}, els = [], timeout = 0, onset = null } = {}) {
  return new Promise(async resolve => {
    let done = false, tmr = null; const cleanups = [];
    const finish = (resp, ts, method) => {
      if (done) return; done = true; if (tmr) clearTimeout(tmr);
      cleanups.forEach(f => f());
      resolve({ resp, rt: resp == null ? null : Math.max(0, ts - onset), method, onset });
    };
    const kd = e => {
      if (e.repeat) return;
      if (e.key in keys && onset != null && e.timeStamp >= onset - 1) { e.preventDefault(); finish(keys[e.key], e.timeStamp, t('mKey')); }
    };
    window.addEventListener('keydown', kd); cleanups.push(() => window.removeEventListener('keydown', kd));
    els.forEach(({ el, value }) => {
      const h = e => { if (onset != null) { e.preventDefault(); finish(value, e.timeStamp, t('mMouse')); } };
      el.addEventListener('pointerdown', h); cleanups.push(() => el.removeEventListener('pointerdown', h));
    });
    if (onset == null) onset = await nextFrame();
    if (timeout > 0) tmr = setTimeout(() => finish(null, now(), t('mTimeout')), Math.max(0, timeout - (now() - onset)));
  });
}
function waitKeyOrClick(btn, keys = [' ', 'Enter']) {
  return new Promise(res => {
    const kd = e => { if (keys.includes(e.key)) { e.preventDefault(); done(); } };
    const done = () => { window.removeEventListener('keydown', kd); btn && btn.removeEventListener('click', done); res(); };
    setTimeout(() => { window.addEventListener('keydown', kd); btn && btn.addEventListener('click', done); }, 350);
  });
}

/* ---------- message screen ---------- */
async function message({ title = '', html = '', button }) {
  const m = $('#msg');
  m.innerHTML = `<div class="card">${title ? `<h2>${title}</h2>` : ''}<div>${html}</div>
    <div class="row end" style="margin-top:28px"><button class="btn" id="msgBtn">${button || t('continue')} ➜</button></div>
    <p class="sub" style="text-align:right;margin:10px 0 0">${t('orSpace', { k: t('spaceKey') })}</p></div>`;
  showScreen('msg'); $('#msgBtn').focus();
  await waitKeyOrClick($('#msgBtn'));
}

/* ---------- break between parts ---------- */
async function restScreen(seconds, doneParts, totalParts) {
  const m = $('#msg'); const t0 = now();
  m.innerHTML = `<div class="card" style="text-align:center">
    <h2>${t('restTitle')}</h2>
    <p>${t('restDone', { d: doneParts, t: totalParts })}</p>
    <div class="progress"><div style="width:${doneParts / totalParts * 100}%"></div></div>
    <p>${t('restRelax')}</p>
    <div class="big-count" id="cd">${seconds}</div><p class="sub" id="cdlab">${t('seconds')}</p>
    <div class="row center"><button class="btn" id="restBtn" disabled>${t('ready')} ➜</button></div></div>`;
  showScreen('msg');
  const btn = $('#restBtn');
  for (let s = seconds; s > 0; s--) { $('#cd').textContent = s; await sleep(1000 - ((now() - t0) % 1000) + 5); }
  $('#cd').textContent = '✓'; $('#cdlab').textContent = t('restOver');
  btn.disabled = false; btn.focus(); beep(660, 200, 0.15);
  await waitKeyOrClick(btn);
  const dur = now() - t0; S.rests.push({ afterPart: doneParts, ms: Math.round(dur) }); return dur;
}

/* ---------- countdown ---------- */
async function countdown(n = 3) {
  for (let i = n; i > 0; i--) { stage(`<div class="fix" style="font-size:140px;color:var(--pri)">${i}</div><div class="topinfo">${t('getReady')}</div>`); await sleep(800); }
  stage(''); await sleep(300);
}

/* ---------- top bar (back link + language) – visible on the intro screen only ---------- */
function topbarHTML() {
  return `<a class="backlink" href="../index.html?lang=${LANG}">${t('back')}</a>
    <label class="langpick"><span>🌐 ${t('langLabel')}</span>
      <select id="langSel" aria-label="Language">${Object.entries(LANGS).map(([k, v]) => `<option value="${k}"${k === LANG ? ' selected' : ''}>${v}</option>`).join('')}</select></label>`;
}

/* ---------- intro screen. specFn() returns {title, subtitle, body, estimate}; re-rendered when the language changes ---------- */
function buildIntro(specFn) {
  let hz = null;
  const render = () => {
    const keep = {}; document.querySelectorAll('#intro input, #intro select').forEach(el => { if (el.id) keep[el.id] = el.value; });
    const sp = specFn();
    document.title = sp.title;
    $('#topbar').innerHTML = topbarHTML();
    $('#intro').innerHTML = `<div class="card">
      <h1>${sp.title}</h1><p class="sub">${sp.subtitle || ''}</p>
      ${sp.body}
      <p class="note">${t('estimate', { e: sp.estimate })}</p>
      <div class="field"><label for="pid">${t('pidLabel')}</label>
        <input id="pid" autocomplete="off" placeholder="${t('pidPh')}"></div>
      <div class="row">
        <button class="btn secondary" id="fsBtn">${t('fullscreen')}</button>
        <button class="btn" id="startBtn">${t('startPractice')} ➜</button>
      </div>
      <div class="researcher" id="rinfo">${t('checking')}</div></div>`;
    Object.entries(keep).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.value = v; });
    $('#langSel').onchange = e => { setLang(e.target.value); render(); };
    $('#fsBtn').onclick = () => { const d = document.documentElement; (d.requestFullscreen || d.webkitRequestFullscreen || (() => { })).call(d); };
    showRinfo();
    bind();
  };
  const showRinfo = () => {
    if (hz == null) return;
    $('#rinfo').innerHTML = t('rinfo', { hz, fm: r1(S.frameMs) }) +
      (TEST_META.frameCritical && Math.abs(hz - 60) > 3 ? `<b style="color:var(--bad)">${t('rwarn')}</b>` : '') + t('rdl');
  };
  let resolveFn;
  const bind = () => {
    const go = () => {
      const v = $('#pid').value.trim();
      if (!v) { $('#pid').focus(); $('#pid').style.borderColor = 'var(--bad)'; return; }
      S.pid = v; S.startedISO = new Date().toISOString(); S.tSession = now(); S.running = true;
      const d = document.documentElement; if (!document.fullscreenElement && d.requestFullscreen) d.requestFullscreen().catch(() => { });
      resolveFn();
    };
    $('#startBtn').onclick = go;
    $('#pid').addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
  };
  render(); showScreen('intro');
  measureRefresh().then(h => { hz = h; showRinfo(); });
  return new Promise(res => { resolveFn = res; });
}
window.addEventListener('beforeunload', e => { if (S.running) { e.preventDefault(); e.returnValue = ''; } });

function markMainStart() { S.tMainStart = now(); S.rests = []; }
function markMainEnd() { S.tMainEnd = now(); S.running = false; }
function timeSummary() {
  const total = S.tMainEnd - S.tMainStart, rest = S.rests.reduce((s, r) => s + r.ms, 0);
  return { mainTotalMs: Math.round(total), restMs: Math.round(rest), activeMs: Math.round(total - rest), sessionMs: Math.round(S.tMainEnd - S.tSession) };
}
function timeStats() {
  const tm = timeSummary();
  return [
    { k: t('tActive'), v: fmtMs(tm.activeMs), u: 'ms' },
    { k: t('tRest'), v: fmtMs(tm.restMs), u: `ms · ${S.rests.length} ${t('times')}` },
    { k: t('tMain'), v: fmtMs(tm.mainTotalMs), u: 'ms' },
    { k: t('tSession'), v: fmtMs(tm.sessionMs), u: 'ms' },
  ];
}

/* ---------- export ---------- */
function download(name, text, type) {
  const b = new Blob([text], { type }); const a = document.createElement('a');
  a.href = URL.createObjectURL(b); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
function toCSV(rows, cols) {
  const q = v => { v = v == null ? '' : String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  return '﻿' + [cols.map(c => q(c.label)).join(',')].concat(rows.map(r => cols.map(c => q(c.csv ? c.csv(r) : r[c.key])).join(','))).join('\r\n');
}
function testCode() { return S.test + S.suffix; }
function fileStem() { const d = new Date(S.startedISO || Date.now()); const p = n => String(n).padStart(2, '0'); return `${testCode()}_${S.pid || 'NA'}_${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`; }

/* ---------- results screen ---------- */
function renderResults({ name, stats, columns, rows, extra = '', summary = {}, tableTitle }) {
  const tm = timeSummary();
  const meta = [{ key: '_pid', label: t('pid'), csv: () => S.pid }, { key: '_test', label: t('test'), csv: () => testCode() },
  { key: '_start', label: t('started'), csv: () => S.startedISO }, { key: '_lang', label: t('language'), csv: () => LANG }];
  const allStats = [{ k: t('pid'), v: esc(S.pid) }].concat(stats, timeStats());
  const payload = { test: testCode(), testName: name, language: LANG, participant: S.pid, startedAt: S.startedISO, refreshHz: S.refreshHz, frameMs: r1(S.frameMs), time: tm, rests: S.rests, summary, trials: rows };
  try { localStorage.setItem('result_' + fileStem(), JSON.stringify(payload)); } catch (e) { }
  const body = rows.map(r => `<tr class="${r._bad ? 'bad' : ''}">${columns.map(c => `<td>${c.fmt ? c.fmt(r) : esc(r[c.key])}</td>`).join('')}</tr>`).join('');
  $('#result').innerHTML = `<div class="card results-card">
    <h1>${t('doneTitle')}</h1>
    <p class="sub">${esc(name)} · ${t('forResearcher')}</p>
    <div class="stats">${allStats.map(s => `<div class="stat"><div class="k">${s.k}</div><div class="v">${s.v} <span class="u">${s.u || ''}</span></div></div>`).join('')}</div>
    ${extra}
    <h2>${tableTitle || t('detailTitle')}</h2>
    <div class="tablewrap"><table class="res"><thead><tr>${columns.map(c => `<th>${c.label}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>
    <div class="row">
      <button class="btn" id="dlCsv">${t('dlCsv')}</button>
      <button class="btn secondary" id="dlJson">${t('dlJson')}</button>
      <button class="btn secondary small" id="again" style="margin-left:auto">${t('next')}</button>
    </div></div>`;
  showScreen('result');
  $('#dlCsv').onclick = () => download(fileStem() + '.csv', toCSV(rows, meta.concat(columns.map(c => ({ ...c, csv: c.csv || (r => r[c.key]) })))), 'text/csv;charset=utf-8');
  $('#dlJson').onclick = () => download(fileStem() + '.json', JSON.stringify(payload, null, 2), 'application/json');
  $('#again').onclick = () => { if (confirm(t('confirmNext'))) location.reload(); };
  if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
}
const accTag = ok => ok == null ? '—' : ok ? `<span class="tag ok">${t('ok')}</span>` : `<span class="tag bad">${t('bad')}</span>`;
