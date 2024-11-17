import AddNoteButton from "@/components/add-note-button";
import Avatar from "@/components/avatar";
import StarNote from "@/components/star-note";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const mockStarredNotes = [
  {
    title: "Math lesson of 12/04/2024",
    description: "The lesson talk about the Thales algorithm",
    tag: "#Lesson",
  },
  {
    title: "French lesson of 12/04/2024",
    description: "The lesson talk about the Molieres",
    tag: "#Lesson",
  },
  {
    title: "Paris trip for next summer",
    description: "Talk about your next trip in Paris",
    tag: "#Trip",
  },
  {
    title: "Montreal house renting market",
    description: "Talk about the renting market in Montreal",
    tag: "#Analysis",
  },
];
export default function Index() {
  const [starredNotes, setStarredNotes] = useState(mockStarredNotes);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>Home</Text>,
          headerRight: () => <Avatar name={"Quentin"} />,
        }}
      />

      <View style={styles.homePageContainer}>
        <Text>Starred Notes</Text>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollContainer}
          horizontal={true}
        >
          {starredNotes.map((note, index) => (
            <StarNote
              key={index}
              title={note.title}
              description={note.description}
              tag={note.tag}
            />
          ))}
        </ScrollView>
      </View>

      <AddNoteButton />
    </>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    margin: 16,
  },

  contentContainer: {
    padding: 16,
    gap: 8,
  },

  scrollContainer: {
    height: 0,
    maxHeight: 200,
  },
});
