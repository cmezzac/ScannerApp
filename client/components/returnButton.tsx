import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function ReturnButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={styles.button}>
      <Feather name="arrow-left" size={20} color="#007AFF" />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  text: {
    marginLeft: 6,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
