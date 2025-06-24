// Google Apps Script for Heart Aflame Email Collection
// This code goes in script.google.com, not in your website

function doPost(e) {
  try {
    // Get the email from the form submission
    const email = e.parameter.email;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return ContentService.createTextOutput('error: invalid email');
    }
    
    // Open the Google Sheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
    
    // Check for duplicates
    const existingEmails = sheet.getRange('B:B').getValues().flat();
    if (existingEmails.includes(email)) {
      return ContentService.createTextOutput('duplicate: email already exists');
    }
    
    // Add the email to the sheet
    const timestamp = new Date();
    sheet.appendRow([timestamp, email]);
    
    // Return success response
    return ContentService.createTextOutput('success: email added');
    
  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput('error: submission failed');
  }
}

function doGet(e) {
  // Handle GET requests (optional, for testing)
  return ContentService.createTextOutput('Heart Aflame Email Collection API is running');
}