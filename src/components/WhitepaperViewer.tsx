// components/WhitepaperViewer.tsx

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { DocumentProps } from 'react-pdf';

interface PDFViewerWrapperProps {
  children: React.ReactNode;
}

const PDFViewerWrapper: React.FC<PDFViewerWrapperProps> = ({ children }) => (
  <div style={{ backgroundColor: '#26437d', width: '100%', height: '100%' }}>
    {children}
  </div>
);

const PDFViewer = dynamic<DocumentProps>(() => import('react-pdf').then(mod => ({
  default: (props: DocumentProps) => (
    <PDFViewerWrapper>
      <mod.Document {...props} />
    </PDFViewerWrapper>
  )
})), {
  ssr: false,
  loading: () => <p className="pdf-loading-text" style={{ backgroundColor: '#26437d' }}>Loading PDF...</p>
});

const PageComponent = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Page })), {
  ssr: false,
});

interface WhitepaperViewerProps {
  id?: string;
}

export default function WhitepaperViewer({ id }: WhitepaperViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => ({
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/cmaps/',
    cMapPacked: true,
    disableTextLayer: true,
    disableWorker: false,
  }), []);

  useEffect(() => {
    import('react-pdf').then(mod => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.pdfjs.version}/pdf.worker.min.mjs`;
    });

    const updateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const aspectRatio = 1417 / 1062;
      
      const scaleByWidth = viewportWidth / 1417;
      const scaleByHeight = viewportHeight / 1062;
      const scale = Math.min(scaleByWidth, scaleByHeight);
      
      setContainerSize({
        width: 1417 * scale,
        height: 1062 * scale
      });
    };

    const preventScroll = (e: WheelEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    const handleMouseEnter = () => {
      (window.top as Window).postMessage({ source: 'DEGEN_POV_NFT', action: 'DISABLE_SCROLL' }, '*');
    };

    const handleMouseLeave = () => {
      (window.top as Window).postMessage({ source: 'DEGEN_POV_NFT', action: 'ENABLE_SCROLL' }, '*');
    };

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('wheel', preventScroll, { passive: false });
    containerRef.current?.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('wheel', preventScroll);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomChange = (newScale: number) => {
    setScale(Math.max(0.5, Math.min(newScale, 3)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSliderDragging) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && !isSliderDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      const maxX = (containerSize.width * (scale - 1)) / 2;
      const maxY = (containerSize.height * (scale - 1)) / 2;
      const boundedX = Math.max(-maxX, Math.min(maxX, newX));
      const boundedY = Math.max(-maxY, Math.min(maxY, newY));
      setPosition({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsSliderDragging(false);
  };

  const handleMouseLeave = () => {
    handleMouseUp();
    setIsMouseOver(false);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden pdf-loading-text"
      style={{ fontFamily: '"Coming Soon", cursive', backgroundColor: '#26437d', touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsMouseOver(true)}
    >
      <div className="flex items-center mb-4">
        <button
          className="p-2 mr-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center justify-center"
          style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
          onClick={() => handleZoomChange(Math.max(scale - 0.1, 0.5))}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'url(#hand-drawn)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM5 10h14" />
          </svg>
        </button>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={scale}
          onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsSliderDragging(true)}
          onMouseUp={() => setIsSliderDragging(false)}
          className="w-64 mx-4"
        />
        <button
          className="p-2 ml-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center justify-center"
          style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
          onClick={() => handleZoomChange(Math.min(scale + 0.1, 3))}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'url(#hand-drawn)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>
      <div className="flex-grow w-full overflow-hidden flex items-center justify-center pdf-loading-text"
      style={{backgroundColor: '#26437d', position: 'relative'}} >
        <div style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.1s' }}>
          <PDFViewer
            file="/whitepaper/degenpovwhitepaper.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            className="pdf-loading-text"
          >
            <PageComponent
              pageNumber={pageNumber}
              width={containerSize.width * 0.95}
              height={(containerSize.height - 70) * 0.95}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-loading-text"
              canvasBackground='#26437d'
            />
          </PDFViewer>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 w-full">
        <button
          className="px-4 py-2 mr-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center"
          style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Previous
        </button>
        <span className="mx-4" style={{ color: '#ffff33', fontWeight: 'bold' }}>
          Page {pageNumber} / {numPages}
        </span>
        <button
          className="px-4 py-2 ml-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center"
          style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= (numPages || 0)}
        >
          Next
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      <svg width="0" height="0">
        <filter id="hand-drawn">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
        </filter>
      </svg>
    </div>
  );

}
