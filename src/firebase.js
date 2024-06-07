import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

var firebaseConfig = {
   /*  enter your firebase content here */
    apiKey: "AIzaSyAitXtadiMITxrXmgt-D6MrIALYRqDJQUk",
    authDomain: "otp-auth-1f9e8.firebaseapp.com",  
    projectId: "otp-auth-1f9e8",
    storageBucket: "otp-auth-1f9e8.appspot.com",
    messagingSenderId: "970939805652",
    appId: "1:970939805652:web:085364d167401439203041"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider}
export default firebase