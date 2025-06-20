import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Image, Crop, Maximize, Download } from 'react-feather';
import { RootState } from '../store';
import { setProcessingMode, ProcessingMode } from '../store/imageSlice';

const FormatSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0 1.5rem;
  gap: 2rem;
  flex-wrap: wrap;
`;

const FormatOption = styled.div<{ $active?: boolean; $clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  opacity: ${props => props.$active ? 1 : 0.7};
  transition: all 0.2s ease;
  position: relative;
  padding: 0.5rem;
  width: 85px;
  
  &:hover {
    transform: ${props => props.$clickable ? 'translateY(-5px)' : 'none'};
  }
`;

const IconContainer = styled.div<{ $active?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.$active ? '#6366f1' : '#e5e7eb'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${props => props.$active ? 'white' : '#6b7280'};
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(99, 102, 241, 0.25)' : 'none'};
  transition: all 0.2s ease;
`;

const FormatLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  text-align: center;
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

const FormatSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { processingMode } = useSelector((state: RootState) => state.image);

  const handleModeSelect = (mode: ProcessingMode) => {
    // Only allow compress and crop for now
    if (mode === 'compress' || mode === 'crop') {
      dispatch(setProcessingMode(mode));
    }
  };

      return (
      <FormatSelectorContainer>
        <FormatOption 
          $active={processingMode === 'compress'}
          $clickable={true}
          onClick={() => handleModeSelect('compress')}
        >
          <IconContainer $active={processingMode === 'compress'}>
            <Image size={24} strokeWidth={2} />
          </IconContainer>
          <FormatLabel>Compress</FormatLabel>
        </FormatOption>
        
        <FormatOption 
          $active={processingMode === 'crop'}
          $clickable={true}
          onClick={() => handleModeSelect('crop')}
        >
          <IconContainer $active={processingMode === 'crop'}>
            <Crop size={24} strokeWidth={2} />
          </IconContainer>
          <FormatLabel>Image Crop</FormatLabel>
        </FormatOption>
        
        <FormatOption $clickable={false}>
          <IconContainer>
            <Maximize size={24} strokeWidth={2} />
          </IconContainer>
          <FormatLabel>Resize</FormatLabel>
          <ComingSoonBadge>Coming Soon</ComingSoonBadge>
        </FormatOption>
        
        <FormatOption $clickable={false}>
          <IconContainer>
            <Download size={24} strokeWidth={2} />
          </IconContainer>
          <FormatLabel>Convert Format</FormatLabel>
          <ComingSoonBadge>Coming Soon</ComingSoonBadge>
        </FormatOption>
      </FormatSelectorContainer>
    );
};

export default FormatSelector; 