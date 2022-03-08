import Image from 'next/image';
import React, { useContext } from 'react';
import styled from 'styled-components';

import userThumb from '../assets/defaultThumb.jpg';
import { BLUE_COLOR, GREEN_COLOR } from '../const/css';
import { AuthContext } from '../context/AuthProvider';

const UserThumb = () => {
  const { user } = useContext(AuthContext);

  return (
    <Thumbnail>
      <Image
        src={`https://skin.ovesnovs.com/3d.php?user=${user.uuid}` ?? userThumb}
        alt='User picture'
        height={300}
        width={300}
        quality={100}
        objectFit='contain'
      />
    </Thumbnail>
  );
};

const Thumbnail = styled.div`
  height: 42px;
  width: 42px;
  overflow: hidden;

  border-radius: 40px;
  border: 1px solid ${BLUE_COLOR};

  &:hover {
    border: 1px solid ${GREEN_COLOR};
  }
`;

export default UserThumb;
