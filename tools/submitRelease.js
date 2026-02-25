import { z } from 'zod';
import db from '../lib/database.js';

export const schema = {
  company_name: z.string().min(1).describe('Name of the company submitting the press release'),
  contact_email: z.string().email().describe('Contact email address'),
  website: z.string().url().optional().describe('Company website URL (optional)'),
  press_release: z.string().min(50).describe('Full text of the press release (minimum 50 characters)')
};

export async function handler({ company_name, contact_email, website, press_release }) {
  const stmt = db.prepare(
    'INSERT INTO submissions (company_name, contact_email, website, press_release) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(company_name, contact_email, website || null, press_release);

  return {
    content: [{
      type: 'text',
      text: `Press release submitted successfully.\n\nSubmission ID: ${result.lastInsertRowid}\nCompany: ${company_name}\nEmail: ${contact_email}\nStatus: pending\n\nYour submission will be reviewed by the PRWire editorial team. Once approved, it will be rewritten in 4 editorial voices and published across the PRWire network (Crypto Wire Daily, Token Insider, Blockchain Briefing, Digital Asset Post).`
    }]
  };
}
