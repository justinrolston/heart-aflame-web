// Format date for display
function formatDateForDisplay(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Validate date format and existence
function isValidDate(dateString) {
    // Check format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    // Basic validation
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Create date and verify it's valid
    const date = new Date(dateString + 'T00:00:00');
    return date instanceof Date && !isNaN(date) &&
           date.getFullYear() === year &&
           date.getMonth() + 1 === month &&
           date.getDate() === day;
}

// Get previous date in YYYY-MM-DD format
function getPreviousDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    date.setDate(date.getDate() - 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Convert line breaks to HTML paragraphs
function formatText(text) {
    if (!text) return '';

    // Escape HTML first
    const escaped = escapeHtml(text);

    // Convert \r\n\r\n to paragraph breaks
    const paragraphs = escaped.split(/\r\n\r\n|\n\n/);

    // Wrap each paragraph in <p> tags, and convert single line breaks to <br>
    return paragraphs
        .map(p => {
            const withBreaks = p.replace(/\r\n|\n/g, '<br>');
            return `<p>${withBreaks}</p>`;
        })
        .join('');
}

// Render devotional content
function renderDevotional(data) {
    const contentEl = document.getElementById('devotional-content');

    let html = `
        <div class="devotional-header">
            <div class="devotional-date">${formatDateForDisplay(data.date)}</div>
            <h1 class="devotional-title">${escapeHtml(data.title)}</h1>
            ${data.author ? `<div class="devotional-author">by ${escapeHtml(data.author)}</div>` : ''}
        </div>

        <div class="devotional-card">
    `;

    // Audio section (if available and completed)
    if (data.audio && data.audio.status === 'completed' && data.audio.url) {
        html += `
            <div class="audio-section">
                <label class="audio-label">Listen to this devotional</label>
                <audio class="audio-player" controls preload="metadata">
                    <source src="${escapeHtml(data.audio.url)}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    }

    // Scripture section
    if (data.scriptureRef || data.scriptureText) {
        html += `
            <div class="section">
                <div class="scripture-box">
                    ${data.scriptureRef ? `<div class="scripture-ref">${escapeHtml(data.scriptureRef)}</div>` : ''}
                    ${data.scriptureText ? `<div class="scripture-text">${escapeHtml(data.scriptureText)}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Reflection section
    if (data.reflection) {
        html += `
            <div class="section">
                <h3 class="section-title">Reflection</h3>
                <div class="reflection-text">${formatText(data.reflection)}</div>
            </div>
        `;
    }

    // Quotation section
    if (data.quotationText || data.quotationRef) {
        html += `
            <div class="section">
                <div class="quotation-box">
                    ${data.quotationText ? `<div class="quotation-text">${formatText(data.quotationText)}</div>` : ''}
                    ${data.quotationRef ? `<div class="quotation-ref">— ${escapeHtml(data.quotationRef)}</div>` : ''}
                </div>
            </div>
        `;
    }

    // Prayer section
    if (data.prayerPrompt) {
        html += `
            <div class="section">
                <h3 class="section-title">Prayer</h3>
                <div class="prayer-box">
                    <div class="prayer-text">${formatText(data.prayerPrompt)}</div>
                </div>
            </div>
        `;
    }

    // Go Deeper section
    if (data.goDeeper || (data.additionalLinks && data.additionalLinks.length > 0)) {
        html += `<div class="section">`;
        html += `<h3 class="section-title">Go Deeper</h3>`;

        if (data.goDeeper) {
            html += `<div class="go-deeper-text">${formatText(data.goDeeper)}</div>`;
        }

        if (data.additionalLinks && data.additionalLinks.length > 0) {
            html += `<ul class="additional-links">`;
            data.additionalLinks.forEach(link => {
                html += `<li><a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.title)}</a></li>`;
            });
            html += `</ul>`;
        }

        html += `</div>`;
    }

    html += `</div>`;

    // Add navigation to previous day
    const prevDate = getPreviousDate(data.date);
    html += `
        <div class="devotional-nav">
            <a href="/devotion/?date=${prevDate}" class="nav-button">← Previous Day</a>
        </div>
    `;

    contentEl.innerHTML = html;
}
