import React from 'react';
import styled from 'styled-components';
import SectionName from '../Section/SectionName';
import ProfileInformation from './ProfileInformation';
import ProfileSkin from './ProfileSkin';

const UserProfile = () => {
  return (
    <Wrapper>
      <SectionName title='Профиль игрока kladnitsky' />
      <UserItems>
        <ProfileSkin />
        <ProfileInformation />
      </UserItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const UserItems = styled.div`
  display: flex;
  gap: 20px;
`;

export default UserProfile;
