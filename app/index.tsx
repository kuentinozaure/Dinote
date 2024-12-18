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
import NoDinote from "@/components/no-dinote";
import { getSalutation } from "@/helpers/salutation.helper";

export default function Index() {
  const db = useSQLiteContext();
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [getTags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [selectedTag, setSelectedTag] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      getTagsFromDb();
      getNoteFromDb();
    };
    fetchData();

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

  const onDinotePress = (note: Note) => {
    router.push(
      {
        pathname: `/note/[id]`,
        params: { note: JSON.stringify(note), id: note.id },
      },
      { relativeToDirectory: false }
    );
  };

  const renderDinotesInGridOrSeparator = () => {
    if (notes.length === 0) {
      return (
        <View>
          <NoDinote />
        </View>
      );
    }

    return notes.map((note, index) => (
      <Dinote
        key={index}
        isSeparatorNote={index % 5 === 0}
        note={note}
        onDinotePress={() => onDinotePress(note)}
      />
    ));
  };

  const addNoteButtonClicked = () => {
    router.push("./create-note", { relativeToDirectory: false });
  };

  const onChipPress = async (index: number) => {
    // If the same tag is selected,not equal to all note
    // reset the selected tag and get all notes
    if (index === selectedTag && index !== -1) {
      setSelectedTag(-1);
      getNoteFromDb();
      return;
    }

    // If the all notes tag is already selected, and user clicks on all notes tag
    // do nothing
    if (index === selectedTag) {
      return;
    }

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
      <Text style={styles.title}>{getSalutation()}</Text>

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
        contentContainerStyle={[
          styles.dinotesScrollContainer,
          notes.length > 0 && styles.gridContainer,
        ]}
      >
        {renderDinotesInGridOrSeparator()}
      </ScrollView>

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

  dinotesScrollContainer: {
    width: "100%",
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
});
