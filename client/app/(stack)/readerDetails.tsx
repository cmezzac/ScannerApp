import EditableRow from "@/components/EditableRow";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import Stepper from "@/components/progress_bar";

function edit(value: string) {
  console.log("Hello");
}

export default function ReaderDetails() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <SafeAreaView>
      <ReturnButton></ReturnButton>
      <ScreenName title="Confirmation" isHeader={true}></ScreenName>
      <View style={{ marginTop: -20, paddingHorizontal: 20 }}>
        <Stepper currentStep={2} />
      </View>

      <View style={styles.infoContainer}>
        <EditableRow
          title="Apartment Number"
          content="1506"
          onEdit={() => edit("1504")}
        />
        <EditableRow title="Name" content="Fiamma Saragosa" />
        <EditableRow title="Province" content="Quebec" />
        <EditableRow title="City" content="Montreal" />
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
        <TouchableOpacity>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    margin: "5%",
  },
  urgentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  urgentText: {
    fontSize: 22,
    fontWeight: "600",
  },
  buttonContainer: {
    backgroundColor: "#2C2C2C",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%",
    marginRight: "7%",
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
