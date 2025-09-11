import LoginModal from "../features/auth/LoginModal"
import Background from "../assets/Backgrounds/login_bg.jpg"
import { Toaster } from "react-hot-toast"
function Login() {
    return(
        <main  className="relative h-screen w-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
         <Toaster position="top-center" reverseOrder={false} />
         <div className="absolute inset-0 bg-black/50"></div>
            <section className="relative z-10 flex items-center justify-center h-full">
                <LoginModal />
            </section>
        </main>
    
    )
}

export default Login