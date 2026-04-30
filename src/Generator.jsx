import React, { useState } from 'react';

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const hfToken = process.env.NEXT_PUBLIC_HF_TOKEN;

  const generateImage = async () => {
    if (!prompt) return alert("Pehle kuch likho!");
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
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Image Generator</h1>
      <input 
        type="text" 
        value={prompt} 
        onChange={(e) => setPrompt(e.target.value)} 
        placeholder="Describe your image..." 
      />
      <button onClick={generateImage}>
        {loading ? "Creating..." : "Generate"}
      </button>
      <div id="result-container">
        {image && <img src={image} alt="AI Generated" style={{width: '100%'}} />}
      </div>
    </div>
  );
};

export default Generator;
