import React from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import { FilterOption } from '../../lib/types/searchTypes';

interface CompanyFilterProps {
  selectedCompany: string;
  onChange: (companyId: string) => void;
}

const CompanyFilter: React.FC<CompanyFilterProps> = ({ selectedCompany, onChange }) => {
 
  const companyOptions: FilterOption[] = [
    { id: '1', label: 'Betty Crocker', value: 'betty-crocker' },
    { id: '2', label: 'Pillsbury', value: 'pillsbury' },
    { id: '3', label: 'Cheerios', value: 'cheerios' },
    { id: '4', label: 'Nature Valley', value: 'nature-valley' },
  ];

  return (
    <div className="w-full">
      <FilterDropdown
        label="Company"
        options={companyOptions}
        selectedValue={selectedCompany}
        onChange={onChange}
      />
    </div>
  );
};

export default CompanyFilter;