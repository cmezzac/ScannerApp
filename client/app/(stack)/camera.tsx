import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import ScreenName from "@/components/screenName";
import ReturnButton from "@/components/returnButton";

const { width, height } = Dimensions.get("window");

export default function CameraComponent() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPhotoUri(photo.uri);
      }
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>No camera access</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
        <View style={styles.previewButtons}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setPhotoUri(null)}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push("/(stack)/readerDetails")}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton></ReturnButton>
      <ScreenName title="Scanner" isHeader={true}></ScreenName>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          flash={flash}
        />
      </View>
      <Text style={styles.scanNote}>
        Scan must include the Name and Appartment Section
      </Text>

      <View style={styles.overlay}>
        {/* Top-left */}
        <View style={[styles.corner, styles.topLeft]} />
        {/* Top-right */}
        <View style={[styles.corner, styles.topRight]} />
        {/* Bottom-left */}
        <View style={[styles.corner, styles.bottomLeft]} />
        {/* Bottom-right */}
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity
          onPress={() => setFlash(flash === "off" ? "on" : "off")}
        >
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={takePicture} style={styles.captureOuter}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cameraContainer: {
    flex: 1,
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "15%",
    marginBottom: "85%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  topControls: {
    position: "absolute",
    top: "20%",
    right: 20,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
  },
  bottomControls: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "black",
  },
  previewContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: width,
    height: height * 0.9,
    resizeMode: "contain",
  },
  previewButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 0,
  },
  retakeButton: {
    backgroundColor: "#777",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: "#00ace6",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    pointerEvents: "none",
  },

  corner: {
    position: "absolute",
    width: "8%",
    aspectRatio: 1,
    borderColor: "black",
  },

  topLeft: {
    top: "22%",
    left: "10%",
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },

  topRight: {
    top: "22%",
    right: "10%",
    borderTopWidth: 4,
    borderRightWidth: 4,
  },

  bottomLeft: {
    bottom: "43%",
    left: "10%",
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },

  bottomRight: {
    bottom: "43%",
    right: "10%",
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanNote: {
    position: "absolute",
    bottom: "40%",
    width: "100%",
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 24,
    color: "black",
  },
});
