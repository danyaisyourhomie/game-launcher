import { NextPage } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import LayoutLimiter from '../components/LayoutLimiter';
import Content from '../components/Section/Section';
import Admins from '../components/Templates/Admins';
import Teams from '../components/Templates/Teams';
import withAuth from '../guards/withAuth';

const Community: NextPage = () => {
  return (
    <>
      <Header />
      <Content>
        <LayoutLimiter>
          <Teams />
          <Admins />
        </LayoutLimiter>
        <Footer />
      </Content>
    </>
  );
};

export default Community;

Community.requireAuth = true;
