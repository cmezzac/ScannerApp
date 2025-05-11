import Card from "@/components/Card";
import { StyleSheet, SafeAreaView, View, Text, Platform } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PAKETO</Text>
      </View>
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>Home</Text>
      </View>
      <Card style={styles.cardStyle}>
        <Text>Hello</Text>
      </Card>
      <Card style={styles.cardStyle}>
        <Text>Hello</Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  homeContainer: {
    paddingLeft: "5%",
  },
  homeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  cardStyle: {
    height: "20%",
    margin: "5%",
    backgroundColor: "#fff",
    borderRadius: 12,

    // Cross-platform shadow
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
