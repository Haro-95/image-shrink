import React from 'react';
import styled from 'styled-components';

const FormatSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0 1.5rem;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const FormatOption = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  opacity: ${props => props.active ? 1 : 0.7};
  transition: all 0.2s ease;
  position: relative;
  padding: 0.5rem;
  
  &:hover {
    transform: ${props => props.active ? 'translateY(-5px)' : 'none'};
  }
`;

const IconContainer = styled.div<{ active?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.active ? '#6366f1' : '#e5e7eb'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props => props.active ? 'white' : '#6b7280'};
  box-shadow: ${props => props.active ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none'};
  transition: all 0.2s ease;
`;

const FormatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(25%, -25%);
  padding: 2px 5px;
  background: #facc15;
  color: #854d0e;
  font-size: 0.5rem;
  font-weight: 600;
  border-radius: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

// Icons for each format
const ImageIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PDFIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 12.5H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 12.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 16.5H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 16.5H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M14 12L10 9V15L14 12Z" fill="currentColor"/>
  </svg>
);

const AudioIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18V12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 19H9V21C9 21.5523 8.55228 22 8 22H6C5.44772 22 5 21.5523 5 21V19Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 19H19V21C19 21.5523 18.5523 22 18 22H16C15.4477 22 15 21.5523 15 21V19Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FormatSelector: React.FC = () => {
  return (
    <FormatSelectorContainer>
      <FormatOption active={true}>
        <IconContainer active={true}>
          <ImageIcon />
        </IconContainer>
        <FormatLabel>Images</FormatLabel>
      </FormatOption>
      
      <FormatOption>
        <IconContainer>
          <DocumentIcon />
        </IconContainer>
        <FormatLabel>Documents</FormatLabel>
        <ComingSoonBadge>Coming Soon</ComingSoonBadge>
      </FormatOption>
      
      <FormatOption>
        <IconContainer>
          <PDFIcon />
        </IconContainer>
        <FormatLabel>PDF</FormatLabel>
        <ComingSoonBadge>Coming Soon</ComingSoonBadge>
      </FormatOption>
      
      <FormatOption>
        <IconContainer>
          <VideoIcon />
        </IconContainer>
        <FormatLabel>Video</FormatLabel>
        <ComingSoonBadge>Coming Soon</ComingSoonBadge>
      </FormatOption>
      
      <FormatOption>
        <IconContainer>
          <AudioIcon />
        </IconContainer>
        <FormatLabel>Audio</FormatLabel>
        <ComingSoonBadge>Coming Soon</ComingSoonBadge>
      </FormatOption>
    </FormatSelectorContainer>
  );
};

export default FormatSelector; 