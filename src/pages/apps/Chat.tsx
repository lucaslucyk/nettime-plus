import React, { useState } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

import '@pages/apps/Chat.css';


interface Message {
    id: number;
    text: string;
    isUser: boolean;
  }
  
  const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    };
  
    const handleSendMessage = () => {
      if (inputText.trim() === '') return;
  
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        isUser: true,
      };
  
      setMessages([...messages, newMessage]);
  
      // Simulación de respuesta (en un entorno real, aquí se haría una solicitud al servidor)
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
        //   text: `Respuesta a: ${inputText}`,
          text: `Para crear una jornada puedes probar realizar los siguientes pasos:\n
            1. Ingresa a Horario - Configuración - Jornadas.
            2. Presiona el botón de Añadir.
            3. Completa los datos y presiona Guardar.`,
          isUser: false,
        };
  
        setMessages([...messages, newMessage, responseMessage]);
      }, 1000);
  
      setInputText('');
    };

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        handleSendMessage();
      }
    };
  
    return (
      <div className="chat-container">
        <div className="message-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'response-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="message-input"
            placeholder="Escribe tu pregunta..."
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSendMessage} className="send-button">
            Enviar
          </button>
        </div>
      </div>
    );
  };

export default withErrorBoundary(withSuspense(Chat, <div> Loading ... </div>), <div> Error Occur </div>);
