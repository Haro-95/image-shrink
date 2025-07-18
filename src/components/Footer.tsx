import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 2rem 0;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: auto;
`;

const Copyright = styled.p`
  margin: 0.5rem 0;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright> {currentYear} ImageShrink - Free, fast image compression</Copyright>

    </FooterContainer>
  );
};

export default Footer; 