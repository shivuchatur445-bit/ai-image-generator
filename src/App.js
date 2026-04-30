import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Text input ko pakadne ke liye state
  const [prompt, setPrompt] = useState("");
  // 2. Image dikhane ke liye state
  const [image, setImage] = useState(null);
  // 3. Loading dikhane ke liye state
  const [loading, setLoading] = useState(false);

  const hfToken = "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"; 

  const generateImage = async () => {
    if (!prompt) {
      alert("Bhai, pehle kuch likho toh sahi!");
      return;
    }

    setLoading(true);
    setImage(null); // Purani image hata do

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

      if (!response.ok) {
        throw new Error("API Limit ya Error aagaya");
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);
      setImage(imageUrl);
    } catch (error) {
      alert("AI thak gaya hai, ek baar phir se try karo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Image Magic</h1>
      
      <div className="input-area">
        <input 
          type="text" 
          placeholder="Yahan likho... (e.g. Astronaut in Jungle)" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)} // Ye line text ko save karti hai
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Process ho raha hai..." : "Banao Image"}
        </button>
      </div>

      <div id="result-container">
        {loading && <p className="loading-text">AI aapki soch ko tasveer bana raha hai... thoda ruko.</p>}
        {image && <img src={image} alt="AI Generated" className="output-img" />}
      </div>
    </div>
  );
}

export default App;
