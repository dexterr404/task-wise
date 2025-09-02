import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { CheckCircle, Autorenew, Assignment, Pending ,NorthEast} from "@mui/icons-material";
import useTaskGrowthRate from '../../hooks/useTaskGrowthRate';
import GrowthIndicator from './GrowthIndicator';
import AnimatedNumber from '../../utils/AnimatedNumber';

function MetricsCard({total,done,ongoing,pending}) {
    const growthRate = useTaskGrowthRate();

    return<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
            <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-white rounded-lg cursor-pointer hover:bg-gray-50 active:bg-gray-50 hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
            <div className="flex justify-between">
                <h1 className='font-semibold flex items-center gap-2 text-sm'><Assignment className='text-blue-800' fontSize='small'/> Total Tasks</h1>
                <div className='rounded-full bg-white'>
                    <Link to="/Task">
                        <IconButton>
                            <NorthEast fontSize='small'/>
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="text-5xl font-bold text-slate-700 ml-2">
                <AnimatedNumber value={total} />
            </div>
            <div className="flex gap-2 items-center">
                <GrowthIndicator value={growthRate.total}/>
            </div>
        </div>
        <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-white rounded-lg cursor-pointer hover:bg-gray-50           active:bg-gray-50 hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-2 text-sm'><CheckCircle className='text-green-700' fontSize='small'/> Finished Tasks</h1>
            <div className='rounded-full bg-white'>
                <Link to="/Task">
                    <IconButton>
                        <NorthEast fontSize='small'/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-slate-700 ml-2">
            <AnimatedNumber value={done} />
        </div>
        <GrowthIndicator value={growthRate.done}/>
    </div>
    <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-white rounded-lg cursor-pointer hover:bg-gray-50           active:bg-gray-50 hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-2 text-sm'><Autorenew className='text-orange-600' fontSize='small'/>Ongoing Tasks</h1>
            <div className='rounded-full bg-white'>
                <Link to="/Task">
                    <IconButton>
                        <NorthEast fontSize='small'/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-slate-700 ml-2">
            <AnimatedNumber value={ongoing} />
        </div>
        <GrowthIndicator value={growthRate.ongoing}/>
    </div>
    <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-white rounded-lg cursor-pointer hover:bg-gray-50           active:bg-gray-50 hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-2 text-sm'><Pending className="text-red-700" fontSize='small' />Pending Tasks</h1>
            <div className='rounded-full bg-white'>
                <Link to="/Task">
                    <IconButton>
                        <NorthEast fontSize='small'/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-slate-700 ml-2">
            <AnimatedNumber value={pending} />
        </div>
        <GrowthIndicator value={growthRate.pending}/>
    </div>
    </div>
}

export default MetricsCard