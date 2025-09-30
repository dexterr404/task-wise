import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { Button,IconButton } from "@mui/material";
import { Save,PhotoCamera, Warning } from "@mui/icons-material";
import { toast } from "react-hot-toast"
import { updateProfile } from "../../api/userService";
import { colors } from "../../data/colors";
import { addUser } from "../user/userSlice";
import defaultImage from "../../assets/Default Profiles/gamer.png"
import { DeactivateModal } from "../user/DeactivateModal";

export function Account() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const [name, setName] = useState(user.name);
    const [imageFile, setImageFile] = useState(user.profileImage || "");
    const [previewUrl, setPreviewUrl] = useState(user.profileImage || defaultImage );
    const [isLoading, setIsLoading] = useState(false);
    const [isDeactive, setDeactivate] = useState(false);

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
        } catch (error) {
        toast.error("Failed to udpate profile");
        } finally {
        setIsLoading(false);
        }
    }

    return<section className="bg-bg px-6 py-6 rounded-2xl h-full overflow-hidden sm:w-100 lg:w-120">
        <h1 className="text-lg font-semibold text-text-primary mb-6">Account Settings</h1>
        <div className="flex flex-col h-full pb-10 justify-between">
            <div>
                <div className="flex justify-center py-3">
                <div className="relative flex items-center gap-1">
                    <img className="w-16 h-16 rounded-full object-cover" src={previewUrl || defaultImage} alt="Profile picture"/>
                    <div className="absolute bottom-[-2px] right-0">
                        <IconButton
                        size="small"
                        className="absolute -bottom-2 -right-2 bg-bg shadow-md"
                        component="label"
                        >
                        <PhotoCamera fontSize="small" sx={{ color: "var(--color-text-primary)"}}/>
                        <input 
                        onChange={handleImageChange}
                        hidden 
                        accept="image/*"
                        type="file" />
                        </IconButton>
                    </div>
                </div>
                </div>

                <div className="flex flex-col gap-4 mt-4 text-text-primary">
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Fullname</p>
                    <input
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 text-text-secondary px-2 py-1 rounded-lg text-sm"
                    placeholder={user?.name || "Your Name"}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Email</p>
                    <input
                    disabled={true}
                    className="border border-gray-300 px-2 py-1 rounded-lg text-sm cursor-not-allowed"
                    placeholder={user?.email || "Your Email"}
                    />
                </div>
                <span className="flex items-center border-b-1 border-gray-300 text-text-primary text-sm font-semibold"><Warning  sx={{ color: colors.darkRed, fontSize: 16}}/>Danger Zone</span>
                <div className="flex gap-2 items-center max-sm:flex-col text-text-secondary text-xs">
                    <Button 
                    onClick={() => setDeactivate(true)}
                    variant="filled" sx={{ bgcolor: colors.red, color: "white", "&:hover": { backgroundColor: colors.darkRed }, textTransform: "none", fontSize: 11, ml: 2, borderRadius: "4px",}}>Deactivate Account</Button>
                    <span>This will permanently delete your account.</span>
                </div>
                </div>
            </div>
            <div className="flex justify-center mt-6">
            <Button
                variant="contained"
                onClick={() => handleSave()}
                startIcon={<Save />}
                disabled={isLoading || user.name === name}
                sx={{
                textTransform: "none",
                px: 3,
                py: 1,
                fontSize: "12px",
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
           
        </div>
         <DeactivateModal open={isDeactive} onClose={() => setDeactivate(false)} />
    </section>
}

export default Account;