import { useState } from "react";
import { useSelector,useDispatch } from "react-redux"
import { updateProfile } from "../../api/userService";
import { addUser } from "./userSlice";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import toast from "react-hot-toast";
import defaultImage from "../../assets/Default Profiles/gamer.png";


function EditProfileModal({ open, onClose }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const [name, setName] = useState(user.name);
  const [imageFile, setImageFile] = useState(user.profileImage || "");
  const [previewUrl, setPreviewUrl] = useState(user.profileImage || defaultImage );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if(file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }
  

  const handleSave = async() => {
    setIsLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      if(imageFile) {
        formData.append("image", imageFile);
      }

      const updatedUser = await updateProfile(user.id, formData);

      dispatch(addUser(updatedUser.user));
      localStorage.setItem("user", JSON.stringify({
        id: updatedUser.user._id,
        name: updatedUser.user.name,
        email: updatedUser.user.email,
        profileImage: updatedUser.user.profileImage
      }));

      toast.success("Profile successfully updated");
      onClose();
    } catch (error) {
      toast.error("Failed to udpate profile");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden" },
      }}
    >
      <div className="flex items-center justify-between bg-gray-200 px-4 py-3">
        <span className="font-semibold text-sm">Edit Profile</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ width: "18px" }} />
        </IconButton>
      </div>

      <DialogContent sx={{ p: 3 }}>
        <div className="flex justify-center py-3">
          <div className="relative">
            <img className="w-28 h-28 rounded-full object-cover" src={previewUrl || defaultImage} alt="Profile picture"/>
            <div className="absolute bottom-[-2px] right-0">
                <IconButton
                size="small"
                className="absolute bottom-0 right-2 bg-white shadow-md"
                component="label"
                >
                <PhotoCameraIcon fontSize="small" />
                <input 
                onChange={handleImageChange}
                hidden 
                accept="image/*"
                type="file" />
                </IconButton>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm">Fullname</p>
            <input
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-lg text-sm"
              placeholder={user?.name || "Your Name"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Email</p>
            <input
              disabled={true}
              className="border border-gray-300 px-2 py-1 rounded-lg text-sm"
              placeholder={user?.email || "Your Email"}
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="contained"
            onClick={() => handleSave()}
            startIcon={<SaveIcon />}
            disabled={isLoading}
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              fontSize: "14px",
              borderRadius: "10px",
              backgroundColor: "#1976d2",
              boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
              ":hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            {isLoading ? <span>Saving</span> : <span>Save Changes</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal
