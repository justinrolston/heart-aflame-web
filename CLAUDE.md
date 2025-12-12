# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Heart Aflame is a static marketing website for a confessional devotional app. The site features both a marketing landing page and devotional viewing pages, built with vanilla HTML, CSS, and JavaScript. It includes early access email signup through Google Apps Script integration and displays daily devotionals fetched from an API.

## Architecture

### Frontend Structure
- **Marketing page** (`index.html`) - Landing page with email signup
- **Devotional pages** - Two pages for viewing devotionals:
  - `today.html` - Always shows today's devotional
  - `devotion/index.html` - Shows any devotional by date via query string (`/devotion/?date=YYYY-MM-DD`)
- **Shared resources** for code reuse:
  - `devotional-shared.css` - All devotional styling
  - `devotional-shared.js` - Shared JavaScript functions for devotional rendering
- **Static hosting** via GitHub Pages with custom domain `heartafla.me`
- **No build process** - direct deployment of HTML files

### Email Collection System
- **Client-side form** with validation and loading states
- **Google Apps Script backend** (`google-apps-script.js`) handles form submissions
- **Google Sheets database** stores emails with timestamps and duplicate prevention
- **CORS-enabled** API endpoint for cross-origin requests

### Devotional Display System
- **API integration** - Fetches devotionals from `https://admin.heartafla.me/api/v1/devo/{date}`
- **Dynamic rendering** - JavaScript renders devotional content from JSON API response
- **Date handling** - Supports any date in YYYY-MM-DD format via query string
- **Navigation** - "Previous Day" link on each devotional to browse backward through content
- **Audio support** - HTML5 audio player displays when devotional includes completed audio (MP3)
- **Error handling** - Redirects to 404 for invalid dates or missing devotionals

### Design System
The site uses a sophisticated design system matching the Reformed Micro Learning app:

#### Color System
All colors are defined as CSS custom properties in `:root`:
- `--bg-primary` (#F8F6F3): Warm off-white background
- `--bg-card` (#FFFFFF): Pure white for cards  
- `--text-primary` (#2C1810): Dark brown for headings
- `--text-secondary` (#5D4E37): Medium brown for body text
- `--text-accent` (#8B7355): Warm brown for links/navigation
- `--border-accent` (#D4A574): Warm gold for accents/CTAs
- `--quote-bg` (#FDFCFA): Very light cream for quote blocks

#### Component Patterns
- **Cards**: 16px border radius, 24px padding, 1px borders, subtle shadows
- **Icons**: 24x24 SVG in 60px containers with 16px border radius
- **Quote blocks**: Left accent border (4px), light background, italic text
- **Buttons**: 8px border radius, accent color background, hover transforms
- **Typography**: System font stack, 1.6-1.7 line-height, weight 400-700

#### Layout System
- **Container**: 1200px max-width, 20px horizontal padding
- **Sections**: 80px vertical padding, 60px between major elements
- **Grid**: Auto-fit columns with 300px minimum, 40px gaps
- **Spacing**: Consistent 20px margins, 24px internal padding

## Email Collection Setup

The email collection requires external setup in Google's ecosystem:

1. **Google Sheet** with columns: Timestamp, Email
2. **Google Apps Script** deployed as web app with public access
3. **Script URL** configured in `index.html` at line ~540

Refer to `docs/SETUP_INSTRUCTIONS.md` for complete setup process.

## Key Implementation Details

### Marketing Page (index.html)
- Email validation with regex pattern
- Duplicate detection via Google Sheets lookup
- Loading states with button text changes
- Hero section with call-to-action
- Feature grid with SVG icons
- Sample devotion card with styled quote blocks

### Devotional Pages (today.html, devotion/index.html)
- **Shared code architecture** - Common CSS and JS extracted to separate files
- **API integration** - Fetches from `admin.heartafla.me` API
- **Dynamic rendering** - All content rendered from JSON via `renderDevotional()`
- **Audio player** - Compact HTML5 player with design-matched styling
- **Date navigation** - Previous day links for browsing devotionals
- **XSS protection** - All content escaped via `escapeHtml()` function
- **404 handling** - Invalid dates redirect to 404 page

### Styling Approach
- CSS custom properties for consistent theming
- Shared stylesheet (`devotional-shared.css`) for devotional pages
- Responsive design with mobile-first approach
- Hover effects and transitions for interactivity

## Deployment

The site deploys automatically via GitHub Pages when changes are pushed to the main branch. The CNAME file configures the custom domain.