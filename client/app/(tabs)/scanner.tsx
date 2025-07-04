import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenName from "@/components/screenName";
import ScanPackageBox from "@/components/scanPackageBox";
import ScanButton from "@/components/ScanButton";
import { useRouter } from "expo-router";

export default function ScannerPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.bigContainer}>
      <ScreenName title="Scan Packages" isHeader={false} />
      <View style={styles.scannedTextWrapper}>
        <Text style={styles.scannedText}>Scanned</Text>
      </View>

      {/* Flex row for package box */}
      <View style={styles.contentWrapper}>
        <ScanPackageBox />
      </View>

      {/* Scan Button pinned at bottom */}
      <TouchableOpacity
        style={styles.scanButtonContainer}
        onPress={() => router.push("/(stack)/camera")}
      >
        <ScanButton />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between", // space out content and scan button
  },
  scannedTextWrapper: {
    paddingLeft: "8%",
    paddingTop: "10%",
    paddingBottom: "5%",
  },
  scannedText: {
    fontSize: 24,
    fontWeight: "600",
  },
  contentWrapper: {
    flex: 1,
    alignItems: "center",
  },
  scanButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 50,
    width: "70%",
    height: "8%",
    marginBottom: "30%",
  },
});
