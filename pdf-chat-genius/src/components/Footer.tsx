import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f5f5dc; /* Warm beige to match the theme */
  padding: 10px;
  text-align: center;
  border-top: 2px solid #8b4513; /* Saddle brown for a rustic touch */
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #8b0000; /* Deep red for contrast */
  font-family: 'Georgia, serif'; /* Classic font for a traditional feel */
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 HackWesTX team S2M</FooterText>
    </FooterContainer>
  );
};

export default Footer;