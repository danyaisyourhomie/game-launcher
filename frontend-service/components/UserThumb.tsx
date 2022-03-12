import Link from 'next/link';
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';

import userThumb from '../assets/defaultThumb.jpg';
import { BLUE_COLOR, GREEN_COLOR } from '../const/css';
import { AuthContext } from '../context/AuthProvider';

const UserThumb = () => {
  const { user } = useContext(AuthContext);

  const userSkin = useMemo(() => {
    return user?.uuid
      ? `https://skin.ovesnovs.com/3d.php?user=${user?.uuid}`
      : userThumb.src;
  }, [user]);

  return (
    <Link href={'/profile'}>
      <Thumbnail>
        <Image
          src={`${userSkin}&${+new Date()}&headOnly=true`}
          alt='User picture'
        />
      </Thumbnail>
    </Link>
  );
};

const Thumbnail = styled.div`
  height: 42px;
  width: 42px;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export default UserThumb;
