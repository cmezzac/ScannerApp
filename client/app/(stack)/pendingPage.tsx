import PacketoHeader from "@/components/PacketoHeader";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import { Stack } from "expo-router";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function PendingPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ReturnButton></ReturnButton>
      <ScreenName title="Pending Packages" isHeader={false}></ScreenName>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
