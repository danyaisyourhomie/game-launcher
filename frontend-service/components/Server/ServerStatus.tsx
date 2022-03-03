import React from 'react';
import styled from 'styled-components';
import { BACKGROUND_SECONDARY_COLOR } from '../../const/css';
import StatusOkIcon from '../../icons/StatusOkIcon';
import UsersIcon from '../../icons/UsersIcon';

const ServerStatus = () => {
  return (
    <Wrapper>
      <OnlineStatus>
        <StatusOkIcon /> Онлайн
      </OnlineStatus>
      <PlayersCount>
        <UsersIcon />
        153/200
      </PlayersCount>
    </Wrapper>
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
