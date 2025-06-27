import React from "react";

export default function PastItems() {
  const pastItems = JSON.parse(localStorage.getItem("snapcycle_past_items") || "[]");

  if (!pastItems.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Past Items</h1>
        <p>No past items found.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>Past Items</h1>
      {pastItems.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            padding: "1rem",
            marginBottom: "1.2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={item.image}
              alt={`Past item ${idx + 1}`}
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginBottom: "0.7rem",
                border: "1px solid #b2f7ef",
              }}
            />
          </div>
          <div style={{ color: "#2196F3", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            {new Date(item.date).toLocaleString()}
          </div>
          <div
            style={{ color: "#1a3c34", fontSize: "1rem" }}
            dangerouslySetInnerHTML={{
              __html: item.analysis
                .replace(/\n/g, "<br/>")
                .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                .replace(/\*([^*]+)\*/g, "<em>$1</em>"),
            }}
          />
        </div>
      ))}
    </div>
  );
}