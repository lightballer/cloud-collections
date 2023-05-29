import { createContext, useReducer, useContext } from "react";

const initialState = {
  username: "",
};

const ACTIONS = {
  username: (state, payload) => ({ ...state, username: payload }),
};

const reducer = (state, action) => {
  const actionHandler = ACTIONS[action.type];
  if (actionHandler) return actionHandler(state, action.payload);
  else throw new Error("Unsupported action type");
};

const StateContext = createContext();

const useStateDispatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export const StateProvider = ({ children }) => {
  const value = useStateDispatch();
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
