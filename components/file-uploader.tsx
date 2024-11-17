import { StyleSheet, Text, View } from "react-native";
import Button from "./button";

interface FileUploaderProps {
  onFileUploadPress: () => void;
}

export default function FileUploader({ onFileUploadPress }: FileUploaderProps) {
  const onClick = () => {
    onFileUploadPress();
  };

  return (
    <View style={styles.fileUploader}>
      <Text style={styles.browseFile}>Choose a file...</Text>
      <Text style={styles.formatSupportedText}>
        Pdf format only; more extension soon 👀
      </Text>
      <Button text="Browse File" buttonClick={() => onClick()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  fileUploader: {
    borderRadius: 8,
    gap: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#cbd0dc",
    width: "auto",
    height: 200,
    padding: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  fileName: {
    fontSize: 12,
    color: "#ffffff",
  },

  browseFile: {
    fontSize: 14,
    color: "#2a2e33",
  },

  formatSupportedText: {
    color: "#c9cbd0",
    fontSize: 12,
  },
});
