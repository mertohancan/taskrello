import React, { FC, ReactChild } from 'react';
import styled from 'styled-components';

import Button from '../buttons/Button';

import homeIcon from '../../images/icons/home.svg';

interface HeaderProps {
  profilePicture?: ReactChild;
}

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  padding-left: 20px;
  padding-right: 35px;

  background-color: #00524c;
  justify-content: space-between;
  align-items: center;
`;

const ProfilePictureWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  border: white;
  background-color: white;
  border-radius: 50%;
  margin-right: 25px;

  justify-content: center;
  align-items: center;
`;


const Header: FC<HeaderProps> = ({profilePicture}) => (
  <Container>
    <Button icon={homeIcon} text="TEST BOARD" />
    {
      profilePicture ? <ProfilePictureWrapper>{profilePicture}</ProfilePictureWrapper> : null
    }
  </Container>
);

export default Header;
