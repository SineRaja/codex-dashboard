import { MonthlySearchDataPoint, QuarterlyHeatmapDataPoint } from '../types/searchTypes';

/**
 * Format the month and year for display
 * @param month Month in 'MM' format
 * @param year Year in 'YY' format
 * @returns Formatted date string (e.g., "Jan '22")
 */
export const formatMonthYear = (month: string, year: string): string => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthIndex = parseInt(month, 10) - 1;
  return `${monthNames[monthIndex]} '${year}`;
};

/**
 * Get the maximum value from monthly data
 * @param data Monthly search data
 * @returns Maximum value across all competitors and months
 */
export const getMaxMonthlyValue = (data: MonthlySearchDataPoint[]): number => {
  let max = 0;
  
  data.forEach(point => {
    Object.values(point.competitors).forEach(value => {
      if (value > max) max = value;
    });
  });
  
  return max;
};

/**
 * Get the maximum value from quarterly data
 * @param data Quarterly heatmap data
 * @returns Maximum value across all competitors and quarters
 */
export const getMaxQuarterlyValue = (data: QuarterlyHeatmapDataPoint[]): number => {
  let max = 0;
  
  data.forEach(point => {
    if (point.value > max) max = point.value;
  });
  
  return max;
};

/**
 * Generate color for heatmap cell based on value and max value
 * @param value Cell value
 * @param maxValue Maximum value in the dataset
 * @returns CSS color class
 */
export const getHeatmapColor = (value: number, maxValue: number): string => {
  // Normalize the value to a 0-1 range
  const normalizedValue = value / maxValue;
  
  // Color scale from light to dark
  if (normalizedValue < 0.1) return 'bg-blue-50 text-gray-800';
  if (normalizedValue < 0.2) return 'bg-blue-100 text-gray-800';
  if (normalizedValue < 0.3) return 'bg-blue-200 text-gray-800';
  if (normalizedValue < 0.4) return 'bg-blue-300 text-gray-800';
  if (normalizedValue < 0.5) return 'bg-blue-400 text-gray-800';
  if (normalizedValue < 0.6) return 'bg-blue-500 text-white';
  if (normalizedValue < 0.7) return 'bg-blue-600 text-white';
  if (normalizedValue < 0.8) return 'bg-blue-700 text-white';
  if (normalizedValue < 0.9) return 'bg-blue-800 text-white';
  return 'bg-blue-900 text-white';
};