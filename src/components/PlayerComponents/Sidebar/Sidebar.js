import React from "react";
import "./Sidebar.css";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useAuthDataValue } from "../../../Store/AuthData";

const Sidebar = () => {
  const [{ playlists }, dispatch] = useAuthDataValue();
  console.log(playlists);
  return (
    <div className={"sidebar"}>
      <img
        className={"sidebar_logo"}
        src={
          "https://1000logos.net/wp-content/uploads/2017/08/Spotify-symbol.jpg"
        }
        alt={""}
      />
      <SidebarOptions title={"Home"} Icon={HomeIcon} />
      <SidebarOptions title={"Search"} Icon={SearchIcon} />
      <SidebarOptions title={"Library"} Icon={LibraryMusicIcon} />
      <br />
      <strong className={"sidebar_title"}>PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOptions title={playlist.name} />
      ))}
    </div>
  );
};

export default Sidebar;
