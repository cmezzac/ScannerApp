import { useEffect, useMemo, useState } from "react";
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
import { usePendingPackages } from "@/context/pendingPackageContext";
import { ApartmentSummary } from "@/types/types";
import { fetchPendingPackages } from "@/services/packageService";

const { width } = Dimensions.get("window");

export default function PendingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { allPackages, setSelectedApartment, setAllPackages } =
    usePendingPackages();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchPendingPackages();
        if (!response || response.length === 0) {
          console.warn("No packages received");
        } else {
          console.log(response);
          setAllPackages(response);
        }
      } catch (error) {
        console.error("Failed to fetch packages", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const packages: ApartmentSummary[] = useMemo(() => {
    return (
      allPackages?.map((apt) => ({
        apartmentNumber: apt.apartmentNumber,
        apartment: `Apartment ${apt.apartmentNumber}`,
        count: apt.packages.length,
      })) ?? []
    );
  }, [allPackages]);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      pkg.apartment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [packages, searchTerm]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.inner}>
        <ReturnButton />
        <ScreenName title="Pending Packages" isHeader={false} />

        <TextInput
          placeholder="Search for an Apartment"
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />

        <View style={styles.packageBox}>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Loading...
            </Text>
          ) : (
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
                    onPress={() => {
                      setSelectedApartment(item.apartmentNumber);
                      router.push("/(stack)/PendingPackageInfoPage");
                    }}
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
          )}
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
    height: width * 1.3,
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
