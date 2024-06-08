import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

var firebaseConfig = {
   /*  enter your firebase content here */
    apiKey: " ",
    authDomain: " ",  
    projectId: " ",
    storageBucket: " ",
    messagingSenderId: " ",
    appId: " "
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider}
export default firebase
