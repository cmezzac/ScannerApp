import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ConfirmedPage() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ReturnButton></ReturnButton>
      <ScreenName title="Confirmed Packages" isHeader={false}></ScreenName>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
