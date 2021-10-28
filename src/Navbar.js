import { Link } from "react-router-dom";

const Navbar = () => {
    
    return (  
        <nav className="navbar">
            <h1>Crime Records</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/Map">Map</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;