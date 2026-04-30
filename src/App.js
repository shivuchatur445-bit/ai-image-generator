import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Generator from "@/pages/Generator";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Generator />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
