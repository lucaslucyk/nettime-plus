// FileList.tsx
import React from 'react';
import '@pages/apps/Sftp.css';
import { listDir } from '@src/shared/services/sftp';
import { useState } from 'react';
import useStorage from '@root/src/shared/hooks/useStorage';
import authStorage from '@root/src/shared/storages/authStorage';
import currentAppStorage from '@root/src/shared/storages/currentAppStorage';
import { useEffect } from 'react';

const isFile = (name: string): boolean => {
  return name !== '.' && name.includes('.') && !name.includes('..');
};

const buildPath = (basePath: string, inner: string) => {
  // ensure starts and ends with /
  let path = basePath.startsWith('/') ? basePath : '/' + basePath;
  if (!path.endsWith('/')) {
    path = path + '/';
  }

  // special dirs
  if (inner === '.') return basePath;
  if (inner === '..') {
    if (basePath === '/') return basePath;

    const parts = path.split('/');
    const outParts = parts.slice(1, -2);
    if (!outParts.length) return '/';
    return '/' + outParts.join('/') + '/';
  }

  // ensure remove / from inner start and end with / if is not file
  let toAppend = inner.startsWith('/') ? inner.substring(1) : inner;
  if (!toAppend.endsWith('/') && !isFile(inner)) {
    toAppend = toAppend + '/';
  }

  // return joined path
  return path + toAppend;
};

interface ButtonHandlerParams {
  fileName: string;
  action: string;
}

interface FileListParams {
  appId: string;
}

const FileList: React.FC<FileListParams> = ({ appId }) => {
  const [currentPath, setCurrentPath] = useState('/');
  const accessToken = useStorage(authStorage);
  const [dirItems, setDirItems] = useState<string[]>(['']);

  useEffect(() => {
    const getDirItems = async () => {
      const params = { path: currentPath, accessToken: accessToken, appId: appId };
      const res = await listDir(params);
      setDirItems(res);
    };
    getDirItems();
  }, [currentPath, accessToken, appId]);

  // const dirItems = listDir(params);

  const fileButtonHandler =
    ({ fileName, action }: ButtonHandlerParams) =>
    () => {
      const filePath = buildPath(currentPath, fileName);
      // console.log(filePath + ' - ' + action);
      if (!isFile(fileName)) {
        setCurrentPath(filePath);
      }
    };

  return (
    <>
      <div className="file-list-container">
        {/* <h2>Lista de Archivos</h2> */}
        <div className="files-tree">
          {dirItems.map(fileName => (
            <div key={fileName} className="file-item">
              <div className="file-content">{fileName}</div>
              <div className="file-controls">
                {isFile(fileName) ? (
                  <>
                    <button className="send-button" onClick={fileButtonHandler({ fileName, action: 'download' })}>
                      ⏬
                    </button>
                    <button className="send-button" onClick={fileButtonHandler({ fileName, action: 'delete' })}>
                      ❌
                    </button>
                  </>
                ) : (
                  <button className="send-button" onClick={fileButtonHandler({ fileName, action: 'listdir' })}>
                    👁️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="selected-file-info">no file selected</div> */}
    </>
  );
};

export default FileList;
