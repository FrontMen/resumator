import React from "react";
import styled from "@react-pdf/styled-components";

const Root = styled.View`
  background-color: #181626;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Header = styled.Text`
  color: #19c3c0;
  font-size: 10px;
  padding-bottom: 10px;
`;

const LiWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const LiDot = styled.Text`
  content: "";
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: #ff450d;
  font-size: 25px;
  margin-right: 10px;
`;

const Li = styled.Text`
  color: #fff;
  font-size: 9px;
`;

export function PDFSkills({ skills }) {
  if (!skills || !skills.length) {
    return null;
  }

  return (
    <Root>
      <Header>SKILLS</Header>
      {skills.map((skill) => {
        return (
          <LiWrapper key={skill.name}>
            <LiDot />
            <Li>{skill.name}</Li>
          </LiWrapper>
        );
      })}
    </Root>
  );
}
