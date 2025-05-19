// components/EditableRow.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type EditableRowProps = {
  title: string;
  content: string;
  onEdit?: () => void;
};

export default function EditableRow({
  title,
  content,
  onEdit,
}: EditableRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
      <TouchableOpacity onPress={onEdit}>
        <Text style={styles.editText}>edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  content: {
    fontSize: 18,
    marginTop: 2,
  },
  editText: {
    color: "#007AFF",
    fontWeight: "500",
    fontSize: 16,
  },
});
