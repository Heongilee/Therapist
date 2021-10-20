import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

import './ToastViewer.css';

function ToastViewer({ text }){
	return (
	<Viewer
    initialValue={text}
    
      	/>
	);
}

export default ToastViewer;