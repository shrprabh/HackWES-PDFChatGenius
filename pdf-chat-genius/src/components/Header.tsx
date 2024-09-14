import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #e9ecef;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #343a40;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>HackWesTX Chat Genius</Title>
    </HeaderContainer>
  );
};

export default Header;