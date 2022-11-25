import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Statement from "./pages/Statement/Statement";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/statement" element={<Statement />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
