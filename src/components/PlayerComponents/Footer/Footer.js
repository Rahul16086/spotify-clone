import React, { useEffect } from "react";
import "./Footer.css";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useAuthDataValue } from "../../../Store/AuthData";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const Footer = ({ spotify }) => {
  const [{ token, item, playing }, dispatch] = useAuthDataValue();
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((res) => {
      console.log(res);

      dispatch({ type: "SET_PLAYING", playing: res.is_playing });

      dispatch({ type: "SET_ITEM", item: res.item });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({});
    } else {
      spotify.play();
      dispatch({ type: "SET_PLAYING", playing: true });
    }
  };

  const handleSkipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({ type: "SET_ITEM", item: res.item });
      dispatch({ type: "SET_PLAYING", playing: true });
    });
  };

  const handleSkipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({ type: "SET_ITEM", item: res.item });
      dispatch({ type: "SET_PLAYING", playing: true });
    });
  };

  return (
    <div className={"footer"}>
      <div className={"footer_left"}>
        <img
          className={"footer_albumArt"}
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className={"footer_songInfo"}>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artists) => artists.name).join(", ")}</p>
          </div>
        ) : (
          <div className={"footer_songInfo"}>
            <h4>Nothings playing :(</h4>
          </div>
        )}
      </div>

      <div className={"footer_center"}>
        <ShuffleIcon className={"footer_green"} />
        <SkipPreviousIcon className={"footer_icon"} onClick={handleSkipNext} />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize={"large"}
            className={"footer_icon"}
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize={"large"}
            className={"footer_icon"}
          />
        )}
        <SkipNextIcon className={"footer_icon"} onClick={handleSkipPrevious} />
        <RepeatIcon className={"footer_green"} />
      </div>

      <div className={"footer_right"}>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
