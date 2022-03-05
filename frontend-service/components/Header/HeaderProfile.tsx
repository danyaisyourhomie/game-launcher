import React, { useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ButtonTypes } from '../../common/enum/ButtonTypes';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Button from './../Button';
import UserThumb from '../UserThumb';
import { AuthContext } from '../../context/AuthProvider';

const HeaderProfile = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  const openLauncher = useCallback(() => {
    window.location.href = `megalauncher://userId:${user.token}`;
  }, []);

  return (
    <Wrapper>
      <Button name='Играть' callback={openLauncher} />
      <Profile>
        <UserThumb />
        <Button icon={<ArrowDownIcon />} buttonType={ButtonTypes.SLIM} />
      </Profile>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;
`;

const Profile = styled.div`
  display: flex;
  column-gap: 10px;

  cursor: pointer;
`;

export default HeaderProfile;
