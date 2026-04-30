import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Kuch likho!");
    setLoading(true);
    
    // Token ko hum Prompt ke saath hi bhej denge temporarily test karne ke liye
    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const blob = await res.blob();
      setImage(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#111', color: 'white', minHeight: '100vh', padding: '50px', textAlign: 'center' }}>
      <h1>AI Generator (Fixed)</h1>
      <input 
        style={{ padding: '10px', borderRadius: '5px' }}
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Type here..." 
      />
      <button 
        onClick={handleGenerate}
        style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}
      >
        {loading ? "PROCESSING..." : "GENERATE"}
      </button>
      <div style={{ marginTop: '20px' }}>
        {image && <img src={image} width="300" alt="result" />}
      </div>
    </div>
  );
}
export default App;
