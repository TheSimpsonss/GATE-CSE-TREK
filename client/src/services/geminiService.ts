import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  // In Vite, environment variables must be prefixed with VITE_ and accessed via import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateStudyResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a history-aware chat session or just a one-off prompt if history is short.
    // For simplicity in this demo, we'll use a chat session.
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are an expert GATE CSE (Computer Science Engineering) Exam Coach. Your goal is to help students clear the GATE exam with a top rank. You are knowledgeable in Algorithms, Data Structures, OS, DBMS, Networks, TOC, Compiler Design, Digital Logic, COA, and Mathematics. Keep answers concise, technical, and motivating. Provide formulas or short code snippets in C/C++ if relevant.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service. Please check your API key configuration.";
  }
};
