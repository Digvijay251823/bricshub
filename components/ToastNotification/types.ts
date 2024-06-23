// types.ts
export interface Toast {
  isVisible: boolean;
  message: string;
  type: "SUCCESS" | "ERROR" | "LOADING";
}

export interface GlobalState {
  toasts: Toast;
}

export type Action =
  | {
      type: "ADD_TOAST";
      payload: { type: "SUCCESS" | "ERROR" | "LOADING"; message: string };
    }
  | { type: "REMOVE_TOAST" };
