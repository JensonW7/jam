import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJar } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import useLogout from '../hooks/useLogout'; 

import './styles/navbar.css'
const Navbar = () => {
    const logout = useLogout();

    return (
        <header>
            <div className="navbar">
                <Link to={'/'} className="logo-container">
                    <h1>JAM</h1>       
                    <FontAwesomeIcon icon={faJar} style={{color: "#ffffff",}} size='2x'/>
                </Link>
                <Link to="/profile"><h2>STATS</h2></Link>
                <Link to="/search"><h2>SEARCH</h2></Link>
                <Link to="http://localhost:4000/spotify/login">
                    <FontAwesomeIcon icon={faArrowsRotate} style={{color: "#ffffff",}} size='2x'/>
                </Link>
                <button onClick={logout}>Sign Out</button>
            </div>
        </header>
    )
}

export default Navbar