import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/component/UIElements/Avatar";
import "./UserList.css";
import Card from "../../shared/component/UIElements/Card";
import "./UserItem.css";
import { IMAGE } from "../../shared/util/path";

const UserItem = props => (
  <li className="user-item">
    <Card className="user-item__content">
      <Link to={`/${props.id}/places`}>
        <div className="user-item__image">
          <Avatar src={`${IMAGE}/${props.image}`} alt={props.name} />
        </div>
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </Link>
    </Card>
  </li>
);

export default UserItem;
