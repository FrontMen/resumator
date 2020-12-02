import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { Education } from "../../../types/Resume";
import { getTimespan } from "../../lib/date";

const styles = StyleSheet.create({
  container: {
    width: 200,
    padding: 20,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    fontSize: 9,
  },
  title: {
    color: "#ff450d",
    fontSize: 10,
  },
  educationContainer: {
    margin: "5px 0",
  },
  educationTitle: {
    marginBottom: 2,
    fontFamily: "Stratum",
    fontSize: 10,
  },
  educationInstitute: {
    marginBottom: 2,
  },
});

interface PDFEductionProps {
  education: Education[];
}

export const PDFEducation: FunctionComponent<PDFEductionProps> = ({ education }) => {
  if (education.length > 0) return (
    <View style={styles.container} wrap={false}>
      <Text style={styles.title}>EDUCATION</Text>
      {education.map((educationItem, index) => (
        <View key={index} style={styles.educationContainer}>
          <Text style={styles.educationTitle}>{educationItem.name}</Text>
          <Text style={styles.educationInstitute}>{educationItem.institute}</Text>
          <Text>{getTimespan(educationItem.startDate, educationItem.endDate, "yyyy")}</Text>
        </View>
      ))}
    </View>
  );

  return null;
};
