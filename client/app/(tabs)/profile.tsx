import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useAuth } from "@/context/autheticationContext";
import ScreenContainer from "@/components/ScreenContainer";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) return null;

  return (
    <ScreenContainer style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Profile</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{user.buildingId.name}</Text>
          <Text style={styles.value}>{user.buildingId.adress}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Role:</Text>
          <Text style={styles.value}>{user.role.name}</Text>
        </View>

        <View style={styles.logoutButton}>
          <Button title="Log Out" onPress={handleLogout} color="#FF3B30" />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  infoBox: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  logoutButton: {
    marginTop: 40,
  },
});
