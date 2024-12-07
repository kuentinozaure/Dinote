import Chip from "@/components/chip";
import Trixy from "@/components/trixy";
import { Feather } from "@expo/vector-icons";
import Markdown from "@ronradtke/react-native-markdown-display";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CreateNote() {
  const goBack = () => {
    router.back();
  };

  const onSaveNotePress = () => {
    // TODO: Save note to the database
    goBack();
  };

  return (
    <SafeAreaView style={styles.createNoteContainer}>
      <View style={styles.navigationHeader}>
        <Feather
          name="arrow-left"
          size={24}
          color="white"
          onPress={() => goBack()}
        />

        <Feather
          name="check"
          size={24}
          color="white"
          onPress={() => onSaveNotePress()}
        />
      </View>

      {/* TODO: Create reusable component Note which can be editable or createable */}
      <View style={styles.noteContainer}>
        <View style={styles.noteHeaderContainer}>
          <Text style={styles.noteHeaderNameText}>New note</Text>
          <Text style={styles.noteHeaderDateText}>24 nov 2020, 01:45AM</Text>

          <View style={styles.noteHeaderShareContainer}>
            <Chip title={"Quizz"} />
            <Feather name="share" size={24} color="white" />
          </View>
        </View>

        <Markdown
          style={{
            text: {
              color: "#e5e5e5",
              fontSize: 24,
            },
          }}
        >
          dosfildsjflkdsjfljdsfl lfkjds lfkdjslkf ldsjf lksdfj dlskfjdlskj
        </Markdown>
      </View>

      <Trixy></Trixy>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  createNoteContainer: {
    flex: 1,
    flexDirection: "column",
  },

  navigationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  // TODO: Move this to the Note component
  noteContainer: {
    padding: 10,
  },

  noteHeaderContainer: {
    gap: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1b1b1b",
    backgroundColor: "#010101",
  },

  noteHeaderNameText: {
    color: "#ffffff",
    fontSize: 24,
  },

  noteHeaderDateText: {
    color: "#ffffff",
    fontSize: 14,
  },

  noteHeaderShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
