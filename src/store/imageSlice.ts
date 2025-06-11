import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ProcessingMode = 'compress' | 'crop' | 'resize' | 'convert';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageState {
  // Mode selection
  processingMode: ProcessingMode;
  
  // Original image data
  originalImage: File | null;
  originalSize: number | null;
  
  // Compressed image data
  compressedImage: string | null;
  compressedSize: number | null;
  
  // Crop-specific data
  cropArea: CropArea | null;
  croppedImage: string | null;
  croppedSize: number | null;
  
  // Processing states
  isCompressing: boolean;
  isCropping: boolean;
  
  // Error handling
  error: string | null;
  wasAlreadyOptimal: boolean;
}

const initialState: ImageState = {
  processingMode: 'compress',
  originalImage: null,
  originalSize: null,
  compressedImage: null,
  compressedSize: null,
  cropArea: null,
  croppedImage: null,
  croppedSize: null,
  isCompressing: false,
  isCropping: false,
  error: null,
  wasAlreadyOptimal: false,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setProcessingMode: (state, action: PayloadAction<ProcessingMode>) => {
      state.processingMode = action.payload;
      // Clear processed images when switching modes
      if (action.payload !== 'compress') {
        state.compressedImage = null;
        state.compressedSize = null;
      }
      if (action.payload !== 'crop') {
        state.croppedImage = null;
        state.croppedSize = null;
        state.cropArea = null;
      }
      state.error = null;
    },
    setOriginalImage: (state, action: PayloadAction<{ file: File; size: number }>) => {
      state.originalImage = action.payload.file;
      state.originalSize = action.payload.size;
      state.compressedImage = null;
      state.compressedSize = null;
      state.croppedImage = null;
      state.croppedSize = null;
      state.cropArea = null;
      state.error = null;
      state.wasAlreadyOptimal = false;
    },
    setCompressedImage: (state, action: PayloadAction<{ data: string; size: number; wasAlreadyOptimal?: boolean }>) => {
      state.compressedImage = action.payload.data;
      state.compressedSize = action.payload.size;
      state.isCompressing = false;
      state.wasAlreadyOptimal = action.payload.wasAlreadyOptimal || false;
    },
    setCropArea: (state, action: PayloadAction<CropArea | null>) => {
      state.cropArea = action.payload;
    },
    setCroppedImage: (state, action: PayloadAction<{ data: string; size: number }>) => {
      state.croppedImage = action.payload.data;
      state.croppedSize = action.payload.size;
      state.isCropping = false;
    },
    startCompressing: (state) => {
      state.isCompressing = true;
      state.error = null;
    },
    startCropping: (state) => {
      state.isCropping = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isCompressing = false;
      state.isCropping = false;
    },
    resetState: () => initialState,
  },
});

export const { 
  setProcessingMode,
  setOriginalImage, 
  setCompressedImage,
  setCropArea,
  setCroppedImage,
  startCompressing,
  startCropping,
  setError,
  resetState 
} = imageSlice.actions;

export default imageSlice.reducer; 