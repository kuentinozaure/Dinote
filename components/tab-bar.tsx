import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const onPressAddNote = () => {
    navigation.navigate("add-note");
  };

  const onPressHome = () => {
    navigation.navigate("index");
  };

  const onPressNoteLibrary = () => {
    navigation.navigate("note-library");
  };
  return (
    <View style={styles.tabBar}>
      <TouchableWithoutFeedback onPress={() => onPressHome()}>
        <View>
          <FontAwesome size={28} name="home" />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onPressAddNote()}>
        <View style={styles.addNote}>
          <FontAwesome size={28} name="plus" />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onPressNoteLibrary()}>
        <View>
          <FontAwesome size={28} name="book" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },

  addNote: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -25 }],
    top: -20,
    borderRadius: 50,
    backgroundColor: "#7c70fc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
  },
});
