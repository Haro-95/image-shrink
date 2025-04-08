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

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: #6b7280;
  transition: color 0.2s;
  
  &:hover {
    color: #6366f1;
  }
`;

const GitHubLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013v.001z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Copyright>© 2023 ImageShrink - Free, fast image compression</Copyright>
      <div>
        <GitHubLink href="https://github.com" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </GitHubLink>
      </div>
      <SocialLinks>
        <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </SocialLink>
        <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer; 