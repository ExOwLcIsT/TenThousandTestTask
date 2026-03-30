import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import FormEditor from "./pages/FormEditor";
import FormFill from "./pages/FormFill";
import FormResponses from "./pages/FormResponses";

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
        <Route path="/form/:id/fill" element={<FormFill />} />
        <Route path="/form/:id/responses" element={<FormResponses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
