import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";

const { width } = Dimensions.get("window");
const router = useRouter();

const packages = [
  { apartment: "Apartment 200", count: 4 },
  { apartment: "Apartment 900", count: 1 },
  { apartment: "Apartment 1000", count: 4 },
  { apartment: "Apartment 1230", count: 4 },
  { apartment: "Apartment 1456", count: 0 },
  { apartment: "Apartment 1456", count: 0 },
  { apartment: "Apartment 1456", count: 0 },
  { apartment: "Apartment 1456", count: 0 },
];

export default function ConfirmedPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = packages.filter((pkg) =>
    pkg.apartment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.inner}>
        <ReturnButton />
        <ScreenName title="Confirmed Packages" isHeader={false} />

        <TextInput
          placeholder="Search for an apartment"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />

        <View style={styles.packageBox}>
          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={false}
          >
            {filteredPackages.map((item, index) => (
              <View key={index} style={styles.packageRow}>
                <View>
                  <Text style={styles.apartment}>{item.apartment}</Text>
                  <Text style={styles.packageCount}>
                    {item.count === 0
                      ? "No packages"
                      : `${item.count} package${item.count > 1 ? "s" : ""}`}
                  </Text>
                </View>
                <TouchableOpacity
                  disabled={item.count === 0}
                  onPress={() =>
                    item.count > 0 &&
                    router.push(
                      `/(stack)/PackageInfoPage?apartment=${encodeURIComponent(
                        item.apartment
                      )}`
                    )
                  }
                >
                  <Text
                    style={[
                      styles.viewText,
                      item.count === 0 && styles.disabledViewText,
                    ]}
                  >
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchInput: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 12,
    marginBottom: 16,
  },
  packageBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    height: width * 1.4,
    overflow: "hidden",
  },
  scrollArea: {
    flexGrow: 1,
    width: "100%",
  },
  packageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  apartment: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  packageCount: {
    color: "#999",
    fontSize: 14,
    marginTop: 4,
  },
  viewText: {
    color: "#007aff",
    fontSize: 15,
    fontWeight: "500",
  },
  disabledViewText: {
    color: "#ccc",
  },
});
