import React from 'react';
import styled from 'styled-components';
import { ButtonTypes } from '../../common/enum/ButtonTypes';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import Button from './../Button';
import UserThumb from '../UserThumb';

const HeaderProfile = () => {
  return (
    <Wrapper>
      <Button name='Играть' />
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
