import { useMarkersContext } from "../../context/MarkerContext";
import "./Control.sass";
import pin from "../../assets/Pin.svg";
import trash from "../../assets/Trash.svg";
import Modal from "../Modal/Modal";
import { useModalContext } from "../../context/ModalContext";

const Control = () => {
  const { state, dispatch, center, selected, setSelected } =
    useMarkersContext();
  const { toggleShow, show } = useModalContext();

  const handleAddMarker = (e) => {
    const time = Date.now();
    console.log(time);
    const obj = {
      coordinates: { lat: center.lat, lng: center.lng },
      timestamp: time,
      id: time,
    };
    dispatch({
      type: "ADD",
      payload: obj,
    });
  };

  const handleDeleteAll = () => {
    dispatch({
      type: "REMOVE-ALL",
    });
  };

  const handleDeletePin = (pinSelected) => {
    dispatch({
      type: "REMOVE",
      payload: pinSelected,
    });
    setSelected(false);
  };

  const handle = () => {
    console.log("[HANDLE]");
    console.log(show);
    toggleShow();
  };

  return (
    <div
      className={
        state.length === 0
          ? "controls"
          : selected
          ? "controls controls-selected"
          : "controls controls-deleteAll"
      }
    >
      {selected && (
        <button
          onClick={() => handleDeletePin(selected)}
          className="btn btn-red"
        >
          Exluir Pin
          <img src={trash} />
        </button>
      )}
      <button className="btn" onClick={handleAddMarker}>
        Adicionar Novo <img src={pin} />
      </button>
      {state.length > 0 && (
        <button onClick={handle} className="btn btn-red">
          Excluir Todos
          <img src={trash} />
        </button>
      )}
    </div>
  );
};

export default Control;
