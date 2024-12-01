import { router, Stack } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { pickSingle } from "react-native-document-picker";
import { useState } from "react";
import FileUploader from "@/components/file-uploader";
import UploadFile from "@/components/upload-file";
import Groq from "groq-sdk";
import axios from "axios";

import { NoteSummarized, summarizeNote } from "@/ai/summarize";
import React from "react";
import Button from "@/components/button";
import { randomUUID } from "expo-crypto";
import { useSQLiteContext } from "expo-sqlite";
import { insertNote } from "@/db/db";
import StarNote from "@/components/star-note";
import { Note } from "@/interfaces/note";
import { Feather } from "@expo/vector-icons";
import { useGroqContext } from "@/context/groq-context";

// TODO: Move this to a config file
const API_URL =
  "https://innovative-jacinta-quentin-s-hobbys-d50ed36b.koyeb.app";

export default function AddNotePage() {
  const db = useSQLiteContext();
  const groq = useGroqContext();
  const [note, setNote] = useState<Note>({
    title: "",
    description: "",
    tag: "",
    uri: "",
    fileName: "",
    textContent: "",
    id: "",
    timeStamp: 0,
  });
  const [noteGenerated, setNoteGenerated] = useState<NoteSummarized | null>(
    null
  );

  const onFileUploadPress = async () => {
    const fileFromFinder = await pickSingle({
      allowMultiSelection: false,
    });

    const fileName = FileSystem.documentDirectory || "" + fileFromFinder.name;
    await FileSystem.createDownloadResumable(fileFromFinder.uri, fileName);

    setNote((prev) => {
      return {
        ...prev,
        uri: fileFromFinder.uri || "",
        fileName: fileFromFinder.name || "",
      };
    });
  };
  //   const data = await groq.chat.completions.create({
  //     messages: [
  //       {
  //         role: "user",
  //         content: `
  //         You are a tool who summarizes note pdfs
  //         You are not interacting with a human, but with a machine

  //         The following context is a pdf that needs to be summarized:
  //         ${pdfContext}

  //         -----------------------------
  //         Instructions:

  //         - Summarize the pdf
  //         - According your summary, generate 3 titles that make sense with the content
  //         - According your summary, generate 3 description that make sense with the content
  //         - According your summary, generate 3 general tags we can classify the pdf with according to the content
  //         - The tags should be general and not too specific to this document
  //         - Don't hallucinate, just use the content of the pdf
  //         - Reply with the following JSON structure:
  //         {
  //           "summary": "The summary of the pdf",
  //           "titles": ["Title 1", "Title 2", "Title 3"],
  //           "tags": ["#Tag1", "#Tag 2", "#Tag3"],
  //           description: ["Description 1", "Description 2", "Description 3"]
  //         }
  //         `,
  //         name: "pdf",
  //       },
  //     ],
  //     model: "llama3-8b-8192",
  //     response_format: { type: "json_object" },
  //   });

  //   if (!data.choices[0]?.message?.content) {
  //     return;
  //   }

  //   const response = JSON.parse(data.choices[0].message.content);
  //   setNoteGenerated(response);
  // };

  const onUploadedFilePress = async () => {
    // Get the file as base64 before sending it to the server
    const fileBase64 = await FileSystem.readAsStringAsync(note?.uri || "", {
      encoding: FileSystem.EncodingType.Base64,
    });

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

      const aiData = await summarizeNote(groq, response.data);
      setNote((prev) => {
        return {
          ...prev,
          textContent: response.data,
        };
      });
      setNoteGenerated(aiData);
    } catch (error) {
      console.log(error);
    }
  };

  const onNoteSelection = (title: string) => {
    const index = noteGenerated?.titles.indexOf(title);

    setNote((prev) => {
      return {
        ...prev,
        title: noteGenerated?.titles[index || 0] || "",
        description: noteGenerated?.description[index || 0] || "",
        tag: noteGenerated?.tags[index || 0] || "",
        id: randomUUID(),
        timeStamp: Date.now(),
      };
    });
  };

  const onSaveNote = () => {
    try {
      insertNote(db, note);
      router.back();
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <Feather
        name="arrow-left"
        size={24}
        color="white"
        onPress={() => goBack()}
      />

      <ScrollView>
        <Stack.Screen options={{}} />
        <View style={styles.container}>
          <FileUploader
            onFileUploadPress={() => onFileUploadPress()}
          ></FileUploader>

          {note && note.uri !== "" && (
            <UploadFile
              fileName={note.fileName}
              fileUploadClick={() => onUploadedFilePress()}
            ></UploadFile>
          )}

          <View>
            {noteGenerated && (
              <>
                <ScrollView
                  horizontal={true}
                  contentContainerStyle={styles.contentContainer}
                >
                  <StarNote
                    key={1}
                    description={noteGenerated.description[0]}
                    tag={noteGenerated.tags[0]}
                    title={noteGenerated.titles[0]}
                    onClick={() => onNoteSelection(noteGenerated.titles[0])}
                  ></StarNote>

                  <StarNote
                    key={2}
                    description={noteGenerated.description[1]}
                    tag={noteGenerated.tags[1]}
                    title={noteGenerated.titles[1]}
                    onClick={() => onNoteSelection(noteGenerated.titles[1])}
                  ></StarNote>

                  <StarNote
                    key={3}
                    description={noteGenerated.description[2]}
                    tag={noteGenerated.tags[2]}
                    title={noteGenerated.titles[2]}
                    onClick={() => onNoteSelection(noteGenerated.titles[2])}
                  ></StarNote>
                </ScrollView>
              </>
            )}
          </View>
          {note.id.length > 0 && (
            <Button
              text="Save this note"
              buttonClick={() => onSaveNote()}
            ></Button>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    margin: 16,
    flexDirection: "column",
  },

  contentContainer: {
    padding: 16,
    gap: 8,
  },
});
