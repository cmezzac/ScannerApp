import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import PackageItem from "@/components/PackageItemPending";
import { usePendingPackages } from "@/context/pendingPackageContext";
import { image1, image2, image3, image4 } from "@/constants";

export default function PendingPackageInfoPage() {
  const { selectedApartment, allPackages } = usePendingPackages();

  const imageArray: string[] = [image1, image2, image3, image4];
  const base64Image = imageArray[Math.floor(Math.random() * imageArray.length)];

  if (!allPackages) {
    return (
      <SafeAreaView style={styles.bigContainer}>
        <ReturnButton />
        <ScreenName title="Pending" isHeader={false} />
        <Text style={{ padding: 20 }}>Loading packages...</Text>
      </SafeAreaView>
    );
  }

  const apartmentData = allPackages.find(
    (apt) => apt.apartmentNumber === selectedApartment
  );

  if (!apartmentData) {
    return (
      <SafeAreaView style={styles.bigContainer}>
        <ReturnButton />
        <ScreenName title="Pending" isHeader={false} />
        <Text style={{ padding: 20 }}>
          No packages found for this apartment.
        </Text>
      </SafeAreaView>
    );
  }

  const packages = apartmentData?.packages || [];

  console.log(packages);

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
        {packages.map((item, index) => (
          <PackageItem
            key={index}
            title={`#${item.trackingNumber} - ${item.courrier}`}
            name={item.name}
            imageUrl={
              item.photo ? `data:image/jpeg;base64,${item.photo}` : base64Image
            }
            scannedDate={new Date(item.scannedDate).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
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
