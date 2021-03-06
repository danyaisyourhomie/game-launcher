import React from 'react';
import styled from 'styled-components';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';
import HeaderMenu from './HeaderMenu';
import HeaderProfile from './HeaderProfile';
import LayoutLimiter from '../LayoutLimiter';
import MainLogo from './MainLogo';

const NavItems = [
  { name: 'Главная', link: '/' },
  { name: 'Сообщество', link: '/community' },
  { name: 'Мой профиль', link: '/profile' },
];
const Header = () => {
  return (
    <HeaderWrapper>
      <LayoutLimiter>
        <HeaderContent>
          <MainLogo />
          <HeaderMenu menu={NavItems} />
          <HeaderProfile />
        </HeaderContent>
      </LayoutLimiter>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  height: 80px;

  background-color: ${BACKGROUND_SECONDARY_COLOR};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: inherit;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export default Header;
