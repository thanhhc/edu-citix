/* ===== Useful Field of View – Subtest 2 (variant: UFOV_VARIANT = '2d' | 'hanzi') =====
   "+" 1000 ms → stimulus (centre target + peripheral target at 1 of 8 positions) for N frames (60 Hz)
   → noise mask 500 ms → Q1: centre target (1/2) → Q2: peripheral position (1–8).
   Weighted adaptive staircase (Kaernbach, 1991): correct → 1 step down, wrong → 3 steps up → converges at ~75%.
   Before the first error: correct → 2 steps down. A trial is correct only if BOTH questions are correct.
   72 main trials = 6 blocks × 12, 15-second break between blocks (5 breaks). */
const CFG = {
  fixMs: 1000, maskMs: 500, blocks: 6, perBlock: 12, restSec: 15,
  ladder: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 21, 24, 27, 30], // frames at 60 Hz (1 frame ≈ 16.7 ms → 17–500 ms)
  startIdx: 14, stepDown: 1, stepUp: 3, fastDown: 2, nReversals: 6,
  centerSize: 17, periSize: 15, radius: 35, // vmin
};
const is2D = UFOV_VARIANT === '2d';
const ITEMS = is2D ? { A: ['xetai'], B: ['oto'] } :
  { A: [1, 2, 3, 4, 5, 6].map(i => 'shangxia' + i), B: [1, 2, 3, 4, 5, 6].map(i => 'zuoyou' + i) };
const HANZI = { shangxia1: '昌', shangxia2: '果', shangxia3: '男', shangxia4: '否', shangxia5: '呆', shangxia6: '杏', zuoyou1: '明', zuoyou2: '林', zuoyou3: '村', zuoyou4: '休', zuoyou5: '材', zuoyou6: '杯' };
const TXT = {
  vi: {
    name2d: 'Bài test Tầm nhìn hữu ích – Hình xe', nameHz: 'Bài test Tầm nhìn hữu ích – Chữ Hán',
    sub: 'Đo khả năng phân chia sự chú ý giữa trung tâm và xung quanh tầm nhìn', est: 'khoảng 20 phút, có 5 lần nghỉ, mỗi lần 15 giây',
    xetai: 'Xe tải', oto: 'Xe hơi',
    body: p => `<ol class="steps">
      <li>Luôn nhìn vào <b>giữa màn hình</b> (dấu <b>+</b>), không đảo mắt.</li>
      <li>Hai hình sẽ hiện ra <b>rất nhanh cùng lúc</b>: một hình ở <b>giữa</b> và một hình ở <b>xung quanh</b> (1 trong 8 vị trí). Ngay sau đó màn hình bị phủ bởi các chấm nhiễu.</li>
      <li><b>Câu 1:</b> Hình ở giữa là hình nào? ${p.is2D ? `Xe tải → phím ${K(1)}, xe hơi → phím ${K(2)}.` : `Hình bên trái → phím ${K(1)}, hình bên phải → phím ${K(2)}.`}</li>
      <li><b>Câu 2:</b> Hình xung quanh xuất hiện ở vị trí nào? Nhấn số ${K(1)}–${K(8)} (hoặc bấm vào ô số).</li>
      <li>Bài test sẽ tự điều chỉnh tốc độ: trả lời đúng thì hình hiện nhanh hơn, sai thì chậm hơn. <b>Nếu không chắc, hãy đoán.</b></li></ol>
      <div class="demo"><figure>${p.dc}Hình ở giữa${p.is2D ? ' (ví dụ: xe tải)' : ''}</figure><figure>${p.dp}Hình xung quanh${p.is2D ? ' (ví dụ: xe hơi)' : ''}</figure></div>
      <p>Đầu tiên bạn sẽ <b>làm thử 4 lượt</b> (có báo đúng/sai).</p>`,
    q1: 'Câu 1: Hình ở <u>GIỮA</u> màn hình là hình nào?', q1hint: `Nhấn phím ${K(1)} hoặc ${K(2)}, hoặc bấm vào hình`,
    q2: 'Câu 2: Hình thứ hai xuất hiện ở vị trí nào?', q2hint: `Nhấn phím số ${K(1)}–${K(8)} hoặc bấm vào ô số`,
    fq1: 'Câu 1', fq2: 'Câu 2', fbPos: p => `(vị trí ${p.p})`,
    prIntro: '<p>Hãy nhìn vào dấu <b>+</b> ở giữa màn hình.</p><p>Các lượt làm thử sẽ hiện hình chậm để bạn làm quen.</p>',
    prEnd: p => `<p>Bạn trả lời đúng cả hai câu ở <b>${p.c}/${p.n}</b> lượt.</p><p>Bây giờ bắt đầu <b>bài chính</b>: ${p.total} lượt, chia thành ${p.b} phần, sẽ <b>không còn báo đúng/sai</b>. Giữa các phần có <b>${p.r} giây nghỉ</b>.</p>`,
    thrRev: p => `TB ${p.n} điểm đảo chiều cuối`, thrLast: 'TB 12 lượt cuối',
    sThr: 'Ngưỡng thời gian hiển thị (75%)', sBoth: 'Số lượt đúng cả 2 câu (điểm)', sQ1: 'Câu 1 (giữa) đúng', sQ2: 'Câu 2 (vị trí) đúng', meanRT: 'RT TB',
    sMin: 'Thời gian hiển thị ngắn nhất đạt được', sRev: 'Số lần đảo chiều bậc thang',
    cDur: 'Thời gian hiển thị (ms)', cFr: 'Khung (60Hz)', cAct: 'Đo thực tế (ms)', cCen: 'Hình giữa', cPer: 'Hình ngoại vi', cPos: 'Vị trí',
    cQ1c: 'C1 đáp án', cQ1r: 'C1 trả lời', cQ1: 'C1', cQ1rt: 'C1 RT (ms)', cQ2r: 'C2 trả lời', cQ2: 'C2', cQ2rt: 'C2 RT (ms)', cTr: 'Đúng cả 2 câu', cRev: 'Đảo chiều',
    cL: 'C1 hình trái', cR: 'C1 hình phải',
  },
  en: {
    name2d: 'Useful Field of View – Vehicles', nameHz: 'Useful Field of View – Chinese Characters',
    sub: 'Measures how well attention is divided between the centre and the edges of vision', est: 'about 20 minutes, with 5 breaks of 15 seconds each',
    xetai: 'Truck', oto: 'Car',
    body: p => `<ol class="steps">
      <li>Always look at the <b>centre of the screen</b> (the <b>+</b> sign) – do not move your eyes.</li>
      <li>Two pictures will flash <b>very quickly at the same time</b>: one in the <b>centre</b> and one in the <b>surroundings</b> (1 of 8 positions). Right after, the screen is covered with noise dots.</li>
      <li><b>Question 1:</b> Which picture was in the centre? ${p.is2D ? `Truck → key ${K(1)}, car → key ${K(2)}.` : `Left picture → key ${K(1)}, right picture → key ${K(2)}.`}</li>
      <li><b>Question 2:</b> Where did the outer picture appear? Press ${K(1)}–${K(8)} (or click the numbered box).</li>
      <li>The test adjusts its speed: correct answers make the pictures shorter, wrong answers make them longer. <b>If you are not sure, take a guess.</b></li></ol>
      <div class="demo"><figure>${p.dc}Centre picture${p.is2D ? ' (e.g. truck)' : ''}</figure><figure>${p.dp}Outer picture${p.is2D ? ' (e.g. car)' : ''}</figure></div>
      <p>First you will do <b>4 practice trials</b> (with feedback).</p>`,
    q1: 'Question 1: Which picture was in the <u>CENTRE</u>?', q1hint: `Press ${K(1)} or ${K(2)}, or click the picture`,
    q2: 'Question 2: Where did the second picture appear?', q2hint: `Press a number key ${K(1)}–${K(8)} or click a box`,
    fq1: 'Question 1', fq2: 'Question 2', fbPos: p => `(position ${p.p})`,
    prIntro: '<p>Look at the <b>+</b> in the centre of the screen.</p><p>The practice trials show the pictures slowly so you can get used to the task.</p>',
    prEnd: p => `<p>You answered both questions correctly in <b>${p.c}/${p.n}</b> trials.</p><p>Now the <b>main test</b> begins: ${p.total} trials in ${p.b} parts, with <b>no more feedback</b>. There is a <b>${p.r}-second break</b> between parts.</p>`,
    thrRev: p => `mean of last ${p.n} reversals`, thrLast: 'mean of last 12 trials',
    sThr: 'Display-time threshold (75%)', sBoth: 'Trials with both answers correct (score)', sQ1: 'Q1 (centre) correct', sQ2: 'Q2 (position) correct', meanRT: 'mean RT',
    sMin: 'Shortest display time reached', sRev: 'Staircase reversals',
    cDur: 'Display time (ms)', cFr: 'Frames (60Hz)', cAct: 'Measured (ms)', cCen: 'Centre', cPer: 'Peripheral', cPos: 'Position',
    cQ1c: 'Q1 answer', cQ1r: 'Q1 response', cQ1: 'Q1', cQ1rt: 'Q1 RT (ms)', cQ2r: 'Q2 response', cQ2: 'Q2', cQ2rt: 'Q2 RT (ms)', cTr: 'Both correct', cRev: 'Reversal',
    cL: 'Q1 left picture', cR: 'Q1 right picture',
  },
  zh: {
    name2d: '有用视野测试 – 车辆图形版', nameHz: '有用视野测试 – 汉字版',
    sub: '测量在视野中央与周边之间分配注意力的能力', est: '约 20 分钟，中间休息 5 次，每次 15 秒',
    xetai: '卡车', oto: '汽车',
    body: p => `<ol class="steps">
      <li>请始终注视<b>屏幕中央</b>（<b>+</b> 号），不要移动眼睛。</li>
      <li>两张图片会<b>同时快速闪现</b>：一张在<b>中央</b>，一张在<b>周边</b>（8 个位置之一）。随后屏幕会被噪点覆盖。</li>
      <li><b>问题 1：</b>中央是哪张图片？${p.is2D ? `卡车 → 按 ${K(1)}，汽车 → 按 ${K(2)}。` : `左边的图 → 按 ${K(1)}，右边的图 → 按 ${K(2)}。`}</li>
      <li><b>问题 2：</b>周边图片出现在哪个位置？按 ${K(1)}–${K(8)}（或点击数字方框）。</li>
      <li>测试会自动调整速度：答对后图片显示更短，答错后显示更长。<b>如果不确定，请猜一个。</b></li></ol>
      <div class="demo"><figure>${p.dc}中央图片${p.is2D ? '（例：卡车）' : ''}</figure><figure>${p.dp}周边图片${p.is2D ? '（例：汽车）' : ''}</figure></div>
      <p>首先进行 <b>4 次练习</b>（会提示对错）。</p>`,
    q1: '问题 1：屏幕<u>中央</u>是哪张图片？', q1hint: `按 ${K(1)} 或 ${K(2)}，或点击图片`,
    q2: '问题 2：第二张图片出现在哪个位置？', q2hint: `按数字键 ${K(1)}–${K(8)} 或点击方框`,
    fq1: '问题 1', fq2: '问题 2', fbPos: p => `（位置 ${p.p}）`,
    prIntro: '<p>请注视屏幕中央的 <b>+</b> 号。</p><p>练习时图片显示较慢，帮助您熟悉任务。</p>',
    prEnd: p => `<p>您在 <b>${p.c}/${p.n}</b> 次中两题都答对。</p><p>现在开始<b>正式测试</b>：共 ${p.total} 次，分为 ${p.b} 部分，<b>不再提示对错</b>。每部分之间有 <b>${p.r} 秒休息</b>。</p>`,
    thrRev: p => `最后 ${p.n} 个反转点的均值`, thrLast: '最后 12 次的均值',
    sThr: '呈现时间阈值（75%）', sBoth: '两题均正确的次数（得分）', sQ1: '问题 1（中央）正确', sQ2: '问题 2（位置）正确', meanRT: '平均反应时',
    sMin: '达到的最短呈现时间', sRev: '阶梯反转次数',
    cDur: '呈现时间（毫秒）', cFr: '帧数（60Hz）', cAct: '实测（毫秒）', cCen: '中央目标', cPer: '周边目标', cPos: '位置',
    cQ1c: '问1 答案', cQ1r: '问1 回答', cQ1: '问1', cQ1rt: '问1 反应时（毫秒）', cQ2r: '问2 回答', cQ2: '问2', cQ2rt: '问2 反应时（毫秒）', cTr: '两题均对', cRev: '反转',
    cL: '问1 左图', cR: '问1 右图',
  },
};
const testName = () => t(is2D ? 'name2d' : 'nameHz');
const nm = k => is2D ? t(k) : `${HANZI[k]} (${k})`;
const img = (k, vmin, extra = '') => `<img src="${ASSETS[k]}" style="width:${vmin}vmin;height:${vmin}vmin;object-fit:contain;display:block;${extra}" alt="">`;
const POS_ANGLE = p => (-90 + (p - 1) * 45) * Math.PI / 180; // 1 = top, clockwise … 8 = top-left
const ms60 = f => Math.round(f * 1000 / 60 * 10) / 10;

function stimHTML(center, peri, pos) {
  const a = POS_ANGLE(pos), x = Math.cos(a) * CFG.radius, y = Math.sin(a) * CFG.radius;
  return `<div style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%)">${img(center, CFG.centerSize)}</div>
    <div style="position:fixed;left:calc(50% + ${x}vmin);top:calc(50% + ${y}vmin);transform:translate(-50%,-50%)">${img(peri, CFG.periSize)}</div>`;
}
function posPad(title) {
  let h = `<div style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:88vmin;height:88vmin">
    <svg viewBox="-44 -44 88 88" style="position:absolute;inset:0;width:100%;height:100%">`;
  for (let p = 1; p <= 8; p++) { const a = POS_ANGLE(p); h += `<line x1="0" y1="0" x2="${Math.cos(a) * 34}" y2="${Math.sin(a) * 34}" stroke="#1B2A38" stroke-width="0.7"/>`; }
  h += `</svg><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#111;color:#fff;padding:1.6vmin 2.4vmin;font-size:max(24px,3vmin);font-weight:700;text-align:center;line-height:1.35;width:44vmin">${title}</div>`;
  for (let p = 1; p <= 8; p++) {
    const a = POS_ANGLE(p), x = Math.cos(a) * 34, y = Math.sin(a) * 34;
    h += `<button class="posbtn" data-p="${p}" style="position:absolute;left:calc(50% + ${x}vmin);top:calc(50% + ${y}vmin);transform:translate(-50%,-50%);width:11vmin;height:11vmin;min-width:72px;min-height:72px;font:inherit;font-size:max(36px,6vmin);font-weight:800;background:#fff;border:4px solid #1B1B1B;cursor:pointer">${p}</button>`;
  }
  return h + `</div>`;
}

async function runTrial(tr, practice) {
  stage(`<div class="fix">+</div>`); await holdMs(CFG.fixMs);
  const targetFrames60 = CFG.ladder[tr.level];
  const nFrames = Math.max(1, Math.round(targetFrames60 * (1000 / 60) / S.frameMs));
  stage(stimHTML(tr.center, tr.peri, tr.pos));
  const shown = await holdFrames(nFrames);
  stage(`<img src="${ASSETS.Mask}" style="position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover" alt="">`);
  await holdMs(CFG.maskMs);
  const q1opts = tr.q1opts;
  stage(`<div style="text-align:center"><div style="font-size:38px;font-weight:800;margin-bottom:4vmin">${t('q1')}</div>
    <div class="choice-row">${q1opts.map((k, i) => `<div class="choice" data-v="${i + 1}">${img(k, 22)}<div class="lab">${K(i + 1)}${is2D ? ' ' + t(k) : ''}</div></div>`).join('')}</div>
    <div class="sub" style="margin-top:3vmin">${t('q1hint')}</div></div>`);
  let on = await nextFrame();
  const rA = await waitResponse({ keys: { '1': 1, '2': 2 }, els: [...document.querySelectorAll('.choice')].map(el => ({ el, value: +el.dataset.v })), onset: on });
  const q1Acc = q1opts[rA.resp - 1] === tr.center ? 1 : 0;
  stage(posPad(t('q2')) + `<div class="hint" style="bottom:10px">${t('q2hint')}</div>`);
  on = await nextFrame();
  const keys = {}; for (let p = 1; p <= 8; p++) keys[String(p)] = p;
  const rB = await waitResponse({ keys, els: [...document.querySelectorAll('.posbtn')].map(el => ({ el, value: +el.dataset.p })), onset: on });
  const q2Acc = rB.resp === tr.pos ? 1 : 0;
  stage('');
  if (practice) {
    stage(`<div style="text-align:center"><div class="feedback ${q1Acc ? 'ok' : 'bad'}" style="margin-bottom:20px">${t('fq1')}: ${q1Acc ? t('fbOk') : t('fbBad')}</div>
      <div class="feedback ${q2Acc ? 'ok' : 'bad'}">${t('fq2')}: ${q2Acc ? t('fbOk') : t('fbBad') + ' ' + t('fbPos', { p: tr.pos })}</div></div>`);
    await sleep(1800); stage('');
  } else await sleep(400);
  return {
    targetMs: ms60(targetFrames60), frames60: targetFrames60, framesShown: nFrames, actualMs: Math.round(shown.dur * 10) / 10,
    center: tr.center, peri: tr.peri, pos: tr.pos, q1Left: q1opts[0], q1Right: q1opts[1], q1Correct: q1opts.indexOf(tr.center) + 1,
    q1Resp: rA.resp, q1Acc, q1Rt: Math.round(rA.rt), q2Resp: rB.resp, q2Acc, q2Rt: Math.round(rB.rt), acc: q1Acc && q2Acc ? 1 : 0,
  };
}
function makeTrial(centerGroup, pos) {
  const other = centerGroup === 'A' ? 'B' : 'A';
  const center = pick(ITEMS[centerGroup]), peri = pick(ITEMS[other]);
  let q1opts;
  if (is2D) q1opts = ['xetai', 'oto']; // 1 = truck, 2 = car
  else { const distractor = pick(ITEMS[centerGroup].filter(k => k !== center)); q1opts = shuffle([center, distractor]); }
  return { center, peri, pos, q1opts };
}

(async function main() {
  const demoCenter = is2D ? 'xetai' : 'shangxia1', demoPeri = is2D ? 'oto' : 'zuoyou1';
  await buildIntro(() => ({ title: testName(), subtitle: t('sub'), estimate: t('est'), body: t('body', { is2D, dc: img(demoCenter, 12), dp: img(demoPeri, 10) }) }));

  await message({ title: t('practice'), html: t('prIntro'), button: t('startPractice') });
  await countdown();
  const prLv = [14, 14, 10, 8]; let pc = 0;
  for (let i = 0; i < prLv.length; i++) { const tr = makeTrial(i % 2 ? 'B' : 'A', 1 + Math.floor(Math.random() * 8)); tr.level = prLv[i]; pc += (await runTrial(tr, true)).acc; }
  await message({ title: t('practiceEnd'), html: t('prEnd', { c: pc, n: prLv.length, total: CFG.blocks * CFG.perBlock, b: CFG.blocks, r: CFG.restSec }), button: t('startMain') });

  const N = CFG.blocks * CFG.perBlock;
  const positions = shuffle(Array.from({ length: N }, (_, i) => 1 + i % 8));
  const groups = shuffle(Array.from({ length: N }, (_, i) => i % 2 ? 'B' : 'A'));

  markMainStart();
  const rows = []; let level = CFG.startIdx, firstErr = false, lastDir = 0; const reversals = [];
  for (let b = 1, n = 0; b <= CFG.blocks; b++) {
    await countdown();
    for (let i = 0; i < CFG.perBlock; i++, n++) {
      const tr = makeTrial(groups[n], positions[n]); tr.level = level;
      const r = await runTrial(tr, false);
      let dir, rev = 0;
      if (r.acc) { dir = -1; level = Math.max(0, level - (firstErr ? CFG.stepDown : CFG.fastDown)); }
      else { dir = 1; firstErr = true; level = Math.min(CFG.ladder.length - 1, level + CFG.stepUp); }
      if (lastDir && dir !== lastDir) { rev = 1; reversals.push(r.targetMs); }
      lastDir = dir;
      rows.push({ n: n + 1, block: b, ...r, reversal: rev, _bad: !r.acc });
    }
    if (b < CFG.blocks) await restScreen(CFG.restSec, b, CFG.blocks);
  }
  markMainEnd();

  const lastRev = reversals.slice(-CFG.nReversals);
  const threshold = lastRev.length >= 4 ? mean(lastRev) : mean(rows.slice(-12).map(r => r.targetMs));
  const c = k => rows.filter(r => r[k]).length;
  const summary = {
    thresholdMs: r1(threshold), thresholdMethod: lastRev.length >= 4 ? t('thrRev', { n: lastRev.length }) : t('thrLast'),
    reversals: reversals.length, correctBoth: c('acc'), q1Correct: c('q1Acc'), q2Correct: c('q2Acc'), total: rows.length,
    q1MeanRT: r1(mean(rows.map(r => r.q1Rt))), q2MeanRT: r1(mean(rows.map(r => r.q2Rt))), minMsReached: Math.min(...rows.map(r => r.targetMs)),
  };
  renderResults({
    name: testName(), summary,
    stats: [
      { k: t('sThr'), v: fmtMs(summary.thresholdMs), u: `ms · ${summary.thresholdMethod}` },
      { k: t('sBoth'), v: `${summary.correctBoth}/${summary.total}`, u: `${pct(summary.correctBoth, summary.total)}%` },
      { k: t('sQ1'), v: `${summary.q1Correct}/${summary.total}`, u: `${t('meanRT')} ${fmtMs(summary.q1MeanRT)} ms` },
      { k: t('sQ2'), v: `${summary.q2Correct}/${summary.total}`, u: `${t('meanRT')} ${fmtMs(summary.q2MeanRT)} ms` },
      { k: t('sMin'), v: fmtMs(summary.minMsReached), u: 'ms' },
      { k: t('sRev'), v: summary.reversals },
    ],
    columns: [
      { key: 'n', label: t('cTrial') }, { key: 'block', label: t('cBlock') },
      { key: 'targetMs', label: t('cDur') }, { key: 'frames60', label: t('cFr') }, { key: 'actualMs', label: t('cAct') },
      { key: 'center', label: t('cCen'), fmt: r => nm(r.center), csv: r => nm(r.center) }, { key: 'peri', label: t('cPer'), fmt: r => nm(r.peri), csv: r => nm(r.peri) }, { key: 'pos', label: t('cPos') },
      { key: 'q1Correct', label: t('cQ1c') }, { key: 'q1Resp', label: t('cQ1r') }, { key: 'q1Acc', label: t('cQ1'), fmt: r => accTag(!!r.q1Acc) }, { key: 'q1Rt', label: t('cQ1rt') },
      { key: 'q2Resp', label: t('cQ2r') }, { key: 'q2Acc', label: t('cQ2'), fmt: r => accTag(!!r.q2Acc) }, { key: 'q2Rt', label: t('cQ2rt') },
      { key: 'acc', label: t('cTr'), fmt: r => accTag(!!r.acc) }, { key: 'reversal', label: t('cRev'), fmt: r => r.reversal ? '↕' : '' },
      ...(is2D ? [] : [{ key: 'q1Left', label: t('cL'), fmt: r => nm(r.q1Left), csv: r => nm(r.q1Left) }, { key: 'q1Right', label: t('cR'), fmt: r => nm(r.q1Right), csv: r => nm(r.q1Right) }]),
    ], rows,
  });
})();
