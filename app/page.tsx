"use client";
import Image from "next/image";
import ecommerceLogo from "./assets/Logo.png";
import { useState, FormEvent, useEffect } from "react";
import type { Message } from "ai/react";
import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionRow from "./components/PromptSuggestionsRow";

const uuid = () => self.crypto?.randomUUID?.() ?? Math.random().toString(36).substring(2);

const Home = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const noMessages = messages.length === 0;

    // Scroll to bottom on new messages
    useEffect(() => {
        const section = document.querySelector(".populated");
        if (section) section.scrollTop = section.scrollHeight;
    }, [messages, isThinking]);

    // Unified function to send message to backend
    const sendMessage = async (userMessage: Message) => {
        // Add the user's message to state immediately (before sending)
        const currentMessagesWithNewUser = [...messages, userMessage];
        setMessages(currentMessagesWithNewUser);
        
        setIsThinking(true);

        try {
            // NOTE: Sending the entire history including the new message
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: currentMessagesWithNewUser }),
            });

            if (!response.ok) throw new Error(response.statusText);

            const data = await response.json();

            // 💡 FIX: We now expect the AI reply in the 'content' field 
            // from the backend's format: { role: "assistant", content: aiReply }
            const aiMessage: Message = {
                id: uuid() + "-ai",
                content: data.content, // <--- FIXED HERE
                role: "assistant",
                createdAt: new Date(),
            };

            // Update state with only the AI message (user message is already there)
            setMessages((prev) => [...prev, aiMessage]); 
        } catch (error) {
            console.error("Error:", error);
            const errorMsg: Message = {
                id: uuid() + "-error",
                content: "Sorry, I ran into an error getting that response.",
                role: "assistant",
                createdAt: new Date(),
            };
            // Only add the error message
            setMessages((prev) => [...prev.slice(0, -1), errorMsg]);
        } finally {
            setIsThinking(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;

        const userMessage: Message = {
            id: uuid(),
            content: input,
            role: "user",
            createdAt: new Date(),
        };

        setInput("");
        sendMessage(userMessage);
    };

    // Handle prompt suggestion click
    const handlePrompt = (promptText: string) => {
        if (isThinking) return;

        const userMessage: Message = {
            id: uuid(),
            content: promptText,
            role: "user",
            createdAt: new Date(),
        };
        sendMessage(userMessage);
    };

    return (
        <main>
            
  
           <div className="logo-wrapper">
  <Image
    src={ecommerceLogo}
    width={250}
    height={250}
    alt="E-Commerce Chatbot Logo"
    style={{ objectFit: "cover" }}
  />
</div>



            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            Welcome! Ask me anything about your orders, products, shipping, refunds, or FAQs.
                        </p>
                        <PromptSuggestionRow onPromptClick={handlePrompt} />
                    </>
                ) : (
                     <>
                        <button 
                            className="back-button" 
                            onClick={() => setMessages([])}
                            title="Start new conversation"
                        >
                            ←
                        </button>
                        {messages.map((msg, idx) => (
                            <Bubble key={`message-${idx}`} message={msg} />
                        ))}
                        {isThinking && <LoadingBubble />}
                    </>
                )}
            </section>

            <form onSubmit={handleSubmit}>
                <input
                    className="question-box"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about your order, product, or delivery..."
                    disabled={isThinking}
                />
                <input type="submit" value="Send" disabled={isThinking} />
            </form>
        </main>
    );
};

export default Home;