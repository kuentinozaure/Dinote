import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EllipsisProps {
  onDeleteNote?(): void;
}

export default function Ellipsis({ onDeleteNote }: EllipsisProps) {
  const [closeOverlay, setCloseOverlay] = useState(false);

  const handleTheOverlay = () => {
    setCloseOverlay(!closeOverlay);
  };

  const deleteNote = () => {
    if (onDeleteNote) {
      onDeleteNote();
      setCloseOverlay(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleTheOverlay()}>
        <FontAwesome5 name="ellipsis-h" size={24} color="white" />
      </TouchableOpacity>

      {closeOverlay && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity
            style={styles.overlayItem}
            onPress={() => deleteNote()}
          >
            <FontAwesome5 name="trash" size={20} color="white" />
            <Text style={styles.overlayText}>Delete note</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    alignItems: "flex-end",
  },

  overlayContainer: {
    position: "absolute",
    top: 30,
    right: 0,
    width: "auto",
    backgroundColor: "#1b1b1b",
    borderRadius: 8,
    padding: 8,
    zIndex: 1,
    flexDirection: "column",
    gap: 8,
    alignItems: "flex-end",
  },

  overlayItem: {
    flexDirection: "row",
    gap: 8,
  },

  overlayText: {
    color: "#e5e5e5",
    fontSize: 16,
  },
});
