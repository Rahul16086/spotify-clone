import "./App.css";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import { getAccessTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = getAccessTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      setAccessToken(token);
      spotify.setAccessToken(token);
      spotify.getMe().then((user) => {
        console.log(user);
      });
    }

    console.log("Token here: ", accessToken);
  }, []);

  return (
    <div className="app">
      {accessToken ? <h1>Hey, you are logged in :)</h1> : <Login />}
    </div>
  );
}

export default App;
