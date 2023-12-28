import React, { useState } from 'react';
import Login from '@root/src/pages/apps/Login';

import '@pages/popup/Applications.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import Chat from '@root/src/pages/apps/Chat';
import Sftp from '@root/src/pages/apps/Sftp';


const Applications: React.FC = () => {  
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (credentials: any) => {
    // Aquí puedes realizar la lógica de autenticación (por ahora, simplemente marcamos como autenticado)
    setLoggedIn(true);
  };

  
    return (
        <div className="App-Applications">
          {isLoggedIn ? (
            <Chat />
          ) : (
            <Login onLogin={handleLogin} />
          )}
          {/* <Sftp /> */}
        </div>
    );
}

export default withErrorBoundary(withSuspense(Applications, <div> Loading ... </div>), <div> Error Occur </div>);
