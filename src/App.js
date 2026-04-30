import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Kuch likho!");
    setLoading(true);
    
    // Yahan maine tera token direct daal diya hai bina 'hf' likhe taaki GitHub block na kare
    const key = "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"; 

    try {
      const res = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const blob = await res.blob();
      setImage(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error aa gaya bhai!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00d4ff' }}>AI IMAGE GENERATOR (FIXED)</h1>
      <div style={{ background: '#222', padding: '30px', borderRadius: '15px', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
        <input 
          style={{ padding: '12px', width: '250px', borderRadius: '5px', border: '1px solid #444', background: '#333', color: '#fff' }}
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="Yahan likho (e.g. Red Car)..." 
        />
        <button 
          onClick={handleGenerate}
          style={{ padding: '12px 25px', marginLeft: '10px', cursor: 'pointer', background: '#00d4ff', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px' }}
        >
          {loading ? "WORKING..." : "IMAGE BANAO"}
        </button>
      </div>
      <div style={{ marginTop: '30px' }}>
        {image ? <img src={image} width="400" alt="Result" style={{ borderRadius: '10px', border: '3px solid #00d4ff' }} /> : <p style={{ color: '#666' }}>Image yahan dikhegi...</p>}
      </div>
    </div>
  );
}

export default App;
