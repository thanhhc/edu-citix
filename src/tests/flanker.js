/* ===== Flanker =====
   Fixation "+" 1000 ms → stimulus up to 1000 ms (disappears on response). Centre arrow: left = 1, right = 2.
   120 main trials = 6 blocks × 20, 15-second break between blocks (5 breaks). */
const CFG = { fixMs: 1000, stimMs: 1000, blocks: 6, perBlock: 20, restSec: 15, practiceN: 8 };
// Target3: >><>> (centre left, incongruent) · Target4: >>>>> (right, congruent) · Target5: <<<<< (left, congruent) · Target6: <<><< (right, incongruent)
// Target1/2: neutral (diamond flankers), practice only
const STIM = {
  T3: { img: 'Target3', cond: 'inc', dir: 'L', cresp: 1, pattern: '>><>>' },
  T4: { img: 'Target4', cond: 'con', dir: 'R', cresp: 2, pattern: '>>>>>' },
  T5: { img: 'Target5', cond: 'con', dir: 'L', cresp: 1, pattern: '<<<<<' },
  T6: { img: 'Target6', cond: 'inc', dir: 'R', cresp: 2, pattern: '<<><<' },
  T1: { img: 'Target1', cond: 'neu', dir: 'R', cresp: 2, pattern: '◇◇>◇◇' },
  T2: { img: 'Target2', cond: 'neu', dir: 'L', cresp: 1, pattern: '◇◇<◇◇' },
};
const TXT = {
  vi: {
    name: 'Bài test Mũi tên (Flanker)', sub: 'Đo khả năng tập trung và bỏ qua yếu tố gây nhiễu',
    est: 'khoảng 20–30 phút, có 5 lần nghỉ, mỗi lần 15 giây',
    body: p => `<ol class="steps">
      <li>Giữa màn hình sẽ hiện dấu <b>+</b>. Hãy luôn nhìn vào giữa màn hình.</li>
      <li>Sau đó xuất hiện <b>một hàng 5 mũi tên</b>. Bạn <b>chỉ quan tâm mũi tên ở chính giữa</b>, bỏ qua các mũi tên hai bên.</li>
      <li>Mũi tên giữa chỉ sang <b>TRÁI</b> → nhấn phím ${K(1)}. Chỉ sang <b>PHẢI</b> → nhấn phím ${K(2)}</li>
      <li>Hình chỉ hiện trong <b>1 giây</b>, hãy trả lời <b>nhanh và chính xác</b> nhất có thể.</li></ol>
      <div class="demo"><figure>${p.d1}Mũi tên giữa chỉ PHẢI → nhấn ${K(2)}</figure><figure>${p.d2}Mũi tên giữa chỉ TRÁI → nhấn ${K(1)}</figure></div>
      <p>Đầu tiên bạn sẽ <b>làm thử ${p.n} lượt</b> (có báo đúng/sai), sau đó mới vào bài chính.</p>`,
    lookCentre: 'Nhìn vào dấu + ở giữa', keyHint: `${K(1)} mũi tên giữa chỉ sang TRÁI &nbsp;&nbsp; ${K(2)} chỉ sang PHẢI`,
    tooSlow: 'Chưa kịp trả lời – hãy nhanh hơn một chút', wrongCentre: '✗ Chưa đúng – chỉ nhìn mũi tên Ở GIỮA',
    prIntro: `<p>Đặt ngón tay lên phím ${K(1)} và ${K(2)}.</p><p>Nhớ: chỉ nhìn <b>mũi tên ở giữa</b>.</p>`,
    prEnd: p => `<p>Bạn làm đúng <b>${p.c}/${p.n}</b> lượt.</p><p>Bây giờ bắt đầu <b>bài chính</b>: ${p.total} lượt, chia thành ${p.blocks} phần. Sẽ <b>không còn báo đúng/sai</b>.</p><p>Giữa các phần có <b>${p.rest} giây nghỉ</b>.</p>`,
    con: 'Nhất quán', inc: 'Không nhất quán', neu: 'Trung tính', L: 'Trái', R: 'Phải',
    sCon: 'Nhất quán: độ chính xác · RT', sInc: 'Không nhất quán: độ chính xác · RT', sEff: 'Hiệu ứng Flanker (RT KNQ − NQ)', sMiss: 'Số lượt không trả lời kịp',
    cCond: 'Điều kiện', cStim: 'Kích thích', cDir: 'Mũi tên giữa',
  },
  en: {
    name: 'Arrow Test (Flanker)', sub: 'Measures focused attention and the ability to ignore distractions',
    est: 'about 20–30 minutes, with 5 breaks of 15 seconds each',
    body: p => `<ol class="steps">
      <li>A <b>+</b> sign appears in the middle of the screen. Always keep your eyes on the centre.</li>
      <li>Then <b>a row of 5 arrows</b> appears. <b>Only pay attention to the arrow in the very middle</b> and ignore the arrows on both sides.</li>
      <li>If the middle arrow points <b>LEFT</b> → press ${K(1)}. If it points <b>RIGHT</b> → press ${K(2)}.</li>
      <li>The picture is shown for only <b>1 second</b>, so answer as <b>quickly and accurately</b> as you can.</li></ol>
      <div class="demo"><figure>${p.d1}Middle arrow points RIGHT → press ${K(2)}</figure><figure>${p.d2}Middle arrow points LEFT → press ${K(1)}</figure></div>
      <p>First you will do <b>${p.n} practice trials</b> (with feedback), then the main test.</p>`,
    lookCentre: 'Look at the + in the centre', keyHint: `${K(1)} middle arrow points LEFT &nbsp;&nbsp; ${K(2)} points RIGHT`,
    tooSlow: 'Too slow – please answer a little faster', wrongCentre: '✗ Not correct – look only at the MIDDLE arrow',
    prIntro: `<p>Place your fingers on keys ${K(1)} and ${K(2)}.</p><p>Remember: look only at the <b>middle arrow</b>.</p>`,
    prEnd: p => `<p>You got <b>${p.c}/${p.n}</b> correct.</p><p>Now the <b>main test</b> begins: ${p.total} trials in ${p.blocks} parts. There will be <b>no more feedback</b>.</p><p>There is a <b>${p.rest}-second break</b> between parts.</p>`,
    con: 'Congruent', inc: 'Incongruent', neu: 'Neutral', L: 'Left', R: 'Right',
    sCon: 'Congruent: accuracy · RT', sInc: 'Incongruent: accuracy · RT', sEff: 'Flanker effect (RT incong. − cong.)', sMiss: 'Missed trials (no response)',
    cCond: 'Condition', cStim: 'Stimulus', cDir: 'Middle arrow',
  },
  zh: {
    name: '箭头测试（Flanker）', sub: '测量注意力集中及排除干扰的能力',
    est: '约 20–30 分钟，中间休息 5 次，每次 15 秒',
    body: p => `<ol class="steps">
      <li>屏幕中央会出现 <b>+</b> 号，请始终注视屏幕中央。</li>
      <li>随后会出现<b>一排 5 个箭头</b>。<b>只看正中间的箭头</b>，忽略两侧的箭头。</li>
      <li>中间箭头指向<b>左</b> → 按 ${K(1)} 键；指向<b>右</b> → 按 ${K(2)} 键。</li>
      <li>图片只显示 <b>1 秒</b>，请尽量<b>又快又准</b>地作答。</li></ol>
      <div class="demo"><figure>${p.d1}中间箭头指向右 → 按 ${K(2)}</figure><figure>${p.d2}中间箭头指向左 → 按 ${K(1)}</figure></div>
      <p>首先进行 <b>${p.n} 次练习</b>（会提示对错），然后进入正式测试。</p>`,
    lookCentre: '请注视中央的 + 号', keyHint: `${K(1)} 中间箭头指向左 &nbsp;&nbsp; ${K(2)} 指向右`,
    tooSlow: '未及时作答 – 请再快一点', wrongCentre: '✗ 不正确 – 只看中间的箭头',
    prIntro: `<p>请将手指放在 ${K(1)} 和 ${K(2)} 键上。</p><p>记住：只看<b>中间的箭头</b>。</p>`,
    prEnd: p => `<p>您答对了 <b>${p.c}/${p.n}</b> 次。</p><p>现在开始<b>正式测试</b>：共 ${p.total} 次，分为 ${p.blocks} 部分，<b>不再提示对错</b>。</p><p>每部分之间有 <b>${p.rest} 秒休息</b>。</p>`,
    con: '一致', inc: '不一致', neu: '中性', L: '左', R: '右',
    sCon: '一致条件：正确率 · 反应时', sInc: '不一致条件：正确率 · 反应时', sEff: 'Flanker 效应（不一致 − 一致 反应时）', sMiss: '未作答次数',
    cCond: '条件', cStim: '刺激', cDir: '中间箭头',
  },
};
const imgTag = (k, w = 'min(72vw,760px)') => `<img src="${ASSETS[STIM[k].img]}" style="width:${w};height:auto;display:block" alt="">`;

async function trial(k, practice) {
  stage(`<div class="fix">+</div><div class="hint">${t('lookCentre')}</div>`);
  await holdMs(CFG.fixMs);
  stage(`${imgTag(k)}<div class="hint">${t('keyHint')}</div>`);
  const onset = await nextFrame();
  const r = await waitResponse({ keys: { '1': 1, '2': 2 }, timeout: CFG.stimMs, onset });
  stage('');
  const s = STIM[k]; const acc = r.resp === s.cresp ? 1 : 0;
  if (practice) {
    stage(r.resp == null ? `<div class="feedback bad">${t('tooSlow')}</div>` :
      acc ? `<div class="feedback ok">${t('fbOk')}</div>` : `<div class="feedback bad">${t('wrongCentre')}</div>`);
    await sleep(1300);
  }
  return { condCode: s.cond, cond: t(s.cond), pattern: s.pattern, dir: t(s.dir), cresp: s.cresp, resp: r.resp, acc, rt: r.rt == null ? null : Math.round(r.rt), method: r.method };
}

(async function main() {
  await buildIntro(() => ({
    title: t('name'), subtitle: t('sub'), estimate: t('est'),
    body: t('body', { d1: imgTag('T4', '300px'), d2: imgTag('T3', '300px'), n: CFG.practiceN }),
  }));

  await message({ title: t('practice'), html: t('prIntro'), button: t('startPractice') });
  await countdown();
  const pr = shuffle(['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T3', 'T6']).slice(0, CFG.practiceN);
  let pc = 0; for (const k of pr) pc += (await trial(k, true)).acc;
  await message({ title: t('practiceEnd'), html: t('prEnd', { c: pc, n: pr.length, total: CFG.blocks * CFG.perBlock, blocks: CFG.blocks, rest: CFG.restSec }), button: t('startMain') });

  markMainStart();
  const rows = []; let n = 0;
  for (let b = 1; b <= CFG.blocks; b++) {
    await countdown();
    const base = []; for (let i = 0; i < CFG.perBlock; i++) base.push(['T3', 'T4', 'T5', 'T6'][i % 4]);
    for (const k of shuffle(base)) { const r = await trial(k, false); n++; rows.push({ n, block: b, ...r, _bad: !r.acc }); }
    if (b < CFG.blocks) await restScreen(CFG.restSec, b, CFG.blocks);
  }
  markMainEnd();

  const sub = c => rows.filter(r => r.condCode === c);
  const rtc = a => mean(a.filter(r => r.acc && r.rt != null).map(r => r.rt));
  const C = sub('con'), I = sub('inc');
  const summary = {
    correct: rows.filter(r => r.acc).length, total: rows.length, accuracyPct: pct(rows.filter(r => r.acc).length, rows.length),
    meanRTcorrect: r1(rtc(rows)), congruentAccPct: pct(C.filter(r => r.acc).length, C.length), incongruentAccPct: pct(I.filter(r => r.acc).length, I.length),
    congruentRT: r1(rtc(C)), incongruentRT: r1(rtc(I)), flankerEffectRT: r1(rtc(I) - rtc(C)), misses: rows.filter(r => r.resp == null).length,
  };
  renderResults({
    name: t('name'), summary,
    stats: [
      { k: t('score'), v: `${summary.correct}/${summary.total}`, u: `${summary.accuracyPct}%` },
      { k: t('rtCorrect'), v: fmtMs(summary.meanRTcorrect), u: 'ms' },
      { k: t('sCon'), v: `${summary.congruentAccPct}%`, u: `· ${fmtMs(summary.congruentRT)} ms` },
      { k: t('sInc'), v: `${summary.incongruentAccPct}%`, u: `· ${fmtMs(summary.incongruentRT)} ms` },
      { k: t('sEff'), v: fmtMs(summary.flankerEffectRT), u: 'ms' },
      { k: t('sMiss'), v: summary.misses },
    ],
    columns: [
      { key: 'n', label: t('cTrial') }, { key: 'block', label: t('cBlock') }, { key: 'cond', label: t('cCond') }, { key: 'pattern', label: t('cStim') },
      { key: 'dir', label: t('cDir') }, { key: 'cresp', label: t('cAnswer') }, { key: 'resp', label: t('cResp'), fmt: r => r.resp ?? '—' },
      { key: 'acc', label: t('cResult'), fmt: r => accTag(!!r.acc), csv: r => r.acc }, { key: 'rt', label: 'RT (ms)', fmt: r => r.rt == null ? '—' : r.rt },
    ], rows,
  });
})();
