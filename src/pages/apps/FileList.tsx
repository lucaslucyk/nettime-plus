// FileList.tsx
import React from 'react';
import '@pages/apps/Sftp.css';

interface FileListProps {
  files: string[];
  onFileClick: (filename: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileClick }) => {
  return (
    <div className="file-list-container">
      <h2>Lista de Archivos</h2>
      <ul>
        {files.map((file) => (
          <li key={file} onClick={() => onFileClick(file)}>
            {file}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
