import { NextPage } from 'next';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import React from 'react';
import styled from 'styled-components';
import LayoutLimiter from '../components/LayoutLimiter';
import ServerStatus from '../components/Server/ServerStatus';

import gameLogo from '../assets/gameLogo.png';
import AuthButton from '../components/AuthButton';

import { loginUser } from '../api';

import {
  BACKGROUND_SECONDARY_COLOR,
  BACKGROUND_PRIMARY_COLOR,
  TEXT_PRIMARY_COLOR,
  MEDIUM_FONT,
} from '../const/css';
import { User } from '../common/interfaces/user.dto';

const Login: NextPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUserLogin = async () => {
    if (!nickname || !password) {
      enqueueSnackbar('Заполните  все поля', { variant: 'warning' });
      return;
    }

    const { result, err } = await loginUser(nickname, password);

    console.log(result, err);

    if (err) {
      enqueueSnackbar('Неправильный логин / пароль', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Вы успешно авторизовались!', { variant: 'success' });

    window.localStorage.setItem('token', result.token);

    window.location.href = '/';
  };

  return (
    <LayoutLimiter>
      <Wrapper>
        <GameLogo src={gameLogo.src} />
        <Form>
          <FieldInput
            type='text'
            placeholder='Ваш никнейм'
            onChange={onChangeNickname}
          />
          <FieldInput
            type='password'
            placeholder='Ваш пароль'
            onChange={onChangePassword}
          />
          <AuthButton callback={handleUserLogin} />
          {/* <ServerStatus /> */}
        </Form>
      </Wrapper>
    </LayoutLimiter>
  );
};

const FieldInput = styled.input`
  height: 50px;

  padding: 0px 15px;

  font-family: ${MEDIUM_FONT};

  background-color: ${BACKGROUND_PRIMARY_COLOR};
  color: ${TEXT_PRIMARY_COLOR};

  border-radius: 15px;
  border: none;
  border: 1px solid ${BACKGROUND_SECONDARY_COLOR};
`;

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

  min-width: 320px;
`;

const GameLogo = styled.img`
  position: absolute;
  top: 40px;

  height: 60px;
`;

export default Login;
