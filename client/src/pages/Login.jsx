import LoginModal from "../features/auth/LoginModal"
import Background from "../assets/Backgrounds/login_bg.jpg"
import { Toaster } from "react-hot-toast"
function Login() {
    return(
        <div  className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
         <Toaster position="top-center" reverseOrder={false} />
         <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <LoginModal />
            </div>
        </div>
    
    )
}

export default Login