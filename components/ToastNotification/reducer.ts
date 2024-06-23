// reducer.ts
import { GlobalState, Action } from "./types";

export const initialState: GlobalState = {
  toasts: {
    isVisible: false,
    type: "LOADING",
    message: "",
  },
};

export const globalReducer = (
  state: GlobalState,
  action: Action
): GlobalState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state.toasts,
        toasts: {
          ...state,
          isVisible: true,
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: {
          ...state.toasts,
          isVisible: false,
        },
      };
    default:
      return state;
  }
};
