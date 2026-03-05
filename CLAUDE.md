# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for "Hipóteses Válidas" - an accounting and tax services company in Torres Vedras, Portugal. The site is built with Eleventy (11ty) static site generator and includes a Node.js server for handling contact form submissions via MailerSend API.

## Development Commands

### Build and Development
- `npm run build` - Build the static site with Eleventy (outputs to `dist/`)
- `npm run dev` - Start Eleventy development server with live reload
- `npm start` - Start the production Node.js server (serves `dist/` and handles `/api/contact`)

### Important Notes
- The contact form only works when served by the Node.js server (`npm start`) because it requires the `/api/contact` endpoint
- Static builds (`npm run build`) or Eleventy dev server (`npm run dev`) won't process contact form submissions
- For local testing, create a `.env` file with MailerSend credentials (see ENV.md)

## Architecture

### Static Site Generation
- **Eleventy Configuration**: `.eleventy.js` configures input (`src/`), output (`dist/`), and passthrough copies
- **Templates**: Nunjucks (`.njk`) templates in `src/` with includes in `src/_includes/`
- **Static Assets**: `assets/` folder contains images, logos, and icons
- **CSS/JS**: `style.css`, `script.js`, `header.js` are copied directly to output

### Server-Side Components
- **Node.js Server**: `server.js` serves static files from `dist/` and provides `/api/contact` endpoint
- **Contact Form**: POST to `/api/contact` sends emails via MailerSend API
- **Environment Variables**: Required for MailerSend (API key, email addresses)

### Project Structure
```
├── src/                    # Source templates (Nunjucks)
│   ├── _includes/         # Header, footer partials
│   ├── *.njk             # Page templates (index, sobre, servicos, contacto)
├── dist/                  # Built static site (generated)
├── assets/               # Images, logos, icons
├── fonts/                # Custom Neue Regrade font files
├── style.css            # Main stylesheet
├── script.js            # Main JavaScript
├── header.js            # Header navigation JavaScript
├── .eleventy.js         # Eleventy configuration
├── server.js            # Node.js server with contact API
├── package.json         # Dependencies and scripts
├── ENV.md              # Environment variables documentation
└── render.yaml          # Render.com deployment configuration
```

## Key Files

### Configuration Files
- `.eleventy.js`: Eleventy static site generator configuration
- `server.js`: Node.js Express server with MailerSend integration
- `render.yaml`: Deployment configuration for Render.com
- `ENV.md`: Documentation for required environment variables

### Template Files
- `src/index.njk`: Homepage
- `src/sobre.njk`: About page
- `src/servicos.njk`: Services page
- `src/contacto.njk`: Contact page with form
- `src/_includes/header.njk`: Site header navigation
- `src/_includes/footer.njk`: Site footer

### Frontend Assets
- `style.css`: Complete CSS with custom Neue Regrade font faces and design system
- `script.js`: Main JavaScript functionality
- `header.js`: Mobile menu toggle functionality

## Deployment

The site is configured for deployment on Render.com:
- **Service Type**: Web (Node.js runtime)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node server.js`
- **Environment Variables**: Must be set in Render dashboard (MAILERSEND_API_KEY, FROM_EMAIL, TO_EMAIL, etc.)

## Environment Variables

Required for contact form functionality (see ENV.md for details):
- `MAILERSEND_API_KEY`: MailerSend API token
- `FROM_EMAIL`: Verified sender email in MailerSend
- `TO_EMAIL`: Recipient email for contact submissions
- `FROM_NAME`, `TO_NAME`: Optional display names

## Design System

- **Primary Color**: Gold (`#c59e43`) used for accents and highlights
- **Typography**: Custom Neue Regrade font with Inter fallback
- **Responsive**: Mobile-first design with breakpoints
- **Icons**: Custom SVG icons in gold and sand colors