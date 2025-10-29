// Apps Script: doGet + doPost to receive form urlencoded and save to Spreadsheet
// Spreadsheet ID and sheet name are set according to user input

const SPREADSHEET_ID = '1KrmYeoF1l4QvdIA_uA9PeaCqSCWv2nV5yKb5f8WUAgk';
const SHEET_NAME = 'Sheet1';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok', message: 'Web App siap' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const p = e.parameter || {};

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'server_timestamp',
        'client_timestamp',
        'nama',
        'alamat',
        'kehadiran',
        'useragent'
      ]);
    }

    const serverTimestamp = new Date().toISOString();
    const row = [
      serverTimestamp,
      p.timestamp || '',
      p.nama || '',
      p.alamat || '',
      p.kehadiran || '',
      p.useragent || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Data tersimpan' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error('doPost error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}