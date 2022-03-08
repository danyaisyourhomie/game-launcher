import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import { BUTTON_PRIMARY_COLOR } from '../const/css';
import DownloadIcon from '../icons/DownloadIcon';
import Button from './Button';
import ServerStatus from './Server/ServerStatus';

import eventLogo from '../assets/eventLogo.png';

import eventBanner from '../assets/banner.jpg';

const WelcomeBanner = () => {
  return (
    <Banner>
      <EventLogo>
        <Image src={eventLogo} alt='Event logo' width={600} height={55} />
      </EventLogo>
      <ServerStatus />
      <ButtonLink>
        <Button
          name='Windows'
          backgroundColor={BUTTON_PRIMARY_COLOR}
          icon={<DownloadIcon />}
          iconOrientation='LEFT'
          link='https://mbtl.ru/files/megalauncher-win32-x64.exe'
        />
        <Button
          name='MacOS [Intel]'
          backgroundColor={BUTTON_PRIMARY_COLOR}
          icon={<DownloadIcon />}
          iconOrientation='LEFT'
          link='https://mbtl.ru/files/MegaLauncher_macOS.zip'
        />
        <Button
          name='MacOS [M1]'
          backgroundColor={BUTTON_PRIMARY_COLOR}
          icon={<DownloadIcon />}
          iconOrientation='LEFT'
          link='https://mbtl.ru/files/[M1]MegaLauncher_macOS.zip'
        />
      </ButtonLink>
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonLink = styled.div`
  display: flex;
  column-gap: 20px;
`;

const EventLogo = styled.div`
  z-index: 1;
`;

const EventPicture = styled.img`
  width: 600px;
`;

const Background = styled.image`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0px;
  left: 0px;

  background-image: url(${eventBanner.src});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.2;
`;

export default WelcomeBanner;
