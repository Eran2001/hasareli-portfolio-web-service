---
name: scroll-animation-sites
description: Build or animate websites with buttery smooth scroll and cinematic scroll animations (Lenis + GSAP + Three.js), using product video sequences or pure code.
---

# Scroll Animation Sites

Use this whenever the user wants a "stunning", "animated", "smooth scroll", "award-site", GetLayers-style or scroll-animation website, landing page or portfolio, or wants motion added to an existing HTML file.

## 1. Pick the method
- Physical product (drink, shoe, gadget, food) -> VIDEO: an AI product video scrubbed by scroll on a canvas, plus pure-code effects around it.
- Software, app, SaaS, portfolio, startup -> PURE CODE only (Three.js particles/shaders, SVG props, code-drawn UI mockups).
- 3D model files are out of scope unless asked.

## 2. Stack (always)
- Lenis https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js (or `npm i lenis`)
- GSAP https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js + ScrollTrigger.min.js (same folder) (or `npm i gsap`)
- Three.js https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js (only for WebGL heroes) (or `npm i three`)

Smooth-scroll setup (never skip):
```js
gsap.registerPlugin(ScrollTrigger);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
```
CSS: `html.lenis,html.lenis body{height:auto} .lenis.lenis-smooth{scroll-behavior:auto!important}`.
Remove any `scroll-behavior:smooth`. Anchor links -> `lenis.scrollTo(target,{offset:-72,duration:1.6})`.
Own-scroll areas (chat boxes, modals) get `data-lenis-prevent`.
Use `scrub:1` for soft scroll-linked tweens, `scrub:true` for the frame scrubber.

## 3. Video method
1. Clip from Google Flow (labs.google/flow): attach the product photo, Veo 3.1 Fast, 1 output, 16:9, confirm before generating (reject 2-video runs).
2. Spin prompt: "Make a video from this image. Isolate only the [product], centered on a pure black background. It slowly rotates a full 360 degrees on an invisible turntable. Camera completely still and locked off. [Warm] studio rim light. Keep the label sharp and unchanged. No cuts, no camera movement, no extra objects, no text. 16:9, 8 seconds." Layers variant: parts separate and float apart vertically, then hold.
3. Inspect the video, sample the background corner colour, extract frames:
   `ffmpeg -i in.mp4 -vf "select='not(mod(n\,2))',setpts=N/TB,scale=1280:-2" -fps_mode vfr -c:v libwebp -quality 75 frames/%04d.webp` (~95 frames, ~2 MB).
4. Scrubber: section 500vh, sticky 100vh canvas (`mix-blend-mode:lighten`, page bg = frame corner colour). Preload all frames behind a % loader, then:
```js
ScrollTrigger.create({ trigger: '.spin', start: 'top top', end: 'bottom bottom', scrub: true,
  onUpdate: s => draw(s.progress) });
// draw(): index = round(progress*(COUNT-1)); skip if same; cover-fit drawImage; DPR capped at 2
```
   On portrait phones size the product to ~60% of width instead of cover. Add a giant italic brand word behind, 3 callouts at ~20/50/80%, floating SVG props with parallax, frame counter.

## 4. Pure-code method
- Neural orb hero: ~2,600 Fibonacci-sphere dust points + 150 neurons; lines between neurons < 1.05 apart carrying travelling pulses (`fract(uTime*0.35+phase)`); additive blending; purple #7c54ff -> cyan #8fe3ff by height; `uProg` (hero scroll) spreads and fades it; eased mouse tilt; pause when off screen.
- Sea-urchin variant: sphere points + radial spikes that burst outward with scroll.
- SVG props (cinnamon stick, leaf, bean) floating at different depths, blur by depth.
- Code-drawn mockups for missing screenshots: dashboard (KPI count-ups, growing bars, drawing SVG line, rows sliding in, AI bubble typing), search (typed query, answer lines, citation chips), AI copywriter (old text fades, new text types, Approve flashes), agent planner (route draws on a grid map, log lines appear). Small cards loop with `repeat:-1`.

## 5. Effects library (use by name)
- Masked word reveal on every heading (inline-block overflow-hidden wrappers, `yPercent:115`, `expo.out`, stagger .06)
- Letter rise for the hero name
- Word light-up paragraphs (opacity .12 -> 1, scrub)
- Mono label scramble
- Pinned sections
- Horizontal scroll track (`x: -(scrollWidth-innerWidth)`, `invalidateOnRefresh`)
- Exploded 3D layers (`preserve-3d`, `z: i*80`)
- Count-up stats
- Tilt + cursor spotlight cards
- Magnetic buttons (elastic return)
- Cursor glow (`gsap.quickTo`)
- Velocity marquee (speed and skew from Lenis velocity)
- Travelling glow packet on a progress line
- Photo scan reveal (clip-path wipe + glowing scan line + parallax)
- Parallax blurred glow blobs
- Big words sliding in from opposite sides
- Film grain overlay, preloader

## 6. Design defaults
Near-black background, one or two accent colours, huge headlines (clamp to ~150px, letter-spacing -0.045em), clean sans (Geist/Sora/Inter) plus one italic serif word (Instrument Serif), 1px borders at ~9-12% white, small mono uppercase labels.

## 7. Animating an existing file
Add a layer, never rebuild: load libs at end of body, wait for render (poll a known element), disable the page's own reveal code, append new elements inside existing ones instead of replacing, keep chat/forms working.
Pitfalls:
- React/design-tool inline styles have spaces: match `[style*="sticky"]`, not `position:sticky`.
- Wrapped sticky columns overlap on phones: make them relative below 900px.
- Never split words inside `background-clip:text` spans: animate the span whole, glue following punctuation to it.
- Drop `transform` from CSS transitions on tilt elements.
- Trigger count-ups at `'top 96%'`.
- Return the same file type the user gave.

## 8. Verify before delivering
Screenshot with Playwright at several scroll points on 1440x900 and 390x844, check console errors, click interactive parts.
Checklist: only transform/opacity animated; reduced-motion fallback; WebGL DPR <= 2 and paused off screen; `ScrollTrigger.refresh()` after load; no sticky overlap on mobile; placeholder copy, claims and links flagged; commercial-use rights of AI video mentioned.
