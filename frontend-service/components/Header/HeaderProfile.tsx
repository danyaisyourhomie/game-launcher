import React, { useCallback, useContext, useMemo } from 'react';
const jwt = require('jsonwebtoken');
import styled from 'styled-components';
import { ButtonTypes } from '../../common/enum/ButtonTypes';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Button from './../Button';
import UserThumb from '../UserThumb';
import { AuthContext } from '../../context/AuthProvider';
import { User } from '../../common/interfaces/user.dto';
import { APP_PROTOCOL } from '../../const/launcher';

const HeaderProfile = () => {
  const { user }: { user: User } = useContext(AuthContext);

  const token = localStorage.getItem('token');

  const dataToTransfer = jwt.sign(
    {
      nickname: user.nickname,
    },
    'LAUNCHER'
  );

  const openLauncher = useCallback(() => {
    window.location.href = `${APP_PROTOCOL}://TOKEN===${dataToTransfer}`;
  }, [user]);

  return (
    <Wrapper>
      <Button name='Играть' callback={openLauncher} />
      <Profile>
        <UserThumb />
        {/* <Button icon={<ArrowDownIcon />} buttonType={ButtonTypes.SLIM} /> */}
      </Profile>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  column-gap: 10px;

  cursor: pointer;
`;

export default HeaderProfile;
