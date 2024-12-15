import { defineActionsToAchieve } from "@/ai/define-action-to-do";
import Note from "@/components/note";
import Trixy from "@/components/trixy";
import { useGroqContext } from "@/context/groq-context";
import { Actions } from "@/enums/actions";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { pickSingle } from "react-native-document-picker";
import * as FileSystem from "expo-file-system";
import { answerQuestion } from "@/ai/answer-question";
import axios from "axios";
import { importNote } from "@/ai/import_note";
import { useState } from "react";
import { Note as NoteType } from "@/interfaces/note";
import { insertNote } from "@/db/db";
import { useSQLiteContext } from "expo-sqlite";
import { randomUUID } from "expo-crypto";
import { convertToMarkdown } from "@/ai/convert-to-markdown";
import { generateNote } from "@/ai/generate-note";

const API_URL =
  "https://innovative-jacinta-quentin-s-hobbys-d50ed36b.koyeb.app";

export default function CreateNote() {
  const groq = useGroqContext();
  const db = useSQLiteContext();
  const [note, setNote] = useState<NoteType>({
    title: "New note",
    description: "",
    tag: "",
    uri: "",
    fileName: "",
    textContent: "",
    id: "",
    timeStamp: 0,
    markdownContent: "",
  });
  const [processingState, setProcessingState] = useState("");

  const goBack = () => {
    router.back();
  };

  const onSaveNotePress = () => {
    const noteToSave = { ...note, timeStamp: Date.now(), id: randomUUID() };
    setNote(noteToSave);
    insertNote(db, noteToSave);
    goBack();
  };

  const onUserPromptSubmitted = async (userPrompt: string) => {
    const data = await defineActionsToAchieve(groq, userPrompt);
    if (!data) {
      return;
    }

    // If user want to import a file from his folder
    if (data.action === Actions.IMPORT_FILE) {
      importFile();
    }

    // If user want to generate a note
    if (data.action === Actions.GENERATE_NOTE) {
      generateNoteByAi(userPrompt);
    }

    // If user want to answer a question about his prompt
    if (data.action === Actions.ANSWER_QUESTION) {
      answerUserQuestion(userPrompt);
    }
  };

  const generateNoteByAi = async (context: string) => {
    setProcessingState("Dinote thinking ...");
    const data = await generateNote(groq, context);
    if (!data) {
      return;
    }
    setProcessingState("Dinote is generating your note ...");

    const newNote: NoteType = {
      description: data?.description || "",
      uri: "", // TODO: Save the file to the app's folder
      fileName: "", // TODO: Save the file to the app's folder
      textContent: data.markdownContent || "",
      id: randomUUID(),
      timeStamp: Date.now(),
      markdownContent: data.markdownContent || "",
      tag: data?.tag || "",
      title: data?.title || "",
    };

    setProcessingState("Your note is ready");
    setNote(newNote);
  };

  const importFile = async () => {
    // Get the file from the user's folder
    const fileFromFinder = await pickSingle({
      allowMultiSelection: false,
    });

    // Save the file to the app's folder
    const fileName = FileSystem.documentDirectory || "" + fileFromFinder.name;
    await FileSystem.createDownloadResumable(fileFromFinder.uri, fileName);

    // read the file as base64 before sending it to the server
    const fileBase64 = await FileSystem.readAsStringAsync(
      fileFromFinder.uri || "",
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );

    setProcessingState("Processing your file ...");

    try {
      const response = await axios.post(
        API_URL,
        {
          file: fileBase64,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setProcessingState("Dinote is working on your file ...");

      const [data, textToMarkdown] = await Promise.all([
        importNote(groq, response.data),
        textContentToMarkdown(response.data),
      ]);

      // Set the note with the data from the pdf
      const newNote = {
        description: data?.description || "",
        uri: fileFromFinder.uri || "",
        fileName: fileFromFinder.name || "",
        textContent: response.data,
        id: randomUUID(),
        timeStamp: Date.now(),
        markdownContent: textToMarkdown || "",
        tag: data?.tag || "",
        title: data?.title || "",
      };

      setNote(newNote);
      setProcessingState("File processed successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const textContentToMarkdown = async (textContent: string) => {
    const aiData = await convertToMarkdown(groq, textContent);
    return aiData?.markdownContent || "";
  };

  const answerUserQuestion = async (userQuestion: string) => {
    const data = await answerQuestion(groq, userQuestion);
    if (!data) {
      return;
    }
    console.log(data);
  };

  const onNoteChange = (note: NoteType) => {
    setNote({
      ...note,
    });
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <Note
          note={note}
          editionMode={true}
          onNoteChange={(note) => onNoteChange(note)}
        />
      </ScrollView>

      <Trixy
        onUserPromptSubmitted={(userPrompt: string) =>
          onUserPromptSubmitted(userPrompt)
        }
        processingState={processingState}
      ></Trixy>
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
});
