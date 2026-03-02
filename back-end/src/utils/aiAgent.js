import { GoogleGenAI } from "@google/genai";

const aiModel = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default aiModel;
