
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Ongoing', value: 8, color: '#0088FE' },
  { label: 'Done', value: 12, color: '#00C49F' },
  { label: 'Not Started', value: 1, color: '#FFBB28' },
  { label: 'Unfinished', value: 1, color: '#FF8042' },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function TaskDistributiont() {
  return (
    <div className='flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg'>
      <div className='border-gray-200 px-10'>
        <h1 className='font-semibold text-sm'>Overall progress</h1>
      </div>
      <div className='relative flex justify-center items-center'>
        <PieChart
          series={[{ innerRadius: 85, outerRadius: 100, paddingAngle: 0, data }]}
          {...settings}
        />
        <span className='absolute inset-0 flex items-center justify-center text-4xl font-semibold text-green-900'>60%</span>
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
