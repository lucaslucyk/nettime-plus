// Login.tsx
import React, { useState } from 'react';
import '@pages/apps/Sftp.css';
// import logginStorage from '@src/shared/storages/logginStorage';
import { login } from '@root/src/shared/services/auth';

// import useStorage from '@src/shared/hooks/useStorage';
import authStorage from '@src/shared/storages/authStorage';

interface Credentials {
  username: string;
  password: string;
}

// interface LoginProps {
//   onLogin: (credentials: Credentials) => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const accessToken = useStorage(authStorage);

  const cleanInputs = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    if (username === '' || password === '') {
      alert('Not username or password');
      return;
    }
    const credentials: Credentials = { username, password };
    try {
      const token = await login(credentials);
      await authStorage.set(token);
    } catch (error) {
      alert(error.toString());
      cleanInputs();
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
      />
      <button className="send-button" onClick={handleLogin}>
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
