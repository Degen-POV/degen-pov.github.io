export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['index'] },
  ];
}
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Document })), {
  ssr: false,
  loading: () => <p className="pdf-loading-text">Loading PDF...</p>
});

const PageComponent = dynamic(() => import('react-pdf').then(mod => ({ default: mod.Page })), {
  ssr: false,
});

export default function Whitepaper() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

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

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-hidden" style={{ fontFamily: '"Coming Soon", cursive', backgroundColor: '#26437d' }}>
      <div className="flex flex-col items-center" style={{ width: `${containerSize.width}px`, height: `${containerSize.height}px`, backgroundColor: '#26437d' }}>
      <div className="flex-grow w-full overflow-hidden flex items-center justify-center bg-gray-100"
      style={{backgroundColor: '#26437d'}} >
        <PDFViewer
            file="/whitepaper/degenpov_whitepaper.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <PageComponent 
              pageNumber={pageNumber} 
              width={containerSize.width * 0.95}
              height={(containerSize.height - 70) * 0.95} // 95% of available height
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </PDFViewer>
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
    </div>
  );
}
