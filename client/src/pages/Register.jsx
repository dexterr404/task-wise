import RegisterModal from "../features/auth/RegisterModal"
import Background from "../assets/Backgrounds/login_bg.jpg"
import { Toaster } from "react-hot-toast"

function Register() {
    return(
        <div className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
         <Toaster position="top-center" reverseOrder={false} />
         <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <RegisterModal />
            </div>
        </div>
    )
}

export default Register