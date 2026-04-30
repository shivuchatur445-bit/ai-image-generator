import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Wand2, Download, Trash2, Copy, ImageIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/generate`, { prompt, style: "default", aspect_ratio: "1:1" });
      setCurrent(data);
      toast.success("Image generated!");
    } catch (e) {
      toast.error("Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">AI Image Generator</h1>
        <Textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image..." 
          className="border-2 border-black"
        />
        <Button onClick={handleGenerate} disabled={loading} className="w-full bg-blue-600 text-white">
          {loading ? "Processing..." : "Generate"}
        </Button>
        {current && <img src={`data:image/png;base64,${current.image_base64}`} className="w-full border-4 border-white shadow-lg" />}
      </div>
    </div>
  );
}
