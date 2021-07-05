import React from "react";
import "./Footer.css";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RepeatIcon from "@material-ui/icons/Repeat";

const Footer = () => {
  return (
    <div className={"footer"}>
      <div className={"footer_left"}>
        <p>Album and Song Details</p>
      </div>
      <div className={"footer_center"}>
        <ShuffleIcon />
        <SkipPreviousIcon />
        <PlayCircleOutlineIcon fontSize={"large"} />
        <SkipNextIcon />
        <RepeatIcon />
      </div>
      <div className={"footer_right"}>
        <p>Volume controls</p>
      </div>
    </div>
  );
};

export default Footer;
