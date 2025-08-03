import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import PackageModal from "./DropDownModal";

import { ActivityIndicator } from "react-native";

const { width } = Dimensions.get("window");

import * as Haptics from "expo-haptics";

import { useRouter } from "expo-router";
import { useScannedPackages } from "@/context/scannedPackageContext";

import { notifyUsers } from "@/services/smsService";

import { useAuth } from "../context/autheticationContext";

export default function ScanPackageBox() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const { getAllTrackingNumbers } = useScannedPackages();

  const { accessToken } = useAuth();

  const router = useRouter();

  const handlePress = async () => {
    try {
      setLoading(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const trackingNumbers = getAllTrackingNumbers();
      console.log(trackingNumbers);
      await notifyUsers(trackingNumbers, accessToken);
      router.push("/(stack)/ConfirmationPage");
    } catch (err) {
      console.error("Failed to notify users:", err);
    } finally {
      setLoading(false);
    }
  };

  const [packages, setPackages] = useState<
    { apartment: string; count: number }[]
  >([]);

  const openModal = (apartment: string) => {
    setSelectedApartment(apartment);
    setIsModalVisible(true);
  };

  const { groupedPackages, getPackageSummary, addPackageToApartment } =
    useScannedPackages();

  useEffect(() => {
    const result = getPackageSummary();
    setPackages(result);
  }, [groupedPackages]);

  const isNotifyGreen = packages.length > 0;

  return (
    <View style={styles.box}>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={
          packages.length === 0 ? styles.emptyContainer : undefined
        }
        showsVerticalScrollIndicator={false}
      >
        {packages.length === 0 ? (
          <Text style={styles.emptyText}>No packages scanned</Text>
        ) : (
          packages.map((item, index) => (
            <View key={index} style={styles.packageRow}>
              <View>
                <Text style={styles.apartment}>{item.apartment}</Text>
                <Text style={styles.packageCount}>
                  {item.count} Package{item.count > 1 ? "s" : ""}
                </Text>
              </View>
              <TouchableOpacity onPress={() => openModal(item.apartment)}>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          disabled={!isNotifyGreen || loading}
          onPress={handlePress}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#4CD964" />
          ) : (
            <Text
              style={[
                styles.notify,
                { color: isNotifyGreen ? "#4CD964" : "#808080" },
              ]}
            >
              NOTIFY
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {selectedApartment && (
        <PackageModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          packages={groupedPackages[selectedApartment] || []}
          apartment={selectedApartment}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: "85%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: width * 0.04,
    paddingHorizontal: width * 0.06,
    backgroundColor: "#fff",
    maxHeight: width * 1.1,
    alignSelf: "center",
  },
  scrollArea: {
    maxHeight: width * 0.7,
    width: "100%",
  },
  packageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  apartment: {
    fontWeight: "600",
    fontSize: width * 0.045,
    color: "#000",
  },
  packageCount: {
    color: "#999",
    fontSize: width * 0.035,
    marginTop: 2,
  },
  viewText: {
    color: "#007aff",
    fontSize: width * 0.04,
    fontWeight: "500",
  },
  notify: {
    fontFamily: "Inter",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "600",
    fontSize: width * 0.045,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 150,
  },

  emptyText: {
    fontSize: 16,
    color: "#aaa",
    fontStyle: "italic",
  },
});
