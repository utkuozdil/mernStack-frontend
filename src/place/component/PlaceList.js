import React from "react";
import "./PlaceList.css";
import Card from "../../shared/component/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/component/FormElements/Button";

const PlaceList = props => {
  if (props.placeItemList.length === 0)
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found</h2>
          <Button to="/places/new">Share Favourite Place</Button>
        </Card>
      </div>
    );
  return (
    <ul className="place-list">
      {props.placeItemList.map(placeItem => (
        <PlaceItem
          key={placeItem.id}
          id={placeItem.id}
          image={placeItem.image}
          title={placeItem.title}
          description={placeItem.description}
          address={placeItem.address}
          creatorId={placeItem.creator}
          location={placeItem.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
