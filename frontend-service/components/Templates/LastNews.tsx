import React, { useEffect, useState } from 'react';
import ArticleThumb from '../Article/ArticleThumb';

import ArticleInfo from '../Article/ArticleInfo';
import SectionName from '../Section/SectionName';
import Article from '../Article/Article';

import styled from 'styled-components';
import { getArticles } from '../../api';
import { renderDate } from '../../utils/data';

const Thumbnail = <ArticleThumb />;

const Info = (
  <ArticleInfo
    title='Incredible 3D illustrations of famous fictional places'
    date='Aug 14, 2020'
  />
);

const News = [
  { info: Info, thumbnail: Thumbnail },
  { info: Info, thumbnail: Thumbnail },

  { info: Info, thumbnail: Thumbnail },

  { info: Info, thumbnail: Thumbnail },
];

const LastNews = () => {
  const [news, setNews] = useState([]);

  const handleNews = async () => {
    const { result } = await getArticles();

    setNews(result);
  };

  useEffect(() => {
    handleNews();
  }, []);

  return (
    <>
      <SectionName title='Последние новости' />
      <Wrapper>
        {news.map((item, key) => {
          const Thumbnail = <ArticleThumb src={item.thumbnail} />;

          const Info = (
            <ArticleInfo title={item.title} date={renderDate(item.createdAt)} />
          );
          return (
            <Article {...item} info={Info} thumbnail={Thumbnail} key={key} />
          );
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 20px;

  margin-bottom: 120px;

  & > div {
    @media (max-width: 992px) {
      flex: 33%;
      max-width: unset;
    }

    @media (max-width: 768px) {
      flex: 100%;
      max-width: unset;
    }
  }
`;

export default LastNews;
