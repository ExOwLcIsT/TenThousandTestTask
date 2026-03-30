import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import FormEditor from "./pages/FormEditor";
import FormFill from "./pages/FormFill";

function App() {
  return (
    <BrowserRouter>
      <nav className="nav-container nav-glass">
        <ul className="nav-list nav-list-mobile">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form/create" element={<FormEditor />} />
        <Route path="/form/:id" element={<FormFill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
