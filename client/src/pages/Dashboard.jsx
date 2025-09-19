import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {toast,Toaster} from "react-hot-toast"
import { fetchAllTasks } from "../api/taskService.js"
import { setTasks,selectTaskStats } from "../features/task/taskSlice.js"

import ProfileAndNotif from "../components/personal/ProfileAndNotif.jsx"
import SearchTaskInput from "../features/task/SearchTaskInput"
import MetricsCard from "../components/dashboard/MetricsCard.jsx"
import TaskDistribution from "../components/dashboard/TaskDistributionGraph.jsx"
import TaskWithCountdown from "../components/dashboard/CountdownTimer.jsx"
import TaskCalendar from "../components/dashboard/TaskCalendar.jsx"
import Insight from "../components/dashboard/DailyDigest.jsx";

function Dashboard() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);

    const token = localStorage.getItem("token");
    const { total, done, ongoing, pending } = useSelector(selectTaskStats);

    const fetchTasks = async() => {
        setIsLoading(true);
        try {
            const res = await fetchAllTasks();
            dispatch(setTasks(res));
        } catch (error) {
            if(error.response?.status === 429) return
            toast.error("Failed to fetch tasks");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!token) return
        fetchTasks();
    },[])

    //<SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/> <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>


    return<main className="flex flex-col h-dvh bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <section className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-bold text-black text-xl">Dashboard</h1>
            
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </section>
        <section className="flex justify-center">
            
        </section>
        <section className="lg:ml-[100px] mx-10">
            <MetricsCard total={total} done={done} ongoing={ongoing} pending={pending}/>
        </section>
        <section className="mx-10 pb-10 lg:ml-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="flex flex-col gap-5">
                    <Insight />
                    <TaskCalendar />
                </div>
                <div className="flex flex-col gap-5">
                    <TaskDistribution />
                    <TaskWithCountdown />
                </div>
            </div>
        </section>
    </main>
}

export default Dashboard