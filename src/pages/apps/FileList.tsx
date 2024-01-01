// FileList.tsx
import React from 'react';
import '@pages/apps/Sftp.css';
import { listDir } from '@src/shared/services/sftp';

const isFile = (name: string): boolean => {
  return name !== '.' && name.includes('.') && !name.includes('..');
};

const FileList: React.FC = () => {
  const params = {path: "/"}
  const files = listDir(params);
  return (
    <>
      <div className="file-list-container">
        {/* <h2>Lista de Archivos</h2> */}
        <div className="files-tree">
          {files.map(file => (
            <div key={file} className="file-item">
              <div className="file-content">{file}</div>
              <div className="file-controls">
                {isFile(file) ? (
                  <>
                    <button className="send-button">⏬</button>
                    <button className="send-button">❌</button>
                  </>
                ) : (
                  <button className="send-button">👁️</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="selected-file-info">no file selected</div>
    </>
  );
};

export default FileList;
