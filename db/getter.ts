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

export async function getTagsFromDB(db: SQLiteDatabase): Promise<string[]> {
  try {
    const tags = await db.getAllAsync<{ tag: string }>(
      `SELECT Distinct tag
        FROM note`
    );
    return tags.map((entry) => entry.tag);
  } catch (e) {
    console.log(e);
    return [];
  }
}
