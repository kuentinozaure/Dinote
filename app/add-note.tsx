import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { pickSingle } from "react-native-document-picker";
import { useState } from "react";
import FileUploader from "@/components/file-uploader";
import UploadFile from "@/components/upload-file";

import Groq from "groq-sdk";
import Button from "@/components/button";

interface Note {
  uri: string;
  name: string;
}

export default function AddNotePage() {
  const [document, setDocument] = useState<Note | null>(null);
  const [aiResponse, setResponse] = useState<string | null>(null);

  const groq = new Groq({
    apiKey: process.env.EXPO_PUBLIC_GROQ_API_KEY,
  });

  const onFileUploadPress = async () => {
    const fileFromFinder = await pickSingle({
      allowMultiSelection: false,
    });

    const fileName = FileSystem.documentDirectory || "" + fileFromFinder.name;

    await FileSystem.createDownloadResumable(fileFromFinder.uri, fileName);

    setDocument({
      uri: fileName,
      name: fileFromFinder.name || "",
    });
  };

  const testAI = async () => {
    const data = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Est tu une IA ?",
        },
      ],
      model: "llama3-8b-8192",
    });

    setResponse(data.choices[0]?.message?.content || "");
    console.log(data.choices[0]?.message?.content || "");
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
          <UploadFile fileName={document.name}> </UploadFile>
        )}

        <Button buttonClick={() => testAI()} text={"test ai"}></Button>

        <Text>{aiResponse}</Text>
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
