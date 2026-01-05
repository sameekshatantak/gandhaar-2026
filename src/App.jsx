import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Events from "./components/Event";
import EventPage from "./components/EventPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/events" element={<Events/>} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

