import logo from "./logo.svg";
import "./App.css";
import Login from "./LoginForm";
import RoomBooking from "./RoomBooking";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./AdminPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/roombooking" element={<RoomBooking />} />
          <Route path="/adminpage" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
