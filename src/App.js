import './index.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './Navbar';
import Map from './Map.js';
import Login1 from './Login1.js';
import Home from './Home';
import Metadata from './Metadata';

function App() {
  return (
    <Router>
    <div className="App">
        <Metadata />
        <div className="flexmap">
        <Navbar />
          <div className="map">
            <Route exact path="/map" component={Map}>
              <Map />
            </Route>
          </div>
        </div>
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

    </div>
    </Router>
  );
}

export default App;
