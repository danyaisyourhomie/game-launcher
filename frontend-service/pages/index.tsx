import type { NextPage } from 'next';
import Content from '../components/Section/Section';
import Header from '../components/Header/Header';
import LayoutLimiter from '../components/LayoutLimiter';
import CurrentEvent from '../components/Templates/CurrentEvent';
import WelcomeBanner from '../components/WelcomeBanner';
import LastNews from '../components/Templates/LastNews';
import Footer from '../components/Footer';
import withAuth from '../guards/withAuth';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <WelcomeBanner />
      <Content>
        <LayoutLimiter>
          <Map src='https://map.mbtl.ru/#world;flat;-1740,64,-270;1' />
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
