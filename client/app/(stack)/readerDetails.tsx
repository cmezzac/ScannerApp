import EditableRow from "@/components/EditableRow";
import ReturnButton from "@/components/returnButton";
import ScreenName from "@/components/screenName";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function edit(value: string) {
  console.log("Hello");
}

export default function ReaderDetails() {
  return (
    <SafeAreaView>
      <ReturnButton></ReturnButton>
      <View style={styles.header}>
        <ScreenName title="Edit Package" isHeader={false}></ScreenName>
        <View style={styles.deleteWrapper}>
          <TouchableOpacity>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <EditableRow
          title="Apartment Number"
          content="1506"
          onEdit={() => edit("1504")}
        />
        <EditableRow title="Name" content="Fiamma Saragosa" />
        <EditableRow title="Province" content="Quebec" />
        <EditableRow title="City" content="Montreal" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  deleteText: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "black",
  },
  deleteWrapper: {
    paddingTop: "5%",
    paddingRight: "7%",
  },
  infoContainer: {
    margin: "5%",
  },
});
