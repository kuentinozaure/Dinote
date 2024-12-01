import { DB_NAME, migrateDbIfNeeded } from "@/db/db";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GroqProvider } from "../context/groq-context";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={DB_NAME} onInit={migrateDbIfNeeded}>
      <GroqProvider apiKey={process.env.EXPO_PUBLIC_GROQ_API_KEY}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#010101" },
          }}
        ></Stack>
      </GroqProvider>
    </SQLiteProvider>
  );
}
