import {toast,Toaster} from "react-hot-toast"

import ProfileAndNotif from "../components/ProfileAndNotif"
import SearchTaskInput from "../features/task/SearchTaskInput"
import MetricsCard from "../components/dashboard/MetricsCard.jsx"
import TaskDistribution from "../components/dashboard/TaskDistributionGraph.jsx"
import TaskList from "../components/dashboard/TaskList.jsx"
import TaskWithCountdown from "../components/dashboard/CountdownTimer.jsx"
import TaskCalendar from "../components/dashboard/TaskCalendar.jsx"
import Insight from "../components/dashboard/Insight.jsx"



function Dashboard() {
    return<div className="flex flex-col h-dvh bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-bold text-black text-xl">Dashboard</h1>
            <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif/>
        </div>
        <div className="flex justify-center">
            <SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </div>
        <div className="lg:ml-[100px] mx-10">
            <MetricsCard />
        </div>
        <div className="mx-10 pb-10 lg:ml-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                <div className="flex flex-col gap-5">
                    <TaskCalendar />
                </div>
                
                <div className="flex flex-col gap-5">
                    <TaskDistribution />
                    
                    <TaskWithCountdown />
                </div>
            </div>
        </div>
    </div>
}

export default Dashboard