// Sftp.tsx
import React, { useState } from 'react';
// import Login from './Login';
import FileList from './FileList';
import '@pages/apps/Sftp.css';

interface SftpParams {
  appId: string;
}

const Sftp: React.FC<SftpParams> = ({ appId }) => {

  return (
    <div className="sftp-container">
      {/* <FileList files={files} onFileClick={handleFileClick} /> */}
      <FileList appId={appId}/>
      {/* {selectedFile && <div className="selected-file-info">Archivo seleccionado: {selectedFile}</div>} */}
    </div>
  );
};

export default Sftp;
