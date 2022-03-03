import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { BLUE_COLOR, TEXT_PRIMARY_COLOR } from '../../const/css';

interface MenuItem {
  name: string;
  link: string;
  callback?: Function;
}

interface Props {
  menu: MenuItem[];
}

const HeaderMenu = ({ menu }: Props) => {
  return (
    <Nav>
      {menu.map((item, index) => (
        <a
          href={item.link}
          key={index}
          onClick={item.callback as MouseEventHandler<HTMLAnchorElement>}>
          {item.name}
        </a>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  column-gap: 30px;

  color: var(${TEXT_PRIMARY_COLOR});

  a:hover {
    border-bottom: 2px solid ${BLUE_COLOR};
  }
`;

export default HeaderMenu;
