import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Education } from "../../../types/Resume";
import { getTimespan } from "../../lib/date";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    backgroundColor: "#e0e0e0",
    fontSize: 10,
  },
  title: {
    color: "#ff450d",
  },
  educationContainer: {
    margin: "5px 0",
  },
  educationTitle: {
    fontFamily: "Stratum",
  },
});

interface PDFEductionProps {
  education: Education[];
}

export const PDFEducation: FunctionComponent<PDFEductionProps> = ({ education }) => {
  return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>EDUCATION</Text>
      {education.map((education, index) => (
        <View key={index} style={styles.educationContainer}>
          <Text style={styles.educationTitle}>{education.name}</Text>
          <Text>{education.institute}</Text>
          <Text>{getTimespan(education.startDate, education.endDate, "yyyy")}</Text>
        </View>
      ))}
    </View>
  );
};
