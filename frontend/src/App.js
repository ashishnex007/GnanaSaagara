import React, { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Dabba from "./components/Dabba";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./index.css";

function App() {
  const [mode, setMode] = useState("light");
  const [size, setSize] = useState(6);
  const [color, setColor] = useState("primary");
  const [font, setFont] = useState();
  const [formVisible, setFormVisible] = useState(false);

  const handleSizeChange = (event) => {
    const selectedSize = parseInt(event.target.value, 10);
    setSize(selectedSize);
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
  };

  const handleFontChange = (event) => {
    const selectedFont = event.target.value;
    setFont(selectedFont);
  };

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#212529";
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("fontSize", size);
    localStorage.setItem("fontColor", color);
    localStorage.setItem("fontFamily", font);
  };

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedFontSize = localStorage.getItem("fontSize");
    const savedFontColor = localStorage.getItem("fontColor");
    const savedFontFamily = localStorage.getItem("fontFamily");

    // Apply saved settings or use default values
    setSize(savedFontSize ? parseInt(savedFontSize) : 6); // Default font size 6
    setColor(savedFontColor || "primary"); // Default color "primary"
    setFont(savedFontFamily || ""); // Default font family empty string
  }, []);


  return (
    <div>
      <Navbar mode={mode} toggleMode={toggleMode} />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className={`text-${mode=="light"?"dark":"light"}`}>GnanaSaagara Search</h1>
          <div className="d-flex">
          <p className="mx-3 text-muted pt-2">customize article</p>
          <button
            className="btn-transparent"
            onClick={toggleFormVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-sliders"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"
              />
            </svg>
          </button>
        </div>
        </div>

        {formVisible && (
          <div className="d-flex my-4">
            <Form.Select className="mx-4 px-4" onChange={handleFontChange}>
              <option>Font</option>
              <option>Default</option>
              <option className="roboto">Roboto</option>
              <option className="hanalei">Serif</option>
            </Form.Select>
            <Form.Select className="mx-4 px-4" onChange={handleSizeChange}>
              <option value={6}>Text Size</option>
              <option value={6}>Default</option>
              <option value={4}>Medium</option>
              <option value={3}>Large</option>
              <option value={2}>Ex-Large</option>
              <option value={1}>Ex-Ex-Large</option>
            </Form.Select>
            <Form.Select className="mx-4 px-4" onChange={handleColorChange}>
              <option value={"primary"}>Color</option>
              <option value={"dark"}>Default</option>
              <option value={"warning"}>Yellow</option>
              <option value={"danger"}>Red</option>
              <option value={"info"}>Turquoise</option>
            </Form.Select>
            <div className="container mt-3">
        {/* Save button to persist settings */}
        <Button variant="success" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
          </div>
        )}

        <Dabba
          mode={mode}
          size={size}
          color={color}
          font={font}
          toggleMode={toggleMode}
        />
      </div>
    </div>
  );
}

export default App;