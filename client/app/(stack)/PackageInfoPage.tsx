// app/PackageInfoPage.tsx
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import PackageItem from "@/components/PackageItemConfirmation";

export default function PackageInfoPage() {
  const demoPackages = [
    {
      title: "Package 1 - Purolator",
      name: "John Doe",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-01",
      confirmedDate: "2024-06-02",
    },
    {
      title: "Package 2 - Amazon",
      name: "Jane Smith",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-03",
      confirmedDate: "2024-06-03",
    },
    {
      title: "Package 3 - Fedex",
      name: "Bob Marley",
      imageUrl: "https://via.placeholder.com/150",
      scannedDate: "2024-06-05",
      confirmedDate: "2024-06-06",
    },
    {
      title: "Package 4 - Other",
      name: "Alice Blue",
      imageUrl: "",
      scannedDate: "",
      confirmedDate: "",
    },
  ];

  return (
    <SafeAreaView style={styles.bigContainer}>
      <ReturnButton />
      <ScreenName title="Confirmed" isHeader={false} />
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
            confirmedDate={item.confirmedDate}
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
  scanButtonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 50,
    width: "70%",
    height: 60,
    marginTop: "40%",
  },
  scrollArea: {
    paddingBottom: 24,
  },
  scrollPadding: {
    paddingHorizontal: 16,
  },
});
