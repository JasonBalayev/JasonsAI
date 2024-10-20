'use client';

import { 
  Box, 
  Button, 
  Stack, 
  TextField, 
  Typography, 
  CircularProgress,
  Link,
  IconButton
} from '@mui/material';
import { LinkedIn, GitHub, Language } from '@mui/icons-material'; 
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { keyframes } from '@mui/system';

export default function Home() {
  const initialMessages = [
    {
      role: 'assistant',
      content: "Hey there! Thanks for taking the time to talk to me. I am an AI version of Jason who studies at Northeastern University. Ask me anything, but before you do, check out Jason's other projects through the links bellow me.",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
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
      const assistantMessageContent = jsonResponse[0]?.content || "Hm, I’m not 100% sure on that one, but I can dig into it with you. Let’s figure it out!";

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
          content: "Whoops! Try again in a bit, and we’ll look at this together.",
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

  const resetMessages = () => {
    setMessages(initialMessages);
  };

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm')); 
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#1c1c1c" 
      padding={2} 
      boxSizing="border-box"
      sx={{
        backgroundImage: 'linear-gradient(135deg, #2c2c2c 25%, #1c1c1c 100%)',
        position: 'relative',
        overflow: 'hidden',
        '::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-linen.png")',
          opacity: 0.1,
          pointerEvents: 'none',
        },
        '::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
          animation: `${float} 6s ease-in-out infinite`,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20%',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
          animation: `${float} 8s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
          boxShadow: '0 0 40px rgba(255, 255, 255, 0.05)',
          animation: `${float} 10s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '70%',
          left: '80%',
          width: '120px',
          height: '120px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '30%',
          transform: 'rotate(-30deg)',
          boxShadow: '0 0 35px rgba(255, 255, 255, 0.08)',
          animation: `${float} 7s ease-in-out infinite`,
        }}
      />
      <Stack
        direction="column"
        width={isSmDown ? '100%' : isMdDown ? '90%' : '700px'} 
        height={isSmDown ? '100%' : '800px'} 
        maxHeight={isSmDown ? '100%' : '800px'}
        border="2px solid #000"
        boxShadow={5}
        borderRadius={16}
        p={4}
        spacing={4} 
        bgcolor="#2b2b2b"
        display="flex"
        flexDirection="column"
        sx={{
          position: 'relative',
          '::before': {
            content: '""',
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            border: '2px solid #000',
            borderRadius: '20px',
            zIndex: -1,
          },
          '::after': {
            content: '""',
            position: 'absolute',
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: '18px',
            zIndex: -1,
          },
        }}
      >
        <Typography 
          variant={isSmDown ? "h5" : "h4"} 
          align="center" 
          color="#ffffff" 
          sx={{ 
            fontFamily: 'Roboto, sans-serif', 
            wordWrap: 'break-word', 
            textShadow: '2px 2px 4px rgba(0,0,0,0.6)', 
          }}
        >
          {"Jason's AI Space"}
        </Typography>

        <Box
          flexGrow={1}
          overflow="auto"
          sx={{ 
            paddingRight: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
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
                borderRadius={message.role === 'assistant' ? '20px 20px 20px 4px' : '20px 20px 4px 20px'} 
                p={3} 
                maxWidth={isSmDown ? '90%' : '80%'} 
                sx={{ 
                  fontSize: isSmDown ? '16px' : '18px', 
                  fontFamily: 'Roboto, sans-serif', 
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  border: '2px solid #000', 
                  wordBreak: 'break-word', 
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Stack 
          direction={isSmDown ? 'column' : 'row'} 
          spacing={3} 
          alignItems={isSmDown ? 'stretch' : 'flex-end'}
          width="100%"
        >
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            multiline 
            minRows={isSmDown ? 3 : 3} 
            maxRows={isSmDown ? 6 : 6} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} 
            disabled={isLoading} 
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                borderRadius: '16px',
                backgroundColor: '#424242',
                fontSize: '18px', 
                fontFamily: 'Roboto, sans-serif',
                padding: '12px', 
                border: '2px solid #000', 
                '& fieldset': {
                  borderColor: '#000',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00796b',
                },
              },
              '& .MuiInputLabel-root': { 
                color: '#bdbdbd', 
                fontFamily: 'Roboto, sans-serif', 
                fontSize: '18px',
              },
              flexGrow: 1,
            }}
            InputLabelProps={{
              style: { 
                color: '#bdbdbd', 
                fontFamily: 'Roboto, sans-serif', 
                fontSize: '18px',
              }, 
            }}
          />
          <Stack
            direction={isSmDown ? 'column' : 'row'}
            spacing={2}
            width={isSmDown ? '100%' : 'auto'}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={isLoading} 
              sx={{ 
                backgroundColor: '#00796b',
                fontSize: '18px',
                fontFamily: 'Roboto, sans-serif',
                padding: isSmDown ? '14px 24px' : '14px 24px',
                minWidth: '100px', 
                height: isSmDown ? 'auto' : '56px', 
                border: '2px solid #000',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#00695c',
                },
              }}
            >
              {isLoading ? <CircularProgress size={28} color="inherit" /> : 'Send'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetMessages}
              disabled={isLoading}
              sx={{
                borderColor: '#000',
                color: '#ffffff',
                fontSize: '18px',
                fontFamily: 'Roboto, sans-serif',
                padding: isSmDown ? '14px 24px' : '14px 24px',
                minWidth: '100px', 
                height: isSmDown ? 'auto' : '56px', 
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                backgroundColor: '#d32f2f',
                '&:hover': {
                  backgroundColor: '#c62828',
                  borderColor: '#c62828',
                },
              }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>

        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Link 
            href="https://www.linkedin.com/in/jasonbalayev/" 
            target="_blank" 
            rel="noopener"
            underline="none"
            sx={{ color: '#0e76a8', display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <LinkedIn />
            LinkedIn
          </Link>
          <Link 
            href="https://github.com/JasonBalayev" 
            target="_blank" 
            rel="noopener"
            underline="none"
            sx={{ color: '#171515', display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <GitHub />
            GitHub
          </Link>
          <Link 
            href="https://jasonbalayev.dev/" 
            target="_blank" 
            rel="noopener"
            underline="none"
            sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <Language />
            Website
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
