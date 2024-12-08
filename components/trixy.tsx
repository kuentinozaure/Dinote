import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SIDE_PADDING = 30;
export default function Trixy() {
  const [expanded, setExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const screenWidth = Dimensions.get("window").width;

  const generateExpandedStyle = () => {
    return (
      expanded && {
        width: screenWidth - SIDE_PADDING * 2,
      }
    );
  };

  const onChangeText = (userTyping: string) => {
    setInputText(userTyping);
  };

  const onExpandButton = () => {
    setInputText("");
    setExpanded(!expanded);
  };

  const onSubmit = () => {
    // ask ai to do something
    console.log("Submit");
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      style={[styles.trixyContainer, generateExpandedStyle()]}
    >
      {expanded && (
        <View style={[styles.expandedContent]}>
          <TextInput
            placeholder="Ask me anything ..."
            onChangeText={(text) => onChangeText(text)}
            onSubmitEditing={() => onSubmit()}
          >
            {inputText}
          </TextInput>
        </View>
      )}

      <TouchableOpacity onPress={() => onExpandButton()}>
        <View style={[styles.trixy]}>
          <Text>🦖</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  trixyContainer: {
    // Positioning
    position: "absolute",
    zIndex: 1,
    bottom: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    // Size
    height: 60,
    width: 60,
    // Color and other styles
    backgroundColor: "#E5E5E5",
    borderWidth: 5,
    borderColor: "#393737",
    borderRadius: 50,
  },

  trixy: {
    padding: 16,
  },

  expandedContent: {
    maxWidth: "80%",
    padding: 16,
  },
});
