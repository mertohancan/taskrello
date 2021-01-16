import React, { FC } from 'react';
import styled from 'styled-components';

import Header from './components/headers/Header';
import Card from './components/cards/Card';

import headIcon from './images/icons/head.svg';

const Wrapper = styled.div`
  margin: 20px;
`;

const Cards = styled.div`
  width: 360px;
  height: auto;
  margin-top: 50px;
`;

const App: FC = () => {
  return (
    <div>
      <Header
        profilePicture={<img alt="profile" src={headIcon} style={{ width: 32, height: 32 }} />}
      />
      <Wrapper>
        <Cards>
          <Card items={[{ text: 'Card 1' }]} title="TO DO" />
        </Cards>
      </Wrapper>
    </div>
  );
};

export default App;
