import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactElement | ReactElement[];
}

const Content = ({ children }: Props): React.ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 80px);
  padding: 50px 0px;
`;
export default Content;
