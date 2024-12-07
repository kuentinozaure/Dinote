import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AddButtonProps {
  buttonClick(): void;
  text: string;
}

export default function Button({ buttonClick, text }: AddButtonProps) {
  const onPressButton = () => {
    buttonClick();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => onPressButton()}>
      <View>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  buttonText: {
    fontSize: 12,
    color: "#ffffff",
  },
});
