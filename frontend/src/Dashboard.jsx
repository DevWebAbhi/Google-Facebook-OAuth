import React from 'react';
import "./StyleDashboard.module.css";
import Cookies from 'js-cookie';

const Dashboard = () => {
  async function authenticateWithGoogle() {
    try {
      const googleAuthURL = `${process.env.REACT_APP_AUTH_URL}`;
      const googleLoginWindow = window.open(googleAuthURL, '_blank', 'width=700,height=1000');

      if (!googleLoginWindow) {
        console.error('Google login window blocked or closed.');
        return;
      }

      const checkInterval = setInterval(() => {
        const allCookies = Cookies.get();
       
          console.log(allCookies);
          
         // googleLoginWindow.close();
          clearInterval(checkInterval);
        
      }, 3000);

    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  function handleLogOut() {
    const allCookies = Cookies.get();
    if (allCookies['google']) {
      Cookies.remove('sweton-token-authentication-user');
      localStorage.setItem('seeton-web-cart', JSON.stringify([]));
      window.location.reload();
    }
  }

  return (
    <div>
      <div className='child'>
        <div>
          <button onClick={authenticateWithGoogle}>Google</button>
          <button>Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
