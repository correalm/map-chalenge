import "./Point.sass";
import culture from "../../assets/Culture Icon.svg";

const Point = ({ point }) => {
  console.log(point);
  const timestamp = new Date(point.timestamp);
  const date = `
  ${timestamp.toLocaleDateString()} - ${timestamp.getHours()}:${timestamp.getMinutes()}`;

  return (
    <div className="pointContent">
      <h4>
        <img src={culture} />
        Ponto n°
      </h4>
      <p>Criado em: {date}</p>
    </div>
  );
};

export default Point;
