import React from "react";
import { useState } from "react";

const ChatBotPopup = ({ onClose }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
  
    const handleSend = async () => {
      if (!input.trim()) return;
  
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
  
      try {
        const res = await fetch("http://localhost:4000/api/chatbot/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });
  
        const data = await res.json();
        const botResponse = {sender: "bot",text: data.results[0].name ? `This might help: ${data.results.map((item) => item.name).join(", ")}`: "Sorry, I couldn’t find anything."};
  
        setMessages((prev) => [...prev, botResponse]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error fetching response." },
        ]);
      }
    };
  
    return (
      <div className="fixed bottom-20 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Ask me anything 📱</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            Close
          </button>
        </div>
  
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
  
        <div className="p-2 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about a phone..."
              className="flex-1 px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
};

export default ChatBotPopup;