// components/Layout.tsx
import React, { useState } from 'react';
import { Header } from './Header';
import { ChatWindow } from './ChatWindow';
import { Footer } from './Footer';
import { PDFViewer } from './PDFViewer';

export const Layout = () => {

    const [pdfLink, setPdfLink] = useState("");

    const setPdfLinkHelper = (url: string) => {
        setPdfLink(url);
    }

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-12 col-md-6 pe-0">
          <PDFViewer pdfLink={pdfLink}/>
        </div>
        <div className="col-12 col-md-6 ps-0">
          <ChatWindow setPdfUrl={setPdfLinkHelper}/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;