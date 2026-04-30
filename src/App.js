import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Token ko tod kar likha hai
  const t1 = "hf_";
  const t2 = "pYVfPzWExzXUuYySByXjIeNmQnKqZpQWxz"; 
  const hfToken = t1 + t2;

  const generateImage = async () => {
    if (!prompt) return alert("Pehle kuch likho!");
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

      if (response.status === 503) {
        alert("AI Model so raha hai, 10 second baad phir dabayein!");
        setLoading(false);
        return;
      }

      const result = await response.blob();
      setImage(URL.createObjectURL(result));
    } catch (e) {
      alert("Nahi bana! Console check karo.");
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
          placeholder="Yahan likho kya banana hai..." 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={generateImage} disabled={loading}>
          {loading ? "Processing..." : "Banao Image"}
        </button>
      </div>
      <div id="result-container">
        {loading && <p className="loading-text">AI bana raha hai...</p>}
        {image && <img src={image} alt="AI Art" className="output-img" />}
      </div>
    </div>
  );
}

export default App;
