import React from 'react';
import styled from 'styled-components';
import {
  BACKGROUND_PRIMARY_COLOR,
  BACKGROUND_SECONDARY_COLOR,
  SMALL_TEXT,
  TEXT_SECONDARY_COLOR,
} from '../../const/css';

const Footer = () => {
  return (
    <Wrapper>
      <a href='https://vk.com/itmomegabattle'>ITMO.Megabattle</a>
      <span>X</span>
      <a href='https://partnadem.com'>Kladnitsky</a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;

  height: 60px;

  font-size: ${SMALL_TEXT};

  background-color: ${BACKGROUND_SECONDARY_COLOR};
  color: ${TEXT_SECONDARY_COLOR};

  margin-top: 60px;
`;

export default Footer;
