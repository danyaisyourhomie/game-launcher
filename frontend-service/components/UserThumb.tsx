import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

import userThumb from '../assets/userThumb.jpg';
import { BLUE_COLOR } from '../const/colors';

const UserThumb = () => {
  return (
    <Thumbnail>
      <Image
        src={userThumb}
        alt='User picture'
        height={300}
        width={300}
        quality={100}
        objectFit='cover'
      />
    </Thumbnail>
  );
};

const Thumbnail = styled.div`
  height: 42px;
  width: 42px;
  overflow: hidden;

  border-radius: 40px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${BLUE_COLOR};
  }
`;

export default UserThumb;
