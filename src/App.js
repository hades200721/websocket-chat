import {useCallback, useState} from 'react';
import {Chat} from './chat';
import {LoginForm} from './login';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const onSetToken = useCallback(tokenToSet => {
        localStorage.setItem('authToken', tokenToSet);
        setToken(tokenToSet);
    }, []);

    const onLogoutHandler = useCallback(() => {
        localStorage.removeItem('authToken');
        setToken(undefined);
    }, []);
  return (
    <div className="App">
        {token && <button onClick={onLogoutHandler}>Logout</button>}
        <header className="App-header">
            <h1>Welcome to the Chat Application</h1>
            {!token && <LoginForm setToken={onSetToken}/>}
            {token && <Chat token={token}/>}
        </header>
    </div>
  );
}

export default App;
