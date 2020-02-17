import React, { useState, useContext } from "react";
import "./Auth.css";
import Card from "../../shared/component/UIElements/Card";
import Input from "../../shared/component/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { useForm } from "../../shared/hook/formHook";
import Button from "../../shared/component/FormElements/Button";
import { AuthContext } from "../../shared/context/authContext";
import { SIGNUP, LOGIN } from "../../shared/util/path";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hook/httpHook";
import ImageUpload from "../../shared/component/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [loginVisibility, setLoginVisibility] = useState(true);
  const { loadingVisibility, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false }
    },
    false
  );

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (loginVisibility) {
      try {
        const responseData = await sendRequest(
          LOGIN,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(SIGNUP, "POST", formData);
        auth.login(responseData.userId, responseData.token);
      } catch (error) {}
    }
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        {loadingVisibility && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!loginVisibility && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!loginVisibility && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {loginVisibility ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button
          inverse
          onClick={() => {
            if (!loginVisibility)
              setFormData(
                { ...formState.inputs, name: undefined, image: undefined },
                formState.inputs.email.isValid &&
                  formState.inputs.password.isValid
              );
            else
              setFormData(
                {
                  ...formState.inputs,
                  name: { value: "", isValid: false },
                  image: { value: null, isValid: false }
                },
                false
              );
            setLoginVisibility(!loginVisibility);
          }}
        >
          SWITCH TO {loginVisibility ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
      <ErrorModal error={error} onClear={clearError} />
    </React.Fragment>
  );
};

export default Auth;
