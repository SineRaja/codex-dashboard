import { SearchData, MonthlySearchDataPoint, QuarterlyHeatmapDataPoint, Quarter } from '../../lib/types/searchTypes';

/**
 * Fetch search data from the API
 * @param clientId Client ID
 * @param companyId Company ID
 * @param websiteId Website ID
 * @param segmentId Segment ID
 * @returns Promise with search data
 */
export const fetchSearchData = async (
  clientId: string,
  companyId: string,
  websiteId: string,
  segmentId: string
): Promise<SearchData> => {
  try {
    // In a real app, you would fetch from an actual API endpoint
    // For now, we'll simulate an API response with mock data
 
    await new Promise(resolve => setTimeout(resolve, 500));
 
    const competitors = [
      'Cliveden House',
      'Chewton Glen',
      'The Grove',
      'Gleneagles',
      'Old Course Hotel',
      'Beaverbrook Hotel',
      'Headfield House',
      'Cameron House',
      'Coworth Park',
      'Four Seasons Hampshire',
      'The Newt'
    ];
     
    const monthlyData: MonthlySearchDataPoint[] = [];
    const currentDate = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear().toString().slice(2);
      
      const competitorValues: Record<string, number> = {};
 
      competitors.forEach(competitor => {
  
        let baseValue = 0;
        
        if (competitor === 'Cliveden House') { 
          baseValue = 5 + Math.random() * 5;
        } else if (competitor === 'Chewton Glen') { 
          baseValue = 3 + Math.random() * 9; 
          if (i % 7 === 0) baseValue = 15 + Math.random() * 5;
        } else { 
          baseValue = 3 + Math.random() * 7;
        }
         
        competitorValues[competitor] = Math.max(1, Math.min(20, parseFloat(baseValue.toFixed(1))));
      });
      
      monthlyData.push({
        month,
        year,
        competitors: competitorValues
      });
    }
     
    const quarterlyData: QuarterlyHeatmapDataPoint[] = [];
    const quarters: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'];
     
    for (let year = 19; year <= 23; year++) {
      const yearStr = year.toString().padStart(2, '0');
       
      quarters.forEach(quarter => {
     
        competitors.forEach(competitor => {
          let value: number;
     
          if (year < 21) { 
            if (competitor === 'The Newt' || competitor === 'Cliveden House') {
       
              value = (year === 19 && quarter === 'Q2') ? 1.5 : 
                     (year === 19 && quarter === 'Q3') ? 3.5 : 
                     (year === 19 && quarter === 'Q4') ? 2.1 : 
                     (year === 20 && quarter === 'Q1') ? 1.2 : 
                     (year === 20 && quarter === 'Q2') ? 1.9 : 
                     (year === 20 && quarter === 'Q3') ? 3.5 : 
                     (year === 20 && quarter === 'Q4') ? 2.1 : 0.0;
            } else {
              
              value = 0.0;  
            }
          } else { 
            value = parseFloat((1 + Math.random() * 8.9).toFixed(1));
             
            if (competitor === 'The Newt') { 
              if (year >= 22) {
                value = parseFloat((6.0 + Math.random() * 3.9).toFixed(1));
              }
            }
            
            if (competitor === 'Cameron House') { 
              if (quarter === 'Q1' || quarter === 'Q3') {
                value = parseFloat((7.0 + Math.random() * 2.9).toFixed(1));
              }
            }
          }
          
          quarterlyData.push({
            competitor,
            year: yearStr,
            quarter,
            value
          });
        });
      });
    }
    
    return {
      monthly: monthlyData,
      quarterly: quarterlyData,
      competitors
    };
    
  } catch (error) {
    console.error('Error fetching search data:', error);
    throw error;
  }
};