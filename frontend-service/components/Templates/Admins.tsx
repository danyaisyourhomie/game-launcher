import React from 'react';
import styled from 'styled-components';
import SectionName from '../Section/SectionName';
import GameEntity from './GameEntity';

const Admins = () => {
  return (
    <>
      <SectionName title='Администраторы проекта' />
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7, 12, 13].map((team, index) => (
          <GameEntity key={index} />
        ))}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 25%;
  gap: 20px;

  max-height: 400px;
  overflow: auto;

  padding: 0px 10px;
  margin-bottom: 120px;
`;

export default Admins;
