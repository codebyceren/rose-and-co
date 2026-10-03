# AGENTS.md

Rosé & Co. — single-page, English-language café website built with TanStack Start + Tailwind CSS 4, deployed on Netlify.

## Structure

```text
public/
  __forms.html        # Hidden static forms so Netlify registers `rezervasyon` and `siparis` at build time
  img/                # Local café images used by the website

src/
  routes/__root.tsx   # HTML shell, SEO meta, Google Fonts (Fraunces / Manrope / JetBrains Mono)
  routes/index.tsx    # The only page; composes all sections inside CartProvider
  components/         # Page sections plus CartDrawer and OpenBadge
  data/menu.ts        # Menu items, categories, formatTL() — edit here to change the menu
  lib/cart.tsx        # React context for the pickup-order cart (client state only)
  lib/forms.ts        # submitNetlifyForm(): URL-encoded POST to /__forms.html
  lib/img.ts          # cdn(file, width) → local /img/{file} path
  lib/useReveal.ts    # Scroll reveal for `.reveal` elements + trackShine pointer helper
  styles.css          # Theme tokens (steel / rose / cocoa) and metal surface utilities