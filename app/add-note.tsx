import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { pickSingle } from "react-native-document-picker";
import { useState } from "react";
import FileUploader from "@/components/file-uploader";
import UploadFile from "@/components/upload-file";

interface Note {
  uri: string;
  name: string;
}
export default function AddNotePage() {
  const [document, setDocument] = useState<Note | null>(null);

  const onFileUploadPress = async () => {
    const fileFromFinder = await pickSingle({
      allowMultiSelection: false,
    });

    const fileName = FileSystem.documentDirectory || "" + fileFromFinder.name;

    const fileStoreOnDevice = await FileSystem.createDownloadResumable(
      fileFromFinder.uri,
      fileName
    );

    setDocument({
      uri: fileName,
      name: fileFromFinder.name || "",
    });
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
