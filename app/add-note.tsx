import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { pickSingle } from "react-native-document-picker";
import { useState } from "react";
import FileUploader from "@/components/file-uploader";
import UploadFile from "@/components/upload-file";
import Groq from "groq-sdk";
import axios from "axios";

interface Note {
  uri: string;
  name: string;
}

interface NoteGenerated {
  summary: string;
  titles: string[];
}

// TODO: Move this to a config file
const API_URL =
  "https://innovative-jacinta-quentin-s-hobbys-d50ed36b.koyeb.app";

export default function AddNotePage() {
  const [document, setDocument] = useState<Note | null>(null);
  const [noteGenerated, setNoteGenerated] = useState<NoteGenerated | null>(
    null
  );
  const [aiResponse, setResponse] = useState<string | null>(null);
  const [groq] = useState<Groq>(
    new Groq({
      apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY,
    })
  );

  const onFileUploadPress = async () => {
    const fileFromFinder = await pickSingle({
      allowMultiSelection: false,
    });

    const fileName = FileSystem.documentDirectory || "" + fileFromFinder.name;
    await FileSystem.createDownloadResumable(fileFromFinder.uri, fileName);

    setDocument({
      uri: fileFromFinder.uri || "",
      name: fileFromFinder.name || "",
    });
  };

  const askAI = async (pdfContext: string) => {
    const data = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
          You are a tool who summarizes note pdfs
          You are not interacting with a human, but with a machine

          The following context is a pdf that needs to be summarized:
          ${pdfContext}

          -----------------------------
          Instructions:

          - Summarize the pdf
          - According your summary, generate 3 titles that make sense with the content
          - Don't hallucinate, just use the content of the pdf
          - Reply with the following JSON structure:
          {
            "summary": "The summary of the pdf",
            "titles": ["Title 1", "Title 2", "Title 3"]
          }
          `,
          name: "pdf",
        },
      ],
      model: "llama3-8b-8192",
      response_format: { type: "json_object" },
    });

    if (!data.choices[0]?.message?.content) {
      return;
    }

    const response = JSON.parse(data.choices[0].message.content);
    setNoteGenerated(response);
  };

  const onUploadedFilePress = async () => {
    // Get the file as base64 before sending it to the server
    const fileBase64 = await FileSystem.readAsStringAsync(document?.uri || "", {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(fileBase64);

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

      await askAI(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
        }}
      />
      <View style={styles.container}>
        <FileUploader
          onFileUploadPress={() => onFileUploadPress()}
        ></FileUploader>

        {document && document.uri && (
          <UploadFile
            fileName={document.name}
            fileUploadClick={() => onUploadedFilePress()}
          >
            {" "}
          </UploadFile>
        )}

        {noteGenerated && (
          <Text>
            {noteGenerated.summary} - {noteGenerated.titles.join(", ")}
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    margin: 16,
    flexDirection: "column",
  },
});
