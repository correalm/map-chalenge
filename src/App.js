import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Markers from "./components/Markers/Markers";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Modal />
      <div className="App">
        <Map />
      </div>
    </>
  );
}

export default App;
