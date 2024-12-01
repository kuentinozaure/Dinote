import { Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Note } from "./add-note";

export default function Index() {
  const db = useSQLiteContext();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getNoteFromDb();

    // Optional: Cleanup function when the component unmounts
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const calculateDate = (timeStamp: number) => {
    const date = new Date(timeStamp);

    const day = date.getDate();
    // Month in letter
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getNoteFromDb = async () => {
    try {
      const notes = await db.getAllAsync<Note>(
        `SELECT *
        FROM note
        ORDER BY timeStamp, title DESC`
      );
      console.log("notes", notes);
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: (props) => <Text>Document library</Text>,
        }}
      />

      {notes.map((note, index) => (
        <TouchableOpacity style={styles.noteContainer}>
          <View style={styles.dateAndTagContainer}>
            <Text style={styles.dateText}>{calculateDate(note.timeStamp)}</Text>
            <Text style={styles.tagText}>{note.tag}</Text>
          </View>
          <Text style={styles.titleText}>{note.title}</Text>
          {/* <Text style={styles.descriptionText}>{note.description} </Text> */}
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
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
