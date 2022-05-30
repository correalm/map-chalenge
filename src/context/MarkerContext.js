// REACT
import {
  createContext,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";

// DATA
import geoCoordinates from "../GEOJson.json";

// UTILITES
import calculateCenter from "../utilites/calculateCenter";

// Testando com outras coordenadas
import dataTest from "../GEOTestJson.json";
// REDUCER
import { markersReducer } from "../reducers/markersReducer";

const MarkersContext = createContext();

// PATHS TO POLYGON
const { geometry } = geoCoordinates.features[0];
const { coordinates } = geometry;
const paths = [];

coordinates.forEach((coordinate) =>
  coordinate.forEach((path) => paths.push({ lat: path[1], lng: path[0] }))
);

// CENTER OF POLYGON
const center = calculateCenter(paths);

export const MarkersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(markersReducer, [], () => {
    const localData = localStorage.getItem("points");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(state));
  }, [state]);

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
