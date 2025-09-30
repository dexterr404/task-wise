import { useState } from "react";
import { useSelector } from "react-redux"
import { AddComment, AttachFile,InsertEmoticon, QuestionAnswerRounded } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
Typography, TextField, Avatar, IconButton,Popover } from "@mui/material";
import { colors } from "../../data/colors.js"

import formatCommentDate from "../../utils/formatCommentDate.js"
import EmojiPicker from "emoji-picker-react";
import ChatMessageSkeleton from "../../components/skeleton/ChatMessagesSkeleton";
import ImageLightBox from "../../components/ui/ImageLightBox.jsx";

function CommentsModal({ open, onClose, task, team, addCommentMutation,comments, isLoading }) {
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [lightBoxIndex, setLightBoxIndex] = useState(-1);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    // Prevent empty comment when there's no text and no images
    if (!message.trim() && imageFiles.length === 0) return;
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("authorId", user.id);

      // Append multiple images
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      addCommentMutation.mutate({
        taskId: task._id,
        teamId: team._id,
        formData,
      });

      setMessage("");
      setImageFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  // Flatten all images across all comments
  const allImages = comments?.flatMap((c) =>
    c.images?.map((img) => ({
      src: img,
      commentId: c._id,
    })) || []
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{
        sx: { bgcolor: "var(--color-surface)", color: "var(--color-text-secondary)", borderRadius: 2, p: 2 },
      }}>
      <DialogTitle variant="h8" sx={{ color: "var(--color-text-primary)", display: "flex", flexDirection: "row", gap: 1, alignItems: "center"}}>
        <QuestionAnswerRounded fontSize="small" sx={{ color: colors.lighterblue}}/>{task.title}
      </DialogTitle>
        <form onSubmit={handleAddComment}>
          <DialogContent 
          dividers
          sx={{
            borderColor: "var(--color-border)",
            bgcolor: "var(--color-bg)",
            color: "var(--color-text-primary)",
          }}
          >
            <div className="max-h-99 overflow-y-auto mb-4 py-10">
              {/*Show chat loading*/}
              {
                isLoading ?(
                  <ChatMessageSkeleton />
                ) : comments?.length > 0 ?(
                comments.map((c) => {
                  const isMe = c.author._id === user.id;
                  return (
                    <div key={c._id} className={`flex mb-2 ${isMe ? "justify-end" : "justify-start"}`}>
                      {!isMe && (
                        <Avatar src={c.author.profileImage} sx={{ width: 24, height: 24 }} className="mr-2"/>
                      )}
                    <div className={`flex flex-col max-w-xs ${isMe && "items-end"}`}>
                      <div className="text-[10px]">
                        {formatCommentDate(c.createdAt)}
                      </div>
                      {/* Message text */}
                      {c.message && (
                        <div
                          className={`px-4 py-2 rounded-2xl text-sm ${
                            isMe ? "bg-blue-500 text-white" : "bg-border text-text-primary"
                          }`}
                        >
                          {c.message}
                        </div>
                      )}
                      {/* Images */}
                      {c.images?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {c.images.map((img) => {
                            const indexInAll = allImages.findIndex((i) => i.src === img);
                            return (
                              <img
                                key={img}
                                src={img}
                                alt="comment attachment"
                                className="w-28 h-28 object-cover rounded-lg cursor-pointer"
                                onClick={() => setLightBoxIndex(indexInAll)}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  )
                })
              ) : (
                <Typography sx={{ fontSize: "14px", color: "var(--color-text-primary)", py: 2, textAlign: "center" }}>No comments yet.</Typography>
              )}
            </div>
            {lightBoxIndex >= 0 && (
              <ImageLightBox
                images={allImages.map((i) => i.src)}
                openIndex={lightBoxIndex}
                onClose={() => setLightBoxIndex(-1)}
              />
            )}
            {/* Preview selected images */}
            {imageFiles.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imageFiles.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    {/* Option to remove an image */}
                    <button type="button" onClick={() => setImageFiles(imageFiles.filter((_, i) => i !== idx))}
                      className="absolute top-0 right-0 bg-black/50 text-white rounded-full px-1 text-xs cursor-pointer">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                id="comment-image"
                style={{ display: "none" }}
                onChange={(e) => setImageFiles(Array.from(e.target.files))}
              />
              <label htmlFor="comment-image">
                <IconButton component="span">
                  <AttachFile fontSize="small" sx={{ color: "var(--color-text-secondary)"}}/>
                </IconButton>
              </label>
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a comment..."
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderRadius: "9999px", // fully rounded like Tailwind's rounded-full
                    fontSize: "13px",
                    px: 2, // padding left/right
                    bgcolor: "var(--color-bg)",
                    color: "var(--color-text-primary)",
                    "&::placeholder": {
                      color: "var(--color-text-secondary)",
                      opacity: 1,
                    },
                    "& fieldset": {
                      borderColor: "var(--color-border)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--color-text-secondary)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--color-text-primary)",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <InsertEmoticon fontSize="small" sx={{ color: "var(--color-text-primary)"}}/>
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <EmojiPicker 
                theme={document.documentElement.classList.contains("dark") ? "dark" : "light"} 
                lazyLoadEmojis={true}
                onEmojiClick={handleEmojiClick} />
              </Popover>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} sx={{ fontSize: "12px", textTransform: "none", color: "gray"}}>Close</Button>
            <Button type="submit" variant="contained" startIcon={<AddComment />}
            sx={{ fontSize: "12px", backgroundColor: "#1D4ED8", "&:hover": { backgroundColor: "#1E40AF" }, textTransform: "none", marginRight: "14px" }}>
                Add Comment
            </Button>
          </DialogActions>
        </form>
    </Dialog>
  );
}

export default CommentsModal;
