import dotenv from 'dotenv';
import User from '../models/User.js';

import { isSpam } from '../utils/isSpam.js';
import { sanitizeMessage } from '../utils/sanitizeMessage.js';
import { supabase } from '../services/supabaseService.js';
import { client } from '../services/openaiService.js'

dotenv.config();

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


export const chatWithAssistantBot = async (req, res) => {
  try {
    let { message, conversation=[] } = req.body;
    const userId = req.user._id;

    //Basic sanitization
    message = sanitizeMessage(message);

    if(isSpam(message)) {
      return res.json({
        reply: "⚠️ That doesn’t seem like a valid message. Try rephrasing your request.",
        conversation,
      });
    }

    //Create embedding of user's message
    const embedRes = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });

    const queryEmbedding = embedRes.data[0].embedding;

    //Query Supabase for the most relevant tasks for that user
    const { data: matches, error } = await supabase.rpc("match_task_vectors", {
      query_embedding: queryEmbedding,
      match_count: 5,
      p_user_id: userId.toString()
    });

    if(error) {
      console.log("Supabase RAG query error", error);
      return res.status(500).json({ error: "Failed to retrieve relevant tasks" });
    }

    const contextText = matches
      .map(
        (t) => `
                Task: ${t.title}
                Description: ${t.description}
                Status: ${t.status}
                Priority: ${t.priority}
                Deadline: ${t.deadline ? new Date(t.deadline).toLocaleString() : "No deadline"}
                ${t.subtasks ? `Subtasks: ${t.subtasks}` : ""}
                ${t.team_name ? `Team: ${t.team_name}` : ""}
                `
        ).join("\n\n");

    //Build propmt for gpt
    const updatedConversation = [
      {
        role: "system",
        content: `
        You are WiseBot, an intelligent, lively, and friendly AI assistant for the TaskWise app. 
        You help users manage, understand, and stay motivated about their tasks. You can also chat about productivity, advice, and encouragement, while keeping a cheerful and supportive tone.

        Instructions:

        1. Task Presentation
        - Only provide a full task summary when the user explicitly asks for it.
        - When showing a task, always use this exact format:

        Task: <Task Title>
        - Description: <Task Description>
        - Deadline: <Human-readable date/time>
        - Status: <Not Started/In Progress/Done>
        - Team: <Team Name>  (include only if the task has a team)
        - Subtasks:
          - <Subtask Title> (Status: <Done/In Progress/Not Started>)
          - ... (if there are no subtasks, write: Subtasks: None)

        2. Suggestions, Advice, and Tips
        - If the user asks for help, advice, or suggestions related to a task, provide a section like this:

        Suggestions:
        1. <Specific actionable advice or tip>
        2. <Next tip>
        3. <Motivational advice or encouragement>

        - Be specific, practical, and helpful.
        - Only give suggestions based on the provided tasks; do NOT invent tasks.

        3. Follow-up Questions
        - The user may ask follow-up questions related to tasks or productivity.
        - You can clarify, give step-by-step advice, or provide tips to make tasks easier or more efficient.
        - Always keep answers **relevant to the user’s tasks or general productivity**.
        - Do NOT answer trivia, general knowledge, or questions unrelated to tasks. 
          Example of things to avoid: “What’s the capital of France?” or unrelated historical facts.
        - If the question is unrelated to tasks or productivity, respond:
          "Sorry, I can only provide guidance related to your tasks or productivity."

        4. General Guidance
        - If the user asks general productivity questions or advice (not about a specific task), respond in a **friendly, lively, human-like way**.
        - Keep responses concise, positive, and engaging.
        - Include motivational remarks where appropriate.

        5. Handling Missing Information
        - If the requested information is not in the tasks or context, respond exactly:
        "Sorry, I couldn’t find that information in your current tasks."

        6. Style
        - Keep formatting clean, readable, and structured.
        - Use bullet points exactly as specified; do not use random bold, headings, or extra Markdown decorations.
        - Keep replies lively, cheerful, and user-friendly.

        Always follow this structure strictly. Only present full task summaries when explicitly asked; otherwise, provide advice, tips, or answers that are relevant to the user’s tasks or productivity. Encourage follow-up questions while staying on-topic.
          `,
      },
      {
        role: "system",
        content: `Use this context about the user's tasks:\n${contextText}`,
      },
      ...conversation,
      { role: "user", content: message },
    ];

     //Generate AI reply
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: updatedConversation,
    });

    const reply = response.choices[0].message.content;

    updatedConversation.push({ role: "assistant", content: reply });

    res.json({ reply, conversation: updatedConversation });

  } catch (error) {
    console.error("TaskBot Error:", error);
    res.status(500).json({ error: "Something went wrong with TaskBot." });
  }
}