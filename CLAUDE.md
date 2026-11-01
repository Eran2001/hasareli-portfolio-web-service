# M E Hasareli — Portfolio

Personal portfolio of M E Hasareli, AI Full Stack Developer, based in Horana, Sri Lanka.
Dark "AI Glow" design: background #07060d, purple #cbbaff, cyan #8fe3ff, fonts Sora + IBM Plex Mono.

## How the project is built

| File | What it is | Edit it? |
| --- | --- | --- |
| `index.html` | All page content (text, sections, links) + the component logic in `<script type="text/x-dc">` at the bottom | Yes — text, links, sections |
| `assets/animations.js` | The animation layer: Lenis smooth scroll, GSAP ScrollTrigger effects, Three.js neural-orb hero, code-drawn project mockups, photo reveal | Yes — all motion lives here |
| `assets/animations.css` | Styles for the animation layer and the mockups | Yes |
| `assets/hasareli.jpg` | Photo in the About section | Replace freely (keep 4:5) |
| `assets/runtime.js`, `assets/react*.js` | Design-tool runtime that renders `index.html` (uses `{{ }}` bindings, `<sc-if>`, `<sc-for>`) | No |
| `assets/fonts/` | Embedded Sora + IBM Plex Mono | No |

## Rules

- The page is rendered by React through `assets/runtime.js`. Inline styles in the rendered DOM have spaces (`position: sticky;`), so CSS/JS selectors must match short fragments like `[style*="sticky"]`.
- `setupReveal()` in `index.html` is disabled on purpose; GSAP in `animations.js` handles reveals.
- Add new animated elements by appending inside existing elements; do not replace React-rendered nodes.
- Keep the chat widget ("Ask my portfolio") and the contact form working after every change.
- Smooth scroll = Lenis driven by `gsap.ticker`. Never add `scroll-behavior: smooth`. Scroll areas inside the page need `data-lenis-prevent`.
- Animate only transform and opacity; respect `prefers-reduced-motion`.
- Test at 1440×900 and 390×844 before finishing.
- Follow the `scroll-animation-sites` skill if it is installed.

## Open items

- Project screenshots: the 4 Featured Builds show code-drawn mockups (in `animations.js`: `mockLedgerly`, `mockDocuMind`, `mockShopPilot`, `mockTripwise`). Replace with real screenshots or screen recordings when available.
- Links (GitHub, LinkedIn, email, live demos) are still `#`.
- The chat widget and some copy refer to Hasareli as "she/her" — confirm pronouns.

## Run it

Open `index.html` in a browser, or serve the folder: `npx serve .` / `python3 -m http.server`.
Animations load GSAP, Lenis and Three.js from CDNs, so an internet connection is needed for motion.
