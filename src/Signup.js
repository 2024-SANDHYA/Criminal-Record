import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, query, where } from "firebase/firestore"; 
import validator from "validator";
import img1 from './asset-2/undraw_press_play_re_85bj.svg';

const Login1 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userExists, setUserExists] = useState("");
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
    
    async function handleSubmit(event){
      event.preventDefault();
      if (!validator.isEmail(email)) {
        setUserExists('Enter Valid Email!');
        return;
      }
      if(email!="" && password.length>6){
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let n = 0;
        querySnapshot.forEach((doc) => {
          n = 1;
          console.log(doc.id, " => ", doc.data());
        });
        if(n==0){
          try{
            const docRef = await setDoc(doc(db, "users", email), {
              email: email,
              password: password,
          });
          setUserExists("Email has been added. Please sign in using the same email and password.")
          }
          catch (e) {
            console.error("Error adding document: ", e);
            } 
          }
          else{
            setUserExists("Email already exists. Please sign in with the same email or enter a new email.")
          }
        }
    }

  


    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
  
    
      return (
        <div className="login-signup-page">
          <img src={img1} className="login-signup-img"></img>
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
            <div className="error-login-signup">{userExists}</div>
          </div>
        </div>
      );
}
 
export default Login1;