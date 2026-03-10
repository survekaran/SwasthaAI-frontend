import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm SwasthyaAI. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are SwasthyaAI, a helpful and friendly health assistant. Answer health-related questions clearly and concisely. Always recommend consulting a doctor for serious concerns.",
          messages: [
            ...messages.filter(m => m.from !== "bot" || messages.indexOf(m) !== 0).map(m => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: trimmed }
          ]
        })
      });
      const data = await response.json();
      const botText = data.content?.[0]?.text || "Sorry, I couldn't understand that.";
      setMessages((prev) => [...prev, { from: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [...prev, { from: "bot", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      <style>{`
        .chat-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          z-index: 1000;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .chat-fab.closed {
          background: #1f2937;
        }
        .chat-fab.closed:hover {
          background: #374151;
          transform: scale(1.08);
        }
        .chat-fab.open {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          box-shadow: 0 4px 20px rgba(6,182,212,0.45);
        }
        .chat-fab.open:hover {
          transform: scale(1.08);
        }

        .chat-window {
          position: fixed;
          bottom: 92px;
          right: 28px;
          width: 340px;
          height: 480px;
          background: rgba(255,255,255,0.97);
          border-radius: 20px;
          box-shadow: 0 12px 48px rgba(6,182,212,0.15), 0 2px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(6,182,212,0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
          transform-origin: bottom right;
          animation: popIn 0.22s ease;
          font-family: system-ui, sans-serif;
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .chat-header {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          padding: 0.9rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .chat-header-icon {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .chat-header-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.2px;
        }
        .chat-header-sub {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.8);
          margin-top: 1px;
        }
        .chat-header-dot {
          width: 7px; height: 7px;
          background: #84cc16;
          border-radius: 50%;
          margin-left: auto;
          box-shadow: 0 0 6px #84cc16;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          background: #f8fafc;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

        .msg-row {
          display: flex;
        }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.bot  { justify-content: flex-start; }

        .msg-bubble {
          max-width: 80%;
          padding: 0.55rem 0.85rem;
          border-radius: 14px;
          font-size: 0.83rem;
          line-height: 1.5;
        }
        .msg-bubble.user {
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .msg-bubble.bot {
          background: #fff;
          color: #1f2937;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .typing-dots {
          display: flex; gap: 4px; padding: 4px 2px; align-items: center;
        }
        .typing-dots span {
          width: 6px; height: 6px;
          background: #06b6d4;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }

        .chat-input-area {
          padding: 0.75rem;
          background: #fff;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
        }
        .chat-input {
          flex: 1;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.55rem 0.75rem;
          font-size: 0.83rem;
          font-family: system-ui, sans-serif;
          color: #1f2937;
          background: #f8fafc;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          max-height: 80px;
        }
        .chat-input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6,182,212,0.1);
        }
        .chat-send-btn {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(6,182,212,0.3);
        }
        .chat-send-btn:hover { transform: scale(1.08); }
        .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
      `}</style>

      {/* Floating Button */}
      <button
        className={`chat-fab ${isOpen ? "open" : "closed"}`}
        onClick={() => setIsOpen((p) => !p)}
        title="Chat with SwasthyaAI"
      >
        {isOpen ? (
          // X icon when open
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          // Chat icon when closed
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            <div>
              <div className="chat-header-title">SwasthyaAI</div>
              <div className="chat-header-sub">Health Assistant</div>
            </div>
            <div className="chat-header-dot" />
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.from}`}>
                <div className={`msg-bubble ${msg.from}`}>{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="msg-row bot">
                <div className="msg-bubble bot">
                  <div className="typing-dots">
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <textarea
              className="chat-input"
              rows={1}
              placeholder="Ask a health question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <button className="chat-send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}