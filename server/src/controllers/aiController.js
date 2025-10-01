import OpenAI from 'openai';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { createClient } from "@supabase/supabase-js";
import { isSpam } from '../utils/isSpam.js';
import { sanitizeMessage } from '../utils/sanitizeMessage.js';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export const getInsights = async (req, res) => {
  const { id }  = req.params;
  const { tasks } = req.body;

  if (!tasks || tasks.length === 0) {
    return res.status(400).json({ message: "Tasks are required" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": "You are an ultra-smart task planning assistant. Reply ONLY in valid JSON with this structure:{\"insights\":[\"string\",\"string\",\"string\"]}\n\nRules:\n- Each element in \"insights\" MUST be a plain string (no objects, no keys, no labels).\n- Generate EXACTLY one unique insight for EACH task provided.\n- Each insight must be 1–3 sentences: concise, energetic, and laser-focused 💡.\n- Match each insight to its task’s context (study, work, creative, personal, etc.).\n- Always suggest a concrete micro-action, tool, or clever shortcut 🚀.\n- Prioritize tone: sharp, tactical, and fun — like a coach pointing out the exact next move.\n\nExample:\n{\"insights\":[\"🌍 Focus only on the greenhouse effect; summarize it in 3 bullet points on a sticky note, then quiz yourself once before bed.\",\"🎧 Grab 3 ambient wind samples from Freesound.org and layer them in your map — don’t worry about mixing yet, just test mood.\",\"✍️ Write 3 lines of dialogue for your character that hint at their secret — don’t edit, just get raw material down.\",\"💌 Send your mom a 1-line text to check in — it’ll take 30s but make her smile.\"]}"
        },
        {
          role: "user",
          content: `Here are the tasks:\n${JSON.stringify(tasks, null, 2)}`
        }
      ],
      max_tokens: 250
    });

    const content = response.choices?.[0]?.message?.content?.trim() || "";

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (error) {
      return res.status(500).json({ message: "Failed to parse AI response", raw: content });
    }

    const insightsObject = {
      insights: parsed.insights,
      createdAt: new Date()
    };

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { insights: insightsObject },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.insights);

  } catch (error) {
    console.error("Error in getInsights:", error);
    res.status(500).json({ message: "OpenAI request error", error: error.message });
  }
};

export const chatWithHelpBot = async (req, res) => {
  try {
    let { message, conversation = [] } = req.body;

    message = sanitizeMessage(message);

    if (isSpam(message)) {
      return res.json({
        reply: "⚠️ Your message seems invalid or spammy. Please enter a proper question.",
        conversation,
      });
    }

    // Generate embedding for user message
    const embRes = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: message
    });
    const queryEmbedding = embRes.data[0].embedding;

    // Query Supabase RPC for top 3 most relevant chunks
    const { data: chunks, error } = await supabase
      .rpc("match_helpbot_vectors", { query: queryEmbedding });

    if (error) {
      console.error("Supabase RAG query error:", error);
      return res.status(500).json({ error: "Failed to fetch relevant chunks." });
    }

    // Combine relevant chunks into a single context string
    const contextText = chunks.map(c => c.chunk).join("\n\n");

    // Build the conversation for GPT
    const updatedConversation = [
      { 
        role: "system", 
        content: `You are HelpBot, a friendly assistant that only answers questions about TaskWise. 
              Always give concise, helpful answers using the provided FAQ/context. 
              If the answer is not in the FAQ/context, respond with: 
              "Sorry, I don’t know that. Please check TaskWise documentation or support."`
      },
      { 
        role: "system", 
        content: `Use the following FAQ/context to answer questions:\n${contextText}` 
      },
      ...conversation,
      { role: "user", content: message }
    ];

    // Call GPT
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: updatedConversation
    });

    const reply = response.choices[0].message.content;

    updatedConversation.push({ role: "assistant", content: reply });

    // Return the answer and updated conversation
    res.json({ reply, conversation: updatedConversation });

  } catch (error) {
    console.error("HelpBot Error:", error);
    res.status(500).json({ error: "Something went wrong with HelpBot." });
  }
};