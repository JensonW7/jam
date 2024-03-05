/*
import React from "react"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8b945ef10ea24755b83ac50cede405a0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <button><a href={AUTH_URL}>Login With Spotify</a></button>
  )
}
*/

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login'; // Redirect to Express server for Spotify login
  };

  return (
    <div>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Login;