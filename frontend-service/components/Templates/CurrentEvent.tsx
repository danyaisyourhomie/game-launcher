import React, { useEffect, useState } from 'react';
import Article from '../Article/Article';
import ArticleInfo from '../Article/ArticleInfo';
import ArticleThumb from '../Article/ArticleThumb';

import SectionName from '../Section/SectionName';
import { ArticleTypes } from '../../common/enum/ArticleTypes';

import intro from '../../assets/intro.jpg';
import { getLatestArticle } from '../../api';
import { renderDate } from '../../utils/data';

const CurrentEvent = () => {
  const [article, setArticle] = useState({});

  const handleArticles = async () => {
    const { result } = await getLatestArticle();

    setArticle(result);
  };

  useEffect(() => {
    handleArticles();
  }, []);

  const Thumbnail = <ArticleThumb src={article?.thumbnail ?? intro.src} />;

  const Info = (
    <ArticleInfo
      isMainArticle
      title={article?.title}
      description={article?.description}
      date={renderDate(article?.createdAt)}
    />
  );

  return (
    <>
      <SectionName title={'Текущий этап'} />
      <Article
        thumbnail={Thumbnail}
        info={Info}
        articleType={ArticleTypes.MAIN_ARTICLE}
      />
    </>
  );
};

export default CurrentEvent;
