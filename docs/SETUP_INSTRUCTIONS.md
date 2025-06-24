# Email Collection Setup Instructions

Follow these steps to set up Google Sheets email collection for Heart Aflame:

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Heart Aflame Email List"
4. In cell A1, type "Timestamp"
5. In cell B1, type "Email"
6. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789/edit`
   - Sheet ID: `1ABC123DEF456GHI789`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js`
5. Replace `YOUR_SHEET_ID` with your actual Sheet ID from Step 1
6. Save the project (name it "Heart Aflame Email Collector")

## Step 3: Deploy the Script

1. In Apps Script, click "Deploy" → "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Set these options:
   - Description: "Heart Aflame Email Collection API"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. Authorize the script (you may see security warnings - click "Advanced" → "Go to [project name]")
6. Copy the Web app URL (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

## Step 4: Update Your Website

1. Open `index.html`
2. Find line 540: `const scriptURL = 'YOUR_SCRIPT_URL';`
3. Replace `YOUR_SCRIPT_URL` with your Web app URL from Step 3
4. Save the file

## Step 5: Test

1. Open your website
2. Try submitting an email
3. Check your Google Sheet - you should see the email appear
4. Try submitting the same email again - you should get a "duplicate" message

## Features Included

- ✅ Email validation
- ✅ Duplicate prevention  
- ✅ Timestamp tracking
- ✅ Loading states
- ✅ Error handling
- ✅ User feedback messages

## Viewing Your Emails

Your collected emails will appear in the Google Sheet with timestamps. You can:
- Export to CSV/Excel
- Set up email notifications when new emails arrive
- Create charts/analytics
- Import into email marketing tools

## Troubleshooting

**Form not working?**
- Check browser console for errors
- Verify the script URL is correct
- Make sure the script is deployed with "Anyone" access

**Permissions errors?**
- Re-run the authorization process in Apps Script
- Check that the Sheet ID is correct

**Emails not appearing?**
- Check the Apps Script execution log for errors
- Verify the sheet has the correct column headers