import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UploadFileProps {
  fileName: string;
}

export default function UploadFile({ fileName }: UploadFileProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.dinoText}>🦖</Text>
        <View style={styles.textContainer}>
          <Text style={styles.fileName}>{fileName}</Text>
          <Text style={styles.infoText}>✨ Ready to be dinotized ✨</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.start}>
        <View style={styles.startButton}></View>
      </TouchableOpacity>
    </TouchableOpacity>
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
    justifyContent: "space-between",
    gap: 8,
  },

  leftContainer: {
    flexDirection: "row",
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

  start: {
    backgroundColor: "#0d9900",
    padding: 8,
    borderRadius: "50%",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  startButton: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fcfffd",
    transform: [{ rotate: "90deg" }],
  },
});
