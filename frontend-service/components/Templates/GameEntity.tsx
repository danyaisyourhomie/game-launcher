import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../../context/AuthProvider';

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
  banned,
  op,
  address,
  uuid,
  hunger,
}: Props) => {
  const { user } = useContext(AuthContext);
  const [skinLoaded, setSkinLoaded] = useState(false);

  const myEntity = user.nickname === Name;

  console.log(user);

  return (
    <Entity hovered={myEntity}>
      <EntityPic
        src={`https://skin.ovesnovs.com/3d.php?user=${uuid}&ratio=10&aa=true&hr=30`}
        onLoad={() => setSkinLoaded(true)}
      />
      <EntityInfo>
        {skinLoaded ? (
          <EntityName>
            {Name} {myEntity && '[Мой профиль]'}
            {address && ' [Онлайн]'}
          </EntityName>
        ) : (
          'Загружаю информацию...'
        )}

        <EntityDescription>{op ? 'Админ' : 'Игрок'}</EntityDescription>
        <EntityHealth>
          {hunger &&
            Array.from(Array(hunger).keys()).map((u, index) => (
              <Heart src={heart.src} key={index} />
            ))}
        </EntityHealth>
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
  flex: 1 1 20%;
  flex-direction: column;
  column-gap: 10px;

  max-width: 50%;

  padding: 30px;

  background-color: ${BACKGROUND_SECONDARY_COLOR};

  border-radius: 15px;
  border: 2px solid ${({ hovered }) => (hovered ? GREEN_COLOR : 'transparent')};

  @media (max-width: 1200px) {
    flex: 1 1 33.33333333333%;
  }

  @media (max-width: 700px) {
    height: 270px;
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

const EntityPicSkeleton = styled.img`
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

  position: relative;
`;

const EntityName = styled.h5`
  font-family: ${MEDIUM_FONT};
`;

const EntityDescription = styled.p`
  color: ${TEXT_SECONDARY_COLOR};
  font-size: ${SMALL_TEXT};
`;

const EntityHealth = styled.p`
  color: ${TEXT_SECONDARY_COLOR};
  font-size: ${SMALL_TEXT};
  position: absolute;
  left: 0px;
  bottom: 60px;
`;
export default GameEntity;
