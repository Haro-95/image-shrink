import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../hooks/useRedux';
import { resetState } from '../store/imageSlice';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 2.5rem 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 0 0 1.5rem 1.5rem;
  box-shadow: 0 4px 20px rgba(138, 91, 246, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.15rem;
  font-weight: 400;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const handleTitleClick = () => {
    dispatch(resetState());
  };
  
  return (
    <HeaderContainer>
      <Content>
        <Title onClick={handleTitleClick}>ImageShrink</Title>
        <Subtitle>Compress images instantly with just one click</Subtitle>
      </Content>
    </HeaderContainer>
  );
};

export default Header; 