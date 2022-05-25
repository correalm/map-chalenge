import "./List.sass";
import "./scroll.css";
import { useMarkers, useMarkersContext } from "../../context/MarkerContext";
import Point from "./Point";
import { useEffect, useState } from "react";

const List = () => {
  const { state } = useMarkersContext();

  // tentativa de implementar o id do ponto
  const [control, setControl] = useState(1);
  console.log(control);

  return (
    <div className="container">
      <div className="title">
        <h3>Listagem de pontos</h3>
      </div>
      <div className={state.length === 0 ? "empty" : "content"}>
        {state.length === 0 ? (
          <p>Sem pontos de monitoramento para exibir no momento</p>
        ) : (
          state.map((point) => <Point key={point.id} point={point} />)
        )}
      </div>
    </div>
  );
};

export default List;
