import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import ScreenName from "@/components/screenName";
import ReturnButton from "@/components/returnButton";
import Stepper from "@/components/progress_bar";
import { useGlobal } from "../../context/globalContext";
import { sendImageToReadShippingLabel } from "@/services/scannerServer";
import { enhanceImageForOCR } from "@/services/cameraService";
import { useScannedPackages } from "@/context/scannedPackageContext";
import LoadingScreen from "@/components/LoadingScreen";

const { width, height } = Dimensions.get("window");

export default function CameraComponent() {
  const { fullPackageUri, setDetailsUri } = useGlobal();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const { setCurrentPackage } = useScannedPackages();

  const [localPackageReady, setLocalPackageReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localPackageReady) {
      router.push("/readerDetails");
      setLoading(false);
    } else {
      // Resume preview when NOT navigating
      cameraRef.current?.resumePreview().catch((err) => {
        console.warn("Failed to resume preview:", err);
      });
    }
  }, [localPackageReady]);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    await cameraRef.current.pausePreview();

    const photo = await cameraRef.current.takePictureAsync();
    if (!photo) return;

    setDetailsUri(photo.uri);
    setLoading(true);

    try {
      const detailsImage = await enhanceImageForOCR(photo.uri);

      const result = await sendImageToReadShippingLabel(
        detailsImage,
        fullPackageUri
      );

      console.log("Server response:", result);

      if (!result || !result.name || !result.trackingNumber) {
        throw new Error("Missing required fields in server response.");
      }

      const { apartment, courier, name, trackingNumber, urgent } = result;

      setCurrentPackage({
        apartment,
        name,
        urgent,
        title: `Package - ${courier} (${trackingNumber})`,
        imageUrl: fullPackageUri,
        trackingNumber,
      });

      setLocalPackageReady(true);
    } catch (error) {
      console.error("❌ Error while processing image:", error);
      Alert.alert(
        "Label Processing Failed",
        "We couldn’t read the label. Please try again.",
        [
          {
            text: "OK",
            onPress: async () => {
              await cameraRef.current?.resumePreview();
              setLoading(false);
            },
          },
        ]
      );
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
      {loading && <LoadingScreen message="Extracting Information..." />}

      <ReturnButton />
      <ScreenName title="Scanner" isHeader={true} />
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
