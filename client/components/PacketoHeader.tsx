import { View, StyleSheet, Text } from "react-native";

export default function PacketoHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>PAKETO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: "5%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
});
