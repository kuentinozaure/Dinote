import { createTables, DB_NAME, migrateDbIfNeeded } from "@/db/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDbIfNeeded}>
      <Stack />
    </SQLiteProvider>
  );
}
