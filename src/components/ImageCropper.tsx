import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { setCropArea, setCroppedImage, startCropping, setError } from '../store/imageSlice';
import { cropImage, getImageDataUrl, getImageDimensions } from '../services/imageCrop';
import { CropArea } from '../store/imageSlice';

const CropperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
`;

const CropCanvasContainer = styled.div`
  position: relative;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background: #f9fafb;
  user-select: none;
`;

const CropCanvas = styled.canvas`
  display: block;
  cursor: crosshair;
`;

const CropOverlay = styled.div<{ cropArea: CropArea | null }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  
  ${props => props.cropArea ? `
    &::before {
      content: '';
      position: absolute;
      top: ${props.cropArea.y}px;
      left: ${props.cropArea.x}px;
      width: ${props.cropArea.width}px;
      height: ${props.cropArea.height}px;
      border: 2px solid #6366f1;
      border-radius: 4px;
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
      background: transparent;
    }
  ` : ''}
`;

const CropControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CropButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'primary' ? `
    background: #6366f1;
    color: white;
    &:hover:not(:disabled) {
      background: #5856eb;
      transform: translateY(-1px);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    &:hover:not(:disabled) {
      background: #e5e7eb;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AspectRatioButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AspectButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$active ? '#6366f1' : '#d1d5db'};
  background: ${props => props.$active ? '#6366f1' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #6366f1;
  }
`;

const InstructionText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
  max-width: 400px;
`;

interface AspectRatio {
  label: string;
  ratio: number | null; // null for free form
}

const aspectRatios: AspectRatio[] = [
  { label: 'Free', ratio: null },
  { label: '1:1', ratio: 1 },
  { label: '4:3', ratio: 4/3 },
  { label: '16:9', ratio: 16/9 },
  { label: '3:2', ratio: 3/2 },
];

const ImageCropper: React.FC = () => {
  const dispatch = useDispatch();
  const { originalImage, cropArea, isCropping } = useSelector((state: RootState) => state.image);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number | null>(null);

  // Load and draw the original image
  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      // Calculate display size while maintaining aspect ratio
      const maxWidth = 600;
      const maxHeight = 400;
      const aspectRatio = image.width / image.height;
      
      let displayWidth = image.width;
      let displayHeight = image.height;
      
      if (displayWidth > maxWidth) {
        displayWidth = maxWidth;
        displayHeight = displayWidth / aspectRatio;
      }
      
      if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;
      }
      
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      
      setImageDimensions({ width: displayWidth, height: displayHeight });
      
      // Draw the image
      ctx.drawImage(image, 0, 0, displayWidth, displayHeight);
      setImageLoaded(true);
      
      // Set initial crop area (center 70% of image)
      const initialCropWidth = displayWidth * 0.7;
      const initialCropHeight = displayHeight * 0.7;
      const initialCropX = (displayWidth - initialCropWidth) / 2;
      const initialCropY = (displayHeight - initialCropHeight) / 2;
      
      dispatch(setCropArea({
        x: initialCropX,
        y: initialCropY,
        width: initialCropWidth,
        height: initialCropHeight,
      }));
    };

    getImageDataUrl(originalImage).then(dataUrl => {
      image.src = dataUrl;
    }).catch(error => {
      dispatch(setError('Failed to load image for cropping'));
    });
  }, [originalImage, dispatch]);

  // Handle mouse down for starting crop area selection
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x, y });
    
    // Start new crop area
    dispatch(setCropArea({
      x,
      y,
      width: 0,
      height: 0,
    }));
  }, [dispatch]);

  // Handle mouse move for resizing crop area
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDragging || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    let width = currentX - dragStart.x;
    let height = currentY - dragStart.y;
    
    // Apply aspect ratio constraint if selected
    if (selectedAspectRatio) {
      if (Math.abs(width) > Math.abs(height)) {
        height = width / selectedAspectRatio;
      } else {
        width = height * selectedAspectRatio;
      }
    }
    
    // Calculate actual crop area coordinates
    const cropX = width < 0 ? dragStart.x + width : dragStart.x;
    const cropY = height < 0 ? dragStart.y + height : dragStart.y;
    const cropWidth = Math.abs(width);
    const cropHeight = Math.abs(height);
    
    // Constrain to canvas bounds
    const finalX = Math.max(0, Math.min(cropX, canvas.width - cropWidth));
    const finalY = Math.max(0, Math.min(cropY, canvas.height - cropHeight));
    const finalWidth = Math.min(cropWidth, canvas.width - finalX);
    const finalHeight = Math.min(cropHeight, canvas.height - finalY);
    
    if (finalWidth > 5 && finalHeight > 5) {
      dispatch(setCropArea({
        x: finalX,
        y: finalY,
        width: finalWidth,
        height: finalHeight,
      }));
    }
  }, [isDragging, dragStart, selectedAspectRatio, dispatch]);

  // Handle mouse up for finishing crop area selection
  const handleMouseUp = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Handle aspect ratio selection
  const handleAspectRatioSelect = (ratio: number | null) => {
    setSelectedAspectRatio(ratio);
    
    if (ratio && cropArea && imageDimensions.width > 0) {
      // Adjust current crop area to match selected aspect ratio
      const centerX = cropArea.x + cropArea.width / 2;
      const centerY = cropArea.y + cropArea.height / 2;
      
      let newWidth = cropArea.width;
      let newHeight = newWidth / ratio;
      
      // If height exceeds available space, adjust based on height
      if (newHeight > imageDimensions.height * 0.8) {
        newHeight = imageDimensions.height * 0.8;
        newWidth = newHeight * ratio;
      }
      
      // If width exceeds available space, adjust based on width
      if (newWidth > imageDimensions.width * 0.8) {
        newWidth = imageDimensions.width * 0.8;
        newHeight = newWidth / ratio;
      }
      
      const newX = Math.max(0, Math.min(centerX - newWidth / 2, imageDimensions.width - newWidth));
      const newY = Math.max(0, Math.min(centerY - newHeight / 2, imageDimensions.height - newHeight));
      
      dispatch(setCropArea({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      }));
    }
  };

  // Handle crop execution
  const handleCrop = async () => {
    if (!originalImage || !cropArea) return;
    
    try {
      dispatch(startCropping());
      
      // Get original image dimensions
      const originalDimensions = await getImageDimensions(originalImage);
      
      // Calculate scale factors between display and original image
      const scaleX = originalDimensions.width / imageDimensions.width;
      const scaleY = originalDimensions.height / imageDimensions.height;
      
      // Convert crop area to original image coordinates
      const originalCropArea = {
        x: Math.round(cropArea.x * scaleX),
        y: Math.round(cropArea.y * scaleY),
        width: Math.round(cropArea.width * scaleX),
        height: Math.round(cropArea.height * scaleY),
      };
      
      // Ensure crop area is within original image bounds
      const finalCropArea = {
        x: Math.max(0, Math.min(originalCropArea.x, originalDimensions.width)),
        y: Math.max(0, Math.min(originalCropArea.y, originalDimensions.height)),
        width: Math.min(originalCropArea.width, originalDimensions.width - originalCropArea.x),
        height: Math.min(originalCropArea.height, originalDimensions.height - originalCropArea.y),
      };
      
      const { croppedFile, croppedUrl } = await cropImage(originalImage, finalCropArea);
      
      dispatch(setCroppedImage({
        data: croppedUrl,
        size: croppedFile.size,
      }));
      
      // Scroll to show the before/after comparison
      setTimeout(() => {
        const previewElement = document.querySelector('[data-testid="image-preview"]');
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to crop image'));
    }
  };

  // Reset crop area
  const handleResetCrop = () => {
    if (imageDimensions.width > 0) {
      const resetCropWidth = imageDimensions.width * 0.7;
      const resetCropHeight = imageDimensions.height * 0.7;
      const resetCropX = (imageDimensions.width - resetCropWidth) / 2;
      const resetCropY = (imageDimensions.height - resetCropHeight) / 2;
      
      dispatch(setCropArea({
        x: resetCropX,
        y: resetCropY,
        width: resetCropWidth,
        height: resetCropHeight,
      }));
    }
  };

  if (!originalImage) {
    return (
      <CropperContainer>
        <InstructionText>Please upload an image first to start cropping.</InstructionText>
      </CropperContainer>
    );
  }

  return (
    <CropperContainer>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700' }}>
          Crop Your Image
        </h2>
        <InstructionText>
          Click and drag on the image below to select the area you want to crop.
        </InstructionText>
      </div>
      
      <CropCanvasContainer>
        <CropCanvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <CropOverlay cropArea={cropArea} />
      </CropCanvasContainer>
      
      {imageLoaded && (
        <>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: '600', color: '#374151', textAlign: 'center' }}>
              Aspect Ratio:
            </p>
            <AspectRatioButtons>
              {aspectRatios.map((aspect) => (
                <AspectButton
                  key={aspect.label}
                  $active={selectedAspectRatio === aspect.ratio}
                  onClick={() => handleAspectRatioSelect(aspect.ratio)}
                >
                  {aspect.label}
                </AspectButton>
              ))}
            </AspectRatioButtons>
          </div>
          
          <CropControls>
            <CropButton
              $variant="primary"
              onClick={handleCrop}
              disabled={!cropArea || isCropping || cropArea.width < 10 || cropArea.height < 10}
            >
              {isCropping ? 'Cropping...' : 'Crop Image'}
            </CropButton>
            <CropButton
              $variant="secondary"
              onClick={handleResetCrop}
              disabled={isCropping}
            >
              Reset Selection
            </CropButton>
          </CropControls>
        </>
      )}
    </CropperContainer>
  );
};

export default ImageCropper; 