import React from 'react'
import "./StyleDashboard.module.css"
import Cookies from 'js-cookie';
const Dashboard = () => {
  async function authenticateWithGoogle() {
    try {
      const googleAuthURL = `http://localhost:8080/auth/google`;
      const googleLoginWindow = window.open(googleAuthURL, '_blank', 'width=600,height=600');

      if (!googleLoginWindow) {
        console.error('Google login window blocked or closed.');
        return;
      }
      console.log(googleLoginWindow)
      const allCookies = Cookies.get();
      
        console.log(allCookies)
      

     } catch (error) {
      console.error('Error during authentication:', error);
    }
  }

    function handleLogOut(){
      const allCookies = Cookies.get();
      
      if(allCookies['sweton-token-authentication-user']){
        Cookies.remove('sweton-token-authentication-user');
        
        localStorage.setItem('seeton-web-cart',JSON.stringify([]));
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
  )
}


export default Dashboard
