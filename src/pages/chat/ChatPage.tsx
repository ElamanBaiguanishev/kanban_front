import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../../api/axios.api';
import SocketApi from '../../api/socket-api';
import './mainChat.css';

const ChatPage: FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState<string>('');
  const { chatId } = useParams<{ chatId: string }>();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await instance.get(`/chat/${chatId}/messages`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    SocketApi.createConnection();
    SocketApi.socket?.on(chatId!!, (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      SocketApi.socket?.off('new-message');
    };
  }, [chatId]);

  const sendMessage = () => {
    if (text.trim() === '') return;
    SocketApi.socket?.emit('sendMessage', { chatId, content: text });
    setText('');
  };

  return (
    <div className="chat-page">
      <div className="messages">
        {messages.map((message: any) => (
          <div key={message.id} className="message">
            <img src={`http://localhost:3000/${message.sender.image}`} alt="User Image" className="profile-image" />
            <strong>{message.sender.name}:</strong> {message.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;