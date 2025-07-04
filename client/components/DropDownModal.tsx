import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import PackageItem from "../components/PackageItem";

type PackageInfo = {
  title: string;
  name: string;
  urgent: boolean;
  imageUrl: string;
};

type PackageModalProps = {
  isVisible: boolean;
  onClose: () => void;
  packages: PackageInfo[];
  apartment: string;
};

export default function PackageModal({
  isVisible,
  onClose,
  packages,
  apartment,
}: PackageModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      backdropColor="#000"
      backdropOpacity={0.6}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <View style={styles.modalContainer}>
        {/* Handle Bar */}
        <View style={styles.handleBar} />

        {/* Title */}
        <Text style={styles.title}>Apartment 2000</Text>

        {/* Package List */}
        <ScrollView style={styles.scrollArea}>
          {packages.map((item, index) => (
            <PackageItem
              key={index}
              title={item.title}
              name={item.name}
              urgent={item.urgent}
              imageUrl={item.imageUrl}
            />
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "70%",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 16,
    zIndex: 10,
    padding: 4,
  },
  closeText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#666",
  },
  handleBar: {
    width: "12%",
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  scrollArea: {
    flex: 1,
  },
});
