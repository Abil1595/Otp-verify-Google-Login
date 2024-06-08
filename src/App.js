import React, { useState } from 'react';
import {auth,provider} from './firebase';
import firebase from './firebase';
import bg from './google-logo.png'  

import './App.css';
const App = () => {
  const [mobile, setMobile] = useState('');  
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);    
  const [pass,setPass]=useState('')  
  const handleChange = (e) => {
    const { name, value } = e.target;    
    if (name === 'mobile') {
      setMobile(value);
    } else if (name === 'otp') {      
      setOtp(value);
    }
  };

  const mobileNumber = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignIn();
        console.log('Recaptcha verified');
      },
      defaultCountry: 'IN',
    });
  };

  const onSignIn = (e) => {
    e.preventDefault();
    mobileNumber();
    const phoneNumber = '+91' + mobile;   
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
        
      }).catch((error) => {
       
       
        console.log('SMS not sent', error);
      });
  };   

  const onSubmitotp = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user));
      alert('User is verified');
     
    }).catch((error) => {
      
      console.log('Error verifying OTP', error);
    });
  };
  
  const googleLogin=async ()=>{
    try{
      await auth.signInWithPopup(provider);
      setUser(await auth.currentUser)
    }
    catch(err)
    {
      console.log(err)
    }
  }
  const handleLogout=async()=>{
  try{
    await auth.signOut()
    setUser('guest')
    const details="user is logged out"
    setPass(details)
  }
  catch(error)
  {
    console.log(error)
    alert(error)
  }
  }  
 

  return (
    <div className='abilash'>  
       
      <div className='abi1'>
      {user?.email?`signed in as :${user.email}`:'Logged out please Login'}
        <h2>Enter Mobile Number</h2>
      <form onSubmit={onSignIn}>
        <div id="sign-in-button"></div>
        <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange}/> 
        <button type="submit">Submit</button><br/>
      </form>
      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitotp}>
        <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange} />
        <button type="submit">Submit</button>
        
      </form><br/>
     
       {user?.email?(<button onClick={handleLogout}>Logout</button>):( <button className='google' onClick={googleLogin}>
          <img src={bg} className='gimage' alt='Google Logo' /> Login with Google
        </button>)}
       
    
       
       <br /><br />
      </div>
     
    </div>
  );
};

export default App;
