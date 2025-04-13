// src/lib/hooks/useSearchData.ts
import useSWR from 'swr';
import { SearchData, FilterState } from '../../lib/types/searchTypes';
import { fetchSearchData } from '../api/fetchSearchData';

interface UseSearchDataProps {
  filters: FilterState;
}

interface UseSearchDataReturn {
  data: SearchData | null;
  isLoading: boolean;
  error: unknown;
  mutate: () => Promise<unknown>;
}
 
const fetcher = async ([clientId, companyId, websiteId, segmentId]: [string, string, string, string, string]) => {
  return fetchSearchData(clientId, companyId, websiteId, segmentId);
};

/**
 * Custom hook to fetch and manage search data with SWR caching
 * @param filters Filter state object
 * @returns Search data, loading state, error state, and mutate function
 */
const useSearchData = ({ filters }: UseSearchDataProps): UseSearchDataReturn => {
  const { data, error, isLoading, mutate } = useSWR(
    ['searchData', filters.client, filters.company, filters.website, filters.segment],
    fetcher,
    {
      revalidateOnFocus: false, // Don't revalidate when window gets focus
      revalidateOnReconnect: true, // Revalidate when browser regains connection
      dedupingInterval: 5000, // Dedupe requests with the same key in this time span
      focusThrottleInterval: 10000, // Throttle focus events that trigger revalidation
      loadingTimeout: 3000, // Timeout to trigger the onLoadingSlow event
      errorRetryInterval: 5000, // Error retry interval
      errorRetryCount: 3, // Max error retry count
      refreshInterval: 0, // Disabled auto refresh
      suspense: false, // Don't use React Suspense
    }
  );

  return {
    data: data || null,
    isLoading,
    error,
    mutate,
  };
};

export default useSearchData;