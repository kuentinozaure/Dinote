import { router, useGlobalSearchParams } from "expo-router";

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Note as NoteType } from "../../interfaces/note";
import { Feather } from "@expo/vector-icons";

import Markdown from "@ronradtke/react-native-markdown-display";
import Ellipsis from "@/components/ellipsis";
import { useSQLiteContext } from "expo-sqlite";
import { deleteNote } from "@/db/deleter";
import Note from "@/components/note";

export default function Page() {
  const db = useSQLiteContext();
  const note: NoteType = JSON.parse(
    useGlobalSearchParams().note as string
  ) as Note;

  const goBack = () => {
    router.back();
  };

  const onDeleteNote = () => {
    deleteNote(db, note.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.noteContainer}>
      {/* go back container */}
      <View style={styles.goBackContainer}>
        <Feather
          name="arrow-left"
          size={24}
          color="white"
          onPress={() => goBack()}
        />

        <Ellipsis onDeleteNote={() => onDeleteNote()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Note note={note} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    margin: 16,
  },

  goBackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
});
