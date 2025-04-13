import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MonthlySearchDataPoint } from '../../lib/types/searchTypes';

interface MonthlyLineChartProps {
  data: MonthlySearchDataPoint[];
  competitors: string[];
}
interface FormattedChartPoint {
  name: string;
  [competitor: string]: string | number;
}

const COLORS = {
  'Cliveden House': '#01FFFF', // teal
  'Chewton Glen': '#8B5CF6', // purple
  'The Grove': '#34D399', // green
  'Gleneagles': '#F59E0B', // orange
  'Old Course Hotel': '#8B5CF6', // purple
  'Beaverbrook Hotel': '#BFDBFE', // light blue
  'Headfield House': '#60A5FA', // blue
  'Cameron House': '#EF4444', // red
  'Coworth Park': '#3B82F6', // blue
  'Four Seasons Hampshire': '#60A5FA', // light blue
  'The Newt': '#10B981', // green
};

const VISIBLE_COMPETITORS = [
  'Cliveden House',
  'Chewton Glen',
  'The Grove',
  'Gleneagles',
  'Old Course Hotel',
];

const MonthlyLineChart: React.FC<MonthlyLineChartProps> = ({ data }) => {
  const [formattedData, setFormattedData] = useState<FormattedChartPoint[]>([]);
  
  useEffect(() => {
    if (data && data.length > 0) { 
      const chartData = data.map(point => { 
        const formattedPoint: FormattedChartPoint = {
          name: `${point.month}/${point.year.slice(-2)}`
        };
        
         
        Object.entries(point.competitors).forEach(([competitor, value]) => {
          if (VISIBLE_COMPETITORS.includes(competitor)) {
            formattedPoint[competitor] = value;
          }
        });
        
        return formattedPoint;
      });
      
      setFormattedData(chartData);
    }
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-400">No data available</div>;
  }
 
  const createVerticalGridMarkers = () => { 
    const years = ['2021', '2022', '2023'];
    return years.flatMap(year => {
      return [
        { quarter: 'Q1', year, position: formattedData.findIndex(d => d.name === `03/${year.slice(-2)}`) },
        { quarter: 'Q2', year, position: formattedData.findIndex(d => d.name === `06/${year.slice(-2)}`) },
        { quarter: 'Q3', year, position: formattedData.findIndex(d => d.name === `09/${year.slice(-2)}`) },
        { quarter: 'Q4', year, position: formattedData.findIndex(d => d.name === `12/${year.slice(-2)}`) },
      ].filter(item => item.position !== -1);
    });
  };

  const quarterMarkers = createVerticalGridMarkers();

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="mb-4 text-xl font-semibold text-white">Query - By Month</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={true} 
              horizontal={true} 
              stroke="#333" 
            />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#333' }}
              tick={{ fill: '#999', fontSize: 10 }}
              tickLine={{ stroke: '#333' }}
              dy={10}
              interval={2}  
            />
            <YAxis 
              axisLine={{ stroke: '#333' }}
              tick={{ fill: '#999', fontSize: 10 }}
              tickLine={{ stroke: '#333' }}
              domain={[0, 20]}  
              ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45]}  
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#374151',
                color: '#fff' 
              }}
            />
             
            {quarterMarkers.map((marker) => (
              <CartesianGrid 
                key={`${marker.year}-${marker.quarter}`}
                verticalPoints={[marker.position]} 
                stroke="#8B5CF6" 
                strokeWidth={1} 
              />
            ))} 

            {VISIBLE_COMPETITORS.map((competitor) => (
              <Line
                key={competitor}
                type="monotone"
                dataKey={competitor}
                stroke={COLORS[competitor as keyof typeof COLORS]}
                strokeWidth={2}
                dot={{ r: 3, fill: COLORS[competitor as keyof typeof COLORS] }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
       
      <div className="flex flex-wrap items-center justify-center mt-4 gap-x-4 gap-y-2">
        {VISIBLE_COMPETITORS.map((competitor) => (
          <div key={competitor} className="flex items-center">
            <div 
              className="w-4 h-4 mr-2" 
              style={{ backgroundColor: COLORS[competitor as keyof typeof COLORS] }}
            ></div>
            <span className="text-sm text-gray-300">{competitor}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MonthlyLineChart);