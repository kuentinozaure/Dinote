import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddNoteButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <View>
        <Text style={styles.buttonText}>+ Add new note</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: "#222222",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
  },

  buttonText: {
    fontSize: 12,
    color: "#ffffff",
  },
});
