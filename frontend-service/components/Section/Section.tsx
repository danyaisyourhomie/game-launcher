import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactElement;
}

const Content = ({ children }: Props): React.ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  padding-top: 50px;
`;
export default Content;
