#!/usr/bin/env python3
"""Build the self-contained test pages into public/tests/.

Each test page is a single HTML file with its CSS, JS and images (base64) embedded,
so stimuli never wait on the network during timed trials.

Usage:  python3 src/build.py        (no third-party packages needed)
"""
import base64, json, pathlib

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / 'public' / 'tests'
OUT.mkdir(parents=True, exist_ok=True)

css = (SRC / 'common.css').read_text(encoding='utf-8')
common = (SRC / 'common.js').read_text(encoding='utf-8')

# (output file, test code, script, asset folder, prelude file, frame-critical)
TESTS = [
    ('1-flanker.html',       'Flanker',   'flanker.js', '1_Flanker',     None,                           False),
    ('2-trail-making.html',  'TMT',       'tmt.js',     None,            None,                           False),
    ('3-digit-span.html',    'DST',       'dst.js',     None,            None,                           False),
    ('4-ufov-vehicles.html', 'UFOV2D',    'ufov.js',    '4_UFOV_HinhXe', '4_UFOV_HinhXe.prelude.js',     True),
    ('5-ufov-hanzi.html',    'UFOVHanzi', 'ufov.js',    '5_UFOV_ChuHan', '5_UFOV_ChuHan.prelude.js',     True),
    ('6-mrt-3d.html',        'MRT3D',     'mrt.js',     '6_MRT_3D',      '6_MRT_3D.prelude.js',          False),
    ('7-mrt-hanzi.html',     'MRTHanzi',  'mrt.js',     '7_MRT_ChuHan',  '7_MRT_ChuHan.prelude.js',      False),
]


def assets(folder):
    if not folder:
        return {}
    out = {}
    for p in sorted((SRC / 'assets' / folder).glob('*.png')):
        out[p.stem] = 'data:image/png;base64,' + base64.b64encode(p.read_bytes()).decode()
    return out


for fname, code, js, folder, prelude, frame in TESTS:
    meta = {'code': code, 'frameCritical': frame}
    pre = (SRC / 'data' / prelude).read_text(encoding='utf-8') if prelude else ''
    test_js = (SRC / 'tests' / js).read_text(encoding='utf-8')
    html = f'''<!doctype html>
<html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>{code}</title>
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<style>{css}</style></head>
<body>
<div id="topbar"></div>
<div id="intro" class="screen center-col"></div>
<div id="msg" class="screen center-col"></div>
<div id="result" class="screen center-col"></div>
<div id="stage"></div>
<noscript><p style="padding:24px;font-size:24px">Please enable JavaScript.</p></noscript>
<script>
const TEST_META = {json.dumps(meta)};
const ASSETS = {json.dumps(assets(folder))};
{pre}
</script>
<script>{common}</script>
<script>{test_js}</script>
</body></html>
'''
    (OUT / fname).write_text(html, encoding='utf-8')
    print(f'{fname:24s} {len(html) // 1024:6d} KB')
