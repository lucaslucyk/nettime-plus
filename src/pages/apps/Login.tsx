// Login.tsx
import React, { useState } from 'react';
import '@pages/apps/Sftp.css';

interface Credentials {
  username: string;
  password: string;
}

interface LoginProps {
  onLogin: (credentials: Credentials) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const credentials: Credentials = { username, password };
    onLogin(credentials);
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
