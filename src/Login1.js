import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

const Login1 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
      };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    require("firebase/firestore");
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    function signinwithgoogle(){
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      function handleSubmit() {

        // const actionCodeSettings = {
        //   // URL you want to redirect back to. The domain (www.example.com) for this
        //   // URL must be in the authorized domains list in the Firebase Console.
        //   url: 'https://localhost:3000',
        //   // This must be true.
        //   handleCodeInApp: true
        // }

        // createUserWithEmailAndPassword(auth, email , password)
        // .then((userCredential)=>{
        //   const user = userCredential.user;
        //   sendEmailVerification(user, actionCodeSettings);
        //   alert("Email sent");
        //   console.log(user.emailVerified);
        // })
        // .catch(alert);
        

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

        const user = auth.currentUser;
        if (user !== null) {
          user.providerData.forEach((profile) => {
            console.log("  Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          });
        }

        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //   // Signed in 
        //   const user = userCredential.user;
        //   // ...
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        // });




      }
    
      return (
        <div className="Login">
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password  </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button disabled={!validateForm()} onClick={handleSubmit}>
              Login
            </Button><br /><br />
            <button onClick={signinwithgoogle}>Google</button><br />
          </Form>
          <div className="signup">Don't have an account?<Link exact path="/Signup">Sign up</Link></div>
        </div>
      );
}
 
export default Login1;