# edu.citix.app – Cognitive Test Suite

Seven browser-based cognitive tests for research with older adults (50–70), in **Vietnamese (default), English and Simplified Chinese**.

| # | Test | Page |
|---|------|------|
| 1 | Flanker (arrows) | `/tests/1-flanker` |
| 2 | Trail Making (6 blocks A-B-A-B-A-B) | `/tests/2-trail-making` |
| 3 | Digit Span Forward | `/tests/3-digit-span` |
| 4 | UFOV subtest 2 – vehicles | `/tests/4-ufov-vehicles` |
| 5 | UFOV subtest 2 – Chinese characters | `/tests/5-ufov-hanzi` |
| 6 | Mental Rotation – 3D blocks (3 versions) | `/tests/6-mrt-3d` |
| 7 | Mental Rotation – Chinese characters (3 versions) | `/tests/7-mrt-hanzi` |

Each test has an intro screen (participant ID, language picker), practice with feedback, breaks, and a results screen with millisecond timings and CSV/JSON download.
Everything runs in the browser; **no data is sent to any server**. Language can be preset with `?lang=vi|en|zh`.

## Project layout

```
public/            ← what Vercel serves (static, no build step needed)
  index.html       start page (7 test cards, language picker, contact & notice)
  tests/*.html     self-contained test pages (CSS, JS and images embedded)
src/               ← sources used to regenerate public/tests
  common.css, common.js   shared UI, timing, i18n, breaks, results/export
  tests/*.js              one script per test (all texts in vi/en/zh)
  assets/<test>/*.png     stimulus images
  data/*.prelude.js       per-test variant + item metadata (MRT versions)
  build.py                rebuilds public/tests/*.html
vercel.json
```

Images are embedded as base64 on purpose: stimuli never wait for the network during timed trials.

## Edit & rebuild

```bash
python3 src/build.py        # Python 3.8+, no packages needed
```

Open `public/index.html` in Chrome to test locally (works from the file system too).

## Deploy to Vercel with edu.citix.app

1. Push this folder to a new GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-user>/edu-citix.git
   git push -u origin main
   ```
2. In Vercel → **Add New… → Project** → import the repo. Framework preset: **Other**. Leave build settings empty
   (they come from `vercel.json`: no build command, output directory `public`). Deploy.
3. Project → **Settings → Domains** → add `edu.citix.app`.
4. At the DNS provider for `citix.app`, add the record Vercel shows, normally:

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | `edu` | `cname.vercel-dns.com` |

   (If `citix.app` already uses Vercel nameservers, the subdomain is configured automatically.)
   HTTPS is issued by Vercel once DNS resolves – `.app` domains require HTTPS, which Vercel provides.

Every later `git push` to `main` redeploys automatically.

## Usage notice

Free for non-commercial research and education. **Commercial use requires notifying the author first** – see `LICENSE.md`.
Contact: thanh.huynh.biz@gmail.com (subject: “Research test request”).
