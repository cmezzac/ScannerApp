import EditableRow from "@/components/EditableRow";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import Stepper from "@/components/progress_bar";
import { useRouter } from "expo-router";
import { useScannedPackages } from "@/context/scannedPackageContext";

export default function ReaderDetails() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const router = useRouter();
  const { currentPackage } = useScannedPackages();

  useEffect(() => {
    console.log("📦 useEffect fired");

    if (currentPackage) {
      console.log("✅ Tracking Number:", currentPackage.trackingNumber);
    } else {
      console.log("⛔ No current package available.");
    }
  }, [currentPackage]);

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton />
      <ScreenName title="Confirmation" isHeader />
      <View style={{ marginTop: -20, paddingHorizontal: 20 }}>
        <Stepper currentStep={2} />
      </View>

      <View style={styles.infoContainer}>
        <EditableRow
          title="Apartment Number"
          content={currentPackage?.apartment ?? ""}
        />
        <EditableRow title="Name" content={currentPackage?.name ?? ""} />
        <EditableRow
          title="Tracking Number"
          content={currentPackage?.trackingNumber ?? "N/A"}
        />
      </View>

      <View style={styles.urgentContainer}>
        <Text style={styles.urgentText}>Urgent</Text>
        <Switch
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/scanner")}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    margin: "5%",
  },
  urgentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    marginTop: 10,
  },
  urgentText: {
    fontSize: 22,
    fontWeight: "600",
  },
  buttonContainer: {
    backgroundColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "7%",
    height: "8%",
    borderRadius: 50,
    marginTop: "35%",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
});
