import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

const ChatModal = ({
  isOpen,
  onClose,
  productId,
  senderId,
  receiverId,
  senderName,
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    socketRef.current = io(SOCKET_URL + "/api/messages");
    socketRef.current.emit("join", {
      product_id: productId,
      sender_id: senderId,
      receiver_id: receiverId,
    });
    socketRef.current.emit("get_history", {
      product_id: productId,
      sender_id: senderId,
      receiver_id: receiverId,
    });
    socketRef.current.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socketRef.current.on("history", (msgs) => {
      setMessages(msgs);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [isOpen, productId, senderId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socketRef.current.emit("send_message", {
      product_id: productId,
      sender_id: senderId,
      receiver_id: receiverId,
      message: input,
    });
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-4">Chat with Seller</h2>
        <div className="h-64 overflow-y-auto bg-gray-50 rounded p-2 mb-4">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-8">
              No messages yet.
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${
                msg.sender_id === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs ${
                  msg.sender_id === senderId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <div className="text-xs font-semibold mb-1">
                  {msg.sender_id === senderId ? senderName : "Seller"}
                </div>
                <div>{msg.message}</div>
                <div className="text-[10px] text-right mt-1 opacity-60">
                  {msg.created_at
                    ? new Date(msg.created_at).toLocaleTimeString()
                    : ""}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
