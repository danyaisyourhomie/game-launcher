import { NextPage } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import LayoutLimiter from '../components/LayoutLimiter';
import UserProfile from '../components/Profile/UserProfile';
import Content from '../components/Section/Section';

const Profile: NextPage = () => {
  return (
    <>
      <Header />
      <Content>
        <LayoutLimiter>
          <UserProfile />
          <Footer />
        </LayoutLimiter>
      </Content>
    </>
  );
};

export default Profile;
