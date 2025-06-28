import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import PackageItem from "@/components/PackageItemPending";

export default function PendingPackageInfoPage() {
  const demoPackages = [
    {
      title: "Package 1 - Purolator",
      name: "John Doe",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-01",
      urgent: true,
    },
    {
      title: "Package 2 - Amazon",
      name: "Jane Smith",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-03",
      urgent: false,
    },
    {
      title: "Package 3 - Fedex",
      name: "Bob Marley",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-05",
      urgent: true,
    },
    {
      title: "Package 4 - Other",
      name: "Alice Blue",
      imageUrl: "",
      scannedDate: "",
      urgent: false,
    },
  ];

  return (
    <SafeAreaView style={styles.bigContainer}>
      <ReturnButton />
      <ScreenName title="Pending" isHeader={false} />
      <View style={styles.scannedTextWrapper}>
        <Text style={styles.scannedText}>Packages</Text>
      </View>

      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {demoPackages.map((item, index) => (
          <PackageItem
            key={index}
            title={item.title}
            name={item.name}
            imageUrl={item.imageUrl}
            scannedDate={item.scannedDate}
            urgent={item.urgent}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    backgroundColor: "white",
    flex: 1,
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
  scrollArea: {
    paddingBottom: 24,
  },
  scrollPadding: {
    paddingHorizontal: 16,
  },
});
