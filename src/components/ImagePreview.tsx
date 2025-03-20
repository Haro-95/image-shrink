import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useRedux';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;

const ImageCard = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0;
  font-weight: 600;
  color: #111827;
`;

const ImageContent = styled.div`
  padding: 1rem;
  text-align: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.5rem;
  object-fit: contain;
`;

const ImageInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  color: #4b5563;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SizeInfo = styled.div`
  font-weight: 500;
`;

const ReductionBadge = styled.span<{ reduction: number; isOptimal?: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.75rem;
  background-color: ${props => {
    if (props.isOptimal) return '#8b5cf6'; // Purple for already optimal
    return props.reduction > 0 ? '#10b981' : '#ef4444'; // Green for reduction, red for larger
  }};
  color: white;
  box-shadow: 0 2px 5px ${props => {
    if (props.isOptimal) return 'rgba(139, 92, 246, 0.3)'; // Purple shadow
    return props.reduction > 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
  }};
`;

const formatSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
};

const calculateReduction = (original: number, compressed: number): number => {
  return ((original - compressed) / original) * 100;
};

const ImagePreview: React.FC = () => {
  const { originalImage, originalSize, compressedImage, compressedSize, wasAlreadyOptimal } = useAppSelector(state => state.image);

  if (!originalImage) return null;

  const reduction = originalSize && compressedSize 
    ? calculateReduction(originalSize, compressedSize)
    : 0;

  return (
    <PreviewContainer>
      <ImageCard>
        <ImageHeader>
          <ImageTitle>Original</ImageTitle>
        </ImageHeader>
        <ImageContent>
          <StyledImage src={URL.createObjectURL(originalImage)} alt="Original" />
        </ImageContent>
        <ImageInfo>
          <SizeInfo>Size: {formatSize(originalSize || 0)}</SizeInfo>
        </ImageInfo>
      </ImageCard>

      {compressedImage && (
        <ImageCard>
          <ImageHeader>
            <ImageTitle>Compressed</ImageTitle>
          </ImageHeader>
          <ImageContent>
            <StyledImage src={compressedImage} alt="Compressed" />
          </ImageContent>
          <ImageInfo>
            <SizeInfo>Size: {formatSize(compressedSize || 0)}</SizeInfo>
            <ReductionBadge reduction={reduction} isOptimal={wasAlreadyOptimal}>
              {wasAlreadyOptimal
                ? "Already Optimal"
                : reduction > 0 
                  ? `${reduction.toFixed(1)}% smaller` 
                  : `${Math.abs(reduction).toFixed(1)}% larger`}
            </ReductionBadge>
          </ImageInfo>
        </ImageCard>
      )}
    </PreviewContainer>
  );
};

export default ImagePreview; 