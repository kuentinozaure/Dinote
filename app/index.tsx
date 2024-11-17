import AddNoteButton from "@/components/add-note-button";
import Avatar from "@/components/avatar";
import StarNote from "@/components/star-note";
import { router, Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Note } from "./add-note";
import Button from "@/components/button";
import React from "react";

export default function Index() {
  const db = useSQLiteContext();
  const [starredNotes, setStarredNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNoteFromDb();

    // Optional: Cleanup function when the component unmounts
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const getNoteFromDb = async () => {
    try {
      const notes = await db.getAllAsync<Note>("SELECT * FROM note");
      console.log("notes", notes);
      setStarredNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  const onAddNewNote = () => {
    router.push("./add-note", { relativeToDirectory: false });
  };

  const calculateDate = (timeStamp: number) => {
    const date = new Date(timeStamp);

    const day = date.getDate();
    // Month in letter
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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

        {starredNotes.map((note, index) => (
          <TouchableOpacity style={styles.noteContainer}>
            <View style={styles.dateAndTagContainer}>
              <Text style={styles.dateText}>
                {calculateDate(note.timeStamp)}
              </Text>
              <Text style={styles.tagText}>{note.tag}</Text>
            </View>
            <Text style={styles.titleText}>{note.title}</Text>
            <Text style={styles.descriptionText}>{note.description} </Text>
          </TouchableOpacity>
        ))}
      </View>

      <AddNoteButton plusButtonClicked={onAddNewNote} />
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

  noteContainer: {
    backgroundColor: "#f5f7fb",
    borderRadius: 8,
    padding: 16,
    flexDirection: "column",
    gap: 4,
  },

  dateAndTagContainer: {
    flexDirection: "row",
    gap: 8,
    // justifyContent: "space-between",
    alignItems: "center",
  },

  dateText: {
    color: "#cbcfd3",
    fontSize: 10,
  },

  tagText: {
    padding: 4,
    borderRadius: 4,
    color: "#ffffff",
    backgroundColor: "#7c70fc",
    fontSize: 10,
  },

  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333539",
  },

  descriptionText: {
    color: "#a5acac",
    fontSize: 12,
  },
});
