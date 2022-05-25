// CONTEXTS
import { useMarkersContext } from "../../context/MarkerContext";
import { useModalContext } from "../../context/ModalContext";

// SASS
import "./Control.sass";

import Button from "./Button/Button";

const Control = () => {
  const { state, dispatch, center, selected } = useMarkersContext();
  const { toggleShow, setFunctionToExclude } = useModalContext();

  const handleAddPin = (e) => {
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
    toggleShow();
    setFunctionToExclude("handleDeleteAll");
  };
  const handleDeletePin = () => {
    toggleShow();
    setFunctionToExclude("handleDeletePin");
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
        <Button
          func={handleDeletePin}
          className={"btn btn-red"}
          text={"Excluir Ponto"}
          svg={"trash"}
        />
      )}
      <Button
        func={handleAddPin}
        className={"btn"}
        text={"Adicionar Ponto"}
        svg={"pin"}
      />
      {state.length > 0 && (
        <Button
          func={handleDeleteAll}
          className={"btn btn-red"}
          text={"Excluir Todos"}
          svg={"trash"}
        />
      )}
    </div>
  );
};

export default Control;
