import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, setDoc, query, where} from "firebase/firestore"; 
import validator from 'validator';


const Login1 = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userExists, setUserExists] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState("false");
    window.localStorage.setItem("isLoggedIn", "false");

    // useEffect(() => {
    //   window.localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    //   console.log(window.localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn)));
    // }, [isLoggedIn]);

  
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

    function validateForm() {
        return email.length > 0 && password.length > 0;
      }
    
      async function handleSubmit(event) {
        event.preventDefault();
        if (!validator.isEmail(email)) {
          setUserExists('Enter Valid Email!');
          return;
        }
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        let n = 0;
        querySnapshot.forEach((doc) => {
          n = 1;
          console.log(doc.id, " => ", doc.data());
          if(password != doc.data().password){
            setUserExists("Password entered is wrong. Please enter the right password.")
          }
          else{
            setisLoggedIn("true");
            window.localStorage.setItem("isLoggedIn", isLoggedIn);
            console.log(window.localStorage.getItem("isLoggedIn"));
          }
        });
        if(n==0){
           setUserExists("Please sign up to continue.");
          }
      }

      // function Logout(){
      //   setisLoggedIn("false");
      //   window.localStorage.setItem("isLoggedIn", isLoggedIn);

      // }
    
      return (
        <>
        { isLoggedIn=="false" && <div className="Login">
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
          </Form>
          <div>{userExists}</div>
          <div className="signup">Don't have an account?<Link to="/signup">Sign up</Link></div>
        </div>}
        {isLoggedIn=="true" && <div className="loggedin">
          <div>You have successfully logged in.</div>
          <button className="gotomap"><Link to="/Map">Go to Map</Link></button>
          {/* <div className="logout"><Button onClick={Logout}>Logout</Button></div> */}
        </div>}
        
        </>
      );
}

export default Login1;