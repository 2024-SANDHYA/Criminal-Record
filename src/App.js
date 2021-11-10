import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './Header';
import Map from './Map.js';
import Login1 from './Login1.js';
import Home from './Home';
import Metadata from './Metadata';
<<<<<<< HEAD
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute';
=======
import About from './About';
import Contact from './Contact';
>>>>>>> 58768275a808ea512d30dfae6332e2826eb745aa

function App() {
  return (
    <Router>
    <div className="App">
        <Metadata />
<<<<<<< HEAD
        <div className="flexmap">
        <Navbar />
          <div className="map">
            <Route exact path="/Map" component={Map}>
              <Map />
            </Route>
            {/* <ProtectedRoute path="/Map" component={Map} isAuth={}/> */}
          </div>
        </div>
=======

        <Header />

>>>>>>> 58768275a808ea512d30dfae6332e2826eb745aa
        <div className="home">
          <Route exact path="/home" component={Home}>
            <Home />
          </Route>
        </div>
        
        <div className="loginpage">
          <Route exact path="/login" component={Login1}>
            <Login1 />
          </Route>
        </div>

<<<<<<< HEAD
        <div className="signup">
          <Route exact path="/signup" component={Signup}>
            <Signup />
          </Route>
        </div>

=======
        <div className="map">
            <Route exact path="/map" component={Map}>
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

    <Home />

>>>>>>> 58768275a808ea512d30dfae6332e2826eb745aa
    </div>
    </Router>

  );
}

export default App;
