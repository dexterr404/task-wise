import { useState,useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "@mui/material";
import { FilterList, Sort, Add } from "@mui/icons-material";
import { fetchAllTasks,createTask,deleteTask,editTask } from "../api/taskService";
import { useSelector } from "react-redux";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

import ProfileAndNotif from "../components/personal/ProfileAndNotif";
import SearchTaskInput from "../features/task/SearchTaskInput";
import Recommended from "../components/personal/Recommended";
import CreateTask from "../features/task/CreateTaskModal";
import FilterMenu from "../components/dropdownMenu/FilterMenu";
import SortMenu from "../components/dropdownMenu/SortMenu";
import RateLimitedUI from "../components/RateLimitedUI";
import TasksList from "../components/personal/TasksList";

function Task() {
    const [isCreateTaskOpen,setIsCreateTaskOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isProfileMenuOpen,setProfileMenuOpen] = useState(false);
    const [isFilterOpen,setIsFilterOpen] = useState(false);
    const [isSortOpen,setIsSortOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [sort,setSort] = useState("none");
    const [filters, setFilters] = useState([]);
    const user = useSelector((state) => state.user);
    const token = localStorage.getItem('token');

    const queryClient = useQueryClient();

    //Fetch tasks
    const { data, isLoading: isQueryLoading, refetch } = useQuery({
        queryKey: ["personalTasks", user.id, sort, filters],
        queryFn: () => fetchAllTasks(user.id, sort, filters),
        keepPreviousData: true,
    });

    //Mutation ui to add a task
    const addTaskMutation = useMutation({
        mutationFn: ({ userId, title, description, deadline, priority, subtasks }) =>
            createTask( userId, title, description, deadline, priority, subtasks),
        onSuccess: () => {
            queryClient.invalidateQueries(["personalTasks", user.id]);
        }
    });

    //Mutate ui when data mutated by deleting
    const deleteTaskMutation = useMutation({
        mutationFn: ({ userId, taskId }) =>
            deleteTask(userId, taskId),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', user.id]);
        }
    })

    //Mutate ui when data mutated by updating
    const editTaskMutation = useMutation({
        mutationFn: ({ userId, taskId, title, description, deadline, priority, subtasks, status}) =>
            editTask(userId, taskId, title, description, deadline, priority, subtasks, status),
        onSuccess: () => {
            queryClient.invalidateQueries(['personalTasks', user.id])
        }
    })



    const fetchTask = async () => {
    try {
        const res = await fetchAllTasks(user.id, sort, filters);
        setTasks(res);
        setIsRateLimited(false);
    } catch (error) {
        if (error.response?.status === 429) setIsRateLimited(true);
        else console.log("Failed to load tasks", error);
    } finally {
    }
    };

    useEffect(() => {
        if (!token) return;
        fetchTask();

    }, [sort, filters,token]);

    const handleSortChange = (option) => setSort(option);

    return<div className="flex flex-col h-dvh bg-gray-50 py-2 text-gray-600 lg:ml-[200px] gap-4 font-inter">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex items-center justify-between lg:ml-[100px] p-4 mx-10 relative">
            <h1 className="font-bold text-black text-xl">My Task</h1>
            <SearchTaskInput className="relative lg:block max-md:hidden w-[300px]"/>
            <ProfileAndNotif setProfileMenuOpen={setProfileMenuOpen} isProfileMenuOpen={isProfileMenuOpen}/>
        </div>
        <div className="flex justify-center">
            <SearchTaskInput className="relative md:hidden max-md:block w-[300px] mt-2 z-0"/>
        </div>
        {
            isRateLimited && <RateLimitedUI/>
        }
        <Recommended setIsCreateTaskOpen={setIsCreateTaskOpen} setSelectedCategory={setSelectedCategory}/>
        <div className="flex justify-between items-center mx-10 lg:ml-[100px] max-sm:flex-col-reverse max-sm:gap-2">
            <div className="flex gap-2">
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1  rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center relative"
                    onClick={() => {setIsFilterOpen((prev) => !prev)}}><FilterList fontSize="small"/>Filter</button>
                    {
                        isFilterOpen && <FilterMenu onChange={setFilters}/>
                    }
                </div>
                <div className="relative">
                    <button className=" bg-gray-800 text-white border-gray-300 px-4 py-1 border-1 rounded-md text-xs font-semibold cursor-pointer hover:opacity-95 active:opacity-90 flex items-center"
                    onClick={() => {setIsSortOpen((prev) => !prev)}}><Sort fontSize="small"/>Sort</button>
                    {
                        isSortOpen && <SortMenu onChange={(value) => {
                            handleSortChange(value);
                            setSort(value);
                        }
                        }
                        sort={sort}/>
                    }
                </div>
            </div>
            <div>
                <Button
                variant="contained" sx={{backgroundColor: "#115e59", color: "white", fontSize: "12px", textTransform: "none"}}
                onClick={() => {
                    setSelectedCategory("");
                    setIsCreateTaskOpen(true);
                }}><Add fontSize="small"/>Add New Task</Button>
            </div>
            <CreateTask open={isCreateTaskOpen} categoryName={selectedCategory} onClose={()=>setIsCreateTaskOpen(false)} 
            fetchTask={() => fetchTask()} onCreateTask={(taskData) => addTaskMutation.mutateAsync({ userId: user.id, ...taskData })}/> 
        </div>
        <div className="flex flex-col mx-10 lg:ml-[100px]">
            <h1 className="font-semibold text-xs text-black mb-4">TODO</h1>
            <div className="flex justify-end flex-col gap-2">
                <TasksList
                 onEdit={(taskId,updatedData) => editTaskMutation.mutateAsync({ userId: user.id, taskId, ...updatedData })}
                 onDelete={(taskId) => deleteTaskMutation.mutateAsync({ userId: user.id, taskId })}
                 isLoading={isQueryLoading} tasks={data} fetchTask={() => fetchTask()}/>
            </div>
        </div>
    </div>
}

export default Task