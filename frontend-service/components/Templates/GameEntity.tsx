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

import heart from '../../assets/heart.png';

interface Props {
  Name?: string;
  src?: string;
  descr?: string;
  uuid: string;
  op?: boolean;
  banned?: boolean;
  address?: string;
  hunger?: number;
}

const GameEntity = ({
  Name = 'Player Name',
  src = entityPic.src,
  descr = 'players',
  uuid,
  banned,
  op,
  address,
  hunger,
}: Props) => {
  return (
    <Entity>
      <EntityPic src={`https://skin.ovesnovs.com/3d.php?user=${uuid}`} />
      <EntityInfo>
        <EntityName>
          {Name}
          {address && ' [Онлайн]'}
        </EntityName>
        <EntityDescription>{op ? 'Админ' : 'Игрок'}</EntityDescription>
        <EntityDescription>
          {hunger
            ? Array.from(Array(hunger).keys()).map((u, index) => (
                <Heart src={heart.src} key={index} />
              ))
            : 'Нет данных о здоровье игрока'}
        </EntityDescription>
      </EntityInfo>
    </Entity>
  );
};

const Heart = styled.img`
  height: 20px;
  width: 20px;
`;

const Entity = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 20%;
  flex-direction: column;
  column-gap: 10px;

  max-width: 50%;

  padding: 15px;

  background-color: ${BACKGROUND_SECONDARY_COLOR};

  border-radius: 15px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid ${GREEN_COLOR};
  }

  @media (max-width: 1200px) {
    flex: 1 1 33.33333333333%;
  }

  @media (max-width: 700px) {
    height: 300px;
  }

  @media (max-width: 500px) {
    max-width: 100%;
    flex: 1 100%;
  }
`;

const EntityPic = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;

  @media (max-width: 700px) {
    height: 150px;
  }
`;

const EntityInfo = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  row-gap: 10px;
`;

const EntityName = styled.h5`
  font-family: ${MEDIUM_FONT};
`;

const EntityDescription = styled.p`
  color: ${TEXT_SECONDARY_COLOR};
  font-size: ${SMALL_TEXT};
`;

export default GameEntity;
