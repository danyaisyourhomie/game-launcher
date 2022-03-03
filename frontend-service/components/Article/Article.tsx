import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ArticleTypes } from '../../common/enum/ArticleTypes';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';

interface Props {
  thumbnail?: React.ReactElement;
  info?: React.ReactElement;
  articleType?: ArticleTypes;
}

const Article = ({
  thumbnail,
  info,
  articleType = ArticleTypes.BLOCK,
}: Props): React.ReactElement => {
  const isMainArticle = articleType === ArticleTypes.MAIN_ARTICLE;

  return (
    <Wrapper isMainArticle={isMainArticle}>
      <Thumbnail>{thumbnail}</Thumbnail>
      <Text>{info}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 30%;
  gap: 15px;

  flex-direction: ${({ isMainArticle }) => (isMainArticle ? 'row' : 'column')};

  height: ${({ isMainArticle }) => (isMainArticle ? '425px' : 'fit-content')};

  background-color: ${BACKGROUND_SECONDARY_COLOR};

  border-radius: 15px;

  padding: 20px;

  & > div {
    flex: 1;
    height: 100%;
  }
`;

const Thumbnail = styled.div``;

const Text = styled.div``;

export default Article;
