import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
    
    if(email!="" && password.length>6){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("created");
        console.log(user.displayName, user.emailVerified, user.metadata);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
      const docRef = addDoc(collection(db, "users"), {
        email: email,
        password: password,
      });
    }

  


    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      function handleSubmit(event) {
        event.preventDefault();
      }
    
      return (
        <div className="Signup">
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
              Signup
            </Button>
          </Form>
        </div>
      );
}
 
export default Login1;