import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import List from "./components/List";
import Details from "./components/Details";
import PhotoResult from "./components/PhotoResult";
import BarGraph from "./components/BarGraph";
import MapView from "./components/MapView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/photo" element={<PhotoResult />} />
        <Route path="/bargraph" element={<BarGraph />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
