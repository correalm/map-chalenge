// CONTEXTS
import { useMarkersContext } from "../../context/MarkerContext";
import { useModalContext } from "../../context/ModalContext";

// SASS
import "./Controls.sass";

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
    <>
      {selected && (
        <div className="controls controls-selected">
          <Button
            func={handleDeletePin}
            className={"btn btn-red"}
            text={"Deletar Pin"}
            svg={"trash"}
          />
        </div>
      )}
      <div
        className={
          state.length === 0 ? "controls" : "controls controls-deleteAll"
        }
      >
        <Button
          func={handleAddPin}
          className={"btn"}
          text={"Adicionar Novo"}
          svg={"pin"}
        />
        {state.length > 0 && (
          <Button
            func={handleDeleteAll}
            className={"btn btn-red"}
            text={"Deletar Todos"}
            svg={"trash"}
          />
        )}
      </div>
    </>
  );
};

export default Control;
