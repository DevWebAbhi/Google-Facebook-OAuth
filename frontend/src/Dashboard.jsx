import React from 'react';
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
        if (allCookies['google']) {
          clearInterval(checkInterval);
          googleLoginWindow.close();
          window.location.reload();
        }
      }, 2500);

    } catch (error) {
      console.error('Error during authentication:', error);
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
