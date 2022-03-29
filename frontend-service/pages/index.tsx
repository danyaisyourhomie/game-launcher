import Content from '../components/Section/Section';
import CurrentEvent from '../components/Templates/CurrentEvent';
import Footer from '../components/Footer';
import Header from '../components/Header/Header';
import LastNews from '../components/Templates/LastNews';
import LayoutLimiter from '../components/LayoutLimiter';
import type { NextPage } from 'next';
import WelcomeBanner from '../components/WelcomeBanner';
import styled from 'styled-components';
import withAuth from '../guards/withAuth';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <WelcomeBanner />
      <Content>
        <LayoutLimiter>
          <CurrentEvent />
          <LastNews />
          <Footer />
        </LayoutLimiter>
      </Content>
    </>
  );
};

const Map = styled.iframe`
  border: none;
  outline: none;
  width: 100%;
  height: 400px;

  margin-bottom: 60px;
`;

export default Home;

Home.requireAuth = true;
