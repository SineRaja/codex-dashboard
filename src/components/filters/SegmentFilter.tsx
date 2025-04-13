import React from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import { FilterOption } from '../../lib/types/searchTypes';

interface SegmentFilterProps {
  selectedSegment: string;
  onChange: (segmentId: string) => void;
}

const SegmentFilter: React.FC<SegmentFilterProps> = ({ selectedSegment, onChange }) => {

  const segmentOptions: FilterOption[] = [
    { id: '1', label: 'Full site', value: 'full-site' },
    { id: '2', label: 'Recipes', value: 'recipes' },
    { id: '3', label: 'Articles', value: 'articles' },
    { id: '4', label: 'Products', value: 'products' },
  ];

  return (
    <div className="w-full">
      <FilterDropdown
        label="Segment"
        options={segmentOptions}
        selectedValue={selectedSegment}
        onChange={onChange}
      />
    </div>
  );
};

export default SegmentFilter;