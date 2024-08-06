import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';

interface PDFViewerWrapperProps {
  children: React.ReactNode;
}

const PDFViewerWrapper: React.FC<PDFViewerWrapperProps> = ({ children }) => (
  <div style={{ backgroundColor: '#26437d', width: '100%', height: '100%' }}>
    {children}
  </div>
);

const PDFViewer = dynamic(() => import('react-pdf').then(mod => ({
  default: (props: any) => (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const isJson = context.req.url?.endsWith('.json') || false;

  if (isJson) {
    const metadata = generateMetadata('default');
    context.res.setHeader('Content-Type', 'application/json');
    context.res.write(JSON.stringify(metadata));
    context.res.end();
    return { props: {} };
  }

  return { props: { isJson } };
};

export default function Whitepaper() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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
      if (viewportWidth / viewportHeight < aspectRatio) {
        setContainerSize({ width: viewportWidth, height: viewportWidth / aspectRatio });
      } else {
        setContainerSize({ width: viewportHeight * aspectRatio, height: viewportHeight });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    const preventDefault = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prevScale => Math.max(0.5, Math.min(prevScale + delta, 3)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
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
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      e.currentTarget.dataset.pinchDistance = distance.toString();
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const prevDistance = parseFloat(e.currentTarget.dataset.pinchDistance || '0');
      const delta = distance - prevDistance;
      setScale(prevScale => Math.max(0.5, Math.min(prevScale + delta * 0.01, 3)));
      e.currentTarget.dataset.pinchDistance = distance.toString();
    }
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen overflow-hidden pdf-loading-text"
      style={{ fontFamily: '"Coming Soon", cursive', backgroundColor: '#26437d', touchAction: 'none' }}
      onWheel={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="flex flex-col items-center relative" style={{ width: `${containerSize.width}px`, height: `${containerSize.height}px`, backgroundColor: '#26437d' }}>
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
          <div className="absolute top-2 right-2 flex flex-col">
            <button
              className="p-2 mb-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center justify-center"
              style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
              onClick={handleZoomIn}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'url(#hand-drawn)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>
            <button
              className="p-2 rounded transform transition-transform duration-200 hover:scale-110 flex items-center justify-center"
              style={{ backgroundColor: '#2e4d8f', color: '#ffff33', fontWeight: 'bold' }}
              onClick={handleZoomOut}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'url(#hand-drawn)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM5 10h14" />
              </svg>
            </button>
          </div>
        <div className="flex justify-center items-center mt-2 mb-2 w-full">
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

function generateMetadata(id: string) {
  return {
    platform: "Degen POV",
    name: `Degen POV Whitepaper NFT #${id}`,
    background_color: "26437d",
    curation_status: "curated",
    series: "1",
    description: "Congratulations, degen!\n\nYou got an exclusive NFT of the Degen POV Whitepaper.\nOnly given to the biggest degens.\n\nHow do we know you're a degen?\nYou got this NFT didn't you?",
    external_url: `https://degenpov.me/whitepaper/${id}`,
    collection_name: "Degen POV Whitepaper",
    attributes: [
      { trait_type: "Degen Level", value: "Maximum" },
      { trait_type: "Type", value: "Interactive Whitepaper" }
    ],
    animation_url: `https://degenpov.me/whitepaper/${id}`,
    image: "https://degenpov.me/whitepaper/degenpovcover.png",
    interactive_nft: {
      code_uri: `https://degenpov.me/whitepaper/${id}`,
      version: "1.0"
    },
    properties: {
      cover_image: "https://degenpov.me/whitepaper/degenpovcover.png",
      website: "https://degenpov.me/",
      whitepaper: "https://degenpov.me/whitepaper/degenpovwhitepaper.pdf",
      linktree: "https://linktr.ee/degenpovcto"
    }
  };
}
