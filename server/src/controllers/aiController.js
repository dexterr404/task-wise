import OpenAI from 'openai';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
          role: "system",
          content: `You are a task planning assistant. 
        You ONLY reply in JSON format with this structure:
        {
        "insights": ["short actionable insight", "..."]
        }

        Guidelines:
        - Return ONLY the most impactful insights across ALL tasks (never one per task).
        - Keep them BRIEF, ENERGETIC, and ACTIONABLE (like a witty coach cheering you on with guidance and tips💪).
        - Prioritize:
          1. Critical personal/health/family tasks ❤️.
          2. Urgent or high-priority work/projects 🚀.
          3. Helpful or fun extras (travel tips, productivity hacks, creativity) 🌍.
        - Adapt to context:
          • Travel → give 1 prep step + 1 fun/local activity 🧳.
          • Creative → suggest a momentum-building first step 🎨.
          • Work → give a focus strategy, shortcut, or batching idea 💼.
          • Tools to use in the context of the user task
        - Use emojis naturally for quick scanning.
        - Never split one task into multiple insights.
        - Ignore trivial tasks unless nothing else exists.
        `
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
