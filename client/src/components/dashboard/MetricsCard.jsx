import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { CheckCircle, Autorenew, Assignment, Pending ,NorthEast} from "@mui/icons-material";
import { useSelector } from 'react-redux';

import useTaskGrowthRate from '../../hooks/useTaskGrowthRate';
import GrowthIndicator from './GrowthIndicator';
import AnimatedNumber from '../../utils/AnimatedNumber';


function MetricsCard({total,done,ongoing,pending}) {
    const user = useSelector((state) => state.user);
    const growthRate = useTaskGrowthRate();

    return<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
            <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-surface border-1 border-border rounded-lg cursor-pointer  hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
            <div className="flex justify-between">
                <h1 className='font-semibold flex items-center gap-1 text-sm text-text-primary'><Assignment className='text-blue-800' fontSize='small'/> Total Tasks</h1>
                <div className='rounded-full bg-bg'>
                    <Link to={`/personal`}>
                        <IconButton>
                            <NorthEast fontSize='small' sx={{ color: "var(--color-text-primary)"}}/>
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="text-5xl font-bold text-text-primary ml-2">
                <AnimatedNumber value={total} />
            </div>
            <div className="flex gap-2 text-text-secondary items-center">
                <GrowthIndicator value={growthRate.total}/>
            </div>
        </div>
        <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-surface border-1 border-border rounded-lg cursor-pointer  hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-1 text-sm text-text-primary'><CheckCircle className='text-green-700' fontSize='small'/> Finished Tasks</h1>
            <div className='rounded-full bg-bg'>
                <Link to="/personal">
                    <IconButton>
                        <NorthEast fontSize='small' sx={{ color: "var(--color-text-primary)"}}/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-text-primary ml-2">
            <AnimatedNumber value={done} />
        </div>
        <div className="flex gap-2 text-text-secondary items-center">
            <GrowthIndicator value={growthRate.done}/>
        </div>
    </div>
    <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-surface border-1 border-border rounded-lg cursor-pointer hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-1 text-sm text-text-primary'><Autorenew className='text-orange-600' fontSize='small'/>Ongoing Tasks</h1>
            <div className='rounded-full bg-bg'>
                <Link to={`/personal`}>
                    <IconButton>
                        <NorthEast fontSize='small' sx={{ color: "var(--color-text-primary)"}}/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-text-primary ml-2">
            <AnimatedNumber value={ongoing} />
        </div>
        <div className="flex gap-2 text-text-secondary items-center">
            <GrowthIndicator value={growthRate.ongoing}/>
        </div>
    </div>
    <div className="flex flex-col p-4 gap-4 shadow-lg border-lg bg-surface border-1 border-border rounded-lg cursor-pointer hover:-translate-y-1 active:-translate-y-1 transform transition-transform duration-200 ease-in-out">
        <div className="flex justify-between">
            <h1 className='font-semibold flex items-center gap-1 text-sm text-text-primary'><Pending className="text-red-700" fontSize='small' />Pending Tasks</h1>
            <div className='rounded-full bg-bg'>
                <Link to={`/personal`}>
                    <IconButton>
                        <NorthEast fontSize='small' sx={{ color: "var(--color-text-primary)"}}/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="text-5xl font-bold text-text-primary ml-2">
            <AnimatedNumber value={pending} />
        </div>
        <div className="flex gap-2 text-text-secondary items-center">
            <GrowthIndicator value={growthRate.pending}/>
        </div>
    </div>
    </div>
}

export default MetricsCard