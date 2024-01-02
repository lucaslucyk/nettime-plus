import React, { useEffect, useState } from 'react';
import Login from '@root/src/pages/apps/Login';

import '@pages/popup/Applications.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import useStorage from '@src/shared/hooks/useStorage';
import authStorage from '@src/shared/storages/authStorage';

import Chat from '@root/src/pages/apps/Chat';
import Sftp from '@root/src/pages/apps/Sftp';
import currentAppStorage from '@root/src/shared/storages/currentAppStorage';
import userAppsStorage from '@root/src/shared/storages/userApps';

interface UserApp {
  name: string;
  kind: string;
  id: string;
}

const capitalize = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const Applications: React.FC = () => {
  const accessToken = useStorage(authStorage);
  const activeApp = useStorage(currentAppStorage);
  const userApps = useStorage(userAppsStorage);
  const [userAppsJSON, setUserAppsJSON] = useState<UserApp[] | null>(null);

  useEffect(() => {
    const setApps = async () => {
      const apps = await userAppsStorage.getApps();
      setUserAppsJSON(apps)
    };

    setApps();
  }, [userApps]);

  const handleButtonClick = (appName: string) => {
    currentAppStorage.set(appName);
  };


  return (
    <div className="App-Applications">
      {/* {logged === 'true' ? <Chat /> : <Login onLogin={handleLogin} />} */}
      {accessToken != '' && accessToken != null ? (
        // <>
        //   <Sftp />
        // </>
        <>
          <div className="app-selector">
            {/* <button onClick={() => handleButtonClick('Chat')} className="send-button">
              Chat
            </button>
            <button onClick={() => handleButtonClick('Sftp')} className="send-button">
              Sftp
            </button> */}
            {/* {userAppsJSON.map(app => ( */}
            {/* {userAppsJSON.map(app => (
              <button key={app.id} onClick={() => handleButtonClick(capitalize(app.kind))} className="send-button">
                {app.name}
              </button>
            ))} */}
            {userAppsJSON !== null ? (
              userAppsJSON.map(app => (
                <button key={app.id} onClick={() => handleButtonClick(capitalize(app.kind))} className="send-button">
                  {app.name}
                </button>
              ))
            ) : (
              <>No available apps</>
            )}
          </div>
          <>
            {activeApp === 'Chat' && <Chat />}
            {activeApp === 'Sftp' && <Sftp appId="98a4c382-a42e-11ee-9e25-adf1f454041f" />}
          </>
        </>
      ) : (
        <Login />
      )}
      {/* <Sftp /> */}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Applications, <div> Loading ... </div>), <div> Error Occur </div>);
