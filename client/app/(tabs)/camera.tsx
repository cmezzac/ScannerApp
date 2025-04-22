import CameraComponent from "@/components/camera_component";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Camera() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Capture Label</Text>
      <CameraComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 0,
    color: "#000",
    borderWidth: 2,
    padding: 8,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#B8B8B8",
  },
});
