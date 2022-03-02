import React from "react";
import styled from "styled-components";
// import * as S from "./ProgressBar.css";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  margin-top: 10px;
  border-radius: 5px;
  background: #E7E7E7;
`;
const ProgressBars = styled.div`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: #355F8B;
  border-radius: 5px;
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBars progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
