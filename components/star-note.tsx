import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StarNoteProps {
  title: string;
  description: string;
  tag: string;
  onClick?: () => void;
}

export default function StarNote({
  title,
  description,
  tag,
  onClick,
}: StarNoteProps) {
  const onPressNote = () => {
    if (onClick) onClick();
  };
  return (
    <TouchableOpacity
      style={styles.noteContainer}
      onPress={() => onPressNote()}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.tagContainer}>
        <Text style={styles.tag}>{tag}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  noteContainer: {
    borderRadius: 8,
    backgroundColor: "#edf5fd",
    height: 150,
    width: 200,
    padding: 16,
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },

  description: {
    fontSize: 12,
    color: "#a4b4c2",
  },

  tagContainer: {
    display: "flex",
    flexDirection: "row",
  },

  tag: {
    fontSize: 10,
    color: "#7785b5",
    padding: 4,
    backgroundColor: "#d9e3fd",
    borderRadius: 8,
  },
});
