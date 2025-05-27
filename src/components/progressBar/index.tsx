import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Variant = "default" | "withCheck" | "mixed" | "allCheck";

interface Props {
  variant?: Variant;
  currentStep: number;
  stepsCount?: 2 | 4;  // define 2 ou 4 passos
}

export const ProgressBar = ({
  variant = "default",
  currentStep,
  stepsCount = 4,
}: Props) => {
  // Gera array [1, 2] ou [1, 2, 3, 4] dependendo do stepsCount
  const steps = Array.from({ length: stepsCount }, (_, i) => i + 1);

  const renderStep = (step: number) => {
    const isCompleted = step < currentStep;
    const isCurrent = step === currentStep;
    const isNext = step > currentStep;

    const showCheck =
      variant === "withCheck" ||
      (variant === "mixed" && isCompleted) ||
      variant === "allCheck";

    const styleCircle =
      isCompleted || isCurrent ? styles.stepCircleDone : styles.stepCircle;

    // Ajuste para quando é 2 steps e variant allCheck, evitar check no último
    const isLastStep = step === stepsCount;

    const content =
      showCheck && (isCompleted || (variant === "allCheck" && !isLastStep)) ? (
        <MaterialCommunityIcons name="check" color="#fff" size={18} />
      ) : (
        <Text
          style={
            isCurrent || variant === "allCheck" ? styles.currentText : styles.stepText
          }
        >
          {step}
        </Text>
      );

    return (
      <View key={step} style={styles.stepItem}>
        <View style={styleCircle}>{content}</View>
        {step !== stepsCount && <View style={styles.stepLine} />}
      </View>
    );
  };

  return <View style={styles.stepContainer}>{steps.map(renderStep)}</View>;
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#267797",
    borderWidth: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleDone: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#267797",
    alignItems: "center",
    justifyContent: "center",
  },
  stepLine: {
    width: 55,
    height: 2,
    backgroundColor: "#267797",
  },
  stepText: {
    color: "#267797",
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
  currentText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
