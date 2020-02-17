import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import "./Place.css";
import { useForm } from "../../shared/hook/formHook";
import Card from "../../shared/component/UIElements/Card";
import { useHttpClient } from "../../shared/hook/httpHook";
import { GET_PLACE, UPDATE_PLACE } from "../../shared/util/path";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/authContext";

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const history = useHistory();
  const auth = useContext(AuthContext);

  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();
  const [selectedPlace, setSelectedPlace] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false }
    },
    true
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`${GET_PLACE}/${placeId}`);
        setSelectedPlace(responseData.place);
        setFormData(
          {
            title: { value: responseData.place.title, isValid: false },
            description: {
              value: responseData.place.description,
              isValid: false
            }
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${UPDATE_PLACE}/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };

  if (loadingVisibility)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (!selectedPlace && !error)
    return (
      <div className="center">
        <Card>
          <h2>couldnt find</h2>
        </Card>
      </div>
    );

  return (
    <React.Fragment>
      {!loadingVisibility && selectedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            type="text"
            label="Title"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={selectedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            initialValue={selectedPlace.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default UpdatePlace;
