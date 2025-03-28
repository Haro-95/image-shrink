import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem 1.5rem;
  margin-top: 1rem;
  border-top: 1px solid #f3f4f6;
  color: #6b7280;
  background-color: white;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.03);
`;

const Text = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: #4f46e5;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #6b7280;
  transition: color 0.2s ease;
  
  &:hover {
    color: #6366f1;
  }
`;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <Text>
        &copy; {year} ImageShrink - Free, fast image compression
      </Text>
      <Text>
        <Link href="https://github.com/Haro-95/image-shrink" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </Link>
      </Text>
      <SocialLinks>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
          </svg>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
          </svg>
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer; 