// REACT
import { createContext, useReducer, useState, useContext } from "react";

// DATA
import geoCoordinates from "../GEOJson.json";

// UTILITES
import calculateCenter from "../utilites/calculateCenter";
import removePin from "../utilites/removePin";

// Testando com outras coordenadas
import dataTest from "../GEOTestJson.json";

const MarkersContext = createContext();

// PATHS TO POLYGON
const { geometry } = dataTest.features[0];
const { coordinates } = geometry;
const paths = [];

coordinates.forEach((coordinate) =>
  coordinate.forEach((path) => paths.push({ lat: path[1], lng: path[0] }))
);

// CENTER OF POLYGON
const center = calculateCenter(paths);

// CONFIG REDUCER
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
