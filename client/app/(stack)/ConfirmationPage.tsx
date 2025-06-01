import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useRouter } from "expo-router";

const router = useRouter();

export default function AlertSentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts sent</Text>

      <View style={styles.circle}>
        <AntDesign name="check" size={40} color="white" />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4CD964",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2C2C2C",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
