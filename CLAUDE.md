# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Hipóteses Válidas" — an accounting and tax services company in Torres Vedras, Portugal. The site is built with Eleventy (11ty) static site generator and includes a Node.js server for handling contact form submissions via MailerSend API.

## Development Commands

- `npm run build` — Build the static site with Eleventy (outputs to `dist/`)
- `npm run dev` — Start Eleventy development server with live reload
- `npm start` — Start the production Node.js server (serves `dist/` and handles `/api/contact`)

The contact form only works when served by the Node.js server (`npm start`) because it requires the `/api/contact` endpoint. For local testing, create a `.env` file with MailerSend credentials (see ENV.md).

## Architecture

### Static Site Generation
- **Eleventy Configuration** (`.eleventy.js`): Input dir `src/`, output dir `dist/`, passthrough copies for `assets/`, `style.css`, `script.js`, `header.js`, `.htaccess`, `fonts/`
- **Templates**: Nunjucks (`.njk`) with `{% include %}` partials for header and footer
- **Pages**: `src/index.njk` (homepage), `src/sobre.njk` (about), `src/servicos.njk` (services), `src/contacto.njk` (contact)
- **Permalink override**: Most pages use frontmatter `permalink` to set the output filename (e.g., `permalink: sobre.html`)
- **CSS/JS**: Single monolithic `style.css` (~1050 lines) with custom `@font-face` declarations for Neue Regrade font. JS split across `header.js` (menu, sticky header) and `script.js` (contact form handler)

### Server-Side
- **Node.js Server** (`server.js`): Express-based, serves `dist/` statically, provides `POST /api/contact` endpoint using `mailersend` SDK
- **Contact Form Flow**: Client JS sends JSON POST -> server validates required fields (nome, email, mensagem) -> sends email via MailerSend with reply-to set to the submitter -> returns JSON `{ success: true/false, error?: string }`
- **HTML escaping**: Custom `escapeHtml()` utility for XSS prevention in email content

### Deployment (Render.com)
- **Build**: `npm install && npm run build`
- **Start**: `node server.js`
- **Env vars** (set in Render dashboard): `MAILERSEND_API_KEY`, `FROM_EMAIL`, `FROM_NAME`, `TO_EMAIL`, `TO_NAME`

### Design Tokens
- **Primary**: Gold `#c59e43` — accents, highlights, SVG icons
- **Secondary**: Sand `#f3ede2`, Green `#3a6b5b`
- **Text**: Dark gray `#333333`, Medium gray `#6b6b6b`
- **Font**: Custom Neue Regrade (OTF, 4 weights) with Inter fallback
- **Responsive**: Mobile-first, breakpoints at 768px, 1024px

### Key Conventions
- ES modules (`"type": "module"` in package.json)
- Portuguese language throughout templates and server messages
- SVG icons in two color variants: `-ouro` (gold) and `-areia` (sand)
- Logo images in PNG + WebP formats via `srcset`
- No tests or linting configured
