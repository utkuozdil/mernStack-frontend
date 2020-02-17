import React, { useState, useContext } from "react";
import Card from "../../shared/component/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/component/FormElements/Button";
import Modal from "../../shared/component/UIElements/Modal";
import Map from "../../shared/component/UIElements/Map";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpClient } from "../../shared/hook/httpHook";
import { DELETE_PLACE, IMAGE } from "../../shared/util/path";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";

const PlaceItem = props => {
  const auth = useContext(AuthContext);

  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();
  const [mapVisibility, setMapVisibility] = useState(false);
  const [deletePlaceVisibility, setDeletePlaceVisibility] = useState(false);

  const deleteHandler = async () => {
    setDeletePlaceVisibility(false);
    try {
      await sendRequest(`${DELETE_PLACE}/${props.id}`, "DELETE", null, {
        Authorization: `Bearer ${auth.token}`
      });
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={mapVisibility}
        onCancel={() => setMapVisibility(false)}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={() => setMapVisibility(false)}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={deletePlaceVisibility}
        onCancel={() => setDeletePlaceVisibility(false)}
        header="Delete Place"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={() => setDeletePlaceVisibility(false)}>
              CANCEL
            </Button>
            <Button danger onClick={deleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {loadingVisibility && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`${IMAGE}/${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={() => setMapVisibility(true)}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <React.Fragment>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={() => setDeletePlaceVisibility(true)}>
                  DELETE
                </Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default PlaceItem;
