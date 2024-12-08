import { StyleSheet, Text, View } from "react-native";
import Chip from "./chip";
import { Feather } from "@expo/vector-icons";
import Markdown from "@ronradtke/react-native-markdown-display";

export default function Note() {
  return (
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
  );
}

const styles = StyleSheet.create({
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
