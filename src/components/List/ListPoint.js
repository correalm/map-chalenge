import "./ListPoint.sass";
import culture from "../../assets/Culture Icon.svg";

const Point = ({ point, index }) => {
  const timestamp = new Date(point.timestamp);
  const date = `
  ${timestamp.toLocaleDateString()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;

  return (
    <div className="pointContent">
      <h4>
        <img src={culture} alt="icon" />
        Ponto n° {index}
      </h4>
      <p>Criado em: {date}</p>
      <p>Identificador do Ponto: {point.id}</p>
    </div>
  );
};

export default Point;
