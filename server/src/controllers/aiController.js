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
        - Provide ONLY the most important 3–5 insights, not one per task.
        - DO NOT split a single task into multiple insights (e.g., resume, cover letter, and submission should be ONE combined    insight).
        - Keep insights BRIEF and ACTIONABLE, like reminders.
        - Use emojis where natural for quick scanning.
        - Show more emotion a hyper one
        - Prioritize tasks as follows:
          1. Critical personal tasks (health, family emergencies).
          2. Urgent or high-priority work tasks.
          3. Routine tasks (shopping, exercise, etc.).
        Always return only the 3–5 most important insights.
        - Ignore trivial or non-urgent tasks unless they are the ONLY tasks available.
        - Do not add explanations or extra fields.`
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
