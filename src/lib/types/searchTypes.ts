export interface FilterOption {
    id: string;
    label: string;
    value: string;
  }
   
  export interface MonthlySearchDataPoint {
    month: string; // Format: "MM" (01, 02, etc.)
    year: string;  // Format: "YY" (e.g., "22" for 2022)
    competitors: {
      [competitor: string]: number;  // Competitor name to search value mapping
    };
  }
  
  // Quarter representation
  export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
  
  // Quarterly heatmap data structure
  export interface QuarterlyHeatmapDataPoint {
    competitor: string;
    year: string;
    quarter: Quarter;
    value: number;
  }
  
  // Combined data structure for the dashboard
  export interface SearchData {
    monthly: MonthlySearchDataPoint[];
    quarterly: QuarterlyHeatmapDataPoint[];
    competitors: string[];  // List of all competitors
  }
  
  // API response type
  export interface SearchDataResponse {
    success: boolean;
    data: SearchData;
    error?: string;
  }
  
  // Filter state
  export interface FilterState {
    client: string;
    company: string;
    website: string;
    segment: string;
    report: string;
  }