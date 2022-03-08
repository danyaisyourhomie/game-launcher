import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';

import defaultSkin from '../../assets/userThumb.png';
import { AuthContext } from '../../context/AuthProvider';

const ProfileSkin = () => {
  const { user } = useContext(AuthContext);

  const userSkin = useMemo(() => {
    return user?.uuid
      ? `https://skin.ovesnovs.com/3d.php?user=${user?.uuid}`
      : defaultSkin.src;
  }, [user]);

  return (
    <SkinWrapper>
      <Skin src={userSkin} />
      {/* <Button name='Изменить скин' /> */}
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

  min-width: 200px;

  border-radius: 15px;

  object-fit: contain;
`;

export default ProfileSkin;
