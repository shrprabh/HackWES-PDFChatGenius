import React from 'react';

// Define the type for the props
interface PDFViewerProps {
  pdfLink?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = () => {
  // Static PDF link
  const pdfLink = "https://firebasestorage.googleapis.com/v0/b/hackwest-dee28.appspot.com/o/hackwest%2FHackWest.pdf?alt=media&token=ffe57b4e-9cf0-4ae8-930c-eca8a622d88d";

  return (
    <div>
      {pdfLink ? (
        <iframe
          src={pdfLink}
          width="100%"
          height="850px"
          title="PDF Viewer"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <div>
          <h1>PDF Viewer</h1>
          <p>No PDF uploaded yet. Please upload a PDF in the chat window.</p>
        </div>
      )}
    </div>
  );
};
