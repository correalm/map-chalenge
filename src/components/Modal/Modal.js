import { useModalContext } from "../../context/ModalContext";
import { useMarkersContext } from "../../context/MarkerContext";
import trash from "../../assets/Trash.svg";
import "./Modal.scss";

import React from "react";

const Modal = () => {
  const { show, toggleShow } = useModalContext();

  const { state, dispatch, center, selected, setSelected } =
    useMarkersContext();
  console.log(selected);

  return (
    <>
      {show && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <div className="images-modal">
              <button className="btn btn-red">
                Excluir Todos
                <img src={trash} />
              </button>
            </div>
            <span onClick={toggleShow} className="close">
              &times;
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
