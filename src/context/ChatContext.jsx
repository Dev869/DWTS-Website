import { createContext, useContext, useState } from 'react';

const ChatContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5001/dw-tailored-systems/us-central1/handleChat';

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(prompt) {
    const userMessage = { role: 'user', content: prompt };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, history: messages }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.reply || data.content || '',
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, something went wrong. Please try again.\n\n_Error: ${err.message}_`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ChatContext.Provider value={{ messages, loading, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
