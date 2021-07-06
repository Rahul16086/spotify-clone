import "./App.css";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { getAccessTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useAuthDataValue } from "./Store/AuthData";
import Player from "./components/Player/Player";

const spotify = new SpotifyWebApi();

function App() {
  const [{ accessToken }, dispatch] = useAuthDataValue();

  useEffect(() => {
    const hash = getAccessTokenFromUrl();
    window.location.hash = "";
    let token = hash.access_token;

    if (token) {
      spotify.setAccessToken(token);
      dispatch({ type: "SET_TOKEN", accessToken: token });

      spotify.getMe().then((user) => {
        console.log("user: ", user);
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify
        .getUserPlaylists()
        .then((playlists) => {
          dispatch({ type: "SET_PLAYLISTS", playlists: playlists });
          console.log(playlists.items);
          return playlists;
        })
        .then((res) => {
          spotify.getPlaylist(res.items[0].id).then((res) => {
            dispatch({
              type: "SET_DISCOVER_WEEKLY",
              discover_weekly: res,
            });
          });
        });

      spotify
        .getMyTopArtists()
        .then((response) =>
          dispatch({ type: "SET_TOP_ARTISTS", top_artists: response })
        );

      dispatch({ type: "SET_SPOTIFY", spotify: spotify });
    }
  }, [accessToken, dispatch]);

  return (
    <div className="app">
      {!accessToken && <Login />}
      {accessToken && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
