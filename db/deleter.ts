import { SQLiteDatabase } from "expo-sqlite";

export async function deleteNote(
  db: SQLiteDatabase,
  noteId: string
): Promise<void> {
  try {
    await db.execAsync(`
      DELETE 
      FROM note 
      WHERE id="${noteId}"`);
  } catch (e) {
    console.log(e);
  }
}
