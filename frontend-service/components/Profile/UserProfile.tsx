import React, { useContext } from 'react';
import styled from 'styled-components';
import { User } from '../../common/interfaces/user.dto';
import { AuthContext } from '../../context/AuthProvider';

import SectionName from '../Section/SectionName';
import ProfileInformation from './ProfileInformation';
import ProfileSkin from './ProfileSkin';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <Wrapper>
      <SectionName title={`Профиль игрока ${user.nickname}`} />
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
