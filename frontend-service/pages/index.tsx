import type { NextPage } from 'next';
import Content from '../components/Section/Section';
import Header from '../components/Header/Header';
import LayoutLimiter from '../components/LayoutLimiter';
import CurrentEvent from '../components/Templates/CurrentEvent';
import WelcomeBanner from '../components/WelcomeBanner';
import LastNews from '../components/Templates/LastNews';
import Footer from '../components/Footer';

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

export default Home;
