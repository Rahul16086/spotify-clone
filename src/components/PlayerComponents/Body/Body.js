import React, { useEffect } from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useAuthDataValue } from "../../../Store/AuthData";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../SongRow/SongRow";

const Body = ({ spotify }) => {
  const [{ discover_weekly }, dispatch] = useAuthDataValue();

  const playPlaylist = () => {
    const accessToken = spotify.getAccessToken();

    const body = {
      context_uri: `spotify:playlist:1OIzwJTbrOeZTHvUXf5yMg`,
    };
    fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: { Authorization: "Bearer " + accessToken },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(spotify.getAccessToken());
    // spotify.getMyDevices().then((res) => {
    //   console.log(res);
    // });
    // spotify
    //   .play({
    //     context_uri: `spotify:playlist:1OIzwJTbrOeZTHvUXf5yMg`,
    //   })
    //   .then((res) => {
    //     spotify.getMyCurrentPlayingTrack().then((res) => {
    //       dispatch({ type: "SET_ITEM", item: res.item });
    //       dispatch({ type: "SET_PLAYING", playing: true });
    //     });
    //   })
    //   .catch((error) => {});
  };

  const playSong = (id) => {
    spotify.play({ uris: [`spotify:track:${id}`] }).then((res) => {
      console.log(res);
      spotify.getMyCurrentPlayingTrack().then((res) => {
        dispatch({ type: "SET_ITEM", item: res.item });
        dispatch({ type: "SET_PLAYING", playing: true });
      });
    });
  };

  return (
    <div className={"body"}>
      <Header spotify={spotify} />

      <div className={"body_info"}>
        <img src={discover_weekly?.images[0].url} alt={""} />
        <div className={"body_infoText"}>
          <strong>Playlists</strong>
          <h2>Discover-weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className={"body_songs"}>
        <div className={"body_icons"}>
          <PlayCircleFilledIcon
            className={"body_shuffle"}
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize={"large"} />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} playSong={playSong} key={item.track.id} />
        ))}
      </div>
    </div>
  );
};

export default Body;
