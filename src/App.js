import "./App.css";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { getAccessTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useAuthDataValue } from "./Store/AuthData";
import Player from "./components/Player/Player";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, accessToken }, dispatch] = useAuthDataValue();

  useEffect(() => {
    const hash = getAccessTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
      dispatch({ type: "SET_TOKEN", accessToken: token });
      spotify.setAccessToken(token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify
        .getUserPlaylists()
        .then((playlists) =>
          dispatch({ type: "SET_PLAYLISTS", playlists: playlists })
        );

      spotify.getPlaylist("1OIzwJTbrOeZTHvUXf5yMg").then((response) => {
        dispatch({ type: "SET_DISCOVER_WEEKLY", discover_weekly: response });
      });
    }
  }, []);

  return (
    <div className="app">
      {accessToken ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
