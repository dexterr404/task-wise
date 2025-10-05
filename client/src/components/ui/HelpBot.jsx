import React, { useState, useRef, useEffect } from "react";
import { Fab,Dialog,DialogTitle,DialogContent,TextField,IconButton,Box,Typography,Avatar, } from "@mui/material";
import { SmartToy, Send, Close, ChatBubbleOutline } from "@mui/icons-material";
import { chatWithHelpBot } from "../../api/aiService";
import IntermittentBanner from "./IntermittentBanner";

function HelpBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! 👋 I'm WiseBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

  try {
    const reply = await chatWithHelpBot(input);
    setIsTyping(false);

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  } catch (err) {
    setIsTyping(false);
    setMessages((prev) => [
    ...prev,
    { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again." },
    ]);
  }
  };


  return (
    <React.Fragment>
      {/* Floating Chat Icon */}
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 30,
          zIndex: 1000,
        }}
      >
        <ChatBubbleOutline />
      </Fab>
      {
        !open && <IntermittentBanner text={"Need some help? Ask our AI HelpBot 👋"}/>
      }

      {/* Chat Window */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { width: '100%', height: { sm: 'auto' }, margin: 0, maxWidth: { xs: '100%', sm: 'sm' } } }}>
        <DialogTitle
        variant="h8"
          sx={{
            background: "linear-gradient(20deg, #6366f1, #a855f7)", 
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SmartToy /> TaskWise Assistant
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ marginLeft: "auto", color: "white" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent
          dividers
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            height: "400px",
          }}
        >
          {/* Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 1,
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {!isUser && <Avatar><SmartToy /></Avatar>}
                  <Box
                    sx={{
                      backgroundColor: isUser ? "primary.main" : "grey.200",
                      color: isUser ? "white" : "black",
                      borderRadius: 6,
                      p: 1.5,
                      maxWidth: "70%",
                      wordBreak: "break-word",
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant="body2">{m.content}</Typography>
                  </Box>
                </Box>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <Box sx={{ display: "flex", justifyContent: "flex-start", pl: 6 }}>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic", color: "gray" }}
                >
                  TaskWise Bot is typing...
                </Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div className="relative w-full">
                <TextField
                variant="outlined"
                fullWidth
                placeholder="Type your question..."
                value={input}
                multiline
                minRows={1}        // minimum visible rows
                maxRows={5}        // expand up to 5 rows
                onChange={(e) => {
                    if (e.target.value.length <= 200) {
                    setInput(e.target.value);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                    }
                }}
                inputProps={{
                    maxLength: 200,
                    style: { fontSize: "0.85rem", padding: "0px" }, // smaller font & padding
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    minHeight: "40px",
                    alignItems: "flex-start", // important for multiline to align text at top
                    },
                }}
                />
                <span className="text-gray-400 text-[12px] absolute right-3 bottom-2">{input.length}/200</span>
            </div>
            <IconButton color="primary" onClick={handleSend}>
              <Send />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default HelpBot;
