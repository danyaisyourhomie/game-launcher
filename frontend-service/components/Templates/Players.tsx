import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { getPlayersList, getPlayersOnlineList } from '../../api';
import Button from '../Button';
import SectionName from '../Section/SectionName';
import GameEntity from './GameEntity';

const Players = () => {
  const MAX_PLAYERS_PER_REQUEST = 16;
  const [players, setPlayers] = useState([]);
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [scrollsCount, setScrollsCount] = useState(0);
  const scrollRef = useRef(null);

  const handlePlayersList = async () => {
    const res = await getPlayersList();

    if (res && res.length) {
      setPlayers(res);
    }
  };

  const handleOnlinePlayersList = async () => {
    const res = await getPlayersOnlineList();
    if (res && res.length) {
      setOnlinePlayers(res);
    }
  };

  useEffect(() => {
    handlePlayersList();
    handleOnlinePlayersList();
  }, []);

  const handlePagination = (direction: string) => {
    let newValue =
      direction === 'NEXT'
        ? scrollsCount + MAX_PLAYERS_PER_REQUEST
        : scrollsCount - MAX_PLAYERS_PER_REQUEST;
    if (newValue < players.length) {
      setScrollsCount(newValue > 0 ? newValue : 0);
    }
  };

  const bottomLimit = scrollsCount ? scrollsCount : 0;
  const topLimit =
    MAX_PLAYERS_PER_REQUEST + (scrollsCount ? scrollsCount : scrollsCount);

  const ControlPanel = Boolean(players.length) && (
    <ButtonWrapper>
      <Button name='Назад' callback={handlePagination.bind({}, 'BACK')} />
      <Button name='Далее' callback={handlePagination.bind({}, 'NEXT')} />
    </ButtonWrapper>
  );

  return (
    <>
      <SectionName title='Игроки' />
      {ControlPanel}
      <Wrapper ref={scrollRef}>
        {players
          .filter((u, index) => index >= bottomLimit && index < topLimit)
          .map((u) => {
            const onlineEntity = onlinePlayers.find((o) => o.uuid === u.uuid);
            return onlineEntity ? { ...u, ...onlineEntity } : u;
          })
          .map((player) => (
            <GameEntity key={player.uuid} {...player} />
          ))}
      </Wrapper>
      {ControlPanel}
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  column-gap: 20px;

  padding: 20px 10px;

  max-width: 330px;

  @media (max-width: 572px) {
    width: 100%;
    row-gap: 20px;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;

    max-width: unset;

    & > button {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 25%;
  gap: 20px;

  padding: 0px 10px;
`;

export default Players;
