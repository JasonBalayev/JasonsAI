'use client';

import { 
  Box, 
  Button, 
  Stack, 
  TextField, 
  Typography, 
  CircularProgress,
  Link,
  IconButton,
  Paper
} from '@mui/material';
import { LinkedIn, GitHub, Language, DarkMode, LightMode } from '@mui/icons-material';
import { useState, useRef, useEffect, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './layout';
import { keyframes } from '@mui/system';

export default function Home() {
  const initialMessages = [
    {
      role: 'assistant',
      content: "Hey there! Thanks for taking the time to talk to me. I am an AI version of Jason who studies at Northeastern University. Ask me anything, but before you do, check out my other projects through the links below me.",
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const messagesEndRef = useRef(null);

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  `;

  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

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

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(-45deg, #0F172A 0%, #1E293B 35%, #312E81 100%)'
          : 'linear-gradient(-45deg, #F8FAFC 0%, #E2E8F0 35%, #C7D2FE 100%)',
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        padding: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: isSmDown ? '100%' : isMdDown ? '90%' : '900px',
          height: isSmDown ? '100%' : '85vh',
          maxHeight: '900px',
          borderRadius: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backdropFilter: 'blur(10px)',
          backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          border: `1px solid ${theme.palette.divider}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(to right, #6366F1, #EC4899)',
          },
        }}
      >
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(10px)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(15, 23, 42, 0.8)'
              : 'rgba(248, 250, 252, 0.8)',
          }}
        >
          <Typography 
            variant="h6" 
            color="text.primary"
            sx={{
              background: 'linear-gradient(135deg, #6366F1, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Jason&apos;s AI Assistant
          </Typography>
          <IconButton 
            onClick={colorMode.toggleColorMode} 
            sx={{
              '&:hover': {
                animation: `${pulseAnimation} 1s ease infinite`,
              },
            }}
          >
            {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>

        <Box
          flexGrow={1}
          overflow="auto"
          p={{ xs: 2, sm: 3 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.mode === 'dark'
                ? 'rgba(203, 213, 225, 0.2)'
                : 'rgba(71, 85, 105, 0.2)',
              borderRadius: '20px',
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              sx={{ maxWidth: '85%', alignSelf: message.role === 'assistant' ? 'flex-start' : 'flex-end' }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  background: message.role === 'assistant'
                    ? theme.palette.background.chat
                    : 'linear-gradient(135deg, #6366F1, #EC4899)',
                  color: message.role === 'assistant'
                    ? theme.palette.text.primary
                    : '#fff',
                  borderRadius: 0,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: message.role === 'assistant' ? 0 : 'auto',
                    right: message.role === 'assistant' ? 'auto' : 0,
                    width: '3px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #6366F1, #EC4899)',
                  },
                  boxShadow: message.role === 'assistant'
                    ? theme.palette.mode === 'dark'
                      ? '0 4px 20px -8px rgba(0,0,0,0.5)'
                      : '0 4px 20px -8px rgba(0,0,0,0.2)'
                    : '0 4px 20px -8px rgba(236,72,153,0.5)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    wordBreak: 'break-word',
                  }}
                >
                  {message.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Box>

        <Box 
          p={{ xs: 1.5, sm: 2 }}
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(10px)',
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(15, 23, 42, 0.8)'
              : 'rgba(248, 250, 252, 0.8)',
          }}
        >
          <Stack spacing={1.5}>
            <TextField
              multiline
              maxRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              placeholder="Type your message..."
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  '&.Mui-focused': {
                    '& fieldset': {
                      borderWidth: '2px',
                      borderImage: 'linear-gradient(135deg, #6366F1, #EC4899) 1',
                    },
                  },
                },
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack 
                direction="row" 
                spacing={1}
                sx={{ 
                  '& .MuiIconButton-root': {
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  },
                }}
              >
                {[
                  { icon: <LinkedIn />, href: 'https://www.linkedin.com/in/jasonbalayev/' },
                  { icon: <GitHub />, href: 'https://github.com/JasonBalayev' },
                  { icon: <Language />, href: 'https://jasonbalayev.dev/' },
                ].map((link, index) => (
                  <IconButton
                    key={index}
                    component={Link}
                    href={link.href}
                    target="_blank"
                    sx={{
                      color: theme.palette.primary.main,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.1)',
                        color: theme.palette.secondary.main,
                      },
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Stack>
              <Stack 
                direction="row" 
                spacing={1}
                sx={{ 
                  '& .MuiButton-root': {
                    minWidth: { xs: '70px', sm: '80px' },
                    px: { xs: 2, sm: 3 },
                    py: { xs: 0.75, sm: 1 },
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                  },
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={resetMessages}
                  disabled={isLoading}
                  sx={{
                    borderWidth: '2px',
                    '&:hover': {
                      borderWidth: '2px',
                    },
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={sendMessage}
                  disabled={isLoading}
                  sx={{
                    background: 'linear-gradient(135deg, #6366F1, #EC4899)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4F46E5, #DB2777)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress 
                      size={20} 
                      sx={{ 
                        color: '#fff',
                        animation: `${pulseAnimation} 1s ease infinite`,
                      }} 
                    />
                  ) : 'Send'}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
