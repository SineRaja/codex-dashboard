import React from 'react';
import FilterDropdown from '../shared/FilterDropdown';
import { FilterOption } from '../../lib/types/searchTypes';

interface ClientFilterProps {
  selectedClient: string;
  onChange: (clientId: string) => void;
}

const ClientFilter: React.FC<ClientFilterProps> = ({ selectedClient, onChange }) => {
 
  const clientOptions: FilterOption[] = [
    { id: '1', label: 'General Mills', value: 'general-mills' },
    { id: '2', label: 'Kraft Heinz', value: 'kraft-heinz' },
    { id: '3', label: 'Nestle', value: 'nestle' },
    { id: '4', label: 'Unilever', value: 'unilever' },
  ];

  return (
    <div className="w-full">
      <FilterDropdown
        label="Client"
        options={clientOptions}
        selectedValue={selectedClient}
        onChange={onChange}
      />
    </div>
  );
};

export default ClientFilter;