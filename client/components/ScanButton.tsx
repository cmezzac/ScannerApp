import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/boiler_plate_components/ui/IconSymbol";

export default function ScanButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/(stack)/camera");
      }}
    >
      <View style={styles.container}>
        <View style={styles.scannerSymbol}>
          <IconSymbol name="barcode.viewfinder" size={28} color="white" />
        </View>
        <Text style={styles.textStyle}>SCAN</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  scannerSymbol: {
    marginRight: "5%",
  },
});
