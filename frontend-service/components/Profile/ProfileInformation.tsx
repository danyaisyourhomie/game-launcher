import React, { useContext } from 'react';
import styled from 'styled-components';
import {
  BACKGROUND_SECONDARY_COLOR,
  MEDIUM_FONT,
  SMALL_TEXT,
  TEXT_SECONDARY_COLOR,
} from '../../const/css';
import { AuthContext } from '../../context/AuthProvider';
import UploadFile from './UploadFile';

const ProfileInformation = () => {
  const { user } = useContext(AuthContext);

  return (
    <Wrapper>
      <Items>
        <StatItem>
          <StatName>Действия</StatName>
          <UploadFile />
        </StatItem>
        <StatItem>
          <StatName>Роль</StatName>
          <Stat>{user?.type}</Stat>
        </StatItem>
        <StatItem>
          <StatName>Команда</StatName>
          <Stat>{user?.team ?? 'Одинокий волк'}</Stat>
        </StatItem>

        {/* <StatItem>
          <StatName>Сети</StatName>
          <Stats>
            <Stat href='https://vk.com/'>
              <VkIcon />
              ВК
            </Stat>
            <Stat>
              <HeartIcon />
              ИСУ
            </Stat>
          </Stats>
        </StatItem> */}
      </Items>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-self: flex-end;

  @media (max-width: 768px) {
    align-self: unset;
  }
`;

const StatItem = styled.div`
  min-width: 250px;
`;

const StatName = styled.p`
  font-size: ${SMALL_TEXT};
  margin-bottom: 10px;
  color: ${TEXT_SECONDARY_COLOR};
`;

const Stat = styled.a`
  display: flex;
  align-items: center;
  column-gap: 10px;
  min-width: 140px;
  height: 60px;

  padding: 10px 15px;

  border-radius: 15px;

  background-color: ${BACKGROUND_SECONDARY_COLOR};
`;

export default ProfileInformation;
