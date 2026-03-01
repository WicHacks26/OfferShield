import React, { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about Herizon." },
  ]);

  const [input, setInput] = useState("");

  
  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = { from: "user", text: input };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: data.reply },
    ]);

  } catch {
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Sorry, something went wrong." },
    ]);
  }
};

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: 25,
          bottom: 25,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg,#7b5cff,#a56bff)",
          color: "white",
          fontSize: 22,
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: 25,
            bottom: 100,
            width: 320,
            height: 420,
            background: "rgba(15,15,25,0.95)",
            borderRadius: 18,
            padding: 14,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            zIndex: 99,
          }}
        >
          <div style={{ flex: 1, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: 14,
                    background:
                      m.from === "user"
                        ? "linear-gradient(135deg,#7b5cff,#a56bff)"
                        : "rgba(255,255,255,0.08)",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.05)",
                color: "white",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "0 14px",
                borderRadius: 10,
                border: "none",
                background: "linear-gradient(135deg,#7b5cff,#a56bff)",
                color: "white",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}