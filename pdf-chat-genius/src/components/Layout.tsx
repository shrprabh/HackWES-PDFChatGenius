// components/Layout.tsx
import React from 'react';
import { Header } from './Header';
import { ChatWindow } from './ChatWindow';
import { Footer } from './Footer';
import { PDFViewer } from './PDFViewer';

export const Layout = () => {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-12 col-md-6">
          <PDFViewer />
        </div>
        <div className="col-12 col-md-6">
          <ChatWindow />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;