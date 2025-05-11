import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";

export default function ScanButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/(stack)/camera");
      }}
    >
      <View style={styles.container}>
        <Text style={styles.textStyle}>SCAN</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  textStyle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
