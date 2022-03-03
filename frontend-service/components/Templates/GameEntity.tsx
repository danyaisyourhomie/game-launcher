import React from 'react';
import styled from 'styled-components';
import {
  BACKGROUND_SECONDARY_COLOR,
  GREEN_COLOR,
  MEDIUM_FONT,
  SMALL_TEXT,
  TEXT_SECONDARY_COLOR,
} from '../../const/css';

import entityPic from '../../assets/userThumb.jpg';

interface Props {
  name?: string;
  src?: string;
  descr?: string;
}

const GameEntity = ({
  name = 'Player Name',
  src = entityPic.src,
  descr = 'players',
}: Props) => {
  return (
    <Entity>
      <EntityPic src={src} />
      <EntityInfo>
        <EntityName>{name}</EntityName>
        <EntityDescription>{descr}</EntityDescription>
      </EntityInfo>
    </Entity>
  );
};

const Entity = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 25%;
  column-gap: 10px;

  max-width: 30%;

  padding: 15px;

  background-color: ${BACKGROUND_SECONDARY_COLOR};

  border-radius: 15px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid ${GREEN_COLOR};
  }
`;

const EntityPic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`;

const EntityInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

const EntityName = styled.h5`
  font-family: ${MEDIUM_FONT};
`;

const EntityDescription = styled.p`
  color: ${TEXT_SECONDARY_COLOR};
  font-size: ${SMALL_TEXT};
`;

export default GameEntity;
