import { Image, StyleSheet, Text, View } from "react-native";

export default function NoDinote() {
  return (
    <View style={styles.noDinoteContainer}>
      <Image
        style={styles.sadDinote}
        source={require("../assets/images/sad_dinote.png")}
      ></Image>
      <Text style={styles.noDataText}>No Dinote found...</Text>
      <Text style={styles.noDataText}>
        Add a new Dinote by clicking the "+" button below.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noDinoteContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 300,
    width: "100%",
    backgroundColor: "#fe6902",
    padding: 16,
    gap: 16,
  },

  sadDinote: {
    width: "50%",
    height: "50%",
  },

  noDataText: {
    fontSize: 16,
    color: "#FEFEFE",
    fontWeight: "bold",
    textAlign: "center",
  },
});
