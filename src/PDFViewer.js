import React from 'react';
import { useState } from 'react';
import { Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import Draggable from 'react-draggable';

// Headache solved by armin yahya at: https://stackoverflow.com/questions/57749719/using-less-files-with-react
import ResponsiveNav from '@rsuite/responsive-nav';

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
  };

export function PDFViewer(props)
{
    const [file, setFile] = useState('./alice-in-wonderland.pdf');
    const [numPages, setNumPages] = useState(null);
    const [cursorStatus, setCursor] = useState('PDF_Viewer_notgrab');
    const [scaleSize, setScale] = useState(1);
    var [index, setIndex] = useState(1);

    //  Functions related to pdf tab selection
    // Change this up later for multi-pdf support
    const defaultItems = [
      { eventKey: 'A', label: file },
      { eventKey: 'B', label: 'PDF B' },
    ];

    const [activeKey, setActiveKey] = React.useState('A');
    const [items, setItems] = React.useState(defaultItems);
  
    // Functions related to actual PDF page loading
    function onFileChange(event) {
      setFile(event.target.files[0]);
    }
  
    function onDocumentLoadSuccess({ numPages: nextNumPages}) {
      setNumPages(nextNumPages);
    }
  
    function onNextPage(event) {
      setIndex(index+1)
      
      return (index) % numPages;
    }
  
    function onStartGrabbing() {
      setCursor("PDF_Viewer_grab");
    }
  
    function onStopGrabbing() {
      setCursor("PDF_Viewer_notgrab");
    }
  
    function onMouseWheel(event) {
      setScale(scaleSize + (event.deltaY * -0.001));
    }

    return(
    <div className={cursorStatus} onWheel={onMouseWheel} onDoubleClick={onNextPage}>
      <ResponsiveNav
        removable
        appearance="tabs"
        value="dark"
        moreProps={{ noCaret: true }}
        activeKey={activeKey}
        onSelect={setActiveKey}
        onItemRemove={eventKey => {
          const nextItems = [...items];
          nextItems.splice(nextItems.map(item => item.eventKey).indexOf(eventKey), 1);
          setItems(nextItems);
          setActiveKey(nextItems[0] ? nextItems[0].eventKey : null);
        }}
      >
        {items.map(item => (
          <ResponsiveNav.Item key={item.eventKey} eventKey={item.eventKey}>
            {item.label}
          </ResponsiveNav.Item>
        ))}
      </ResponsiveNav>

      <Draggable onStart={onStartGrabbing} onStop={onStopGrabbing}>
        <div className='PDF_Viewer_Draggable'>
          <Document className='PDF_Viewer_Document'
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
          >
              <Page pageNumber={index} scale={scaleSize} renderMode='svg'/>

              {/* This is the default way provided by react-pdf, could be useful for multi-page support? */}
              {/* {
              Array.from(
                  new Array(numPagesRender),
                  (el, arrInd) => (
                      <Page
                      key={`page_${arrInd + index}`}
                      pageNumber={arrInd + index}
                      />
                  ),
                  )
              } */}
              
          </Document>
        </div>
      </Draggable>
    </div>
    );
}