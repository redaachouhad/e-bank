import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PrivateRessource from "./components/PrivateRessource/PrivateRessource";
import AccueilPage from "./pages/AccueilPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccueilPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={<PrivateRessource component={<HomePage />} path={"/home"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
