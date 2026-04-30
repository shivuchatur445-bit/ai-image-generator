import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Yahan humne khud Button aur Textarea bana diye hain
const Button = ({ children, ...props }) => (
  <button {...props} className={`px-4 py-2 bg-black text-white rounded-lg ${props.className}`}>
    {children}
  </button>
);

const Textarea = (props) => (
  <textarea {...props} className={`w-full p-2 border rounded-lg ${props.className}`} />
);

const API = "https://ai-image-generator-backend.vercel.app/api"; // Agar tumhara backend link alag hai toh wo daalna

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/generate`, { 
        prompt, 
        style: "default", 
        aspect_ratio: "1:1" 
      });
      setCurrent(data);
    } catch (e) {
      console.error("Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl font-bold">AI Image Generator</h1>
        <Textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="h-32"
        />
        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? "Generating..." : "Generate Image"}
        </Button>
        
        {current && (
          <div className="mt-8">
            <img src={current.image_url} alt="Generated" className="mx-auto rounded-xl shadow-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}
