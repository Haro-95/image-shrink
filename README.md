# ImageShrink

A modern image compression web application with a focus on quality.

## Features

- High-quality image compression with minimal quality loss
- Supports JPG, PNG, and WebP formats
- Client-side processing (your images never leave your browser)
- Preserves original image dimensions
- Clean, intuitive user interface
- Shows compression statistics and savings
- Works entirely in the browser - no server uploads required

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Haro-95/image-shrink.git
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## How It Works

1. Upload an image via drag-and-drop or file selection
2. The app compresses the image in the browser using the browser-image-compression library
3. Compression preserves original dimensions while reducing file size
4. The app shows both original and compressed versions for comparison
5. You can download the compressed image or compress another

## Future Features

- Document compression
- PDF optimization
- Video compression
- Audio optimization
- Batch processing

## License

MIT

## Author

Developed by Haro Abdulah

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
