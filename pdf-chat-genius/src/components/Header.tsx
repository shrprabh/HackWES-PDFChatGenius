import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #f5f5dc; /* Warm beige to match the theme */
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #8b4513; /* Saddle brown for a rustic touch */
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #8b0000; /* Deep red for contrast and emphasis */
  font-family: 'Georgia, serif'; /* Classic font for a traditional feel */
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Title>HackWesTX Chat Genius</Title>
    </HeaderContainer>
  );
};

export default Header;