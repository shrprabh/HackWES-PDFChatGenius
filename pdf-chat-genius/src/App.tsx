import React from 'react';
import './App.css';
import PDFUploader from './components/pdf_uploader/PDFUploader';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>PDF Uploader to Amazon S3</h1>
      <PDFUploader />
    </div>
  );
};

export default App;