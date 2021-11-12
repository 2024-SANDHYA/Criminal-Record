import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Header';
import Map from './Map.js';
import Login1 from './Login1.js';
import Home from './Home';
import Metadata from './Metadata';
import Signup from './Signup';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <Router>
    <div className="App">
    <Metadata />

        <Header />
        
        <div className="home">
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
        </div>
        
        <div className="loginpage">
          <Route exact path="/login" component={Login1}>
            <Login1 />
          </Route>
        </div>

        <div className="signup">
          <Route exact path="/signup" component={Signup}>
            <Signup />
          </Route>
        </div>

        <div className="map">
            <Route exact path="/Map" component={Map}>
              <Map />
            </Route>
        </div>

        <div className="about">
            <Route exact path="/about" component={About}>
              <About />
            </Route>
        </div>

        <div className="contact">
            <Route exact path="/contact" component={Contact}>
              <Contact />
            </Route>
        </div>


    </div>
    </Router>

  );
}

export default App;
