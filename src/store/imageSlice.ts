import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  originalImage: File | null;
  compressedImage: string | null;
  compressedSize: number | null;
  originalSize: number | null;
  isCompressing: boolean;
  error: string | null;
  wasAlreadyOptimal: boolean;
}

const initialState: ImageState = {
  originalImage: null,
  compressedImage: null,
  compressedSize: null,
  originalSize: null,
  isCompressing: false,
  error: null,
  wasAlreadyOptimal: false,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setOriginalImage: (state, action: PayloadAction<{ file: File; size: number }>) => {
      state.originalImage = action.payload.file;
      state.originalSize = action.payload.size;
      state.compressedImage = null;
      state.compressedSize = null;
      state.error = null;
      state.wasAlreadyOptimal = false;
    },
    setCompressedImage: (state, action: PayloadAction<{ data: string; size: number; wasAlreadyOptimal?: boolean }>) => {
      state.compressedImage = action.payload.data;
      state.compressedSize = action.payload.size;
      state.isCompressing = false;
      state.wasAlreadyOptimal = action.payload.wasAlreadyOptimal || false;
    },
    startCompressing: (state) => {
      state.isCompressing = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isCompressing = false;
    },
    resetState: () => initialState,
  },
});

export const { 
  setOriginalImage, 
  setCompressedImage, 
  startCompressing, 
  setError,
  resetState 
} = imageSlice.actions;

export default imageSlice.reducer; 