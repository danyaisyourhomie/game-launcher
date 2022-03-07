import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPlayers, pingServer } from '../../api';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';
import StatusOkIcon from '../../icons/StatusOkIcon';
import UsersIcon from '../../icons/UsersIcon';

const ServerStatus = () => {
  const [isOnline, setIsOnline] = useState(false);

  const [players, setPlayers] = useState([]);

  const handlePingServer = async () => {
    const { result } = await pingServer();

    if (result === 'pong') {
      setIsOnline(true);
    }
  };

  const handlePlayersCount = async () => {
    const { result } = await getPlayers();

    if (result) {
      setPlayers(result);
    }
  };

  useEffect(() => {
    handlePingServer();
    handlePlayersCount();
  }, []);

  return (
    isOnline && (
      <Wrapper>
        <OnlineStatus>
          <StatusOkIcon /> Онлайн
        </OnlineStatus>
        <PlayersCount>
          <UsersIcon />
          {players.length}/150
        </PlayersCount>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  height: 50px;
  width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 30px;

  padding: 10px 30px;
  border-radius: 30px;

  z-index: 1;

  > div {
    position: relative;
    bottom: 1px;

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
  }
`;

const OnlineStatus = styled.div``;

const PlayersCount = styled.div``;
export default ServerStatus;
