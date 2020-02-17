import React, { useContext } from "react";
import "./NavigationLink.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const NavigationLink = props => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {auth.token && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Favourite Places</NavLink>
        </li>
      )}
      {auth.token && (
        <li>
          <NavLink to="/places/new">Add Favourite Place</NavLink>
        </li>
      )}
      {!auth.token && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {auth.token && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavigationLink;
