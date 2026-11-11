/* ===== Mental Rotation (variant: MRT_VARIANT = '3d' | 'hanzi'; ITEMS = 3 parallel versions) =====
   "+" 1000 ms → model (top) + 2 options (bottom): the same object rotated, and its mirror image rotated.
   Choose the option identical to the model: left = 1, right = 2. 60 items, difficulty rising (4 levels × 15).
   15-second break after every 10 items (5 breaks). Correct side is reshuffled (30/30) at every start. */
const CFG = { fixMs: 1000, nItems: 60, perBlock: 10, restSec: 15, size: 25 };
const is3D = MRT_VARIANT === '3d';
const MODES = [{ key: 'm1', from: 1, to: 15 }, { key: 'm2', from: 16, to: 30 }, { key: 'm3', from: 31, to: 45 }, { key: 'm4', from: 46, to: 60 }];
const modeOf = q => MODES.find(m => q >= m.from && q <= m.to);
let VER = 1;
const TXT = {
  vi: {
    name3d: 'Bài test Xoay hình khối 3D', nameHz: 'Bài test Xoay hình chữ Hán', sub: 'Đo khả năng hình dung và xoay vật thể trong đầu',
    est: 'khoảng 30 phút, 60 câu, có 5 lần nghỉ, mỗi lần 15 giây',
    body: p => `<ol class="steps">
      <li>Phía trên là <b>hình mẫu</b>. Phía dưới có <b>2 hình</b> đã bị xoay đi.</li>
      <li>Một hình là <b>chính hình mẫu</b> được xoay. Hình còn lại là <b>hình soi gương</b> (bị lật ngược trái–phải) của hình mẫu, dù xoay thế nào cũng không trùng với mẫu.</li>
      <li>Hãy chọn hình <b>giống hệt hình mẫu</b>: bên trái → phím ${K(1)}, bên phải → phím ${K(2)} (hoặc bấm vào hình).</li>
      <li>Trả lời <b>nhanh và chính xác</b> nhất có thể. Câu hỏi khó dần theo thời gian.</li></ol>
      ${p.is3D ? '' : '<p>Các chữ Hán trong bài là chữ hiếm gặp – bạn <b>không cần biết đọc</b>, chỉ cần xem chúng như những hình vẽ.</p>'}
      <p>Đầu tiên bạn sẽ <b>làm thử 3 câu</b> (có báo đúng/sai).</p>`,
    verLabel: 'Phiên bản đề (do nghiên cứu viên chọn)', ver: p => `Phiên bản ${p.v}`,
    model: 'HÌNH MẪU', which: 'Hình nào <u>giống hệt</u> hình mẫu (chỉ bị xoay)?', wrongAns: p => `✗ Chưa đúng – đáp án là hình số ${p.c}`,
    prIntro: '<p>Hãy nhìn hình mẫu, rồi chọn hình <b>giống hệt</b> mẫu ở phía dưới.</p>',
    prEnd: p => `<p>Bạn làm đúng <b>${p.c}/3</b> câu.</p><p>Bây giờ bắt đầu <b>bài chính: ${p.n} câu</b>, sẽ <b>không còn báo đúng/sai</b>. Cứ sau ${p.b} câu sẽ có <b>${p.r} giây nghỉ</b>.</p>`,
    m1: 'Dễ', m2: 'Trung bình', m3: 'Khó', m4: 'Rất khó', avg: 'TB',
    byMode: 'Theo mức độ khó', hLevel: 'Mức', hItems: 'Câu', hCx: 'Độ phức tạp nét chữ', hCorrect: 'Số đúng', hAcc: 'Tỉ lệ đúng', hRt: 'RT TB (ms)', hRtC: 'RT TB câu đúng (ms)',
    sVer: 'Phiên bản đề', cMode: 'Mức độ', cVer: 'Phiên bản', cItem: 'Hình', cCubes: 'Số khối', cChar: 'Chữ · độ phức tạp', cAngle: 'Góc xoay (°)',
  },
  en: {
    name3d: 'Mental Rotation – 3D Blocks', nameHz: 'Mental Rotation – Chinese Characters', sub: 'Measures the ability to picture and rotate objects in your mind',
    est: 'about 30 minutes, 60 items, with 5 breaks of 15 seconds each',
    body: p => `<ol class="steps">
      <li>At the top is the <b>model</b>. Below it are <b>2 pictures</b> that have been rotated.</li>
      <li>One picture is the <b>model itself</b>, rotated. The other is its <b>mirror image</b> (flipped left–right), which can never match the model however it is rotated.</li>
      <li>Choose the picture that is <b>identical to the model</b>: left → key ${K(1)}, right → key ${K(2)} (or click the picture).</li>
      <li>Answer as <b>quickly and accurately</b> as you can. The items get harder as you go.</li></ol>
      ${p.is3D ? '' : '<p>The Chinese characters are rare ones – you <b>do not need to read them</b>; just treat them as shapes.</p>'}
      <p>First you will do <b>3 practice items</b> (with feedback).</p>`,
    verLabel: 'Test version (selected by the researcher)', ver: p => `Version ${p.v}`,
    model: 'MODEL', which: 'Which picture is <u>identical</u> to the model (only rotated)?', wrongAns: p => `✗ Not correct – the answer is picture ${p.c}`,
    prIntro: '<p>Look at the model, then choose the picture below that is <b>identical</b> to it.</p>',
    prEnd: p => `<p>You got <b>${p.c}/3</b> correct.</p><p>Now the <b>main test: ${p.n} items</b> begins, with <b>no more feedback</b>. There is a <b>${p.r}-second break</b> after every ${p.b} items.</p>`,
    m1: 'Easy', m2: 'Medium', m3: 'Hard', m4: 'Very hard', avg: 'mean',
    byMode: 'By difficulty level', hLevel: 'Level', hItems: 'Items', hCx: 'Stroke complexity', hCorrect: 'Correct', hAcc: 'Accuracy', hRt: 'Mean RT (ms)', hRtC: 'Mean RT correct (ms)',
    sVer: 'Test version', cMode: 'Level', cVer: 'Version', cItem: 'Image', cCubes: 'Cubes', cChar: 'Character · complexity', cAngle: 'Rotation (°)',
  },
  zh: {
    name3d: '心理旋转测试 – 3D 方块', nameHz: '心理旋转测试 – 汉字', sub: '测量在脑海中想象并旋转物体的能力',
    est: '约 30 分钟，共 60 题，中间休息 5 次，每次 15 秒',
    body: p => `<ol class="steps">
      <li>上方是<b>目标图形</b>，下方有 <b>2 个</b>经过旋转的图形。</li>
      <li>其中一个是<b>目标图形本身</b>旋转后的样子；另一个是它的<b>镜像</b>（左右翻转），无论怎样旋转都不会与目标重合。</li>
      <li>请选出与目标<b>完全相同</b>的图形：左边 → 按 ${K(1)}，右边 → 按 ${K(2)}（或点击图形）。</li>
      <li>请尽量<b>又快又准</b>地作答，题目会越来越难。</li></ol>
      ${p.is3D ? '' : '<p>测试中的汉字都是生僻字，<b>不需要认识</b>，只需把它们当作图形来看。</p>'}
      <p>首先进行 <b>3 道练习题</b>（会提示对错）。</p>`,
    verLabel: '测试版本（由研究人员选择）', ver: p => `版本 ${p.v}`,
    model: '目标图形', which: '哪个图形与目标<u>完全相同</u>（只是旋转了）？', wrongAns: p => `✗ 不正确 – 答案是第 ${p.c} 个图形`,
    prIntro: '<p>请看目标图形，然后从下方选出与它<b>完全相同</b>的图形。</p>',
    prEnd: p => `<p>您答对了 <b>${p.c}/3</b> 题。</p><p>现在开始<b>正式测试：共 ${p.n} 题</b>，<b>不再提示对错</b>。每 ${p.b} 题后有 <b>${p.r} 秒休息</b>。</p>`,
    m1: '简单', m2: '中等', m3: '困难', m4: '极难', avg: '均值',
    byMode: '按难度统计', hLevel: '难度', hItems: '题号', hCx: '笔画复杂度', hCorrect: '正确数', hAcc: '正确率', hRt: '平均反应时（毫秒）', hRtC: '正确题平均反应时（毫秒）',
    sVer: '测试版本', cMode: '难度', cVer: '版本', cItem: '图片', cCubes: '方块数', cChar: '汉字 · 复杂度', cAngle: '旋转角度（°）',
  },
};
const testName = () => t(is3D ? 'name3d' : 'nameHz');
const fmtC = x => (Math.round(x * 100) / 100).toLocaleString(LOCALE[LANG]);
function modeCx(i) { const L = ITEMS[VER].slice(MODES[i].from - 1, MODES[i].to).map(o => o.C); return `${fmtC(Math.min(...L))}–${fmtC(Math.max(...L))} (${t('avg')} ${fmtC(mean(L))})`; }
const pic = (src, vmin, tf = '') => `<div style="width:${vmin}vmin;height:${vmin}vmin;max-width:340px;max-height:340px;overflow:hidden;background:#fff;position:relative"><img src="${src}" style="width:100%;height:100%;object-fit:contain;display:block;mix-blend-mode:multiply;transform:${tf || 'none'}" alt=""></div>`;

async function trial(item, practice) {
  stage(`<div class="fix">+</div>`); await holdMs(CFG.fixMs);
  const opts = item.correctSide === 1 ? [item.same, item.mirror] : [item.mirror, item.same];
  stage(`<div style="display:flex;flex-direction:column;align-items:center;gap:2.5vmin">
      <div style="text-align:center"><div style="font-size:26px;font-weight:700;color:var(--muted);margin-bottom:6px">${t('model')}</div>
        <div style="border:4px solid #1B1B1B;border-radius:16px;padding:10px;background:#fff">${pic(item.target.src, CFG.size, item.target.tf)}</div></div>
      <div style="font-size:30px;font-weight:700">${t('which')}</div>
      <div class="choice-row">${opts.map((o, i) => `<div class="choice" data-v="${i + 1}">${pic(o.src, CFG.size, o.tf)}<div class="lab" style="position:relative;z-index:2">${K(i + 1)}</div></div>`).join('')}</div></div>`);
  const onset = await nextFrame();
  const r = await waitResponse({ keys: { '1': 1, '2': 2 }, els: [...document.querySelectorAll('.choice')].map(el => ({ el, value: +el.dataset.v })), onset });
  const acc = r.resp === item.correctSide ? 1 : 0;
  if (practice) {
    stage(acc ? `<div class="feedback ok">${t('fbOk')}</div>` : `<div class="feedback bad">${t('wrongAns', { c: item.correctSide })}</div>`); await sleep(1600);
  } else { stage(''); await sleep(300); }
  return { resp: r.resp, acc, rt: Math.round(r.rt), method: r.method };
}

(async function main() {
  await buildIntro(() => ({
    title: testName(), subtitle: t('sub'), estimate: t('est'),
    body: t('body', { is3D }) + `<div class="field"><label for="ver">${t('verLabel')}</label>
        <select id="ver" style="font:inherit;font-size:28px;padding:10px 14px;border:2px solid var(--line);border-radius:12px;max-width:420px">
          ${[1, 2, 3].map(v => `<option value="${v}">${t('ver', { v })}</option>`).join('')}</select></div>`,
  }));
  VER = +($('#ver').value || 1); S.suffix = `_V${VER}`;

  await message({ title: t('practice'), html: t('prIntro'), button: t('startPractice') });
  await countdown();
  const pAng = [90, 180, 45]; let pc = 0;
  for (let i = 0; i < 3; i++) {
    const src = ASSETS['p' + (i + 1)], a = pAng[i];
    const it = { target: { src }, same: { src, tf: `rotate(${a}deg)` }, mirror: { src, tf: `rotate(${a}deg) scaleX(-1)` }, correctSide: i % 2 ? 2 : 1 };
    pc += (await trial(it, true)).acc;
  }
  await message({ title: t('practiceEnd'), html: t('prEnd', { c: pc, n: CFG.nItems, b: CFG.perBlock, r: CFG.restSec }), button: t('startMain') });

  const sides = shuffle(Array.from({ length: CFG.nItems }, (_, i) => i % 2 ? 2 : 1)); // new random sides at every start
  const nBlocks = Math.ceil(CFG.nItems / CFG.perBlock);
  markMainStart();
  const rows = [];
  for (let b = 1; b <= nBlocks; b++) {
    await countdown();
    for (let q = (b - 1) * CFG.perBlock + 1; q <= Math.min(b * CFG.perBlock, CFG.nItems); q++) {
      const p = `v${VER}`, info = ITEMS[VER][q - 1];
      const it = { target: { src: ASSETS[p + 'n' + q] }, same: { src: ASSETS[p + 'r' + q] }, mirror: { src: ASSETS[p + 'm' + q] }, correctSide: sides[q - 1] };
      const r = await trial(it, false);
      rows.push({ q, version: VER, block: b, modeKey: modeOf(q).key, mode: t(modeOf(q).key), item: info.label, detail: info.detail, angle: info.angle, correctSide: it.correctSide, ...r, _bad: !r.acc });
    }
    if (b < nBlocks) await restScreen(CFG.restSec, b, nBlocks);
  }
  markMainEnd();

  const correct = rows.filter(r => r.acc).length;
  const byMode = MODES.map(m => { const rr = rows.filter(r => r.modeKey === m.key); return { mode: t(m.key), n: rr.length, correct: rr.filter(r => r.acc).length, rt: r1(mean(rr.map(r => r.rt))), rtCorrect: r1(mean(rr.filter(r => r.acc).map(r => r.rt))) }; });
  const summary = { version: VER, correct, total: rows.length, accuracyPct: pct(correct, rows.length), meanRT: r1(mean(rows.map(r => r.rt))), meanRTcorrect: r1(mean(rows.filter(r => r.acc).map(r => r.rt))), byMode };
  const extra = `<h2>${t('byMode')}</h2><div class="tablewrap" style="max-height:none"><table class="res"><thead><tr><th>${t('hLevel')}</th><th>${t('hItems')}</th>${is3D ? '' : `<th>${t('hCx')}</th>`}<th>${t('hCorrect')}</th><th>${t('hAcc')}</th><th>${t('hRt')}</th><th>${t('hRtC')}</th></tr></thead><tbody>
    ${byMode.map((m, i) => `<tr><td><b>${m.mode}</b></td><td>Q${MODES[i].from}–Q${MODES[i].to}</td>${is3D ? '' : `<td>${modeCx(i)}</td>`}<td>${m.correct}/${m.n}</td><td>${pct(m.correct, m.n)}%</td><td>${fmtMs(m.rt)}</td><td>${fmtMs(m.rtCorrect)}</td></tr>`).join('')}</tbody></table></div>`;
  renderResults({
    name: `${testName()} – ${t('ver', { v: VER })}`, summary, extra,
    stats: [
      { k: t('sVer'), v: VER },
      { k: t('score'), v: `${correct}/${rows.length}`, u: `${summary.accuracyPct}%` },
      { k: t('rtCorrect'), v: fmtMs(summary.meanRTcorrect), u: 'ms' },
      { k: t('rtAll'), v: fmtMs(summary.meanRT), u: 'ms' },
    ],
    columns: [
      { key: 'q', label: t('cQ') }, { key: 'block', label: t('cBlock') }, { key: 'mode', label: t('cMode') }, { key: 'version', label: t('cVer') }, { key: 'item', label: t('cItem') },
      { key: 'detail', label: is3D ? t('cCubes') : t('cChar') }, { key: 'angle', label: t('cAngle') },
      { key: 'correctSide', label: t('cAnswer') }, { key: 'resp', label: t('cResp') }, { key: 'acc', label: t('cResult'), fmt: r => accTag(!!r.acc), csv: r => r.acc },
      { key: 'rt', label: 'RT (ms)' }, { key: 'method', label: t('cMethod') },
    ], rows,
  });
})();
