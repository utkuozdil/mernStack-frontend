import React from "react";
import Card from "../../shared/component/UIElements/Card";
import UserItem from "./UserItem";
import "./UserList.css";

const UserList = props => {
  if (props.userItemList.length === 0)
    return (
      <div className="center">
        <Card>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  return (
    <ul className="user-list">
      {props.userItemList.map(userItem => (
        <UserItem
          key={userItem.id}
          id={userItem.id}
          image={userItem.image}
          name={userItem.name}
          placeCount={userItem.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
