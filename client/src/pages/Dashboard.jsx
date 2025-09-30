import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { toast,Toaster } from "react-hot-toast"
import { fetchAllTasks } from "../api/taskService.js"
import { getUserTeamTasks } from "../api/teamTaskService.js"
import { setPersonalTasks,setTeamTasks,selectTaskStats } from "../features/task/taskSlice.js"
import { motion } from "framer-motion"

import ProfileAndNotif from "../components/personal/ProfileAndNotif.jsx"
import MetricsCard from "../components/dashboard/MetricsCard.jsx"
import TaskDistribution from "../components/dashboard/TaskDistributionGraph.jsx"
import TaskWithCountdown from "../components/dashboard/CountdownTimer.jsx"
import TaskCalendar from "../components/dashboard/TaskCalendar.jsx"
import Insight from "../components/dashboard/Insight.jsx";
import Greeting from "../components/dashboard/Greeting.jsx"

function Dashboard() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    const { total, done, ongoing, pending } = useSelector(selectTaskStats);
    const user = useSelector((state) => state.user);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const res = await fetchAllTasks();
            dispatch(setPersonalTasks(res));
        } catch (error) {
            const status = error.response?.status;

            if (status === 429) return; // rate-limited
            if (status === 404) {
            toast.error("Tasks not found.");
            return;
            }
            if (status >= 500) {
            toast.error("Server error. Please try again later.");
            return;
            }
            toast.error("Failed to fetch tasks");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const fetchTeamTasks = async() => {
        setIsLoading(true);
        try {
            const res = await getUserTeamTasks();
            dispatch(setTeamTasks(res));
        } catch (error) {
        const status = error.response?.status;

        if (status === 429) return;
        if (status === 404) {
            toast.error("Team tasks not found.");
            return;
        }
        if (status >= 500) {
            toast.error("Server error. Please try again later.");
            return;
        }

        toast.error("Failed to fetch user team tasks");
        console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!token) return
        fetchTasks();
        fetchTeamTasks();
    },[])



    return<main className="flex flex-col h-dvh bg-bg py-2 text-gray-600 lg:ml-[200px] gap-1 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <section className="flex items-start justify-between lg:ml-[100px] p-4 mx-10 max-sm:mx-1 relative">
            <div className="flex flex-col gap-0">
                <h1 className="p-0 font-bold text-text-primary">Dashboard</h1>
                <Greeting user={user} />
            </div>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </section>
        <section className="flex justify-center">
            
        </section>
        <section className="lg:ml-[100px] mx-10 max-sm:mx-1">
            <MetricsCard total={total} done={done} ongoing={ongoing} pending={pending}/>
        </section>
        <div className="lg:ml-[100px] mx-10 max-sm:mx-1">
            <Insight />
        </div>
        <section className="mx-10 pb-10 lg:ml-[100px] max-sm:mx-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="flex flex-col gap-5">
                    <TaskCalendar />
                </div>
                <div className="flex flex-col gap-1">
                    <TaskDistribution />
                    <TaskWithCountdown />
                </div>
            </div>
            
        </section>
    </main>
}

export default Dashboard