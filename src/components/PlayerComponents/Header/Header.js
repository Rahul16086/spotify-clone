import React from "react";
import "./Header.css";
import { Avatar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useAuthDataValue } from "../../../Store/AuthData";

const Header = ({ spotify }) => {
  const [{ user }] = useAuthDataValue();
  return (
    <div className={"header"}>
      <div className={"header_left"}>
        <SearchIcon />
        <input placeholder={"Search"} type={"text"} />
      </div>
      <div className={"header_right"}>
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
