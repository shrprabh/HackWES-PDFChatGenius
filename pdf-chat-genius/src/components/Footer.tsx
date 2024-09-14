import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
  border-top: 2px solid #e9ecef;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #343a40;
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 HackWesTX team S2M</FooterText>
    </FooterContainer>
  );
};

export default Footer;