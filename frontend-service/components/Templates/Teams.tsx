import React from 'react';
import styled from 'styled-components';
import SectionName from '../Section/SectionName';
import GameEntity from './GameEntity';

const Teams = () => {
  return (
    <>
      <SectionName title='Участвующие команды' />
      <Wrapper>
        {[1, 2, 3, 4, 5, 6, 7].map((team, index) => (
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
  margin-bottom: 30px;
`;

export default Teams;
