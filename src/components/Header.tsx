import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks/useRedux';
import { resetState } from '../store/imageSlice';

const HeaderContainer = styled.header`
  padding: 2rem 0 1rem;
  text-align: center;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.25rem;
`;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const handleLogoClick = () => {
    dispatch(resetState());
  };
  
  return (
    <HeaderContainer>
      <Logo onClick={handleLogoClick}>ImageShrink</Logo>
      <Tagline>Compress images instantly with just one click</Tagline>
    </HeaderContainer>
  );
};

export default Header; 