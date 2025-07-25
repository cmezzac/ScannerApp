import Card from "@/components/Card";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PacketoHeader from "@/components/PacketoHeader";
import ScreenName from "@/components/screenName";

export default function HomeScreen() {
  const packageCount = 10;
  const pendingCount = 4;

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <PacketoHeader></PacketoHeader>
      <ScreenName title="Home" isHeader={true}></ScreenName>
      <Card style={styles.card2Style}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(stack)/confirmedPage");
          }}
        >
          <View style={styles.headerWithLight}>
            <Text style={styles.cardHeaderText}>Confirmed Packages</Text>
            <View style={styles.greenLight} />
          </View>
          <Text style={styles.countText}>{packageCount}</Text>
          <View style={styles.viewPendingRow}>
            <Text style={styles.viewPendingText}>View confirmed packages</Text>
            <Feather name="chevron-right" size={20} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </Card>
      <Card style={styles.card2Style}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(stack)/pendingPage");
          }}
        >
          <View style={styles.headerWithLight}>
            <Text style={styles.cardHeaderText}>Pending Packages</Text>
            <View style={styles.yellowLight} />
          </View>
          <Text style={styles.countText}>{pendingCount}</Text>

          <View style={styles.viewPendingRow}>
            <Text style={styles.viewPendingText}>View pending packages</Text>
            <Feather name="chevron-right" size={20} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  card2Style: {
    height: "20%",
    margin: "5%",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  cardHeaderText: {
    fontFamily: "Inter",
    fontSize: 24,
    fontWeight: "600",
  },
  countText: {
    fontFamily: "Inter",
    fontSize: 30,
    fontWeight: "600",
    marginTop: "6%",
  },
  viewPendingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  viewPendingText: {
    fontSize: 14,
    color: "#007AFF",
    marginRight: 4,
  },
  scanButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 50,
    width: "70%",
    height: 60,
    marginTop: "30%",
  },
  headerWithLight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  greenLight: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CD964", // Apple-style green
    shadowColor: "#4CD964",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  yellowLight: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFD60A", // Clean yellow
    shadowColor: "#FFD60A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
  },
});
