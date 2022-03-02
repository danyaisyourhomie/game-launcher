import type { NextPage } from 'next';
import Header from '../components/Header/Header';
import WelcomeBanner from '../components/WelcomeBanner';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <WelcomeBanner />
    </div>
  );
};

export default Home;
