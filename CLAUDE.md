# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Heart Aflame is a static marketing website for a confessional devotional app. The site is a single-page application built with vanilla HTML, CSS, and JavaScript, designed to collect early access email signups through a Google Apps Script integration.

## Architecture

### Frontend Structure
- **Single HTML file** (`index.html`) containing all markup, CSS, and JavaScript
- **Static hosting** via GitHub Pages with custom domain `heartafla.me`
- **No build process** - direct deployment of HTML file

### Email Collection System
- **Client-side form** with validation and loading states
- **Google Apps Script backend** (`google-apps-script.js`) handles form submissions
- **Google Sheets database** stores emails with timestamps and duplicate prevention
- **CORS-enabled** API endpoint for cross-origin requests

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

### Form Handling
- Email validation with regex pattern
- Duplicate detection via Google Sheets lookup
- Loading states with button text changes
- Error handling for network failures

### Styling Approach
- CSS custom properties for consistent theming
- Single stylesheet embedded in HTML
- Responsive design with mobile-first approach
- Hover effects and transitions for interactivity

### Content Structure
- Hero section with call-to-action
- Feature grid with SVG icons
- Sample devotion card with styled quote blocks
- Email signup form with validation

## Deployment

The site deploys automatically via GitHub Pages when changes are pushed to the main branch. The CNAME file configures the custom domain.