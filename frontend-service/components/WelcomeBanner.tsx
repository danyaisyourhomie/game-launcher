import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import eventLogo from '../assets/eventLogo.png';
import background from '../assets/WelcomeBannerBg.png';
import ServerStatus from './Server/ServerStatus';

const WelcomeBanner = () => {
  return (
    <Banner>
      <EventLogo>
        <Image src={eventLogo} alt='Event logo' width={600} height={70} />
      </EventLogo>
      <ServerStatus />
      <Background />
    </Banner>
  );
};

const Banner = styled.div`
  height: 330px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 15px;

  position: relative;
`;

const EventLogo = styled.div`
  z-index: 1;
`;

const Background = styled.image`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0px;
  left: 0px;

  background-image: url(${background.src});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.2;
`;

export default WelcomeBanner;
