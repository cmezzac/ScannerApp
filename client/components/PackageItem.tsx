import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Feather";
type PackageItemProps = {
  title: string;
  name: string;
  urgent: boolean;
  imageUrl: string;
};

export default function PackageItem({
  title,
  name,
  urgent,
  imageUrl,
}: PackageItemProps) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => setCollapsed(!collapsed);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.header}>
        <View style={styles.radioCircle} />
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={collapsed ? "chevron-down" : "chevron-up"}
          size={20}
          color="#666"
        />
      </TouchableOpacity>

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
  arrow: {
    fontSize: 18,
    color: "#666",
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
    height: "70%",
    marginTop: 10,
    borderRadius: 8,
  },
});
