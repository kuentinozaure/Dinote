import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChipProps {
  title: string | null;
  infoElement: number | string | null;
  isActive: boolean;
  customBackground?: string;
}
export default function Chip({
  title,
  infoElement,
  isActive,
  customBackground,
}: ChipProps) {
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        styles.tagFilter,
        isActive ? styles.tagFilterActive : styles.tagFilterInactive,
        customBackground && { backgroundColor: customBackground },
      ]}
    >
      <Text style={isActive ? styles.tagTextActive : styles.tagTextInactive}>
        {title}
      </Text>
      {infoElement && (
        <View
          style={[
            styles.numberFilter,
            isActive ? styles.numberFilterActive : styles.numberFilterInactive,
          ]}
        >
          <Text
            style={
              isActive ? styles.numberActiveText : styles.numberInactiveText
            }
          >
            {infoElement}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagFilter: {
    borderRadius: 100,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    padding: 8,
    height: 40,
  },

  tagFilterActive: {
    backgroundColor: "#FEFEFE",
  },

  tagFilterInactive: {
    backgroundColor: "#1b1b1b",
  },

  tagTextActive: {
    color: "#010101",
  },

  tagTextInactive: {
    color: "#E5E5E5",
  },

  numberFilter: {
    borderRadius: "50%",
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  numberFilterActive: {
    backgroundColor: "#e2e2e2",
  },

  numberFilterInactive: {
    backgroundColor: "#393737",
  },

  numberActiveText: {
    color: "#010101",
  },

  numberInactiveText: {
    color: "#E5E5E5",
  },
});
