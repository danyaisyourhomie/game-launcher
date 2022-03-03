import React from 'react';
import styled from 'styled-components';
import { EXTRA_LARGE_TEXT } from '../../const/css';

interface Props {
  title: string;
}
const SectionName = ({ title }: Props): React.ReactElement => {
  return <Name>{title}</Name>;
};

const Name = styled.h2`
  font-size: ${EXTRA_LARGE_TEXT};

  margin-bottom: 30px;
`;

export default SectionName;
