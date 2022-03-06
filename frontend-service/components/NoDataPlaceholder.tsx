import styled from 'styled-components';
import React from 'react';
import { TEXT_SECONDARY_COLOR } from '../const/css';

const NoDataPlaceholder = () => {
  return <Placeholder>Здесь пока ничего нет</Placeholder>;
};

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${TEXT_SECONDARY_COLOR};
`;

export default NoDataPlaceholder;
