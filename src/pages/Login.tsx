import React, { useEffect } from "react";

function Login() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL = "http://localhost:3000/";

  const SPACE_DELIMITER = "%20";
  const SCOPES = ["playlist-modify-private", "playlist-read-private", "user-top-read"];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const handleLogin = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };

  useEffect(() => {
    document.title = "Login Page"
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white">
      <button onClick={handleLogin} className="bg-green-500 px-6 py-4 rounded-full text-md">
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
