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
      <Button
        name='Windows'
        backgroundColor={BUTTON_PRIMARY_COLOR}
        icon={<DownloadIcon />}
        iconOrientation='LEFT'
        link='https://disk.yandex.ru/d/9VsAWPB3HzaFag'
      />
      <Button
        name='MacOS'
        backgroundColor={BUTTON_PRIMARY_COLOR}
        icon={<DownloadIcon />}
        iconOrientation='LEFT'
        link='https://mbtl.ru/files/MegaLauncher_macOS.zip'
      />
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
