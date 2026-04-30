import './App.css';
import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Seedha Token (Tension khatam)
  const hfToken = "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"; 

  const generateImage = async () => {
    if (!prompt) {
      alert("Kuch toh likho bhai!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: { Authorization: `Bearer ${hfToken}` },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const result = await response.blob();
      setImage(URL.createObjectURL(result));
    } catch (e) {
      alert("Error aa gaya! Phir se try karo.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Image Generator</h1>
      <input 
        type="text" 
        placeholder="Yahan likho (e.g. Flying Car)..." 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage}>
        {loading ? "Ban raha hai..." : "Banao Image"}
      </button>
      <div id="result-container">
        {image && <img src={image} alt="AI Result" />}
      </div>
    </div>
  );
}

export default App;
