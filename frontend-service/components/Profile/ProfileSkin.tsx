import React from 'react';
import styled from 'styled-components';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';

import userSkin from '../../assets/userThumb.jpg';
import Button from '../Button';

interface Props {
  skin?: string;
}

const ProfileSkin = ({ skin = userSkin.src }: Props) => {
  return (
    <SkinWrapper>
      <Skin src={skin} />
      <Button name='Изменить скин' />
    </SkinWrapper>
  );
};

const SkinWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  height: 400px;
  max-width: 300px;

  padding: 20px;

  border-radius: 15px;

  overflow: hidden;

  background-color: ${BACKGROUND_SECONDARY_COLOR};
`;

const Skin = styled.img`
  flex: 250px;

  height: 100%;
  width: 100%;

  border-radius: 15px;

  object-fit: cover;
`;

export default ProfileSkin;
