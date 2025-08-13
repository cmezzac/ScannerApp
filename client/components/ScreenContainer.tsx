import React from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  style?: object;
  barStyle?: "dark-content" | "light-content";
};

export default function ScreenContainer({
  children,
  style,
  barStyle = "dark-content",
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + (Platform.OS === "android" ? 20 : 0),
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
