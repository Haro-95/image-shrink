import { CropArea } from '../store/imageSlice';

/**
 * Crops an image based on the specified crop area
 * 
 * @param file - The original image file to crop
 * @param cropArea - The crop area coordinates and dimensions
 * @param quality - JPEG quality (0-1) for output, defaults to 0.95
 * @returns Promise containing the cropped file and URL
 */
export const cropImage = async (
  file: File,
  cropArea: CropArea,
  quality: number = 0.95
): Promise<{ croppedFile: File; croppedUrl: string }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    
    image.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }
        
        // Set canvas dimensions to crop area dimensions
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        
        // Draw the cropped portion of the image
        ctx.drawImage(
          image,
          cropArea.x, cropArea.y, cropArea.width, cropArea.height, // Source rectangle
          0, 0, cropArea.width, cropArea.height // Destination rectangle
        );
        
        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create blob from canvas'));
              return;
            }
            
            // Create new file with cropped prefix
            const originalName = file.name;
            const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
            const baseName = originalName.substring(0, originalName.lastIndexOf('.'));
            const croppedFileName = `cropped-${baseName}${fileExtension}`;
            
            const croppedFile = new File([blob], croppedFileName, {
              type: file.type,
              lastModified: Date.now(),
            });
            
            // Create data URL for display
            const reader = new FileReader();
            reader.onload = () => {
              const croppedUrl = reader.result as string;
              resolve({ croppedFile, croppedUrl });
            };
            reader.readAsDataURL(blob);
          },
          file.type,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };
    
    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Load the image
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        image.src = e.target.result as string;
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Converts image file to data URL for display
 */
export const getImageDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Gets image dimensions from file
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    
    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
    
    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        image.src = e.target.result as string;
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
}; 