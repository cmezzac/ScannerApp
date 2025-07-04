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
import { useRouter } from "expo-router";
import ScreenName from "@/components/screenName";
import ReturnButton from "@/components/returnButton";
import Stepper from "@/components/progress_bar";
import { useGlobal } from "../../context/globalContext";
import { sendImageToReadShippingLabel } from "@/services/scannerServer";
import * as ImageManipulator from "expo-image-manipulator";
import { enhanceImageForOCR } from "@/services/cameraService";

const { width, height } = Dimensions.get("window");

export default function CameraComponent() {
  const { fullPackageUri, setFullPackageUri, setDetailsUri } = useGlobal();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setDetailsUri(photo.uri);

        try {
          const detailsImage = await enhanceImageForOCR(photo.uri);
          const result = await sendImageToReadShippingLabel(
            detailsImage,
            fullPackageUri
          );
          console.log("Server response:", result);
        } catch (error) {
          console.log("Error sending image", error);
        }

        router.push("/readerDetails");
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

  return (
    <SafeAreaView style={styles.container}>
      <ReturnButton></ReturnButton>

      <ScreenName title="Scanner" isHeader={true}></ScreenName>
      <View style={{ marginTop: -20, paddingHorizontal: 20 }}>
        <Stepper currentStep={1} />
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
        />
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
    marginTop: "20%",
    marginBottom: "80%",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  headerBlock: {
    marginTop: 0,
    paddingVertical: 0,
    gap: 0,
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
    top: "35%",
    right: 20,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 12,
  },
  bottomControls: {
    position: "absolute",
    bottom: "10%",
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
