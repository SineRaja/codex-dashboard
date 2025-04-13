import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import ClientFilter from '../components/filters/ClientFilter';
import CompanyFilter from '../components/filters/CompanyFilter';
import WebsiteFilter from '../components/filters/WebsiteFilter';
import SegmentFilter from '../components/filters/SegmentFilter';
import ReportFilter from '../components/filters/ReportFilter';
const MonthlyLineChart = dynamic(
  () => import('../components/visualizations/MonthlyLineChart'),
  { 
    loading: () => <LoadingState message="Loading chart..." />,
    ssr: false  
  }
);

const QuarterlyHeatmap = dynamic(
  () => import('../components/visualizations/QuarterlyHeatmap'),
  { 
    loading: () => <LoadingState message="Loading heatmap..." />,
    ssr: false
  }
);
import LoadingState from '../components/shared/LoadingState';
import ErrorBoundary from '../components/shared/ErrorBoundary';
import useSearchData from '../lib/hooks/useSearchData';
import { FilterState } from '../lib/types/searchTypes';



export default function Home() {
 
  const [filters, setFilters] = useState<FilterState>({
    client: 'general-mills',
    company: 'betty-crocker',
    website: 'betty-crocker-uk',
    segment: 'full-site',
    report: 'competitor-brand'
  });
 
  const { data, isLoading, error } = useSearchData({ filters });
  const safeErrorMessage = error instanceof Error ? error.message : String(error);

  const handleClientChange = (clientId: string) => {
    setFilters(prev => ({ ...prev, client: clientId }));
  };

  const handleCompanyChange = (companyId: string) => {
    setFilters(prev => ({ ...prev, company: companyId }));
  };

  const handleWebsiteChange = (websiteId: string) => {
    setFilters(prev => ({ ...prev, website: websiteId }));
  };

  const handleSegmentChange = (segmentId: string) => {
    setFilters(prev => ({ ...prev, segment: segmentId }));
  };

  const handleReportChange = (reportId: string) => {
    setFilters(prev => ({ ...prev, report: reportId }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Codex - Share Of Search</title>
        <meta name="description" content="Search analytics dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      
      <main className="container px-4 py-6 mx-auto">
        {/* Filter section - Updated to match reference design */}
        <div className="flex flex-col gap-4 mb-8 md:flex-row md:gap-6">
          <div className="w-full md:w-1/4">
            <ClientFilter 
              selectedClient={filters.client} 
              onChange={handleClientChange} 
            />
          </div>
          <div className="w-full md:w-1/4">
            <CompanyFilter 
              selectedCompany={filters.company} 
              onChange={handleCompanyChange} 
            />
          </div>
          <div className="w-full md:w-1/4">
            <WebsiteFilter 
              selectedWebsite={filters.website} 
              onChange={handleWebsiteChange} 
            />
          </div>
          <div className="w-full md:w-1/4">
            <SegmentFilter 
              selectedSegment={filters.segment} 
              onChange={handleSegmentChange} 
            />
          </div>
        </div>
         
        <div className="flex flex-col mb-6 space-y-4  md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Share Of Search</h1>
            <p className="text-gray-400">See how competitors search has changed over time.</p>
          </div>
          <div className="w-full md:w-64"> 
            <ReportFilter 
              selectedReport={filters.report} 
              onChange={handleReportChange} 
            />
          </div>
        </div>
         
        <div className="space-y-6"> 
        {error && (
          <div className="p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold text-red-300">Error loading data</h3>
            <p className="text-red-200">{safeErrorMessage}</p>
          </div>
        )}


          {isLoading ? (
            <LoadingState />
          ) : (
            <> 
              <ErrorBoundary>
                {data && (
                  <MonthlyLineChart 
                    data={data.monthly}
                    competitors={data.competitors}
                  />
                )}
              </ErrorBoundary>
               
              <ErrorBoundary>
                {data && (
                  <QuarterlyHeatmap 
                    data={data.quarterly}
                    competitors={data.competitors}
                  />
                )}
              </ErrorBoundary>
            </>
          )}
        </div>
      </main>
    </div>
  );
}