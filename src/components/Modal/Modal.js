// CONTEXT
import { useModalContext } from "../../context/ModalContext";
import { useMarkersContext } from "../../context/MarkerContext";

// ICONS
import trash from "../../assets/Trash.svg";

// SASS
import "./Modal.sass";

// REACT
import React, { useEffect } from "react";
import Button from "../Control/Button/Button";

const Modal = () => {
  const { show, toggleShow, functionToExclude } = useModalContext();
  const { state, dispatch, selected, setSelected } = useMarkersContext();

  const handleDeleteAll = () => {
    dispatch({
      type: "REMOVE-ALL",
    });
    setSelected(false);
    toggleShow();
  };

  const handleDeletePin = (pinSelected) => {
    dispatch({
      type: "REMOVE",
      payload: pinSelected,
    });
    setSelected(false);
    toggleShow();
  };

  const handleCancell = () => {
    // setSelected(false);
    toggleShow();
  };

  return (
    <>
      {show && (
        <div className="modalWrapper">
          <div>
            <div className="close">
              <span onClick={handleCancell}>&times;</span>
            </div>
            <div className="modalContent">
              <div className="contentTitle">
                <h3>
                  {functionToExclude === "handleDeleteAll"
                    ? "Excluir todos os pontos?"
                    : "Excluir Ponto?"}
                </h3>
              </div>
              <div className="contentCard">
                <div className="card">
                  <h6>Atenção</h6>
                  <p>Essa ação não poderá ser desfeita.</p>
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={toggleShow}
                  onClick={
                    functionToExclude === "handleDeleteAll"
                      ? handleDeleteAll
                      : () => handleDeletePin(selected)
                  }
                  className="exclude"
                >
                  Excluir
                </button>
                <button onClick={handleCancell} className="cancell">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
