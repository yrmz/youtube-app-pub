import React, { useContext, useReducer } from "react";

export interface StateType {
  id: number;
  listName: string;
  discription: string;
  channelIds: string[];
}

export enum EnumActionType {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
}

type ActionType = {
  type: EnumActionType;
  payload: {
    state: StateType;
  };
};

const reducer = (state: StateType[], action: ActionType) => {
  let newState: StateType[] = [];
  switch (action.type) {
    case EnumActionType.Create:
      newState = [...state, action.payload.state];
      break;
    case EnumActionType.Update:
      newState = state.map((v) =>
        v.id === action.payload.state.id ? action.payload.state : v
      );
      break;
    case EnumActionType.Delete:
      newState = state.filter((v) => v.id !== action.payload.state.id);
      break;
  }

  localStorage.setItem("list", JSON.stringify(newState));
  return newState;
};

const Store = React.createContext<
  [
    StateType[],
    React.Dispatch<ActionType>,
    (id?: number) => StateType | undefined
  ]
>([[], () => {}, () => undefined]);

export const ListProvider: React.FC = ({ children }) => {
  const list = localStorage.getItem("list");
  const initState: StateType[] = list ? JSON.parse(list) : [];
  const [state, dispatch] = useReducer(reducer, initState);

  const handleGetList = (id?: number) => {
    return state.find((v) => v.id === id);
  };

  return (
    <Store.Provider value={[state, dispatch, handleGetList]}>
      {children}
    </Store.Provider>
  );
};

export const useListContext = (): [
  StateType[],
  React.Dispatch<ActionType>,
  (id?: number) => StateType | undefined
] => {
  return useContext(Store);
};
