import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {jwtDecode} from 'jwt-decode';

export const Chat = ({token}) => {
    const [messages, setMessages] = useState([]);
    const [usersNumber, setUsersNumber] = useState(0);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [userName, setUserName] = useState(undefined);

    useEffect(() => {
        try {
            const decoded = jwtDecode(token);
            setUserName(decoded.username);
        } catch (err) {
            console.error('Error decoding token:', err);
            setUserName(undefined);
        }

        const socketInstance = io('http://localhost:3000', {
            transports: ['websocket'],
            auth: {
                token: `Bearer ${token}`,
            },
        });

        socketInstance.on('connect', () => {
            console.log('Connected to WebSocket server');
        });
        socketInstance.on('usersOnline', (usersNumberToSet) => {
            setUsersNumber(usersNumberToSet);
        });
        socketInstance.on('messageToClient', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [token]);

    const sendMessage = () => {
        if (socket) {
            socket.emit('messageToServer', input);
            setInput('');
        }
    };

    return (
        <div>
            <h2>Hello {userName}</h2>
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
