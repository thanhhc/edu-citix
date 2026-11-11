/* ===== Digit Span Forward =====
   "+" 1000 ms → each digit 1000 ms with a "+" between digits → type the sequence back in order.
   Starts at 3 digits, max 8. Two trials per length: ≥1 correct → +1 digit; both wrong → stop.
   15-second break between lengths (up to 5 breaks). */
const CFG = { fixMs: 1000, digitMs: 1000, gapMs: 500, minLen: 3, maxLen: 8, trialsPerLevel: 2, restSec: 15 };
const TXT = {
  vi: {
    name: 'Bài test Nhớ dãy số', sub: 'Đo khả năng ghi nhớ ngắn hạn', est: 'khoảng 10–30 phút tùy mức độ, có nghỉ 15 giây giữa các mức',
    body: `<ol class="steps">
      <li>Màn hình sẽ lần lượt hiện <b>từng chữ số một</b>, mỗi số khoảng 1 giây, giữa các số có dấu <b>+</b>.</li>
      <li>Hãy <b>ghi nhớ</b> các số theo đúng thứ tự xuất hiện.</li>
      <li>Khi hết dãy, bạn <b>nhập lại</b> các số theo đúng thứ tự (bấm vào bàn phím số lớn trên màn hình hoặc dùng bàn phím), rồi bấm <b>✓ Xong</b>.</li>
      <li>Bài bắt đầu với <b>3 chữ số</b>. Mỗi mức có 2 lượt. Nếu nhớ đúng ít nhất 1 lượt, dãy số sẽ dài thêm 1 số (tối đa 8 số). Nếu sai cả 2 lượt, bài test kết thúc.</li></ol>
      <p>Ví dụ: màn hình hiện <b>5</b> … <b>2</b> … <b>9</b> → bạn nhập <b>5 2 9</b>.</p>
      <p>Đầu tiên bạn sẽ <b>làm thử 1 lượt</b> (có báo đúng/sai).</p>`,
    enter: 'Hãy nhập lại dãy số theo <u>đúng thứ tự</u>', del: '⌫ Xóa', done: '✓ Xong',
    kbHint: `Có thể dùng bàn phím số, phím ${K('⌫')} để xóa, ${K('Enter')} để xác nhận.`, empty: '(chưa nhập)',
    prIntro: '<p>Hãy nhìn vào giữa màn hình và ghi nhớ các số.</p>', prOk: '✓ Đúng rồi!', prBad: p => `✗ Chưa đúng. Dãy số là: ${p.s}`,
    prEnd: p => `<p>Bây giờ bắt đầu <b>bài chính</b>. Sẽ không còn báo đúng/sai.</p><p>Giữa các mức có <b>${p.r} giây nghỉ</b>.</p>`,
    sSpan: 'Độ dài dãy nhớ tối đa (span)', digits: 'chữ số', sScore: 'Số lượt đúng (điểm)', sRtC: 'Thời gian nhập TB (lượt đúng)', sRtA: 'Thời gian nhập TB (mọi lượt)',
    cLen: 'Số chữ số', cAtt: 'Lần', cSeq: 'Dãy đúng', cResp: 'Đã nhập', cRt: 'Thời gian nhập (ms)', cFirst: 'RT phím đầu (ms)',
  },
  en: {
    name: 'Digit Memory Test (Digit Span)', sub: 'Measures short-term memory', est: 'about 10–30 minutes depending on level, with a 15-second break between levels',
    body: `<ol class="steps">
      <li>The screen will show <b>one digit at a time</b>, each for about 1 second, with a <b>+</b> between digits.</li>
      <li><b>Remember</b> the digits in the order they appear.</li>
      <li>When the sequence ends, <b>type the digits back</b> in the same order (use the large on-screen keypad or the keyboard), then click <b>✓ Done</b>.</li>
      <li>The test starts with <b>3 digits</b>. Each length has 2 trials. If you get at least 1 right, the sequence becomes 1 digit longer (up to 8). If both are wrong, the test ends.</li></ol>
      <p>Example: the screen shows <b>5</b> … <b>2</b> … <b>9</b> → you type <b>5 2 9</b>.</p>
      <p>First you will do <b>1 practice trial</b> (with feedback).</p>`,
    enter: 'Type the digits back <u>in the same order</u>', del: '⌫ Delete', done: '✓ Done',
    kbHint: `You can use the number keys, ${K('⌫')} to delete and ${K('Enter')} to confirm.`, empty: '(nothing entered)',
    prIntro: '<p>Look at the centre of the screen and remember the digits.</p>', prOk: '✓ Correct!', prBad: p => `✗ Not correct. The sequence was: ${p.s}`,
    prEnd: p => `<p>Now the <b>main test</b> begins. There will be no more feedback.</p><p>There is a <b>${p.r}-second break</b> between levels.</p>`,
    sSpan: 'Longest span recalled', digits: 'digits', sScore: 'Correct trials (score)', sRtC: 'Mean entry time (correct)', sRtA: 'Mean entry time (all)',
    cLen: 'Length', cAtt: 'Attempt', cSeq: 'Sequence', cResp: 'Entered', cRt: 'Entry time (ms)', cFirst: 'First-key RT (ms)',
  },
  zh: {
    name: '数字记忆测试（顺背数字广度）', sub: '测量短时记忆能力', est: '约 10–30 分钟（视水平而定），每级之间休息 15 秒',
    body: `<ol class="steps">
      <li>屏幕会<b>逐个显示数字</b>，每个约 1 秒，数字之间有 <b>+</b> 号。</li>
      <li>请按出现的顺序<b>记住</b>这些数字。</li>
      <li>数字显示完后，请按<b>原顺序输入</b>（点击屏幕上的大数字键盘或使用键盘），然后点击 <b>✓ 完成</b>。</li>
      <li>测试从 <b>3 位数</b>开始，每个长度有 2 次。只要答对至少 1 次，数字串就增加 1 位（最多 8 位）；如果 2 次都答错，测试结束。</li></ol>
      <p>例如：屏幕显示 <b>5</b> … <b>2</b> … <b>9</b> → 您输入 <b>5 2 9</b>。</p>
      <p>首先进行 <b>1 次练习</b>（会提示对错）。</p>`,
    enter: '请按<u>原顺序</u>输入数字', del: '⌫ 删除', done: '✓ 完成',
    kbHint: `也可以使用数字键，按 ${K('⌫')} 删除，按 ${K('Enter')} 确认。`, empty: '（尚未输入）',
    prIntro: '<p>请注视屏幕中央并记住数字。</p>', prOk: '✓ 正确！', prBad: p => `✗ 不正确。数字串是：${p.s}`,
    prEnd: p => `<p>现在开始<b>正式测试</b>，不再提示对错。</p><p>每级之间有 <b>${p.r} 秒休息</b>。</p>`,
    sSpan: '最长记忆广度', digits: '位', sScore: '正确次数（得分）', sRtC: '平均输入时间（正确）', sRtA: '平均输入时间（全部）',
    cLen: '位数', cAtt: '次', cSeq: '正确数字串', cResp: '输入', cRt: '输入时间（毫秒）', cFirst: '首键反应时（毫秒）',
  },
};

function makeSeq(len) { const s = []; while (s.length < len) { const d = 1 + Math.floor(Math.random() * 9); if (s.length && d === s[s.length - 1]) continue; s.push(d); } return s.join(''); }

async function presentSeq(seq) {
  stage(`<div class="fix">+</div>`); await holdMs(CFG.fixMs);
  for (let i = 0; i < seq.length; i++) {
    stage(`<div class="fix" style="font-size:190px;font-weight:700">${seq[i]}</div>`); await holdMs(CFG.digitMs);
    if (i < seq.length - 1) { stage(`<div class="fix">+</div>`); await holdMs(CFG.gapMs); }
  }
}
function answer() {
  return new Promise(async resolve => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];
    stage(`<div style="text-align:center">
      <div style="font-size:34px;font-weight:700;margin-bottom:14px">${t('enter')}</div>
      <div id="ans" style="min-height:110px;display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:22px"></div>
      <div style="display:grid;grid-template-columns:repeat(3,130px);gap:14px;justify-content:center">
        ${keys.map(k => `<button class="btn ${k === 'del' ? 'secondary' : ''}" data-k="${k}" style="min-height:96px;font-size:${k.length > 1 ? 26 : 46}px;padding:0">${k === 'del' ? t('del') : k === 'ok' ? t('done') : k}</button>`).join('')}
      </div>
      <p class="sub" style="margin-top:16px">${t('kbHint')}</p></div>`);
    let v = '', firstKey = null; const onset = await nextFrame();
    const draw = () => { $('#ans').innerHTML = v ? v.split('').map(d => `<span style="display:inline-flex;width:80px;height:100px;align-items:center;justify-content:center;border:3px solid var(--ink);border-radius:12px;font-size:60px;font-weight:800;background:#fff">${d}</span>`).join('') : `<span class="sub">${t('empty')}</span>`; };
    draw();
    const act = (k, ts) => {
      if (/^\d$/.test(k)) { if (v.length < 12) { v += k; if (firstKey == null) firstKey = ts - onset; } }
      else if (k === 'del') v = v.slice(0, -1);
      else if (k === 'ok') { if (!v) return; cleanup(); resolve({ resp: v, rt: Math.round(ts - onset), firstKeyRt: firstKey == null ? null : Math.round(firstKey) }); return; }
      draw();
    };
    const kd = e => { if (/^\d$/.test(e.key)) act(e.key, e.timeStamp); else if (e.key === 'Backspace') act('del', e.timeStamp); else if (e.key === 'Enter') act('ok', e.timeStamp); };
    const pd = e => { const b = e.target.closest('button[data-k]'); if (b) { e.preventDefault(); act(b.dataset.k, e.timeStamp); } };
    const cleanup = () => { window.removeEventListener('keydown', kd); document.removeEventListener('pointerdown', pd); };
    window.addEventListener('keydown', kd); document.addEventListener('pointerdown', pd);
  });
}

(async function main() {
  await buildIntro(() => ({ title: t('name'), subtitle: t('sub'), estimate: t('est'), body: t('body') }));
  await message({ title: t('practice'), html: t('prIntro'), button: t('startPractice') });
  await countdown();
  const ps = makeSeq(3); await presentSeq(ps); const pa = await answer();
  stage(pa.resp === ps ? `<div class="feedback ok">${t('prOk')}</div>` : `<div class="feedback bad">${t('prBad', { s: ps.split('').join(' ') })}</div>`); await sleep(2200);
  await message({ title: t('practiceEnd'), html: t('prEnd', { r: CFG.restSec }), button: t('startMain') });

  markMainStart();
  const rows = []; let n = 0, maxSpan = 0; const totalLevels = CFG.maxLen - CFG.minLen + 1;
  for (let len = CFG.minLen; len <= CFG.maxLen; len++) {
    await countdown(); let correctHere = 0;
    for (let a = 1; a <= CFG.trialsPerLevel; a++) {
      const seq = makeSeq(len); await presentSeq(seq); const res = await answer(); n++;
      const acc = res.resp === seq ? 1 : 0; correctHere += acc;
      rows.push({ n, len, attempt: a, seq, resp: res.resp, acc, rt: res.rt, firstKeyRt: res.firstKeyRt, _bad: !acc });
      stage(''); await sleep(600);
    }
    if (correctHere > 0) maxSpan = len;
    if (correctHere === 0 || len === CFG.maxLen) break;
    await restScreen(CFG.restSec, len - CFG.minLen + 1, totalLevels);
  }
  markMainEnd();
  const correct = rows.filter(r => r.acc).length;
  const summary = { correct, total: rows.length, accuracyPct: pct(correct, rows.length), maxSpan, meanRT: r1(mean(rows.map(r => r.rt))), meanRTcorrect: r1(mean(rows.filter(r => r.acc).map(r => r.rt))) };
  renderResults({
    name: t('name'), summary,
    stats: [
      { k: t('sSpan'), v: maxSpan || '—', u: t('digits') },
      { k: t('sScore'), v: `${correct}/${rows.length}`, u: `${summary.accuracyPct}%` },
      { k: t('sRtC'), v: fmtMs(summary.meanRTcorrect), u: 'ms' },
      { k: t('sRtA'), v: fmtMs(summary.meanRT), u: 'ms' },
    ],
    columns: [
      { key: 'n', label: t('cTrial') }, { key: 'len', label: t('cLen') }, { key: 'attempt', label: t('cAtt') }, { key: 'seq', label: t('cSeq') },
      { key: 'resp', label: t('cResp') }, { key: 'acc', label: t('cResult'), fmt: r => accTag(!!r.acc), csv: r => r.acc },
      { key: 'rt', label: t('cRt') }, { key: 'firstKeyRt', label: t('cFirst'), fmt: r => r.firstKeyRt ?? '—' },
    ], rows,
  });
})();
