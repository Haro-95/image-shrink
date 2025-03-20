# Image Shrink

A modern React application for compressing and optimizing images with a clean, responsive user interface.

## Features

- Drag and drop interface for easy image uploading
- Client-side image compression (no data is sent to any server)
- Adjustable compression settings (target size and resolution)
- Side-by-side comparison of original and compressed images
- Size reduction statistics
- Download compressed images with a single click
- Fully responsive design for all device sizes

## Technologies Used

- React.js with TypeScript
- Redux Toolkit for state management
- Styled Components for styling
- Browser-image-compression for image optimization
- React Dropzone for file uploading

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/image-compressor.git
   cd image-compressor
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Build for Production

To build the app for production, run:

```
npm run build
```

or

```
yarn build
```

This will create a `build` folder with optimized production files.

## How It Works

The application uses browser-image-compression to compress images directly in the browser. The compression process:

1. Reduces file size by optimizing the image quality
2. Optionally scales down the resolution if it exceeds the maximum dimensions
3. Maintains the original aspect ratio
4. Works with JPG, PNG, GIF, and WebP formats

## Privacy

All processing happens directly in your browser. No images are uploaded to any server, ensuring complete privacy.

## Note on Fonts

The application uses specific fonts for its UI. If you don't have the same fonts installed on your system, the application might not display exactly as expected. For the best experience, ensure you have the required fonts installed or use the web-hosted version.

## License

MIT License

## Acknowledgements

- [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
- [React Dropzone](https://react-dropzone.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)

## Author

Developed by Haro Abdulah
