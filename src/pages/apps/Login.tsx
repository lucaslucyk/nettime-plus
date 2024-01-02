// Login.tsx
import React, { useState } from 'react';
import '@pages/apps/Sftp.css';
import { login } from '@root/src/shared/services/auth';
import authStorage from '@src/shared/storages/authStorage';
import { getUserApps } from '@root/src/shared/services/apps';
import userAppsStorage from '@root/src/shared/storages/userApps';

interface Credentials {
  username: string;
  password: string;
}


// const Login: React.FC<LoginProps> = ({ onLogin }) => {
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const accessToken = useStorage(authStorage);

  // const cleanInputs = () => {
  //   setUsername('');
  //   setPassword('');
  // };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Not username or password');
      return;
    }
    const credentials: Credentials = { username, password };
    try {
      const accessToken = await login(credentials);
      await authStorage.set(accessToken);

      // get and set user apps
      // const accessToken: Token = {token}
      const userApps = await getUserApps({accessToken})
      userAppsStorage.setApps(userApps)

    } catch (error) {
      alert(error.toString());
      // cleanInputs();
    }
  };
  
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <h4>Login</h4>
      <input
        className="login-input"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
