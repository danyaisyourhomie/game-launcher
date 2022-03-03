import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SEMI_MEDIUM_TEXT, TEXT_SECONDARY_COLOR } from '../../const/css';

interface Props {
  title: string;
  description?: string;
  isMainArticle?: boolean;
  date?: string;
  callback?: MouseEventHandler;
}
const ArticleInfo = ({
  title,
  isMainArticle = false,
  description,
  date,
  callback,
}: Props) => {
  return (
    <Wrapper onClick={callback}>
      {isMainArticle ? <MainTitle>{title}</MainTitle> : <Title>{title}</Title>}
      <Description>{description}</Description>
      <Date>{date}</Date>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  padding: 0px 15px;
`;

const MainTitle = styled.h1``;

const Title = styled.h3`
  font-size: ${SEMI_MEDIUM_TEXT};
`;

const Description = styled.h4``;

const Date = styled.p`
  color: ${TEXT_SECONDARY_COLOR};
  font-weight: 400;
`;

export default ArticleInfo;
