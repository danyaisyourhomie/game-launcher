import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { MEDIUM_FONT, MEDIUM_TEXT } from '../../const/css';

const MainLogo = () => {
  return (
    <Logo>
      <LogoImage>
        <Image
          src={logo}
          alt='Minecraft launcher logo'
          height={30}
          width={30}
        />
      </LogoImage>

      <LogoText>Minecraft launcher</LogoText>
    </Logo>
  );
};

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
`;

const LogoImage = styled.div`
  position: relative;
  top: 4px;
`;

const LogoText = styled.h2`
  font-family: ${MEDIUM_FONT};
  font-size: ${MEDIUM_TEXT};
`;

export default MainLogo;
