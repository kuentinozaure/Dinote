import { Note } from "@/interfaces/note";
import { SQLiteDatabase } from "expo-sqlite";

export async function getNotesFromDB(db: SQLiteDatabase): Promise<Note[]> {
  try {
    const notes = await db.getAllAsync<Note>(
      `SELECT *
        FROM note
        ORDER BY timeStamp DESC`
    );
    return notes;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getTagsFromDB(
  db: SQLiteDatabase
): Promise<{ tag: string; count: number }[]> {
  try {
    const tags = await db.getAllAsync<{ tag: string; count: number }>(
      `SELECT Distinct tag, COUNT(*) as count
        FROM note
        GROUP BY tag
        ORDER BY count DESC;`
    );
    return tags;
  } catch (e) {
    console.log(e);
    return [];
  }
}
