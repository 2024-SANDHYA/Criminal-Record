import Login1 from "./Login1";
import About from "./About";
import logo from './asset-2/favicon.png'
import background from './asset-2/Untitled.png'
import banner from './asset-2/banner-image.png'
import './index.css'
import Footer from "./Footer";
import { Link } from "react-router-dom";



const Home = () => {    
    
    return (  
        <section className='homepage'>
            <div className='overlay' style= {{ backgroundImage: `url(${background})` }}>
                <div className = "intro" > 
                    <div className='side-content'>
                        <h1 className='side-title'>Crime Records - Following your Footprints</h1>
                        <p className='side-subtitle'>Be aware of what's happening around you. Protect your family and yourself from all sorts of scams and crimes.</p>
                    </div>
                    <img src = {banner} alt="banner-img" className="banner-img" />
                </div>
                <div className="get-started">
                    <button className = "start-btn"><Link to="/login">Get Started</Link></button>
                    
                </div>

            </div>
            <Footer />
        </section>
        
    );
}
 
export default Home;