import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <div className="navbar">
                <Link to="/"><h1>Jam</h1></Link>
                <Link to="/profile">Profile</Link>
            </div>
        </header>
    )
}

export default Navbar