import "./App.css";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Modal />
      <Header />
      <div className="App">
        <Map />
      </div>
    </>
  );
}

export default App;
