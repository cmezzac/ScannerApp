import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="camera" options={{ headerShown: false }} />{" "}
      <Stack.Screen name="readerDetails" options={{ headerShown: false }} />
    </Stack>
  );
}
