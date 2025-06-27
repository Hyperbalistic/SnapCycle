import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pastItems, setPastItems] = useState(() => {
    const saved = localStorage.getItem("snapcycle_past_items");
    return saved ? JSON.parse(saved) : [];
  });
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const startWebcam = async () => {
    setShowWebcam(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      alert("Could not access webcam.");
      setShowWebcam(false);
    }
  };

  const stopWebcam = () => {
    setShowWebcam(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setImage(dataUrl);
    setPreview(dataUrl);
    stopWebcam();
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Give bullet points to the prompt: 'How would you recycle this specific object.' Use rich text and don't give me any community involvement points." },
                {
                  type: "image_url",
                  image_url: {
                    url: image,
                  },
                },
              ],
            },
          ],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );
      setAnalysis(response.data.choices[0].message.content);
      // Store in past items
      const newItem = {
        image,
        analysis: response.data.choices[0].message.content,
        date: new Date().toISOString(),
      };
      const updated = [newItem, ...pastItems].slice(0, 20); // keep last 20
      setPastItems(updated);
      localStorage.setItem("snapcycle_past_items", JSON.stringify(updated));
    } catch (error) {
      console.error("OpenAI API error:", error);
      setAnalysis("Sorry! Something went wrong.");
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      id="Photo"
      style={{
        padding: "2.5rem 1.5rem",
        minHeight: "80vh",
        background: "linear-gradient(135deg, #e0ffe7 0%, #b2f7ef 100%)",
        borderRadius: "18px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        maxWidth: 480,
        margin: "2.5rem auto",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: 700, fontSize: "2.1rem", color: "#1a3c34", marginBottom: "2rem", letterSpacing: "-1px" }}>
        How do you recycle...
      </h1>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <div style={{ display: "flex", gap: "1.2rem", justifyContent: "center", marginBottom: "2rem" }}>
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
          style={{
            padding: "0.85rem 1.7rem",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
            transition: "background 0.2s, transform 0.2s",
          }}
        >
          Choose/Take Photo
        </button>
        <button
          type="button"
          onClick={showWebcam ? stopWebcam : startWebcam}
          style={{
            padding: "0.85rem 1.7rem",
            background: showWebcam ? "#f44336" : "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: showWebcam ? "0 2px 8px rgba(244,67,54,0.08)" : "0 2px 8px rgba(33,150,243,0.08)",
            transition: "background 0.2s, transform 0.2s",
          }}
        >
          {showWebcam ? "Close PC Webcam" : "Use PC Webcam"}
        </button>
      </div>
      {showWebcam && (
        <div style={{ margin: "1.5rem 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "320px", borderRadius: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", border: "2px solid #b2f7ef" }}
          />
          <div>
            <button
              onClick={capturePhoto}
              style={{
                marginTop: "0.75rem",
                padding: "0.6rem 1.3rem",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
                transition: "background 0.2s, transform 0.2s",
              }}
            >
              Capture Photo
            </button>
          </div>
        </div>
      )}
      {preview && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={preview} alt="Uploaded" style={{ maxWidth: "320px", margin: "1rem 0", borderRadius: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", border: "2px solid #b2f7ef" }} />
          <button onClick={analyzeImage} style={{
                marginTop: "0.5rem",
                padding: "0.6rem 1.3rem",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(76,175,80,0.08)",
                transition: "background 0.2s, transform 0.2s",
              }}>
            SnapCycle!
          </button>
        </div>
      )}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2rem" }}>
          <div style={{
            width: 48,
            height: 48,
            border: "6px solid #b2f7ef",
            borderTop: "6px solid #2196F3",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{ marginTop: 16, color: '#2196F3', fontWeight: 500 }}>Sorting it out...</span>
        </div>
      )}
      {analysis && (
        <div style={{ marginTop: "1.5rem", background: "#fff", borderRadius: "14px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "1.5rem", color: "#1a3c34", width: '100%', maxWidth: 420 }}>
          <h2 style={{ marginTop: 0, fontWeight: 700, fontSize: "1.2rem", color: "#2196F3" }}>Here's what you should do:</h2>
          <div
            style={{ fontSize: "1.08rem" }}
            dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>') }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
