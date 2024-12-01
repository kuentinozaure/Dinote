import Avatar from "@/components/avatar";
import { Stack } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Note } from "./add-note";
import React from "react";
import Chip from "@/components/chip";
import Dinote from "@/components/dinote";

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

  const getNoteFromDb = async () => {
    try {
      const notes = await db.getAllAsync<Note>(
        `SELECT *
        FROM note
        ORDER BY timeStamp DESC`
      );
      console.log(notes);
      setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  };

  const calculateDate = (timeStamp: number) => {
    const date = new Date(timeStamp);

    const day = date.getDate();
    // Month in letter
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderDinotesInGridOrSeparator = () => {
    if (notes.length === 0) {
      return <Text>No notes found</Text>;
    }

    return notes.map((note, index) => (
      <Dinote key={index} isSeparatorNote={index % 5 === 0} note={note} />
    ));
  };

  return (
    <SafeAreaView style={styles.homePageContainer}>
      <Text style={styles.title}>Dinotes</Text>

      <View style={styles.tagFilterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Chip title={"All Notes"} infoElement={0} />
          <Chip title={"#Productivity"} infoElement={0} />
          <Chip title={"#Personal"} infoElement={0} />
          <Chip title={"#Java"} infoElement={0} />
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
      >
        {renderDinotesInGridOrSeparator()}
      </ScrollView>

      {/* <Stack.Screen /> */}

      {/* <ScrollView style={styles.homePageContainer}> */}
      {/* <Text>Your 5 latest notes :</Text> */}

      {/* <ScrollView
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
        </ScrollView> */}

      {/* {starredNotes.map((note, index) => (
        <TouchableOpacity style={styles.noteContainer}>
          <View style={styles.dateAndTagContainer}>
            <Text style={styles.dateText}>{calculateDate(note.timeStamp)}</Text>
            <Text style={styles.tagText}>{note.tag}</Text>
          </View>
          <Text style={styles.titleText}>{note.title}</Text>
          {/* <Text style={styles.descriptionText}>{note.description} </Text> */}
      {/* </TouchableOpacity> */}
      {/* ))} */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    margin: 16,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FEFEFE",
    marginBottom: 16,
  },

  tagFilterContainer: {
    height: 50,
  },

  scrollContent: {
    flexDirection: "row",
    gap: 8,
  },

  gridContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: 16,
    // justifyContent: "space-between",
  },

  // contentContainer: {
  //   padding: 16,
  //   gap: 8,
  // },

  // scrollContainer: {
  //   height: 0,
  //   maxHeight: 200,
  // },

  // noteContainer: {
  //   backgroundColor: "#f5f7fb",
  //   borderRadius: 8,
  //   padding: 16,
  //   flexDirection: "column",
  //   gap: 4,
  // },

  // dateAndTagContainer: {
  //   flexDirection: "row",
  //   gap: 8,
  //   // justifyContent: "space-between",
  //   alignItems: "center",
  // },

  // dateText: {
  //   color: "#cbcfd3",
  //   fontSize: 10,
  // },

  // tagText: {
  //   padding: 4,
  //   borderRadius: 4,
  //   color: "#ffffff",
  //   backgroundColor: "#7c70fc",
  //   fontSize: 10,
  // },

  // titleText: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "#333539",
  // },

  // descriptionText: {
  //   color: "#a5acac",
  //   fontSize: 12,
  // },
});
