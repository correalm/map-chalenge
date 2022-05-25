// SASS
import "./Map.sass";

// REACT
import { memo } from "react";

// GOOGLE MAPS API
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Polygon } from "@react-google-maps/api";

// COMPONENTS
import List from "../List/List";
import Control from "../Control/Control";

// SVG
import pin from "../../assets/Regular=on, Move=off.svg";
import pin2 from "../../assets/Regular=off, Move=on.svg";

// CONTEXT
import { useMarkersContext } from "../../context/MarkerContext";

const MyMap = () => {
  // CONFIG LIB
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCm3Pehwq5JVY3_9l9jsEDpnUSR1bnsBus",
  });
  const google = window.google;

  const { state, paths, center, setSelected, selected } = useMarkersContext();

  const map = () => {
    const mapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP, // 'centro-direita' ,
      },
      mapTypeId: "satellite",
    };
    const polygonOptions = {
      fillColor: "#FFF",
      fillOpacity: 0.3,
      strokeColor: "#FFF",
      strokeOpacity: 1,
      strokeWeight: 1,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1,
    };
    const containerStyle = {
      width: "100%",
      height: "100%",
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

    return (
      <div className="map">
        {isLoaded && (
          <GoogleMap
            options={mapOptions}
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
            {isLoaded && <List />}
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
