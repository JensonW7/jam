const Login = () => {
    const handleLogin = () => {
      window.location.href = 'http://localhost:4000/spotify/login'; // Redirect to Express server for Spotify login
    };
  
    return (
      <div>
        <button onClick={handleLogin}>Log in with Spotify</button>
      </div>
    );
  
  }
  
  export default Login