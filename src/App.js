import React from 'react';
import {pdfjs} from 'react-pdf';

import './App.css';
import {PDFViewer} from './PDFViewer.js';

// Component library imports
import {Sidenav,Nav,Dropdown} from 'rsuite';

//import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
  
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// Create Document Component
export default function App() {

  const [active, setActive] = React.useState('home');

  return(
    <div className="overpage">
      <div className='file_menu'>
        <Nav appearance="subtle" activeKey={active} onSelect={setActive}>
          <Nav.Item eventKey="home">Files</Nav.Item>
          <Nav.Item eventKey="news">Bookmarks</Nav.Item>
          <Nav.Item eventKey="solutions">Forms</Nav.Item>
          <Nav.Item eventKey="products">About</Nav.Item>
          <Nav.Item eventKey="about">Etc</Nav.Item>
        </Nav>
      </div>

      {/* Container for PDF Library containing thumbnails */}
      <div className='PDF_Library'>
        <h1>Images go here</h1>
      </div>

      {/* Container for toolbar and pdf viewer */}
      <div className='PDF_Content'>
        <div className='PDF_Toolbar'>
        <div style={{ width: 240 }}>
          <Sidenav defaultOpenKeys={['3', '4']} activeKey="1">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1">
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2">
                  User Group
                </Nav.Item>
                <Dropdown eventKey="3" title="Advanced">
                  <Dropdown.Item eventKey="3-1">Geo</Dropdown.Item>
                  <Dropdown.Item eventKey="3-2">Devices</Dropdown.Item>
                  <Dropdown.Item eventKey="3-3">Loyalty</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4">Visit Depth</Dropdown.Item>
                </Dropdown>
                <Dropdown eventKey="4" title="Settings">
                  <Dropdown.Item eventKey="4-1">Applications</Dropdown.Item>
                  <Dropdown.Item eventKey="4-2">Channels</Dropdown.Item>
                  <Dropdown.Item eventKey="4-3">Versions</Dropdown.Item>
                  <Dropdown.Menu eventKey="4-5" title="Custom Action">
                    <Dropdown.Item eventKey="4-5-1">Action Name</Dropdown.Item>
                    <Dropdown.Item eventKey="4-5-2">Action Params</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
        </div>

        <PDFViewer/>

      </div>

      {/* Maybe a nice place for annotating pages? Could be worth exporting seperate from actual pdf's */}
      <div className='PDF_Footer'><h1>Footer?</h1></div>
    </div>
  );
};