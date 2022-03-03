import React from 'react';
import styled from 'styled-components';
import {
  BACKGROUND_SECONDARY_COLOR,
  MEDIUM_FONT,
  SMALL_TEXT,
  TEXT_SECONDARY_COLOR,
} from '../../const/css';
import HeartIcon from '../../icons/HeartIcon';
import VkIcon from '../../icons/VkIcon';

const ProfileInformation = () => {
  return (
    <Wrapper>
      <Items>
        <StatItem>
          <StatName>Факультет</StatName>
          <Stat>МФ КТиУ</Stat>
        </StatItem>
        <StatItem>
          <StatName>Команда</StatName>
          <Stat>Pussy Hunters</Stat>
        </StatItem>
        <StatItem>
          <StatName>Сети</StatName>
          <Stats>
            <Stat href='https://vk.com/kladnitskiy'>
              <VkIcon />
              ВК
            </Stat>
            <Stat>
              <HeartIcon />
              ИСУ
            </Stat>
          </Stats>
        </StatItem>
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
`;

const StatItem = styled.div``;

const StatName = styled.p`
  font-size: ${SMALL_TEXT};
  margin-bottom: 10px;
  color: ${TEXT_SECONDARY_COLOR};
`;

const Stats = styled.div`
  display: flex;
  column-gap: 10px;
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
