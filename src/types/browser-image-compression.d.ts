declare module 'browser-image-compression' {
  interface Options {
    maxSizeMB: number;
    maxWidthOrHeight?: number;
    useWebWorker?: boolean;
    maxIteration?: number;
    exifOrientation?: number;
    fileType?: string;
    initialQuality?: number;
    alwaysKeepResolution?: boolean;
    onProgress?: (progress: number) => void;
  }

  function imageCompression(file: File, options: Options): Promise<File>;
  
  namespace imageCompression {
    function getDataUrlFromFile(file: File): Promise<string>;
    function loadImage(url: string): Promise<HTMLImageElement>;
    function drawImageInCanvas(img: HTMLImageElement): HTMLCanvasElement;
    function canvasToFile(
      canvas: HTMLCanvasElement,
      fileType: string,
      fileName: string,
      fileLastModified: number,
      quality?: number
    ): Promise<File>;
    function getExifOrientation(file: File): Promise<number>;
  }

  export default imageCompression;
} 