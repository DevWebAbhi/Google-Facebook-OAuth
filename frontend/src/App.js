import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="465878242747-9pgatv8d6ifum12itf6kc489jf71cfsa.apps.googleusercontent.com">
            <Dashboard/>
      </GoogleOAuthProvider>
      
    </div>
  );
}

export default App;
