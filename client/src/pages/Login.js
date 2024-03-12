import "./Login.css"
const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:4000/spotify/login'; // Redirect to Express server for Spotify login
  };

  return (
    <div className="login-container">
      <button className="login-button" 
        onClick={handleLogin}
        style={{
          fontSize: '1.5em', // Make the font bigger
          fontWeight: 'bold', // Make the font bolder
          fontFamily: 'Poppins, sans-serif' // Set the font family to Poppins
        }}
      >
        LOG IN WITH SPOTIFY
      </button>
    </div>
  );

}

export default Login
