import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import Article from './Article';

interface Props {
  src: string;
  callback?: MouseEventHandler;
}

import article from '../../assets/article.jpg';

const ArticleThumb = ({ src, callback }: Props): React.ReactElement => {
  return <Thumbnail src={src ?? article.src} onClick={callback} />;
};

const Thumbnail = styled.img`
  border-radius: 15px;
  width: 100%;
  min-height: 200px;

  object-fit: cover;
`;

export default ArticleThumb;
