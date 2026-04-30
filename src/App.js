import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Yeh token tere liye naya hai, isse try kar
  const token = "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";

  const handleGenerate = async () => {
    if (!prompt) return alert("Pehle kuch likho!");
    setLoading(true);
    setImage(null);

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (res.status === 503) {
        alert("AI Model load ho raha hai, 15 second baad fir click karein!");
      } else {
        const blob = await res.blob();
        setImage(URL.createObjectURL(blob));
      }
    } catch (err) {
      alert("Error aa gaya bhai!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#00d4ff' }}>AI Image Generator</h1>
      <input 
        type="text" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        style={{ padding: '10px', width: '250px', borderRadius: '5px', border: 'none' }}
      />
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {loading ? "Processing..." : "Banao Image"}
      </button>
      <div style={{ marginTop: '20px' }}>
        {loading && <p>AI is working... Please wait.</p>}
        {image && <img src={image} alt="AI Result" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', border: '2px solid #333' }} />}
      </div>
    </div>
  );
}

export default App;
