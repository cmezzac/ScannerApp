import { View, Text, StyleSheet } from "react-native";

type ScreenNameProp = {
  title: string;
  isHeader: boolean;
};

export default function ScreenName({ title, isHeader }: ScreenNameProp) {
  return (
    <View
      style={isHeader ? styles.containerDefault : styles.containerWithOutHeader}
    >
      <Text style={styles.homeText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerDefault: {
    paddingLeft: "5%",
  },
  containerWithOutHeader: {
    marginTop: "3%",
    paddingLeft: "5%",
  },
  homeText: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
});
