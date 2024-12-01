import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Chip from "./chip";
import { calculateDateFromTimeStamp } from "@/helpers/date.helper";
import { Note } from "@/interfaces/note";

const DINOTE_QUICK_ACTIONS = [
  "Generate a Quiz",
  "Generate Flashcards",
  "Generate a Homework",
];

interface DinoteProps {
  isSeparatorNote: boolean;
  note: Note;
}

export default function Dinote({ isSeparatorNote, note }: DinoteProps) {
  return (
    <TouchableOpacity
      style={[
        styles.noteContainer,
        isSeparatorNote ? styles.separatorNote : styles.gridNote,
      ]}
    >
      <View style={styles.dinoteTitle}>
        <Text style={styles.dinoteTitleText}>{note.title}</Text>
        <FontAwesome5 name="ellipsis-h" size={15} color="white" />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.dinoteDateText}>{note.description}</Text>

        <View style={styles.quickActionContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {DINOTE_QUICK_ACTIONS.map((action, index) => (
              <Chip
                title={action}
                key={index}
                isActive={isSeparatorNote}
                customBackground={!isSeparatorNote ? "#262626" : undefined}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.dinoteTitle}>
        <Text style={styles.dinoteDateText}>
          {calculateDateFromTimeStamp(note.timeStamp)}
        </Text>
        <FontAwesome name="star-o" size={15} color="white" />
        {/* <FontAwesome name="star" size={15} color="white" /> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    borderRadius: 24,
    gap: 8,
  },

  separatorNote: {
    backgroundColor: "#fe6902",
    width: "100%",
  },

  gridNote: {
    backgroundColor: "#1b1b1b",
    width: "47.5%",
  },

  dinoteTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dinoteTitleText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  dinoteDateText: {
    fontSize: 12,
    color: "#FFFFFF",
  },

  middleContainer: {
    gap: 16,
  },

  quickActionContainer: {
    height: 50,
  },

  scrollContent: {
    flexDirection: "row",
    gap: 8,
  },
});
