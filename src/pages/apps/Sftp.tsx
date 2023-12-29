// Sftp.tsx
import React, { useState } from 'react';
import Login from './Login';
import FileList from './FileList';
import '@pages/apps/Sftp.css';
// import useStorage from '@root/src/shared/hooks/useStorage';
// import logginStorage from '@root/src/shared/storages/logginStorage';

const Sftp: React.FC = () => {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // const logged = useStorage(logginStorage);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // const handleLogin = (credentials: any) => {
  //   // Aquí puedes realizar la lógica de autenticación (por ahora, simplemente marcamos como autenticado)
  //   setLoggedIn(true);
  // };

  const handleFileClick = (filename: string) => {
    // Realizar acciones específicas al hacer clic en un archivo (por ahora, solo console.log)
    console.log(`Clic en el archivo: ${filename}`);
    setSelectedFile(filename);
  };

  const files = ['Folder 1', 'Folder 2', 'File 1.txt', 'File 2.doc'];

  return (
    <div className="sftp-container">
      <FileList files={files} onFileClick={handleFileClick} />
      {selectedFile && <div className="selected-file-info">Archivo seleccionado: {selectedFile}</div>}
    </div>
  );
};

export default Sftp;
