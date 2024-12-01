import { DB_NAME, migrateDbIfNeeded } from "@/db/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDbIfNeeded}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#010101" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
