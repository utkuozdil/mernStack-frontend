import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../component/PlaceList";
import { useHttpClient } from "../../shared/hook/httpHook";
import { GET_PLACES } from "../../shared/util/path";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";

const UserPlace = () => {
  const [places, setPlaces] = useState();
  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`${GET_PLACES}/${userId}`);
        setPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const deleteHandler = id => {
    setPlaces(places => places.filter(place => place.id !== id));
  };

  return (
    <React.Fragment>
      {loadingVisibility && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!loadingVisibility && places && (
        <PlaceList placeItemList={places} onDelete={deleteHandler} />
      )}
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default UserPlace;
