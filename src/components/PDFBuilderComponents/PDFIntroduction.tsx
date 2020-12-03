import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    marginBottom: 15,
    backgroundColor: "#19c3c0",
    color: "#ffffff",
    fontSize: 9,
  },
});

interface PDFIntroductionProps {
  introduction: string;
}

export const PDFIntroduction: FunctionComponent<PDFIntroductionProps> = ({ introduction }) => {
  if (!introduction) return null;

  return (
    <View style={styles.container}>
      <Text>{introduction}</Text>
    </View>
  );
}
