import { StyleSheet, Text, TextInput, View } from "react-native";
import Chip from "./chip";
import { Feather } from "@expo/vector-icons";
import Markdown from "@ronradtke/react-native-markdown-display";
import { Note as NoteType } from "@/interfaces/note";
import { calculateDateFromTimeStamp } from "@/helpers/date.helper";
import { useState } from "react";

interface NoteProps {
  note: NoteType;
  editionMode: boolean;
  onNoteChange?: (note: NoteType) => void;
}

interface NoteEditionForm {
  titleValue: string;
  contentValue: string;
}

export default function Note({ note, editionMode, onNoteChange }: NoteProps) {
  const [noteEditionForm, setNoteEditionForm] = useState<NoteEditionForm>({
    titleValue: note.title || "New note",
    contentValue: note.markdownContent,
  });

  const onChangeTitleText = (text: string) => {
    setNoteEditionForm((prev) => ({
      ...prev,
      titleValue: text,
    }));

    if (onNoteChange) {
      onNoteChange({
        ...note,
        title: text,
      });
    }
  };

  const onChangeContentText = (text: string) => {
    setNoteEditionForm((prev) => ({
      ...prev,
      contentValue: text,
    }));

    if (onNoteChange) {
      onNoteChange({
        ...note,
        markdownContent: text,
      });
    }
  };

  /**
   * This function will render the title text in edition mode or not
   * @returns a jsx element with the title text or a text input
   */
  const renderTitleTextEdition = () => {
    if (!editionMode) {
      return (
        <Text style={styles.noteHeaderNameText}>
          {noteEditionForm.titleValue}
        </Text>
      );
    } else {
      return (
        <TextInput
          style={styles.noteHeaderNameText}
          value={noteEditionForm.titleValue}
          onChangeText={(text) => onChangeTitleText(text)}
        />
      );
    }
  };

  const renderMarkdownTextEdition = () => {
    if (!editionMode) {
      return (
        <Markdown
          style={{
            text: {
              color: "#e5e5e5",
              fontSize: 24,
            },
          }}
        >
          {noteEditionForm.contentValue}
        </Markdown>
      );
    } else {
      return (
        <TextInput
          style={{
            color: "#e5e5e5",
            fontSize: 24,
          }}
          value={noteEditionForm.contentValue}
          placeholder="Type your note here"
          onChangeText={(text) => onChangeContentText(text)}
          multiline
        />
      );
    }
  };

  return (
    <View style={styles.noteContainer}>
      <View style={styles.noteHeaderContainer}>
        {renderTitleTextEdition()}
        <Text style={styles.noteHeaderDateText}>
          {calculateDateFromTimeStamp(
            note.timeStamp > 0 ? note.timeStamp : Date.now()
          )}
        </Text>

        <View
          style={[
            styles.noteHeaderShareContainer,
            !note.tag && styles.noteHeaderWithoutTag,
          ]}
        >
          {note.tag && <Chip title={note.tag} />}
          <Feather name="share" size={24} color="white" />
        </View>
      </View>

      <View style={styles.markdownContainer}>
        {renderMarkdownTextEdition()}
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

  noteHeaderWithoutTag: {
    justifyContent: "flex-end",
  },

  markdownContainer: {
    paddingTop: 16,
  },
});
