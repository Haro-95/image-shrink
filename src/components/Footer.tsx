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

const GitHubLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Copyright>© {currentYear} ImageShrink - Free, fast image compression</Copyright>
      <div>
        <GitHubLink href="https://github.com/Haro-95/image-shrink" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </GitHubLink>
      </div>
    </FooterContainer>
  );
};

export default Footer; 