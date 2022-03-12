import React from 'react';
import styled from 'styled-components';

import loadingGifZombie from '../assets/loading_zombie.gif';

const Loading = () => {
  return (
    <Wrapper>
      <LoadingGif src={loadingGifZombie.src} />
      <LoadingBar>Загрузка...</LoadingBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  row-gap: 30px;
`;

const LoadingGif = styled.img`
  height: 100px;
`;

const LoadingBar = styled.div`
  position: relative;
  padding: 4px 16px;
`;

export default Loading;
