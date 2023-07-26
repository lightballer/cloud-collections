import { createContext, useReducer, useContext } from "react";
import { JsxElement } from "typescript";

interface State {
  username: string;
}

const initialState: State = {
  username: "",
};

const ACTIONS = {
  username: (state: State, payload: string) => ({
    ...state,
    username: payload,
  }),
};

type ACTIONS_ENUM = "username";

const reducer = (
  state: State,
  action: { type: ACTIONS_ENUM; payload: any }
) => {
  const actionHandler = ACTIONS[action.type];
  if (actionHandler) return actionHandler(state, action.payload);
  else throw new Error("Unsupported action type");
};

const useStateDispatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

interface StateProviderProps {
  children: string | JSX.Element;
}

const StateContext = createContext(initialState);

export const StateProvider = ({
  children,
}: StateProviderProps): StateContext.Provider => {
  const value = useStateDispatch();
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
