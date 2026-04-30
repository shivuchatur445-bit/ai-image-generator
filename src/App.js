import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Is token ko aise hi rehne dena
  const hfToken = "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"; 

  const generateImage = async () => {
    if (!prompt) return alert("Pehle box mein kuch likho!");
    
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
    } catch (error) {
      alert("Error aa gaya, phir se try karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Image Generator</h1>
      <input 
        type="text" 
        placeholder="Type here..." 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
      />
      <button onClick={generateImage}>
        {loading ? "Processing..." : "Generate Image"}
      </button>
      <div id="result-container">
        {image && <img src={image} alt="AI" style={{width: '100%'}} />}
      </div>
    </div>
  );
}

export default App;
