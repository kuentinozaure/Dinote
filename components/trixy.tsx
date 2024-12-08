import { Feather } from "@expo/vector-icons";
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

interface TrixyProps {
  onUserPromptSubmitted?(userPrompt: string): void;
  processingState?: string;
}

export default function Trixy({
  onUserPromptSubmitted,
  processingState,
}: TrixyProps) {
  const [expanded, setExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const screenWidth = Dimensions.get("window").width;

  const generateExpandedStyle = () => {
    return (
      expanded && {
        width: screenWidth - SIDE_PADDING * 2,
        ...styles.trixyContainerExpanded,
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

  const onSendButton = async () => {
    if (!onUserPromptSubmitted) {
      return;
    }
    onUserPromptSubmitted(inputText);
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={[styles.trixyContainer, generateExpandedStyle()]}
    >
      {expanded && (
        <View style={[styles.expandedContent]}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ask me anything ..."
              onChangeText={(text) => onChangeText(text)}
              style={styles.input}
              inputMode="text"
              enterKeyHint="send"
              multiline
            >
              {inputText}
            </TextInput>
            <TouchableOpacity
              style={styles.sendIcon}
              onPress={() => onSendButton()}
            >
              <Feather name="send" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {processingState && processingState.length > 0 && (
            <Text>{processingState} </Text>
          )}
        </View>
      )}

      {!expanded && (
        <TouchableOpacity onPress={() => onExpandButton()}>
          <View style={[styles.trixy]}>
            <Text>🦖</Text>
          </View>
        </TouchableOpacity>
      )}
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

  trixyContainerExpanded: {
    height: 150,
    padding: 8,
  },

  trixy: {
    padding: 16,
  },

  expandedContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    maxWidth: "100%",
    padding: 16,
  },

  inputContainer: {
    flexDirection: "row",
  },

  sendIcon: {
    minWidth: "20%",
    maxWidth: "20%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    minWidth: "80%",
    maxWidth: "80%",
    height: "auto",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
  },

  informationContainer: {
    color: "#262626",
  },
});
