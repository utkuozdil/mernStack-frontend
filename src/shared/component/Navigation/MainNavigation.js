import React, { useState } from "react";
import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavigationLink from "./NavigationLink";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = props => {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  return (
    <React.Fragment>
      {drawerVisibility && (
        <Backdrop onClick={() => setDrawerVisibility(false)} />
      )}
      <SideDrawer
        show={drawerVisibility}
        onClick={() => setDrawerVisibility(false)}
      >
        <nav className="main-navigation__drawer-nav">
          <NavigationLink />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setDrawerVisibility(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Favourite Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavigationLink />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
