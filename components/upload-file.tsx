import { StyleSheet, Text, View } from "react-native";

interface UploadFileProps {
  fileName: string;
}

export default function UploadFile({ fileName }: UploadFileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.dinoText}>🦖</Text>
      <View style={styles.textContainer}>
        <Text style={styles.fileName}>{fileName}</Text>
        <Text style={styles.infoText}>✨Ready to be dinotized✨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eef1f7",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dinoText: {
    fontSize: 28,
  },

  textContainer: {
    flexDirection: "column",
  },

  fileName: {
    fontSize: 14,
    color: "#2a2e33",
    fontWeight: "bold",
  },

  infoText: {
    color: "#c9cbd0",
    fontSize: 12,
  },
});
