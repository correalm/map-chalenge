import { Marker } from "@react-google-maps/api";
import { useMarkersContext } from "../../context/MarkerContext";

// SVG
import pin from "../../assets/Regular=on, Move=off.svg";
import pin2 from "../../assets/Regular=off, Move=on.svg";

const Markers = () => {
  const { state, setSelected, selected, dispatch } = useMarkersContext();

  const handleClickMarker = (marker, e) => {
    if (selected !== marker.id) {
      setSelected(marker.id);
    } else {
      setSelected(null);
    }
  };
  const handleDragEnd = (e, markerId) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    dispatch({
      type: "MODIFY-POSITION",
      payload: { id: markerId, lat, lng },
    });
  };

  return (
    <div>
      {state.map((marker) => {
        return (
          <Marker
            key={marker.id}
            draggable={selected === marker.id ? true : false}
            onClick={(e) => handleClickMarker(marker, e)}
            icon={selected === marker.id ? pin2 : pin}
            position={marker.coordinates}
            onDragEnd={(e) => handleDragEnd(e, marker.id)}
          />
        );
      })}
    </div>
  );
};

export default Markers;
