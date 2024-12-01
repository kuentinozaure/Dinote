import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Chip from "@/components/chip";
import Dinote from "@/components/dinote";
import AddButton from "@/components/add-button";
import { Note } from "@/interfaces/note";
import {
  getNotesByTagNameFromDB,
  getNotesFromDB,
  getTagsFromDB,
} from "@/db/getter";

export default function Index() {
  const db = useSQLiteContext();
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [getTags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [selectedTag, setSelectedTag] = useState<number>(-1);

  useEffect(() => {
    getTagsFromDb();
    getNoteFromDb();

    // Optional: Cleanup function when the component unmounts
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  const getNoteFromDb = async () => {
    const notes = await getNotesFromDB(db);
    setNotes(notes);
    setAllNotes(notes); // Save all notes to keep a reference
  };

  const getTagsFromDb = async () => {
    setTags(await getTagsFromDB(db));
  };

  const renderDinotesInGridOrSeparator = () => {
    if (notes.length === 0) {
      return <Text>No notes found</Text>;
    }

    return notes.map((note, index) => (
      <Dinote key={index} isSeparatorNote={index % 5 === 0} note={note} />
    ));
  };

  const addNoteButtonClicked = () => {
    router.push("./add-note", { relativeToDirectory: false });
  };

  const onChipPress = async (index: number) => {
    setSelectedTag(index);
    if (index === -1) {
      getNoteFromDb();
    } else {
      const notes = await getNotesByTagNameFromDB(db, getTags[index].tag);
      setNotes(notes);
    }
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
          <Chip
            title={"All Notes"}
            infoElement={allNotes.length}
            key={-1}
            onChipPress={() => onChipPress(-1)}
            isActive={selectedTag === -1}
          />
          {getTags.map((item, index) => (
            <Chip
              title={item.tag}
              key={index}
              infoElement={item.count}
              onChipPress={() => onChipPress(index)}
              isActive={selectedTag === index}
            />
          ))}
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
      <AddButton buttonClick={() => addNoteButtonClicked()} />
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
    gap: 8,
    justifyContent: "space-between",
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
