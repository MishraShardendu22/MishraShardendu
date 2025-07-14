import { useState, useEffect } from "react";

interface ChatMessage {
  sender: string;
  message: string;
}

interface ChatbotProps {}

const OpenAIIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const GeminiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4285F4"/>
        <stop offset="100%" stopColor="#A142F5"/>
      </linearGradient>
    </defs>
    <path d="M256 0 L406 256 256 512 106 256 Z" fill="url(#g)"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"></polyline>
    <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
  </svg>
);

const BASE = "https://go-chatbot-backend.onrender.com";

const Chatbot: React.FC<ChatbotProps> = () => {
  const [userId, setUserId] = useState<string>("");
  const [mode, setMode] = useState<string>("deepseek");
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = Math.random().toString(36).substr(2, 9);
    setUserId(stored);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const stored = history;
    setHistory(stored);
  }, [userId, history]);

  const addToHistory = (sender: string, message: string) => {
    setHistory((h) => [...h, { sender, message }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const endpoint = `${BASE}/${mode}`;
    addToHistory("You", input);
    setInput("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: input }),
      });
      if (!res.ok) {
        setStatus(`Error: ${res.status}`);
        return;
      }
      const data = await res.json();
      const reply = typeof data.data === "string" ? data.data : JSON.stringify(data.data);
      const senderLabel = mode === "deepseek" ? "OpenAI" : "Gemini";
      addToHistory(senderLabel, reply);
      setStatus("");
    } catch {
      setStatus("Fetch error");
    }
  };

  const handleClear = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${BASE}/clear?userId=${encodeURIComponent(userId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setStatus(`Error: ${res.status}`);
        return;
      }
      setHistory([]);
      setStatus("Cleared");
    } catch {
      setStatus("Fetch error");
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: isOpen ? '60vw' : '60px',
      height: isOpen ? '90vh' : '60px',
      minWidth: isOpen ? '500px' : '60px',
      maxWidth: isOpen ? '800px' : '60px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1000,
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      border: '1px solid #e5e7eb'
    },
    
    trigger: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    },

    chatInterface: {
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    },

    header: {
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #374151',
      minHeight: '70px'
    },

    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },

    title: {
      fontSize: '20px',
      fontWeight: '700',
      margin: '0',
      letterSpacing: '-0.025em'
    },

    subtitle: {
      fontSize: '14px',
      color: '#9ca3af',
      margin: '4px 0 0 0',
      fontWeight: '400'
    },

    closeButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
      width: '36px',
      height: '36px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
      fontWeight: 'bold'
    },

    controls: {
      padding: '20px 24px',
      borderBottom: '1px solid #e5e7eb',
      background: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },

    modeSelector: {
      display: 'flex',
      gap: '8px',
      padding: '4px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      flex: 1
    },

    radioLabel: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      padding: '10px 16px',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      backgroundColor: 'transparent',
      color: '#6b7280',
      gap: '8px'
    },

    radioLabelActive: {
      backgroundColor: '#1f2937',
      color: 'white',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },

    radioInput: {
      display: 'none'
    },

    clearButton: {
      background: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap'
    },

    chatContainer: {
      flex: 1,
      padding: '24px',
      overflowY: 'auto',
      background: '#ffffff',
      position: 'relative'
    },

    messageContainer: {
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },

    userMessage: {
      alignSelf: 'flex-end',
      background: '#1f2937',
      color: 'white',
      padding: '14px 18px',
      borderRadius: '8px',
      maxWidth: '75%',
      fontSize: '14px',
      lineHeight: '1.5',
      wordWrap: 'break-word',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      fontWeight: '500'
    },

    botMessageContainer: {
      alignSelf: 'flex-start',
      maxWidth: '85%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },

    botHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    botLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    botMessage: {
      background: '#f3f4f6',
      color: '#1f2937',
      padding: '14px 18px',
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.6',
      wordWrap: 'break-word',
      border: '1px solid #e5e7eb',
      fontWeight: '500'
    },

    inputContainer: {
      padding: '20px 24px',
      borderTop: '1px solid #e5e7eb',
      background: '#ffffff'
    },

    inputWrapper: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-end'
    },

    textInput: {
      flex: 1,
      border: '2px solid #d1d5db',
      borderRadius: '8px',
      padding: '14px 16px',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s ease',
      backgroundColor: '#ffffff',
      fontWeight: '500',
      color: '#1f2937',
      minHeight: '20px'
    },

    sendButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '14px 24px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      minHeight: '48px'
    },

    status: {
      color: '#ef4444',
      fontSize: '12px',
      marginBottom: '12px',
      textAlign: 'center',
      fontWeight: '500',
      padding: '8px',
      backgroundColor: '#fef2f2',
      borderRadius: '6px',
      border: '1px solid #fecaca'
    },

    emptyState: {
      textAlign: 'center',
      color: '#9ca3af',
      fontSize: '16px',
      marginTop: '60px',
      fontWeight: '500',
      lineHeight: '1.6'
    },

    emptyStateIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: 0.5
    }
  };

  return (
    <div style={styles.container}>
      {!isOpen && (
        <button 
          style={styles.trigger}
          onClick={() => setIsOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(31, 41, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
        >
          <ChatIcon />
        </button>
      )}

      <div style={styles.chatInterface}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div>
              <h2 style={styles.title}>AI Assistant</h2>
              <p style={styles.subtitle}>Powered by {mode === "deepseek" ? "OpenAI" : "Gemini"}</p>
            </div>
          </div>
          <button 
            style={styles.closeButton}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            ×
          </button>
        </div>

        <div style={styles.controls}>
          <div style={styles.modeSelector}>
            <label style={{
              ...styles.radioLabel,
              ...(mode === "deepseek" ? styles.radioLabelActive : {})
            }}>
              <input
                style={styles.radioInput}
                type="radio"
                name="mode"
                value="deepseek"
                checked={mode === "deepseek"}
                onChange={() => setMode("deepseek")}
              />
              <OpenAIIcon />
              <span>OpenAI</span>
            </label>
            <label style={{
              ...styles.radioLabel,
              ...(mode === "gemini" ? styles.radioLabelActive : {})
            }}>
              <input
                style={styles.radioInput}
                type="radio"
                name="mode"
                value="gemini"
                checked={mode === "gemini"}
                onChange={() => setMode("gemini")}
              />
              <GeminiIcon />
              <span>Gemini</span>
            </label>
          </div>
          <button 
            style={styles.clearButton}
            onClick={handleClear}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(239, 68, 68, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }}
          >
            <TrashIcon />
            Clear
          </button>
        </div>

        <div style={styles.chatContainer}>
          {history.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>💬</div>
              <strong>Welcome to AI Assistant</strong><br/>
              Choose your preferred AI model above and start chatting!<br/>
              <small style={{ color: '#d1d5db', marginTop: '8px', display: 'block' }}>
                Your conversations are private and secure
              </small>
            </div>
          )}
          {history.map((item, idx) => (
            <div key={idx} style={styles.messageContainer}>
              {item.sender === "You" ? (
                <div style={styles.userMessage}>
                  {item.message}
                </div>
              ) : (
                <div style={styles.botMessageContainer}>
                  <div style={styles.botHeader}>
                    {mode === "deepseek" ? <OpenAIIcon /> : <GeminiIcon />}
                    <div style={styles.botLabel}>{item.sender}</div>
                  </div>
                  <div style={styles.botMessage}>
                    {item.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={styles.inputContainer}>
          {status && (
            <div style={styles.status}>{status}</div>
          )}
          <div style={styles.inputWrapper}>
            <input
              style={styles.textInput}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Type your message here..."
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1f2937';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(31, 41, 55, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button 
              style={styles.sendButton}
              onClick={handleSend}
              disabled={!input.trim()}
              onMouseEnter={(e) => {
                if (!input.trim()) return;
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Chatbot };