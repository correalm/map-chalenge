import React, { useEffect } from "react";
import { memo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Polygon } from "@react-google-maps/api";

import "./MyMap.css";
import List from "../List/List";
import pin from "../../assets/Regular=on, Move=off.svg";
import pin2 from "../../assets/Regular=off, Move=on.svg";

import { useMarkersContext } from "../../context/MarkerContext";
import Control from "../Control/Control";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const polygonOptions = {
  fillColor: "#FFF",
  fillOpacity: 0.3,
  strokeColor: "#FFF",
  strokeOpacity: 1,
  strokeWeight: 1,
  clickable: true,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const MyMap = () => {
  const { state, paths, center, setSelected, selected, setLoad, dispatch } =
    useMarkersContext();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCm3Pehwq5JVY3_9l9jsEDpnUSR1bnsBus",
  });

  const google = window.google;
  console.log(google);

  const map = () => {
    const options = {
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP, // 'centro-direita' ,
      },
      mapTypeId: "satellite",
    };

    // Ver se é interessante
    // const handleClickPolygon = (e) => {
    //   const lat = e.latLng.lat();
    //   const lng = e.latLng.lng();
    //   const id = lat + lng / 2;
    //   const time = Date.now();
    //   const obj = { coordinates: { lat: lat, lng: lng }, timestamp: time, id };
    //   dispatch({
    //     type: "ADD",
    //     payload: obj,
    //   });
    // };

    const handleClickMarker = (element, e) => {
      if (selected) {
        setSelected(false);
        e.domEvent.target.src = pin;
      } else {
        setSelected(element.id);
        e.domEvent.target.src = pin2;
      }
    };
    console.log(selected);

    return (
      <div className="map">
        {isLoaded && (
          <GoogleMap
            options={options}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            <Polygon
              paths={paths}
              options={polygonOptions}
              // onClick={handleClickPolygon}
            />
            {state.map((element) => (
              <Marker
                key={element.id}
                draggable={true}
                onClick={(e) => handleClickMarker(element, e)}
                icon={pin}
                position={element.coordinates}
              />
            ))}
            <List />
            <Control />
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        )}
      </div>
    );
  };

  if (isLoaded) {
    return map();
  } else {
    return <p>Carregando...</p>;
  }
};

export default memo(MyMap);
