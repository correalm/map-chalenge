import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import MyMap from "./components/Map/MyMap";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <MyMap />
      </div>
    </>
  );
}

export default App;
