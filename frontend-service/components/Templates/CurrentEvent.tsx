import React from 'react';
import Article from '../Article/Article';
import ArticleInfo from '../Article/ArticleInfo';
import ArticleThumb from '../Article/ArticleThumb';

import SectionName from '../Section/SectionName';
import { ArticleTypes } from '../../common/enum/ArticleTypes';

const Thumbnail = <ArticleThumb src='/assets/WelcomeBannerBg.png' />;

const Info = (
  <ArticleInfo
    isMainArticle
    title='Технический день! Проверяем, тестируем, дорабатываем.'
    description='Send your portfolio to our manager on e-mail and get a chance to be a part of our new big Dribbblers group!'
    date='Aug 14, 2020'
  />
);

const CurrentEvent = () => {
  return (
    <>
      <SectionName title='Текущий этап' />
      <Article
        thumbnail={Thumbnail}
        info={Info}
        articleType={ArticleTypes.MAIN_ARTICLE}
      />
    </>
  );
};

export default CurrentEvent;
