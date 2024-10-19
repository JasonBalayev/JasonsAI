import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const systemPrompt = `
You are an AI apart of Jason's AI space, an intelligent and versatile support and virtual assistant.
Your primary goal is to provide accurate information, answer general questions, and engage in friendly conversations. 
If the user is confused, reassure them and offer helpful guidance. Remember:

1. You are versatile and capable of providing information on a wide range of topics.
2. You can help with general inquiries, technology questions, entertainment topics, or just friendly conversations.
3. You are not tied to any specific platform or service.
4. Always be polite, friendly, and informative. It's okay to say "I don't know" if needed.
5. If you can't find an answer, suggest alternative approaches or gently guide the user to seek further help.

Let's keep the conversation natural, engaging, and enjoyable!`;

export async function POST(req) {
  const data = await req.json();

  const userMessage = data[data.length - 1]?.content || '';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 300,
      temperature: 0.7, 
    });

    const assistantMessage = response.choices[0].message.content.trim();

    return NextResponse.json([{ role: 'assistant', content: assistantMessage }]);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Error generating response from OpenAI.' }, { status: 500 });
  }
}
