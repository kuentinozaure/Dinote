import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AvatarProps {
  name: string | null;
}

export default function Avatar({ name }: AvatarProps) {
  const generateInitials = () => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <TouchableOpacity style={styles.avatar}>
      <Text>{generateInitials()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: "50%",
    backgroundColor: "#edf5fd",
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
