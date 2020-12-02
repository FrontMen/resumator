import React, { FunctionComponent } from "react";
import { View, Text, Image, Font, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "../../lib/date";
import Stratum1 from "../../assets/fonts/Stratum1-Bold.ttf";
import avatars from "../../assets/images/avatars";

Font.register({ family: "Stratum", src: Stratum1 });

const styles = StyleSheet.create({
  container: {
    height: 145,
    paddingTop: 15,
    paddingLeft: 20,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
    fontSize: 36,
    fontFamily: "Titillium Web",
    fontWeight: 300,
  },
  heading: {
    display: "flex",
    flexDirection: "row",
    lineHeight: 1.2,
  },
  name: {
    top: 9,
    fontFamily: "Stratum",
    fontWeight: 800,
  },
  details: {
    color: "#ff450d",
    fontSize: 10,
  },
  avatar: {
    position: "absolute",
    width: 65,
    right: 40,
    bottom: 0,
  },
});

interface PDFHeaderProps {
  name: string;
  city: string;
  dateOfBirth: Date;
  avatar: string;
}

export const PDFHeader: FunctionComponent<PDFHeaderProps> = ({ name, city, dateOfBirth, avatar }) => {
  const month = formatDate(dateOfBirth, "MMMM")?.toUpperCase();
  const year = formatDate(dateOfBirth, "yyyy");

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.heading}>
          <Text>Hi, I am </Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        {/* What about Full Stack expert? */}
        <Text>Frontend expert</Text>
        <Text style={styles.details}>{city.toUpperCase()} REGION - NL - {month} {year}</Text>
      </View>
      <Image style={styles.avatar} src={(avatars.find((x) => x.name === avatar) || avatars[0]).img} />
    </View>
  );
}
