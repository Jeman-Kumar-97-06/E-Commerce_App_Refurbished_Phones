import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // optional: icon library
import ChatBotPopup from "./ChatBotPopUp"; // we'll create this next

const ChatBotButton = () => {
  const [open, setOpen] = useState(false);

  const doStuff = async () => {
    setOpen(!open);
    const resp = await fetch('http://localhost:4000/api/chatbot/eat');
    if (resp.ok) {
        console.log("Successfully Fed data");
    }
    else {
        console.log("Some Error");
    }
  }

  return (
    <>
      <div
        onClick={doStuff}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition-all duration-300"
      >
        <MessageCircle size={24} />
      </div>

      {open && <ChatBotPopup onClose={() => setOpen(false)} />}
    </>
  );
};

export default ChatBotButton;