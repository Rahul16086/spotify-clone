import React from "react";
import "./Player.css";
import Body from "../PlayerComponents/Body/Body";
import Sidebar from "../PlayerComponents/Sidebar/Sidebar";
import Footer from "../PlayerComponents/Footer/Footer";

const Player = ({ spotify }) => {
  console.log(spotify);
  return (
    <div className={"player"}>
      <div className={"player_body"}>
        <Sidebar />
        <Body />
      </div>
      <Footer spotify={spotify} />
    </div>
  );
};

export default Player;
