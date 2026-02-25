import Database from 'better-sqlite3';

const DB_PATH = process.env.DB_PATH || '/app/data/submissions.db';
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    website TEXT,
    press_release TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    published_at DATETIME,
    notes TEXT
  )
`);

export default db;
