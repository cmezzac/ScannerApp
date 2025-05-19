import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface StepProgressBarProps {
  currentStep: number; // controlled externally
}

const steps = ["Package", "Details", "Confirm"];

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep = 0,
}) => {
  return (
    <View style={styles.container}>
      {steps.map((label, index) => (
        <View key={index} style={styles.stepContainer}>
          {/* Line before circle */}
          {index !== 0 && (
            <View
              style={[
                styles.line,
                {
                  backgroundColor: index <= currentStep ? "#4A90E2" : "#ccc",
                },
              ]}
            />
          )}

          {/* Non-clickable step circle */}
          <View
            style={[
              styles.circle,
              {
                backgroundColor: index <= currentStep ? "#4A90E2" : "#ccc",
              },
            ]}
          >
            <Text style={styles.circleText}>{index + 1}</Text>
          </View>

          {/* Label */}
          <Text
            style={[
              styles.label,
              {
                color: index <= currentStep ? "#000" : "#888",
              },
            ]}
          >
            {label}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  stepContainer: {
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  circleText: {
    color: "white",
    fontWeight: "bold",
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
  line: {
    position: "absolute",
    top: "30%",
    left: "-50%",
    width: "100%",
    height: 2,
    zIndex: 1,
  },
});

export default StepProgressBar;
