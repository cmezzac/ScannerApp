// app/PackageInfoPage.tsx
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import PackageItem from "@/components/PackageItemConfirmation";
import { useConfirmedPackages } from "@/context/confirmedPackageContext";
import { useState } from "react";
import { image1, image2, image3, image4 } from "@/constants";

export default function PackageInfoPage() {
  const { selectedConfirmedApartment, allConfirmedPackages } =
    useConfirmedPackages();

  const apartmentData = allConfirmedPackages?.find(
    (apt) => apt.apartmentNumber === selectedConfirmedApartment
  );

  const imageArray: string[] = [image1, image2, image3, image4];
  const base64Image = imageArray[Math.floor(Math.random() * imageArray.length)];

  const packages = apartmentData?.packages || [];

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
        {packages.map((item, index) => (
          <PackageItem
            key={index}
            title={`#${item.trackingNumber} - ${item.courrier}`}
            name={item.name}
            imageUrl={
              item.photo
                ? `data:image/${item.photo.startsWith("iVBORw0KGgo") ? "png" : "jpeg"};base64,${item.photo}`
                : base64Image
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
            confirmedDate={new Date(item.confirmedDate).toLocaleString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }
            )}
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
