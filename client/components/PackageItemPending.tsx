import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/Feather";
import { fetchPreSignedS3Photo } from "../services/imageService";

type PackageItemPendingProps = {
  title: string;
  name: string;
  imageUrl: string;
  scannedDate: string;
  urgent: boolean;
};

export default function PackageItemPending({
  title,
  name,
  imageUrl = "",
  scannedDate,
  urgent,
}: PackageItemPendingProps) {
  const [collapsed, setCollapsed] = useState(true);

  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      if (!imageUrl) return;

      try {
        const signed = await fetchPreSignedS3Photo(imageUrl);
        setSignedUrl(signed);
      } catch (err) {
        console.error("Failed to fetch signed URL:", err);
      }
    };

    fetchUrl();
  }, [imageUrl]);

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

          <Text style={styles.label}>Scanned Date</Text>
          <Text>{scannedDate}</Text>

          <Text style={styles.label}>Urgent</Text>
          <Text>{urgent ? "Yes" : "No"}</Text>

          {signedUrl ? (
            <Image source={{ uri: signedUrl }} style={styles.image} />
          ) : null}
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
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFD700", // Apple-style yellow
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    marginRight: 10,
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
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
