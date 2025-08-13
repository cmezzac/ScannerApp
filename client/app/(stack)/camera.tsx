import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import ScreenName from "@/components/screenName";
import ReturnButton from "@/components/returnButton";
import Stepper from "@/components/progress_bar";
import { useGlobal } from "../../context/globalContext";
import { enhanceImageForOCR } from "@/services/cameraService";
import LoadingScreen from "@/components/LoadingScreen";
import ScreenContainer from "@/components/ScreenContainer";

const { width, height } = Dimensions.get("window");

export default function CameraComponent() {
  const { fullPackageUri, setFullPackageUri, currentStep, setCurrentStep } =
    useGlobal();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const takePicture = async () => {
    if (!cameraRef.current || loading) return;

    setLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        const enhancedBase64 = await enhanceImageForOCR(photo.uri);
        setFullPackageUri(enhancedBase64);
        router.push("/cameraDetails");
      }
    } catch (error) {
      console.error("❌ Error taking or enhancing picture:", error);
    } finally {
      setLoading(false);
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
    <ScreenContainer style={styles.container}>
      {loading && <LoadingScreen message="Processing Image..." />}

      <ReturnButton />
      <ScreenName title="Scanner" isHeader={true} />
      <View style={{ marginTop: -20, paddingHorizontal: 20 }}>
        <Stepper currentStep={0} />
      </View>

      <View style={styles.cameraContainer}>
        {!loading && (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
          />
        )}
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={takePicture} style={styles.captureOuter}>
          <View style={styles.captureInner} />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
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
    marginTop: "10%",
    marginBottom: "40%",
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
