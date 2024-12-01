import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface AddButtonProps {
  buttonClick(): void;
}

export default function AddButton({ buttonClick }: AddButtonProps) {
  const onPressButton = () => {
    buttonClick();
  };

  return (
    <TouchableOpacity onPress={() => onPressButton()}>
      <View style={styles.addNoteButton}>
        <FontAwesome name="plus" size={15} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addNoteButton: {
    height: 60,
    width: 60,
    backgroundColor: "#FE6902",
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    bottom: "0%",
    left: "50%",
    borderWidth: 5,
    borderColor: "#1b1b1b",
    transform: [{ translateX: -30 }],
  },
});
