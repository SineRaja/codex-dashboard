import React from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import { FilterOption } from '../../lib/types/searchTypes';

interface WebsiteFilterProps {
  selectedWebsite: string;
  onChange: (websiteId: string) => void;
}

const WebsiteFilter: React.FC<WebsiteFilterProps> = ({ selectedWebsite, onChange }) => {

  const websiteOptions: FilterOption[] = [
    { id: '1', label: 'Betty Crocker UK', value: 'betty-crocker-uk' },
    { id: '2', label: 'Betty Crocker US', value: 'betty-crocker-us' },
    { id: '3', label: 'Betty Crocker Canada', value: 'betty-crocker-ca' },
    { id: '4', label: 'Betty Crocker Australia', value: 'betty-crocker-au' },
  ];

  return (
    <div className="w-full">
      <FilterDropdown
        label="Website"
        options={websiteOptions}
        selectedValue={selectedWebsite}
        onChange={onChange}
      />
    </div>
  );
};

export default WebsiteFilter;