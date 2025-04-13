import React from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import { FilterOption } from '../../lib/types/searchTypes';

interface ReportFilterProps {
  selectedReport: string;
  onChange: (reportId: string) => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ selectedReport, onChange }) => {
  const reportOptions: FilterOption[] = [
    { id: '1', label: 'Competitor Brand', value: 'competitor-brand' },
    { id: '2', label: 'Search Performance', value: 'search-performance' },
    { id: '3', label: 'Visibility Trends', value: 'visibility-trends' },
    { id: '4', label: 'Keyword Analysis', value: 'keyword-analysis' },
  ];

  return (
    <div className="w-full">
      <FilterDropdown
        label="Report"
        options={reportOptions}
        selectedValue={selectedReport}
        onChange={onChange}
      />
    </div>
  );
};

export default ReportFilter;