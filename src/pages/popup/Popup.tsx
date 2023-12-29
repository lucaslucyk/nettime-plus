// import React from 'react';
import logo from '@assets/img/logo.png';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import authStorage from '@src/shared/storages/authStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import Applications from '@src/pages/popup/Applications';

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  const accessToken = useStorage(authStorage);

  const logoutHandler = async () => {
    await authStorage.set('');
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}>
      <header className="App-header" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
        <a
          className="App-link"
          href="https://github.com/lucaslucyk/nettime-plus"
          target="_blank"
          rel="noopener noreferrer">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          netTime+
        </a>
        <div className="main-buttons">
          <button
            className='control-btn'
            onClick={exampleThemeStorage.toggle}>
            Light/Dark
          </button>
          {accessToken != '' && accessToken != null ? (
            <button
              className='control-btn'
              onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <></>
          )}
        </div>

        <Applications />
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
