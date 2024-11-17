import { Note } from "@/app/add-note";
import * as SQLite from "expo-sqlite";

export const DB_NAME = "DINOTE";
const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  console.log("currentDbVersion", currentDbVersion);
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    createTables(db);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function createTables(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS note (
        id string PRIMARY KEY NOT NULL,
        tag TEXT,
        description TEXT,
        title TEXT,
        textContent TEXT,
        uri TEXT,
        fileName TEXT
    );
`);
}

export async function insertNote(db: SQLite.SQLiteDatabase, note: Note) {
  await db.runAsync(
    `INSERT INTO note (id, tag, description, title, textContent, uri, fileName) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      note.id,
      note.tag,
      note.description,
      note.title,
      note.textContent,
      note.uri,
      note.fileName,
    ]
  );
}
