import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export function getAuth() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error('Google Sheets credentials are not set in environment variables');
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });
}

export const getSheetsClient = async () => {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
};

export const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
