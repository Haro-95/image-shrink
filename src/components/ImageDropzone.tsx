import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setOriginalImage } from '../store/imageSlice';
import { setError } from '../store/imageSlice';

interface DropContainerProps {
  $isDragActive: boolean;
}

const DropContainer = styled.div<DropContainerProps>`
  border: 2px dashed ${props => props.$isDragActive ? '#6366f1' : '#d1d5db'};
  border-radius: 16px;
  padding: 1.75rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${props => props.$isDragActive ? 'rgba(99, 102, 241, 0.05)' : 'white'};
  cursor: pointer;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: #6366f1;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const AnimatedCircle = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%);
  animation: float 8s ease-in-out infinite;
  z-index: 1;
  opacity: 0.6;
  
  &:nth-child(1) {
    top: -20px;
    left: 10%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    bottom: -40px;
    right: 10%;
    width: 120px;
    height: 120px;
    animation-delay: 2s;
  }
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
`;

const DropText = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin: 0.5rem 0;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  color: #6366f1;
`;

const AcceptedFormats = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.75rem;
`;

const UploadNewHint = styled.p`
  font-size: 0.875rem;
  color: #6366f1;
  font-weight: 500;
  margin-top: 0.5rem;
  background-color: rgba(99, 102, 241, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: inline-block;
`;

const CameraIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.5L9 2.5H15L17.5 5.5H21.5C22.0523 5.5 22.5 5.94772 22.5 6.5V19.5C22.5 20.0523 22.0523 20.5 21.5 20.5H2.5C1.94772 20.5 1.5 20.0523 1.5 19.5V6.5C1.5 5.94772 1.94772 5.5 2.5 5.5H6.5Z" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="4.5" stroke="#6366f1" strokeWidth="1.5"/>
  </svg>
);

const ImageDropzone: React.FC = () => {
  const dispatch = useAppDispatch();
  const { compressedImage } = useAppSelector(state => state.image);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Explicitly check file type to ensure no GIFs are processed
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();
      
      // Only allow jpg, jpeg, png, and webp
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const isGif = fileType === 'image/gif' || fileName.endsWith('.gif');
      
      if (isGif) {
        dispatch(setError('GIF files are not supported. Please use JPG, PNG or WebP formats.'));
        return;
      }
      
      if (!allowedTypes.includes(fileType)) {
        dispatch(setError('Unsupported file format. Please use JPG, PNG or WebP formats.'));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        dispatch(setOriginalImage({
          file,
          size: file.size,
        }));
      };
      
      reader.readAsDataURL(file);
    }
  }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1
  });

  return (
    <DropContainer {...getRootProps()} $isDragActive={isDragActive}>
      <AnimatedCircle />
      <AnimatedCircle />
      <Content>
        <input {...getInputProps()} />
        <IconContainer>
          <CameraIcon />
        </IconContainer>
        {isDragActive ? (
          <DropText>Drop your image here...</DropText>
        ) : (
          <>
            <DropText>
              {compressedImage 
                ? 'Drop a new image to compress' 
                : 'Drag & drop an image here, or click to select'}
            </DropText>
            {compressedImage && 
              <UploadNewHint>Upload new image to start over</UploadNewHint>
            }
          </>
        )}
        <AcceptedFormats>
          Accepts: JPG, PNG, WEBP
        </AcceptedFormats>
      </Content>
    </DropContainer>
  );
};

export default ImageDropzone; 