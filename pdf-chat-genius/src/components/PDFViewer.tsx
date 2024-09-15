import React from 'react';

// Define the type for the props
interface PDFViewerProps {
  pdfLink?: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = (PDFViewerProp) => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden', backgroundColor: '#f5f5dc', padding: '20px', fontFamily: 'Georgia, serif', color: '#4a4a4a' }}>
      {PDFViewerProp.pdfLink ? (
        <iframe
          src={PDFViewerProp.pdfLink}
          width="100%"
          height="90%"
          title="PDF Viewer"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#8b4513' }}>Welcome to HackWesTX Chat Genius</h1>
          <p style={{ fontSize: '18px', marginBottom: '20px', backgroundColor: '#ff6600', color: '#fff', padding: '10px', borderRadius: '5px' }}>
            Your AI-powered PDF assistant is ready to help!
          </p>
          <p style={{ fontSize: '16px', marginTop: '20px', color: '#666' }}>
            Enjoy free access and unlimited chats. Upload any PDF to study and get answers like a pro. Prepare for exams efficiently without reading every page. View both PDF and chat side by side.
          </p>
        </div>
      )}
    </div>
  );
};