import React from "react";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
    return(
        <>
            <hr /> 
            <div class="foot1">
                <div class="co">
                    <div className="yellow"></div>
                    <h2 class="foot-head">Foot-Prints</h2>    
                    <p class="des"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>        
                </div>
                <ul class="socials">
                    <li><a href="#"><FontAwesomeIcon icon={faFacebookF } /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faInstagram } /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faTwitter } /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faLinkedin } /></a></li>
                </ul>
            </div>

            <div class="foot2">
                <p class="f2"><span>Foot-Prints</span> | ©2021 All rights reserved<br /></p>
            </div>
        </>
    );
}

export default Contact