'use client';

import { Box, Button, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I&apos;m a part of Jason&apos;s AI Space as your versatile support and virtual assistant. How can I assist you today?",
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return; 
    setIsLoading(true); 

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }, 
    ]);

    setMessage(''); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ role: 'user', content: message }]), 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonResponse = await response.json(); 
      const assistantMessageContent = jsonResponse[0]?.content || "I'm not sure about that, but let's find out together!";

      setMessages((prevMessages) => {
        let lastMessage = prevMessages[prevMessages.length - 1]; 
        let otherMessages = prevMessages.slice(0, prevMessages.length - 1); 
        return [
          ...otherMessages,
          { ...lastMessage, content: assistantMessageContent }, 
        ];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: "Oops! I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false); 
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); 
      sendMessage(); 
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#1c1c1c" 
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid #333"
        boxShadow={5}
        borderRadius={3}
        p={3}
        spacing={3}
        bgcolor="#2b2b2b"
      >
        <Typography variant="h5" align="center" color="#ffffff">
          Jason's AI Space
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          sx={{ paddingRight: '8px' }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={message.role === 'assistant' ? '#3a3a3a' : '#00796b'}
                color={message.role === 'assistant' ? '#e0f7fa' : '#ffffff'}
                borderRadius={16}
                p={2}
                maxWidth="75%"
                sx={{ fontSize: '14px', boxShadow: 2 }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} 
            disabled={isLoading} 
            InputProps={{
              style: {
                color: '#fff',
                borderRadius: '8px',
                backgroundColor: '#424242',
              },
            }}
            InputLabelProps={{
              style: { color: '#bdbdbd' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={isLoading} 
            sx={{ backgroundColor: '#00796b' }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
