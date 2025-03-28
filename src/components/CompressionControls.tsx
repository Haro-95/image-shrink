import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setCompressedImage, startCompressing, setError } from '../store/imageSlice';
import { compressImage } from '../services/imageCompression';

const ControlsContainer = styled.div`
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
  }
`;

const Title = styled.h3`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const QualityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0 auto 1.25rem;
  padding: 0.4rem 0.8rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #4f46e5;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  
  svg {
    margin-right: 0.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 300px;
  margin: 0 auto;
  width: 100%;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
  }
  
  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 25%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: -1;
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:not(:disabled):active {
    transform: scale(0.98);
  }
`;

const LoadingButton = styled(Button)`
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  background-size: 400% 100%;
  animation: ${shimmer} 3s linear infinite;
  
  &::before {
    display: none;
  }
`;

const DownloadButton = styled(Button)`
  background: linear-gradient(45deg, #059669, #10b981);
  animation: ${pulse} 2s infinite;
  
  &:hover {
    background: linear-gradient(45deg, #047857, #059669);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 0.5rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LoadingSpinner = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      .spinner {
        transform-origin: center;
        animation: spinner 1s linear infinite;
      }
      @keyframes spinner {
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <circle
      className="spinner"
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const QualityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M12 3L13.9101 4.20084C14.5038 4.55103 15.2646 4.43202 15.7281 3.96853L17.5 2.19661L19.8034 4.5L18.0315 6.27188C17.568 6.73537 17.449 7.49625 17.7992 8.08992L19 10L19 13L17.7992 14.9101C17.449 15.5038 17.568 16.2646 18.0315 16.7281L19.8034 18.5L17.5 20.8034L15.7281 19.0315C15.2646 18.568 14.5038 18.449 13.9101 18.7992L12 20L9 20L7.08992 18.7992C6.49625 18.449 5.73537 18.568 5.27188 19.0315L3.5 20.8034L1.19661 18.5L2.96853 16.7281C3.43202 16.2646 3.55103 15.5038 3.20084 14.9101L2 13L2 10L3.20084 8.08992C3.55103 7.49625 3.43202 6.73537 2.96853 6.27188L1.19661 4.5L3.5 2.19661L5.27188 3.96853C5.73537 4.43202 6.49625 4.55103 7.08992 4.20084L9 3L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompressionControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { originalImage, compressedImage, isCompressing, error } = useAppSelector(state => state.image);

  const handleCompressClick = async () => {
    if (!originalImage) return;
    
    dispatch(startCompressing());
    
    try {
      // We now use the optimized settings from the service
      // which prioritizes quality above all else
      const { compressedFile, compressedUrl, wasAlreadyOptimal } = await compressImage(originalImage);
      
      dispatch(setCompressedImage({
        data: compressedUrl,
        size: compressedFile.size,
        wasAlreadyOptimal
      }));
    } catch (err) {
      dispatch(setError('Failed to compress image. Please try again.'));
    }
  };

  const handleDownloadClick = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `optimized-${originalImage?.name || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!originalImage) return null;

  return (
    <ControlsContainer>
      <Title>Premium Image Compression</Title>
      <Description>
        Our algorithm intelligently compresses your image while preserving
        maximum quality. We prioritize crystal-clear results, even if it means
        less size reduction.
      </Description>
      
      <QualityBadge>
        <QualityIcon /> Maximum Quality Preserved
      </QualityBadge>
      
      <ButtonContainer>
        {isCompressing ? (
          <LoadingButton disabled>
            <ButtonText>
              <LoadingSpinner /> Optimizing with care...
            </ButtonText>
          </LoadingButton>
        ) : (
          <Button 
            onClick={handleCompressClick} 
            disabled={isCompressing}
          >
            Compress Image
          </Button>
        )}
        
        {compressedImage && (
          <DownloadButton onClick={handleDownloadClick}>
            Download Optimized Image
          </DownloadButton>
        )}
      </ButtonContainer>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ControlsContainer>
  );
};

export default CompressionControls; 