// Pass base64String then render pdf
import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ base64String }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="viewer">

        {/* render this if we have a pdf file */}
        {base64String&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={base64String}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!base64String&&<p style={{color:"red",font:"25px"}}>No file is selected or submitted</p>}

      </div>
  );
};

export default PdfViewer;
