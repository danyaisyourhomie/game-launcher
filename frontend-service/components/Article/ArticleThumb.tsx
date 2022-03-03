import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  callback?: MouseEventHandler;
}

const ArticleThumb = ({ src, callback }: Props): React.ReactElement => {
  return <Thumbnail src={src} onClick={callback} />;
};

const Thumbnail = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  min-height: 200px;
  object-fit: cover;
`;

export default ArticleThumb;
