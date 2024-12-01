import { router, useGlobalSearchParams } from "expo-router";

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Note } from "../../interfaces/note";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import Chip from "@/components/chip";

import Markdown from "@ronradtke/react-native-markdown-display";

export default function Page() {
  const note: Note = JSON.parse(useGlobalSearchParams().note as string) as Note;

  const goBack = () => {
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
        <FontAwesome5 name="ellipsis-h" size={24} color="white" />
      </View>

      {/* document title  */}
      <View style={styles.titleContainer}>
        <Text style={styles.noteTitle}>{note.title}</Text>

        <View style={styles.shareContainer}>
          <Chip title={"Quizz"} />
          <Feather name="share" size={24} color="white" />
        </View>
      </View>

      {/* Markdown content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Markdown
          style={{
            text: {
              color: "#e5e5e5",
              fontSize: 24,
            },
          }}
        >
          {note.markdownContent}
        </Markdown>
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

  titleContainer: {
    flexDirection: "column",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#1b1b1b",
  },

  shareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
  },

  noteTitle: {
    color: "#ffffff",
    fontSize: 40,
  },
});
