import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";
import { useForm } from "../../shared/hook/formHook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import "./Place.css";
import { useHttpClient } from "../../shared/hook/httpHook";
import { AuthContext } from "../../shared/context/authContext";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";
import { CREATE_PLACE } from "../../shared/util/path";
import ImageUpload from "../../shared/component/FormElements/ImageUpload";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(CREATE_PLACE, "POST", formData, {
        Authorization: `Bearer ${auth.token}`
      });
      history.push("/");
    } catch (error) {}
  };

  return (
    <React.Fragment>
      {loadingVisibility && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description"
          onInput={inputHandler}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD FAVOURITE PLACE
        </Button>
      </form>
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default NewPlace;
