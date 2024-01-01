import React, { useState } from 'react';
import Login from '@root/src/pages/apps/Login';

import '@pages/popup/Applications.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import useStorage from '@src/shared/hooks/useStorage';
import authStorage from '@src/shared/storages/authStorage';

import Chat from '@root/src/pages/apps/Chat';
import Sftp from '@root/src/pages/apps/Sftp';

const Applications: React.FC = () => {
  const accessToken = useStorage(authStorage);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const handleButtonClick = (appName: string) => {
    setActiveApp(appName);
  };

  // const [isLoggedIn, setLoggedIn] = useState(logged);

  // const handleLogin = (credentials: any) => {
  //   // Aquí puedes realizar la lógica de autenticación (por ahora, simplemente marcamos como autenticado)
  //   logginStorage.toggle();
  //   // console.log("working here!")
  //   // setLoggedIn('true');
  // };

  return (
    <div className="App-Applications">
      {/* {logged === 'true' ? <Chat /> : <Login onLogin={handleLogin} />} */}
      {accessToken != '' && accessToken != null ? (
        // <>
        //   <Sftp />
        // </>
        <>
          <div className="app-selector">
            <button onClick={() => handleButtonClick('Chat')} className='send-button'>Chat</button>
            <button onClick={() => handleButtonClick('Sftp')} className='send-button'>Sftp</button>
          </div>
          <>
            {activeApp === 'Chat' && <Chat />}
            {activeApp === 'Sftp' && <Sftp />}
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
