import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/context/autheticationContext";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!userId || !buildingId) {
      Alert.alert("Missing Fields", "Please enter all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://your-api.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, buildingId }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Login failed");
      }

      const { user, accessToken, refreshToken } = await response.json();
      await login(user, accessToken, refreshToken);
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Something went wrong.");
      console.error("🔴 Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Image
          source={require("../../assets/images/PacketoLogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={userId}
          onChangeText={setUserId}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Building ID"
          value={buildingId}
          onChangeText={setBuildingId}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#222",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
});
