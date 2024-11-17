import { Stack } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { pickSingle } from "react-native-document-picker";

export default function AddNotePage() {
  const onClick = async () => {
    console.log(FileSystem.documentDirectory);

    const dir = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory || ""
    );
    console.log(dir);

    const data = await pickSingle({
      allowMultiSelection: false,
    });
    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>Home</Text>,
        }}
      />

      <View style={styles.container}>
        <Text>🦖</Text>

        <Button title="Click" onPress={() => onClick()}></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
