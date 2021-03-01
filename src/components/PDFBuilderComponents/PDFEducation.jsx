import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #e0e0e0;
  padding: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #ff450d;
  font-size: 10px;
  font-family: "Titillium Web";
`;

const DegreeText = styled.Text`
  font-size: 10px;
  font-family: "Stratum";
`;
const CollegeText = styled.Text`
  font-size: 10px;
`;

const Wrapper = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Education = ({ education: { name, institute } }) => {
  return (
    <Wrapper>
      <DegreeText>{name}</DegreeText>
      <CollegeText>{institute}</CollegeText>
      <CollegeText>2011 - 2014</CollegeText>
    </Wrapper>
  );
};
export function PDFEducation({ education }) {
  if (!education || !education.length) {
    return null;
  }

  return (
    <Root wrap={true}>
      <Header>EDUCATION</Header>
      {education.map((education, i) => {
        return <Education key={i} education={education} />;
      })}
    </Root>
  );
}
