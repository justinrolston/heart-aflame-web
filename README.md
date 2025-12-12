# Heart Aflame - Website

A static website for the Heart Aflame confessional devotional app, featuring a marketing landing page with email collection, daily devotional viewing pages, and a design system inspired by Reformed Micro Learning.

## Features

- **Marketing Landing Page** (`index.html`) - Email signup for early access
- **Devotional Viewing**:
  - `/today` - Always displays today's devotional
  - `/devotion/?date=YYYY-MM-DD` - View any devotional by date
- **Audio Support** - HTML5 audio player for devotionals with MP3 files
- **Date Navigation** - Browse backward through devotionals with "Previous Day" links
- **API Integration** - Dynamic content from `admin.heartafla.me` API
- **Shared Code Architecture** - Reusable CSS and JavaScript for maintainability

## Design System

### Color Palette
The site uses a warm, scholarly color scheme defined with CSS custom properties:

```css
:root {
    --bg-primary: #F8F6F3;      /* Warm off-white background */
    --bg-card: #FFFFFF;         /* Pure white for cards */
    --text-primary: #2C1810;    /* Dark brown for headings */
    --text-secondary: #5D4E37;  /* Medium brown for body text */
    --text-accent: #8B7355;     /* Warm brown for links/accents */
    --text-muted: #9B8B7A;      /* Light brown for muted text */
    --border-light: #F0E6D2;    /* Light cream for borders */
    --border-accent: #D4A574;   /* Warm gold for accents */
    --quote-bg: #FDFCFA;        /* Very light cream for quotes */
}
```

### Typography
- **Font Stack**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- **Hierarchy**: 
  - Large titles: 48px, weight 700
  - Section headers: 36px, weight 700
  - Feature titles: 20px, weight 600
  - Body text: 16-18px, weight 400-500
- **Line Height**: 1.6-1.7 for readability

### Components

#### Cards
- **Border radius**: 16px for consistency
- **Padding**: 24px internal spacing
- **Borders**: 1px solid var(--border-light)
- **Shadows**: Subtle (0 2px 8px rgba(0,0,0,0.06))
- **Hover effects**: Slight transform and shadow changes

#### Icons
- **SVG icons** instead of emojis for professional appearance
- **Size**: 24px within 60px containers
- **Background**: Rounded rectangles (16px radius) with accent color
- **Color**: White icons on accent background

#### Quote/Scripture Blocks
- **Background**: var(--quote-bg)
- **Left border**: 4px solid var(--border-accent)
- **Border radius**: 12px
- **Padding**: 20px
- **Typography**: Italic styling

### Layout
- **Container**: Max-width 1200px, centered
- **Spacing**: Consistent 20px margins, 60-80px section padding
- **Grid**: Auto-fit columns with 300px minimum width
- **Responsive**: Mobile-first approach with 768px breakpoint

## Customization Guide

### Changing Colors
Update the CSS custom properties in the `:root` selector. All colors reference these variables, so changes propagate throughout the design.

### Modifying Icons
Replace SVG paths in the feature cards. Each icon is 24x24 viewBox with `fill="currentColor"`.

### Adjusting Spacing
Key spacing values:
- Section padding: 80px vertical
- Card margins: 20px bottom
- Internal padding: 24px for cards
- Container padding: 20px horizontal

### Typography Changes
Font weights and sizes are defined inline. Key selectors:
- `.hero h1` - Main headline
- `.features h2`, `.sample h2` - Section headers
- `.feature-card h3` - Feature titles
- Body text uses default 16px with 1.6-1.7 line-height

## File Structure

```
.
├── index.html                  # Marketing landing page
├── today.html                  # Today's devotional page
├── devotion/
│   └── index.html             # Date-specific devotional viewer
├── devotional-shared.css      # Shared styles for devotional pages
├── devotional-shared.js       # Shared JavaScript for devotional rendering
└── google-apps-script.js      # Backend for email collection
```

## Technical Details

### Devotional Pages Architecture

Both `today.html` and `devotion/index.html` use shared resources for code reuse:

- **`devotional-shared.css`** - All styling (381 lines)
  - Color system, typography, component styles
  - Audio player styling
  - Navigation buttons, loading/error states

- **`devotional-shared.js`** - Core functionality (157 lines)
  - `renderDevotional()` - Renders complete devotional from API data
  - `formatDateForDisplay()` - Human-readable date formatting
  - `isValidDate()` - Date validation
  - `getPreviousDate()` - Calculate previous day
  - `escapeHtml()` - XSS protection
  - `formatText()` - Convert line breaks to HTML

### API Integration

Devotionals are fetched from: `https://admin.heartafla.me/api/v1/devo/{YYYY-MM-DD}`

Expected JSON structure:
```json
{
  "date": "2026-01-03",
  "title": "Devotional Title",
  "author": "Author Name",
  "scriptureRef": "Romans 11:33-34",
  "scriptureText": "Scripture passage...",
  "reflection": "Main reflection content...",
  "quotationText": "Historical quote...",
  "quotationRef": "Citation",
  "prayerPrompt": "Prayer text...",
  "goDeeper": "Additional resources...",
  "additionalLinks": [{"title": "Link", "url": "https://..."}],
  "audio": {
    "status": "completed",
    "url": "https://...audio.mp3"
  }
}
```

## Email Collection

The form integrates with Google Apps Script for email collection. See `docs/SETUP_INSTRUCTIONS.md` for complete setup instructions.

## Deployment

Deploys automatically via GitHub Pages to `heartafla.me` when changes are pushed to main branch.
