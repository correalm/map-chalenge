import "./List.sass";
import "./ScrollBar.sass";
import { useMarkers, useMarkersContext } from "../../context/MarkerContext";
import ListPoint from "./ListPoint/ListPoint";
import { useEffect, useState } from "react";

const List = () => {
  const { state, selected } = useMarkersContext();

  return (
    <div className="container">
      <div className="title">
        <h3>Listagem de pontos</h3>
      </div>
      <div className={state.length === 0 ? "empty" : "content"}>
        {state.length === 0 ? (
          <p>Sem pontos de monitoramento para exibir no momento</p>
        ) : (
          state.map((point, index) => (
            <ListPoint
              key={point.id}
              className={
                point.id === selected
                  ? "pointContent pointContent-selected"
                  : "pointContent"
              }
              point={point}
              index={String(index + 1).padStart(3, "0")}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default List;
