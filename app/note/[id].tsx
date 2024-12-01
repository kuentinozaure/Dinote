import { router, useGlobalSearchParams } from "expo-router";

import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Note } from "../../interfaces/note";
import { Feather } from "@expo/vector-icons";

export default function Page() {
  const note: Note = JSON.parse(useGlobalSearchParams().note as string) as Note;

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <Feather
        name="arrow-left"
        size={24}
        color="white"
        onPress={() => goBack()}
      />
      <Text style={styles.test}>Blog post: {note.description}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  test: {
    color: "red",
  },
});
