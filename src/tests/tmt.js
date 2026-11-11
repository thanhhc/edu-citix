/* ===== Trail Making Test (TMT) – 6 blocks: A → B → A → B → A → B, with a break between blocks =====
   25 circles per block. A wrong click beeps; the participant must click the last correct circle again, then continue.
   Block time: from board onset to the click on the last circle. */
const CFG = { order: ['A', 'B', 'A', 'B', 'A', 'B'], nodes: 25, restSec: 15, seeds: [101, 202, 303, 404, 505, 606], practiceSeedA: 11, practiceSeedB: 22 };
// Letters for part B. Vietnamese alphabet has no F, J → skipped for Vietnamese; English/Chinese use A–L.
const LETTER_SETS = { vi: ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'K', 'L', 'M', 'N'], en: 'ABCDEFGHIJKL'.split(''), zh: 'ABCDEFGHIJKL'.split('') };
const letters = () => LETTER_SETS[LANG] || LETTER_SETS.vi;
const VB = { w: 1000, h: 600, r: 34, minD: 104, pad: 46 };
const TXT = {
  vi: {
    name: 'Bài test Nối số – Nối chữ (Trail Making)', sub: 'Đo tốc độ tìm kiếm bằng mắt và khả năng chuyển đổi linh hoạt',
    est: 'khoảng 15 phút, gồm 6 phần, có nghỉ giữa các phần',
    body: p => `<p>Trên màn hình có nhiều vòng tròn. Dùng <b>chuột</b> bấm vào từng vòng tròn <b>theo đúng thứ tự</b>, càng nhanh càng tốt.</p>
      <div class="demo"><figure>${p.dA}<br><b>Kiểu A:</b> chỉ có số – bấm 1 → 2 → 3 → 4 …</figure>
      <figure>${p.dB}<br><b>Kiểu B:</b> xen kẽ số và chữ – bấm 1 → A → 2 → B → 3 → C …</figure></div>
      <ul class="steps"><li>Mỗi lần bấm đúng, một đường nối sẽ tự vẽ ra.</li>
      <li>Nếu bấm <b>sai</b>, máy sẽ kêu và nhắc bạn <b>bấm lại vào ô đúng gần nhất</b> (tô màu vàng) rồi tiếp tục.</li>
      <li>Bài gồm <b>6 phần: A → B → A → B → A → B</b>. Giữa các phần có thời gian nghỉ.</li></ul>`,
    head: 'Nối theo thứ tự:', prHead: 'LÀM THỬ · ',
    errStart: p => `✗ Chưa đúng! Hãy bắt đầu từ ô «${p.l}».`, errOrder: p => `✗ Sai thứ tự! Hãy bấm lại vào ô «${p.l}» rồi tiếp tục.`,
    prA: 'Làm thử – Kiểu A', prAhtml: '<p>Bấm các số theo thứ tự <b>1 → 2 → 3 …</b> đến hết.</p><p>Phần này chỉ để làm quen, không tính điểm.</p>',
    prB: 'Làm thử – Kiểu B', prBhtml: '<p>Tốt lắm! Bây giờ bấm <b>xen kẽ số và chữ</b>: <b>1 → A → 2 → B → 3 → C …</b></p>',
    prEnd: p => `<p>Bây giờ bắt đầu <b>bài chính gồm ${p.b} phần</b>, mỗi phần có ${p.n} vòng tròn.</p><p>Hãy làm <b>nhanh và chính xác</b> nhất có thể.</p>`,
    part: p => `Phần ${p.i}/${p.n} – Kiểu ${p.type}`,
    partA: p => `<p>Bấm các <b>số</b> theo thứ tự: <b>1 → 2 → 3 → … → ${p.n}</b>.</p>`,
    partB: p => `<p>Bấm <b>xen kẽ số và chữ</b>: <b>1 → A → 2 → B → 3 → C …</b></p><p class="sub">Thứ tự chữ: ${p.l}</p>`,
    detail: 'Chi tiết từng phần', sA: 'TMT-A: thời gian trung bình', sB: 'TMT-B: thời gian trung bình', errs: 'lỗi', sDiff: 'Hiệu B − A', sRatio: 'Tỉ lệ B / A',
    cType: 'Kiểu', cTime: 'Thời gian (ms)', cErr: 'Số lỗi', cClicks: 'Số lần bấm', cSeq: 'Chuỗi bấm (nhãn@ms)', wrongTag: 'sai', backTag: 'quay lại',
  },
  en: {
    name: 'Connect the Circles (Trail Making)', sub: 'Measures visual search speed and mental flexibility',
    est: 'about 15 minutes, 6 parts, with breaks between parts',
    body: p => `<p>There are many circles on the screen. Use the <b>mouse</b> to click the circles <b>in the correct order</b>, as fast as you can.</p>
      <div class="demo"><figure>${p.dA}<br><b>Type A:</b> numbers only – click 1 → 2 → 3 → 4 …</figure>
      <figure>${p.dB}<br><b>Type B:</b> alternate numbers and letters – click 1 → A → 2 → B → 3 → C …</figure></div>
      <ul class="steps"><li>Each correct click draws a connecting line automatically.</li>
      <li>If you click the <b>wrong</b> circle, you will hear a beep and be asked to <b>click the last correct circle again</b> (shown in yellow), then continue.</li>
      <li>The test has <b>6 parts: A → B → A → B → A → B</b>, with a break between parts.</li></ul>`,
    head: 'Connect in order:', prHead: 'PRACTICE · ',
    errStart: p => `✗ Not correct! Please start from «${p.l}».`, errOrder: p => `✗ Wrong order! Click «${p.l}» again, then continue.`,
    prA: 'Practice – Type A', prAhtml: '<p>Click the numbers in order <b>1 → 2 → 3 …</b> to the end.</p><p>This is just for practice and is not scored.</p>',
    prB: 'Practice – Type B', prBhtml: '<p>Well done! Now click <b>numbers and letters alternately</b>: <b>1 → A → 2 → B → 3 → C …</b></p>',
    prEnd: p => `<p>Now the <b>main test with ${p.b} parts</b> begins; each part has ${p.n} circles.</p><p>Work as <b>quickly and accurately</b> as you can.</p>`,
    part: p => `Part ${p.i}/${p.n} – Type ${p.type}`,
    partA: p => `<p>Click the <b>numbers</b> in order: <b>1 → 2 → 3 → … → ${p.n}</b>.</p>`,
    partB: p => `<p>Click <b>numbers and letters alternately</b>: <b>1 → A → 2 → B → 3 → C …</b></p><p class="sub">Letter order: ${p.l}</p>`,
    detail: 'Details per part', sA: 'TMT-A: mean time', sB: 'TMT-B: mean time', errs: 'errors', sDiff: 'Difference B − A', sRatio: 'Ratio B / A',
    cType: 'Type', cTime: 'Time (ms)', cErr: 'Errors', cClicks: 'Clicks', cSeq: 'Click sequence (label@ms)', wrongTag: 'wrong', backTag: 'return',
  },
  zh: {
    name: '连线测试（Trail Making）', sub: '测量视觉搜索速度和认知灵活性',
    est: '约 15 分钟，共 6 部分，每部分之间有休息',
    body: p => `<p>屏幕上有许多圆圈。请用<b>鼠标</b>按<b>正确顺序</b>依次点击圆圈，越快越好。</p>
      <div class="demo"><figure>${p.dA}<br><b>A 型：</b>只有数字 – 点击 1 → 2 → 3 → 4 …</figure>
      <figure>${p.dB}<br><b>B 型：</b>数字与字母交替 – 点击 1 → A → 2 → B → 3 → C …</figure></div>
      <ul class="steps"><li>每次点击正确，会自动画出一条连线。</li>
      <li>如果点<b>错</b>，会听到提示音，并提示您<b>重新点击上一个正确的圆圈</b>（黄色标出），然后继续。</li>
      <li>测试共 <b>6 部分：A → B → A → B → A → B</b>，每部分之间有休息。</li></ul>`,
    head: '按顺序连线：', prHead: '练习 · ',
    errStart: p => `✗ 不正确！请从「${p.l}」开始。`, errOrder: p => `✗ 顺序错误！请重新点击「${p.l}」，然后继续。`,
    prA: '练习 – A 型', prAhtml: '<p>请按顺序点击数字 <b>1 → 2 → 3 …</b> 直到最后。</p><p>本部分仅用于熟悉操作，不计分。</p>',
    prB: '练习 – B 型', prBhtml: '<p>很好！现在请<b>数字与字母交替</b>点击：<b>1 → A → 2 → B → 3 → C …</b></p>',
    prEnd: p => `<p>现在开始<b>正式测试，共 ${p.b} 部分</b>，每部分 ${p.n} 个圆圈。</p><p>请尽量<b>又快又准</b>。</p>`,
    part: p => `第 ${p.i}/${p.n} 部分 – ${p.type} 型`,
    partA: p => `<p>按顺序点击<b>数字</b>：<b>1 → 2 → 3 → … → ${p.n}</b>。</p>`,
    partB: p => `<p><b>数字与字母交替</b>点击：<b>1 → A → 2 → B → 3 → C …</b></p><p class="sub">字母顺序：${p.l}</p>`,
    detail: '各部分详情', sA: 'TMT-A：平均用时', sB: 'TMT-B：平均用时', errs: '次错误', sDiff: 'B − A 差值', sRatio: 'B / A 比值',
    cType: '类型', cTime: '用时（毫秒）', cErr: '错误数', cClicks: '点击次数', cSeq: '点击序列（标签@毫秒）', wrongTag: '错', backTag: '返回',
  },
};

function labelsFor(type, n) {
  if (type === 'A') return Array.from({ length: n }, (_, i) => String(i + 1));
  const L = letters(); const out = []; let d = 1, l = 0; while (out.length < n) { out.push(out.length % 2 === 0 ? String(d++) : L[l++]); } return out;
}
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
function layout(n, seed) {
  for (let attempt = 0; attempt < 200; attempt++) {
    const R = rng(seed + attempt * 7919), pts = [];
    let tries = 0;
    while (pts.length < n && tries < 20000) {
      tries++;
      const p = { x: VB.pad + R() * (VB.w - 2 * VB.pad), y: VB.pad + R() * (VB.h - 2 * VB.pad) };
      if (pts.every(q => Math.hypot(p.x - q.x, p.y - q.y) >= VB.minD)) pts.push(p);
    }
    if (pts.length === n) return pts.map(p => ({ x: Math.round(p.x), y: Math.round(p.y) }));
  }
  throw new Error('layout');
}

function runBoard(type, n, seed, practice) {
  return new Promise(async resolve => {
    const labels = labelsFor(type, n), pts = layout(n, seed);
    const seqTxt = type === 'A' ? '1 → 2 → 3 → 4 …' : '1 → A → 2 → B → 3 → C …';
    stage(`<div style="position:fixed;top:0;left:0;right:0;height:96px;display:flex;align-items:center;justify-content:center;border-bottom:2px solid var(--line);background:var(--bg)">
        <div id="tmtHead" style="font-size:30px;font-weight:700">${practice ? t('prHead') : ''}${t('head')} <span style="color:var(--pri)">${seqTxt}</span></div></div>
      <svg id="board" viewBox="0 0 ${VB.w} ${VB.h}" style="position:fixed;top:104px;left:1vw;width:98vw;height:calc(100vh - 112px)" preserveAspectRatio="xMidYMid meet">
        <g id="lines"></g><g id="nodes">${pts.map((p, i) => `
          <g class="node" data-i="${i}" style="cursor:pointer">
            <circle cx="${p.x}" cy="${p.y}" r="${VB.r}" fill="#fff" stroke="#1B1B1B" stroke-width="4"></circle>
            <text x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="central" font-size="30" font-weight="800" fill="#1B1B1B" style="pointer-events:none;font-family:Arial,sans-serif">${labels[i]}</text>
          </g>`).join('')}</g></svg>`);
    const head = $('#tmtHead'), headNormal = head.innerHTML;
    const nodeEl = i => document.querySelector(`.node[data-i="${i}"]`);
    const setNode = (i, fill, stroke = '#1B1B1B', sw = 4) => { const c = nodeEl(i).querySelector('circle'); c.setAttribute('fill', fill); c.setAttribute('stroke', stroke); c.setAttribute('stroke-width', sw); };
    let next = 0, errors = 0, needReturn = -1; const clicks = [];
    const onset = await nextFrame();
    const handler = e => {
      const g = e.target.closest('.node'); if (!g) return; e.preventDefault();
      const i = +g.dataset.i, tt = e.timeStamp - onset;
      if (needReturn >= 0) { // must click the last correct circle first
        if (i === needReturn) { needReturn = -1; setNode(i, '#CFE3F7', '#0B5CAD'); head.innerHTML = headNormal; head.style.color = ''; clicks.push({ label: labels[i], t: Math.round(tt), ok: 'return' }); }
        return;
      }
      if (i < next) return; // already connected: ignore
      if (i === next) {
        clicks.push({ label: labels[i], t: Math.round(tt), ok: 'ok' });
        setNode(i, '#CFE3F7', '#0B5CAD');
        if (i > 0) {
          const a = pts[i - 1], b = pts[i];
          $('#lines').insertAdjacentHTML('beforeend', `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#0B5CAD" stroke-width="5" stroke-linecap="round"/>`);
          setNode(i - 1, '#E4EEF8', '#6C8FB3');
        }
        next++;
        if (next === n) { document.removeEventListener('pointerdown', handler); setTimeout(() => resolve({ timeMs: Math.round(tt), errors, clicks, labels, pts }), 400); }
      } else {
        errors++; beep(220, 260, 0.3); clicks.push({ label: labels[i], t: Math.round(tt), ok: 'wrong' });
        setNode(i, '#FBE4E2', '#B3261E', 6); setTimeout(() => { if (i >= next) setNode(i, '#fff'); }, 700);
        head.style.color = 'var(--bad)';
        if (next === 0) head.innerHTML = t('errStart', { l: labels[0] });
        else { needReturn = next - 1; setNode(needReturn, '#FFF2D6', '#C98A00', 7); head.innerHTML = t('errOrder', { l: labels[needReturn] }); }
      }
    };
    document.addEventListener('pointerdown', handler);
  });
}

(async function main() {
  const demo = (type) => { const l = labelsFor(type, 6); return `<svg viewBox="0 0 520 90" style="width:420px;max-width:100%">${l.map((x, i) => `${i ? `<line x1="${40 + (i - 1) * 88}" y1="45" x2="${40 + i * 88}" y2="45" stroke="#0B5CAD" stroke-width="5"/>` : ''}`).join('')}${l.map((x, i) => `<circle cx="${40 + i * 88}" cy="45" r="30" fill="#fff" stroke="#1B1B1B" stroke-width="4"/><text x="${40 + i * 88}" y="45" text-anchor="middle" dominant-baseline="central" font-size="28" font-weight="800">${x}</text>`).join('')}</svg>`; };
  await buildIntro(() => ({ title: t('name'), subtitle: t('sub'), estimate: t('est'), body: t('body', { dA: demo('A'), dB: demo('B') }) }));

  await message({ title: t('prA'), html: t('prAhtml'), button: t('startPractice') });
  const pA = await runBoard('A', 8, CFG.practiceSeedA, true);
  await message({ title: t('prB'), html: t('prBhtml'), button: t('startPractice') });
  const pB = await runBoard('B', 8, CFG.practiceSeedB, true);
  await message({ title: t('practiceEnd'), html: t('prEnd', { b: CFG.order.length, n: CFG.nodes }), button: t('startMain') });

  markMainStart();
  const rows = [];
  for (let b = 0; b < CFG.order.length; b++) {
    const type = CFG.order[b];
    await message({
      title: t('part', { i: b + 1, n: CFG.order.length, type }),
      html: type === 'A' ? t('partA', { n: CFG.nodes }) : t('partB', { l: letters().join(' ') }),
      button: t('start'),
    });
    await countdown();
    const r = await runBoard(type, CFG.nodes, CFG.seeds[b], false);
    rows.push({ block: b + 1, type: 'TMT-' + type, timeMs: r.timeMs, errors: r.errors, nClicks: r.clicks.length, clicks: r.clicks, labels: r.labels, positions: r.pts });
    if (b < CFG.order.length - 1) await restScreen(CFG.restSec, b + 1, CFG.order.length);
  }
  markMainEnd();

  const A = rows.filter(r => r.type === 'TMT-A'), B = rows.filter(r => r.type === 'TMT-B');
  const mA = mean(A.map(r => r.timeMs)), mB = mean(B.map(r => r.timeMs));
  const summary = { meanA: Math.round(mA), meanB: Math.round(mB), diffBA: Math.round(mB - mA), ratioBA: Math.round(mB / mA * 100) / 100, errorsA: A.reduce((s, r) => s + r.errors, 0), errorsB: B.reduce((s, r) => s + r.errors, 0), practiceA_ms: pA.timeMs, practiceB_ms: pB.timeMs, letters: letters().join('') };
  const tag = c => c.ok === 'wrong' ? `(${t('wrongTag')})` : c.ok === 'return' ? `(${t('backTag')})` : '';
  renderResults({
    name: t('name'), summary, tableTitle: t('detail'),
    stats: [
      { k: t('sA'), v: fmtMs(mA), u: `ms · ${summary.errorsA} ${t('errs')}` },
      { k: t('sB'), v: fmtMs(mB), u: `ms · ${summary.errorsB} ${t('errs')}` },
      { k: t('sDiff'), v: fmtMs(summary.diffBA), u: 'ms' },
      { k: t('sRatio'), v: summary.ratioBA },
    ],
    columns: [
      { key: 'block', label: t('cBlock') }, { key: 'type', label: t('cType') }, { key: 'timeMs', label: t('cTime'), fmt: r => fmtMs(r.timeMs) },
      { key: 'errors', label: t('cErr') }, { key: 'nClicks', label: t('cClicks') },
      { key: 'clicks', label: t('cSeq'), fmt: r => `<span style="white-space:normal;font-size:16px">${r.clicks.map(c => c.ok === 'wrong' ? `<b style="color:var(--bad)">${c.label}✗@${c.t}</b>` : `${c.label}@${c.t}`).join(' ')}</span>`, csv: r => r.clicks.map(c => `${c.label}${tag(c)}@${c.t}`).join(' ') },
    ], rows,
  });
})();
