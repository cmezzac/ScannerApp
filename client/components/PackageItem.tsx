import { useScannedPackages } from "@/context/scannedPackageContext";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Feather";

type PackageItemProps = {
  title: string;
  name: string;
  urgent: boolean;
  imageUrl: string;
  apartment: string;
  trackingNumber: string;
  onDelete?: () => void;
};

export default function PackageItem({
  title,
  name,
  urgent,
  imageUrl,
  apartment,
  trackingNumber,
  onDelete,
}: PackageItemProps) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => setCollapsed(!collapsed);

  const { removePackagesFromApartment, removeSinglePackage } =
    useScannedPackages();

  const confirmDelete = () => {
    console.log("trying to delete: ", trackingNumber);
    Alert.alert("Delete Packages", `Are you sure you want to this package?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeSinglePackage(apartment, trackingNumber),
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleExpanded} style={styles.headerContent}>
          <View style={styles.radioCircle} />
          <Text style={styles.title}>{title}</Text>
          <Icon
            name={collapsed ? "chevron-down" : "chevron-up"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
          <Icon name="trash-2" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <Collapsible collapsed={collapsed}>
        <View style={styles.body}>
          <Text style={styles.label}>Name</Text>
          <Text>{name}</Text>
          <Text style={styles.label}>Urgent</Text>
          <Text>{urgent ? "Yes" : "No"}</Text>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageUrl}` }}
            style={styles.image}
          />
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: "10%",
    paddingHorizontal: 16,
    marginBottom: "4%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  body: {
    marginTop: 12,
  },
  label: {
    fontWeight: "bold",
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});
