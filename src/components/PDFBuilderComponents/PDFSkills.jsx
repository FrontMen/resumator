import React from "react";
import styled from "@react-pdf/styled-components";
import angularBadge from "../../assets/images/angularBadge.png";
import nodeBadge from "../../assets/images/nodeBadge.png";
import cssBadge from "../../assets/images/cssBadge.png";

const Root = styled.View`
  background-color: #181626;
  padding: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Flex = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Header = styled.Text`
  color: #19c3c0;
  font-size: 10px;
`;
const SubHeader = styled.Text`
  color: #fff;
  font-size: 7.5px;
  margin-bottom: 8px;
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

const Span = styled.Text`
  color: #0cc;
  font-size: 9px;
`;

const Badge = styled.Image`
  width: 22%;
`;

export function PDFSkills({ skills }) {
  if (!skills || !skills.length) {
    return null;
  }

  return (
    <Root>
      <Header>SKILLS</Header>
      <Flex>
        <Badge src={angularBadge} />
        <Badge src={nodeBadge} />
        <Badge src={cssBadge} />
      </Flex>
      <SubHeader>LANGUAGES - FRAMEWORKS - LIBRARIES</SubHeader>
      {skills.map((skill) => {
        return (
          <LiWrapper key={skill.name}>
            <LiDot />
            <Li>
              {skill.name} <Span>{skill.years}</Span>
            </Li>
          </LiWrapper>
        );
      })}
    </Root>
  );
}
