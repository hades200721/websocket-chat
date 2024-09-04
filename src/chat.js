import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [usersNumber, setUsersNumber] = useState(0);
    const [input, setInput] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000');

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socketRef.current.on('usersOnline', (usersNumberToSet) => {
            setUsersNumber(usersNumberToSet);
        });

        socketRef.current.on('messageToClient', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socketRef.current.emit('messageToServer', input);
            setInput('');
        }
    };

    return (
        <div>
            <h2>Users online: {usersNumber}</h2>
            <div style={{border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'auto'}}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
