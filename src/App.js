import './App.css';
const btn = document.getElementById("generate-btn");
const promptInput = document.getElementById("prompt");
const image = document.getElementById("output-image");
const loading = document.getElementById("loading-text");

// Ye line Vercel se key uthayegi, code mein dikhegi nahi
const hfToken = process.env.NEXT_PUBLIC_HF_TOKEN;

async function query(data) {
    loading.style.display = "block";
    image.style.display = "none";

    const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
            headers: { Authorization: `Bearer ${hfToken}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

btn.addEventListener("click", async () => {
    if(!promptInput.value) { alert("Pehle kuch likho!"); return; }
    
    query({"inputs": promptInput.value}).then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
        image.style.display = "block";
        loading.style.display = "none";
    });
});
