import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJar } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './styles/navbar.css'

const Navbar = () => {
    const [animate, setAnimate] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setAnimate(true);
    
        setTimeout(() => {
            window.location.href = 'http://localhost:4000/spotify/login';
        }, 2000);
    };

    return (
        <header>
            <div className="navbar">
                <Link to={'/'} className="logo-container">
                    <h1>JAM</h1>       
                    <FontAwesomeIcon icon={faJar} style={{color: "#ffffff"}} size='2x'/>
                </Link>
                <Link to="/profile"><h2>STATS</h2></Link>
                <Link to="/search"><h2>SEARCH</h2></Link>
                <a href="http://localhost:4000/spotify/login" onClick={handleClick}>
                    <FontAwesomeIcon icon={faArrowsRotate} style={{color: "#ffffff"}} size='2x' className={`spinner ${animate ? 'animate-spinner' : ''}`}/>
                </a>
            </div>
        </header>
    )
}

export default Navbar
