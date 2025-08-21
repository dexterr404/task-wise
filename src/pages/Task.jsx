import { useState } from "react";
import ProfileAndNotif from "../components/ProfileAndNotif";
import SearchTaskInput from "../features/task/searchTask/SearchTaskInput";
import Recommended from "../components/Recommended";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import CreateTask from "../features/task/createTask/CreateTaskForm";
import FilterMenu from "../components/dropdownMenu/FilterMenu";
import SortMenu from "../components/dropdownMenu/SortMenu";
import TaskCard from "../components/TaskCard";
import { Snackbar,Alert } from "@mui/material";
import tasks from "../../data/task";

function Task() {
    const [isCreateTaskOpen,setIsCreateTaskOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);
    const [isFilterOpen,setIsFilterOpen] = useState(false);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [taskList, setTaskList] = useState(tasks);

    const handleDeleteTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
    };



    return<div className="flex flex-col h-100% bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4">
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-semibold text-xl">My Task</h1>
            <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </div>
        <div className="flex justify-center">
            <SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </div>
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <div className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <div className="relative">
                    <button className=" bg-white border-gray-300 px-3 py-1 border-1  rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center relative"
                    onClick={() => {setIsFilterOpen((prev) => !prev)}}><FilterListIcon/>Filter</button>
                    {
                        isFilterOpen && <FilterMenu/>
                    }
                </div>
                <div className="relative">
                    <button className=" bg-white border-gray-300 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50 flex items-center"
                    onClick={() => {setIsSortOpen((prev) => !prev)}}><SortIcon/>Sort</button>
                    {
                        isSortOpen && <SortMenu/>
                    }
                </div>
                <button className=" bg-white border-gray-300 px-3 py-1 border-1 rounded-md text-sm font-semibold cursor-pointer hover:bg-gray-50">...</button>
            </div>
            <div>
                <button className="bg-green-900 text-white font-semibold px-3 py-1 rounded-md text-sm cursor-pointer hover:opacity-80"
                onClick={() => {
                    setSelectedCategory("");
                    setIsCreateTaskOpen(true);
                }}>+ Add New Task</button>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Task added successfully!
                </Alert>
            </Snackbar>
            {
                isCreateTaskOpen && 
                <CreateTask categoryName={selectedCategory} 
                onClose={() => setIsCreateTaskOpen(false)} 
                onTaskAdded={() => setSnackbarOpen(true)}/>
            }
        </div>
        <div className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-2">
                {
                    taskList.map((task,index) => (
                        <TaskCard key={index} task={task} onDelete={() => handleDeleteTask(index)}/>
                    ))
                }
            </div>
        </div>
    </div>
}

export default Task