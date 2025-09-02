import { PieChart } from '@mui/x-charts/PieChart';
import { useDonutTaskData } from '../../hooks/useDonutTaskData';

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function TaskDistributiont() {
  const {data,donePercentage} = useDonutTaskData();

  return (
    <div className='flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg'>
      <div className='border-gray-200 px-6'>
        <h1 className='font-semibold text-sm'>Overall Progress</h1>
      </div>
      <div className='relative flex justify-center items-center'>
        <PieChart
          series={[{ innerRadius: 90, outerRadius: 100, paddingAngle: 0, data }]}
          {...settings}
        />
        <span className='absolute inset-0 flex items-center justify-center text-4xl font-semibold text-slate-700'>{donePercentage}%</span>
      </div>
      <div className='flex flex-col px-10'>
        {
          data.map((value,index) => (
            <div className='flex gap-2'key={index}>
              <div  className='size-3 rounded-full' style={{ backgroundColor: value.color }}></div>
              <span className='text-xs'>{value.label}</span>
            </div>
          ))
        }
      </div>
    </div>

  );
}
