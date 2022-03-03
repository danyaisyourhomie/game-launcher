import React from 'react';
import ArticleThumb from '../Article/ArticleThumb';

import image from '../../assets/WelcomeBannerBg.png';
import ArticleInfo from '../Article/ArticleInfo';
import SectionName from '../Section/SectionName';
import Article from '../Article/Article';
import { ArticleTypes } from '../../common/enum/ArticleTypes';
import styled from 'styled-components';

const Thumbnail = <ArticleThumb src={image.src} />;

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
  { info: Info, thumbnail: Thumbnail },

  { info: Info, thumbnail: Thumbnail },
];

const LastNews = () => {
  return (
    <>
      <SectionName title='Последние новости' />
      <Wrapper>
        {News.map((item, key) => (
          <Article {...item} key={key} />
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 20px;
`;

export default LastNews;
