import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDb() {
  return open({
    filename: process.env.DB_PATH || './data.db',
    driver: sqlite3.Database,
  });
}
