import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import PackageModal from "./DropDownModal";

const { width } = Dimensions.get("window");

import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

const packages = [
  { apartment: "Apartment 900", count: 1 },
  { apartment: "Apartment 2000", count: 2 },
  { apartment: "Apartment 2060", count: 1 },
];

const isNotifyGreen = packages.length > 0;
import { useRouter } from "expo-router";

const router = useRouter();

const examplePackages = [
  {
    title: "Package 1 - Purolator",
    name: "Fiamma Saragosa",
    urgent: false,
    imageUrl: "https://i.imgur.com/5Q7Yz5y.jpg",
  },
  {
    title: "Package 2 - Canada Post",
    name: "Fiamma Saragosa",
    urgent: true,
    imageUrl: "https://i.imgur.com/UYiroysl.jpg",
  },
];

const handlePress = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

  const { sound } = await Audio.Sound.createAsync(
    require("../assets/NotifySucess.mp3")
  );
  await sound.playAsync();
  router.push("/(stack)/ConfirmationPage");
};

export default function ScanPackageBox() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible((prev) => !prev);

  return (
    <View style={styles.box}>
      <ScrollView style={styles.scrollArea}>
        {packages.map((item, index) => (
          <View key={index} style={styles.packageRow}>
            <View>
              <Text style={styles.apartment}>{item.apartment}</Text>
              <Text style={styles.packageCount}>
                {item.count} Package{item.count > 1 ? "s" : ""}
              </Text>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          disabled={!isNotifyGreen}
          onPress={() => {
            handlePress();
          }}
        >
          <Text
            style={[
              styles.notify,
              { color: isNotifyGreen ? "#4CD964" : "#808080" },
            ]}
          >
            NOTIFY
          </Text>
        </TouchableOpacity>
      </View>
      <PackageModal
        packages={examplePackages}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
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
    justifyContent: "flex-end", // ⬅️ Pushes modal to bottom
    margin: 0,
  },
});
