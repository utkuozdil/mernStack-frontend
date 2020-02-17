import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NewPlace from "./place/container/NewPlace";
import UpdatePlace from "./place/container/UpdatePlace";
import UserPlace from "./place/container/UserPlace";
import MainNavigation from "./shared/component/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/authContext";
import { useAuth } from "./shared/hook/authHook";
import Auth from "./user/container/Auth";
import User from "./user/container/User";

const App = () => {
  const { userId, token, login, logout } = useAuth();

  let routes = (
    <Switch>
      <Route path="/" exact>
        <User />
      </Route>
      <Route path="/:userId/places">
        <UserPlace />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );

  if (token)
    routes = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:userId/places">
          <UserPlace />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
