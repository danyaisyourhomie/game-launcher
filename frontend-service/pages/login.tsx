import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import LayoutLimiter from '../components/LayoutLimiter';
import ServerStatus from '../components/Server/ServerStatus';

import gameLogo from '../assets/gameLogo.png';
import AuthButton from '../components/AuthButton';

const Login: NextPage = () => {
  return (
    <LayoutLimiter>
      <Wrapper>
        <GameLogo src={gameLogo.src} />
        <Form>
          <AuthButton />
          <ServerStatus />
        </Form>
      </Wrapper>
    </LayoutLimiter>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const GameLogo = styled.img`
  position: absolute;
  top: 40px;

  height: 60px;
`;

export default Login;
