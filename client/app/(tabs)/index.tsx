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
import PendingPage from "../(stack)/pendingPage";

export default function HomeScreen() {
  const packageCount = 10;
  const pendingCount = 4;

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <PacketoHeader></PacketoHeader>
      <ScreenName title="Home" isHeader={true}></ScreenName>
      <Card style={styles.card1Style}>
        <Text style={styles.cardHeaderText}>Packages scanned today </Text>
        <Text style={styles.countText}>{packageCount}</Text>
      </Card>
      <Card style={styles.card2Style}>
        <Text style={styles.cardHeaderText}>Pending Packages</Text>
        <Text style={styles.countText}>{pendingCount}</Text>
        <TouchableOpacity
          onPress={() => {
            router.push("/(stack)/pendingPage");
          }}
        >
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
  card1Style: {
    height: "18%",
    margin: "5%",
    backgroundColor: "#fff",
    borderRadius: 12,
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
});
