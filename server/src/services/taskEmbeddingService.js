import { client } from "./openaiService.js";
import { supabase } from "./supabaseService.js";

export const embedTask = async (task, userIds=[], team = null) => {
  const content = `
  ${team?.name? `Team: ${team.name}\n` : ""}
  Title: ${task.title || ""}
  Description: ${task.description || ""}
  Status: ${task.status || ""}
  Priority: ${task.priority || ""}
  Deadline: ${task.deadline || "No deadline"}
  Subtasks: ${(task.subtasks || []).map(s => s.title).join(", ")}
  Subtasks:
  ${(task.subtasks || [])
    .map(s => `- ${s.title} [${s.status || "No status"}]`)
    .join("\n")}
  `;

  try {
    const embeddingResponse = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: content,
    });

    const embedding = embeddingResponse.data[0].embedding;

    const rows = userIds.map(uid => ({
      user_id: uid,
      team_name: team?.name || null,
      task_id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline,
      subtasks: JSON.stringify(task.subtasks || []),
      embedding,
    }));

    // upsert — make sure task_id is unique in your Supabase table
     const { error } = await supabase
      .from("task_vectors")
      .upsert(rows, { onConflict: "user_id,task_id" });

    if (error) console.error("Supabase upsert error:", error);
  } catch (err) {
    console.error("Embedding task error:", err);
  }
};

// Delete a task vector from Supabase
export const deleteTaskVector = async (taskId) => {
  try {
    const { error } = await supabase
      .from("task_vectors")
      .delete()
      .eq("task_id", taskId.toString());

    if (error) console.error("Supabase delete error:", error);
  } catch (err) {
    console.error("Error deleting task vector:", err);
  }
};

export const deleteTeamTaskVector = async (taskId, userId) => {
  try {
    const { error } = await supabase
      .from("task_vectors")
      .delete()
      .eq("task_id", taskId.toString())
      .eq("user_id", userId.toString());

    if (error) console.error("Supabase team delete error:", error);
  } catch (err) {
    console.error("Error deleting team task vector:", err);
  }
};

export default { embedTask, deleteTaskVector, deleteTeamTaskVector };