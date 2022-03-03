import React, { ReactChildren, ReactElement } from 'react';
import styled from 'styled-components';

const LayoutLimiter = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}): React.ReactElement => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1000px;
  height: 100%;

  margin: auto;

  @media (max-width: 1200px) {
    padding: 0px 30px;
  }
`;

export default LayoutLimiter;
