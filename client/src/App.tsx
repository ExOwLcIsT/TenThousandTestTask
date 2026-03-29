import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/forms.css";
import Main from "./pages/Main";
import FormEditor from "./pages/FormEditor";
import FormFill from "./pages/FormFill";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | |{" "}
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
