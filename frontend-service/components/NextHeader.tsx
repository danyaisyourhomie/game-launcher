import Head from 'next/head';
import React from 'react';

const NextHeader = () => {
  return (
    <Head>
      <title>Game Launcher</title>
      <meta name='description' content='Web client for launching minecraft' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default NextHeader;
