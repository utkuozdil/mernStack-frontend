import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  if (action.type === "INPUT_CHANGE") {
    let isValid = true;
    for (const id in state.inputs) {
      if (state.inputs[id]) {
        if (id === action.id) isValid = isValid && action.isValid;
        else isValid = isValid && state.inputs[id].isValid;
      }
    }
    return {
      ...state,
      inputs: {
        ...state.inputs,
        [action.id]: { value: action.value, isValid: action.isValid }
      },
      isValid
    };
  } else if (action.type === "SET_DATA") {
    return {
      inputs: action.inputs,
      isValid: action.isValid
    };
  } else return state;
};

export const useForm = (initialInput, InitialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInput,
    isValid: InitialFormValidity
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", id, value, isValid });
  }, []);

  const setFormData = useCallback((inputData, formValiditiy) => {
    dispatch({ type: "SET_DATA", inputs: inputData, isValid: formValiditiy });
  }, []);

  return [formState, inputHandler, setFormData];
};
