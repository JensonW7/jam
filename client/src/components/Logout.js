const logout = () => {
    // clear user token logic here by removing access token from local storage
    // issue: we used react context...?
    // localStorage.removeItem('access_token');

    // Redirect to Spotify logout page
    window.location.href = 'https://www.spotify.com/logout/';

    // Redirect to home page
    // window.location.href = '/'; // Redirect to your home page
};

export default logout;
