import { StyleSheet, Text, View } from "react-native";
import Chip from "./chip";
import { Feather } from "@expo/vector-icons";
import Markdown from "@ronradtke/react-native-markdown-display";
import { Note as NoteType } from "@/interfaces/note";
import { calculateDateFromTimeStamp } from "@/helpers/date.helper";

interface NoteProps {
  note: NoteType;
}

export default function Note({ note }: NoteProps) {
  return (
    <View style={styles.noteContainer}>
      <View style={styles.noteHeaderContainer}>
        <Text style={styles.noteHeaderNameText}>
          {note.title.length > 0 ? note.title : "New note"}
        </Text>
        <Text style={styles.noteHeaderDateText}>
          {calculateDateFromTimeStamp(
            note.timeStamp > 0 ? note.timeStamp : Date.now()
          )}
        </Text>

        <View style={styles.noteHeaderShareContainer}>
          <Chip title={"Quizz"} />
          <Feather name="share" size={24} color="white" />
        </View>
      </View>

      <View style={styles.markdownContainer}>
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
      </View>
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

  markdownContainer: {
    paddingTop: 16,
  },
});
