import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const hfToken = "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"; 

  const generateImage = async () => {
    if (!prompt) return alert("Pehle kuch likho bhai!");
    setLoading(true);
    setImage(null);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          headers: { 
            Authorization: `Bearer ${hfToken}`,
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const result = await response.blob();
      setImage(URL.createObjectURL(result));
    } catch (e) {
      alert("Error! Phir se try karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Image Studio</h1>
      <div className="input-area">
        <input 
          type="text" 
          placeholder="E.g. A cybernetic tiger in Tokyo..." 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Creating Art..." : "Generate Magic"}
        </button>
      </div>
      <div id="result-container">
        {loading && <p className="loading-text">AI is thinking...</p>}
        {image && <img src={image} alt="AI Art" className="output-img" />}
        {!image && !loading && <p style={{color: '#475569'}}>Your masterpiece will appear here</p>}
      </div>
    </div>
  );
}

export default App;
