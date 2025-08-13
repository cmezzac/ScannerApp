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
import ScreenContainer from "@/components/ScreenContainer";

export default function ReaderDetails() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((prev) => {
      const newValue = !prev;

      // If there's a current package, update its "urgent" field
      if (currentPackage) {
        setCurrentPackage({ ...currentPackage, urgent: newValue });
      }

      return newValue;
    });
  };

  const router = useRouter();
  const { currentPackage, addPackageToApartment, setCurrentPackage } =
    useScannedPackages();

  useEffect(() => {
    if (currentPackage) {
      setIsEnabled(currentPackage.urgent);
    }
  }, [currentPackage]);

  return (
    <ScreenContainer style={styles.container}>
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
        <TouchableOpacity
          onPress={() => {
            if (currentPackage) {
              addPackageToApartment(currentPackage.apartment, currentPackage);
              setCurrentPackage(null); // optional: clears it from context
            }
            router.push("/(tabs)/scanner"); // navigate after saving
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
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
