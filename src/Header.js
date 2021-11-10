import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    
    return (
        <>
           <header className='header'>
          
           <Link className='links' to='/'>
            Home
           </Link>

            <nav className = "navbar">
                <ul>
                <Link className='links' to="/Map">Map</Link>
                <Link className='links' to="/about">About</Link>
                <Link className='links' to="/contact">Contact Us</Link>
                <Link className='links' to="/login">Login</Link>
                </ul>
            </nav>
            </header>
        </>

    );
}
 
export default Header;