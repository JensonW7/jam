import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="navbar">
                <Link to="/"><h1>Jam</h1></Link>
                <Link to="/profile">Profile</Link>
                <Link to="http://localhost:4000/spotify/currently-playing">get currently playing song</Link>
            </div>
        </header>
    )
}

export default Navbar