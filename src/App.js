import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import MyMap from "./components/Map/MyMap";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <>
      <Modal />
      <Header />
      <div className="App">
        <MyMap />
      </div>
    </>
  );
}

export default App;
