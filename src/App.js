import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generator from "./Generator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Generator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
