import { createContext, useReducer, useState, useContext } from "react";
import data from "../GEOJson.json";
import calculateCenter from "../utilites/calculateCenter";
import removePin from "../utilites/removePin";

const MarkersContext = createContext();

// DATA
const { geometry } = data.features[0];
const { coordinates } = geometry;
const paths = [];

coordinates.forEach((coordinate) =>
  coordinate.forEach((path) => paths.push({ lat: path[1], lng: path[0] }))
);

const markersReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "REMOVE-ALL":
      return (state = []);
    case "REMOVE":
      return (state = removePin(state, action.payload));
    default:
      return state;
  }
};

const center = calculateCenter(paths);
const initialState = [];

export const MarkersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(markersReducer, initialState);
  const [selected, setSelected] = useState(null);

  return (
    <MarkersContext.Provider
      value={{
        state,
        dispatch,
        paths,
        center,
        selected,
        setSelected,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
};

export function useMarkersContext() {
  return useContext(MarkersContext);
}
