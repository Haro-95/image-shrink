import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/useRedux';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  position: relative;
  
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
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 auto;
  max-height: 100%;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.5rem;
  object-fit: contain;
`;

const DownloadButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.85);
  color: #6366f1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background-color: #6366f1;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ImageInfo = styled.div`
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

const ReductionBadge = styled.span<{ $reduction: number; $isOptimal?: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.75rem;
  background-color: ${props => {
    if (props.$isOptimal) return '#8b5cf6'; // Purple for already optimal
    return props.$reduction > 0 ? '#10b981' : '#ef4444'; // Green for reduction, red for larger
  }};
  color: white;
  box-shadow: 0 2px 5px ${props => {
    if (props.$isOptimal) return 'rgba(139, 92, 246, 0.3)'; // Purple shadow
    return props.$reduction > 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
  }};
`;

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

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
  const { 
    originalImage, 
    originalSize, 
    compressedImage, 
    compressedSize, 
    croppedImage,
    croppedSize,
    processingMode,
    wasAlreadyOptimal 
  } = useAppSelector(state => state.image);

  if (!originalImage) return null;

  // Determine which processed image to show based on mode
  const processedImage = processingMode === 'crop' ? croppedImage : compressedImage;
  const processedSize = processingMode === 'crop' ? croppedSize : compressedSize;
  const processedTitle = processingMode === 'crop' ? 'Cropped' : 'Compressed';
  
  // In crop mode, only show comparison when cropping is complete
  if (processingMode === 'crop' && !croppedImage) return null;

  const reduction = originalSize && processedSize 
    ? calculateReduction(originalSize, processedSize)
    : 0;

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    const prefix = processingMode === 'crop' ? 'cropped' : 'optimized';
    link.download = `${prefix}-${originalImage?.name || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PreviewContainer data-testid="image-preview">
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

      {processedImage && (
        <ImageCard>
          <ImageHeader>
            <ImageTitle>{processedTitle}</ImageTitle>
          </ImageHeader>
          <ImageContent>
            <ImageWrapper>
              <StyledImage src={processedImage} alt={processedTitle} />
              <DownloadButton 
                onClick={handleDownload} 
                title={`Download ${processedTitle.toLowerCase()} image`}
              >
                <DownloadIcon />
              </DownloadButton>
            </ImageWrapper>
          </ImageContent>
          <ImageInfo>
            <SizeInfo>Size: {formatSize(processedSize || 0)}</SizeInfo>
            {processingMode === 'compress' && (
              <ReductionBadge $reduction={reduction} $isOptimal={wasAlreadyOptimal}>
                {wasAlreadyOptimal
                  ? "Already Optimal"
                  : reduction > 0 
                    ? `${reduction.toFixed(1)}% smaller` 
                    : `${Math.abs(reduction).toFixed(1)}% larger`}
              </ReductionBadge>
            )}
            {processingMode === 'crop' && processedSize && (
              <ReductionBadge $reduction={0}>
                Cropped
              </ReductionBadge>
            )}
          </ImageInfo>
        </ImageCard>
      )}
    </PreviewContainer>
  );
};

export default ImagePreview; 