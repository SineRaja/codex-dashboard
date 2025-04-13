import React, { useMemo } from 'react';
import { QuarterlyHeatmapDataPoint } from '../../lib/types/searchTypes';

interface QuarterlyHeatmapProps {
  data: QuarterlyHeatmapDataPoint[];
  competitors: string[];
}
 
const COMPETITOR_ORDER = [
  'The Newt',
  'Four Seasons Hampshire',
  'Coworth Park',
  'Cameron House',
  'Headfield House',
  'Beaverbrook Hotel', 
  'Old Course Hotel',
  'Gleneagles',
  'The Grove',
  'Chewton Glen',
  'Cliveden House'
];
 
const YEARS = ['2019', '2020', '2021', '2022', '2023'];
const QUARTERS = ['Q2', 'Q3', 'Q4', 'Q1'];

const QuarterlyHeatmap: React.FC<QuarterlyHeatmapProps> = ({ data }) => {
 
  const getColorizedCell = (competitor: string, value: number) => { 
    const colorMap: Record<string, Record<string, string>> = {
      'The Newt': {
        light: 'bg-emerald-300 text-gray-800',
        medium: 'bg-emerald-500 text-white',
        dark: 'bg-emerald-700 text-white'
      },
      'Four Seasons Hampshire': {
        light: 'bg-blue-300 text-gray-800',
        medium: 'bg-blue-500 text-white',
        dark: 'bg-blue-700 text-white'
      },
      'Coworth Park': {
        light: 'bg-indigo-300 text-gray-800',
        medium: 'bg-indigo-500 text-white',
        dark: 'bg-indigo-700 text-white'
      },
      'Cameron House': {
        light: 'bg-red-300 text-gray-800',
        medium: 'bg-red-500 text-white',
        dark: 'bg-red-700 text-white'
      },
      'Headfield House': {
        light: 'bg-gray-300 text-gray-800',
        medium: 'bg-gray-500 text-white',
        dark: 'bg-gray-700 text-white'
      },
      'Beaverbrook Hotel': {
        light: 'bg-purple-300 text-gray-800',
        medium: 'bg-purple-500 text-white',
        dark: 'bg-purple-700 text-white'
      },
      'Old Course Hotel': {
        light: 'bg-violet-300 text-gray-800',
        medium: 'bg-violet-500 text-white',
        dark: 'bg-violet-700 text-white'
      },
      'Gleneagles': {
        light: 'bg-amber-300 text-gray-800',
        medium: 'bg-amber-500 text-white',
        dark: 'bg-amber-700 text-white'
      },
      'The Grove': {
        light: 'bg-green-300 text-gray-800',
        medium: 'bg-green-500 text-white',
        dark: 'bg-green-700 text-white'
      },
      'Chewton Glen': {
        light: 'bg-fuchsia-300 text-gray-800',
        medium: 'bg-fuchsia-500 text-white',
        dark: 'bg-fuchsia-700 text-white'
      },
      'Cliveden House': {
        light: 'bg-cyan-300 text-gray-800',
        medium: 'bg-cyan-500 text-white',
        dark: 'bg-cyan-700 text-white'
      }
    };
     
    let intensity = 'medium';
    if (value < 4.0) {
      intensity = 'light';
    } else if (value > 7.0) {
      intensity = 'dark';
    }
     
    const defaultColor = 'bg-gray-500 text-white';
    return colorMap[competitor]?.[intensity] || defaultColor;
  };
 
  const heatmapData = useMemo(() => {
    const result: Record<string, Record<string, Record<string, number>>> = {};
 
    COMPETITOR_ORDER.forEach(competitor => {
      result[competitor] = {};
      YEARS.forEach(year => {
        result[competitor][year] = {};
        QUARTERS.forEach(quarter => {
          result[competitor][year][quarter] = 0.0;
        });
      });
    });
     
    data.forEach(item => {
      if (
        COMPETITOR_ORDER.includes(item.competitor) &&
        YEARS.includes('20' + item.year) &&
        QUARTERS.includes(item.quarter)
      ) {
        result[item.competitor]['20' + item.year][item.quarter] = item.value;
      }
    });
    
    return result;
  }, [data]);

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 text-gray-400">No data available</div>;
  }

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="mb-6 text-xl font-semibold text-white">Query - Quarterly Heatmap</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-spacing-0 text-sm">
   
          <thead>
            <tr className="text-gray-400">
              <th className="p-2 text-left"></th>  
              {YEARS.map(year => (
                QUARTERS.map(quarter => (
                  <th key={`${year}-${quarter}`} className="p-2 text-center">
                    {quarter}
                  </th>
                ))
              ))}
            </tr>
            <tr className="text-gray-400 text-xs">
              <th className="p-2 text-left"></th>  
              {YEARS.map(year => (
                <th key={year} colSpan={4} className="p-1 text-center border-b border-gray-700">
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPETITOR_ORDER.map((competitor) => (
              <tr key={competitor}>
                <td className="p-2 text-white text-left">{competitor}</td>
                {YEARS.map(year => (
                  QUARTERS.map(quarter => {
                    const value = heatmapData[competitor]?.[year]?.[quarter] || 0;
                    const colorClass = getColorizedCell(competitor, value);
                    
                    return (
                      <td 
                        key={`${competitor}-${year}-${quarter}`} 
                        className={`p-2 text-center ${colorClass} border border-gray-800`}
                      >
                        {value.toFixed(1)}
                      </td>
                    );
                  })
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(QuarterlyHeatmap);