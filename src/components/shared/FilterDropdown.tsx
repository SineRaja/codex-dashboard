import React, { useState, useRef, useEffect } from 'react';
import { FilterOption } from '../../lib/types/searchTypes';

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === selectedValue) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="mb-1 text-sm text-gray-400">{label}</div>
      <div 
        className="flex items-center justify-between w-full p-2 text-white bg-gray-900 border border-gray-700 rounded cursor-pointer hover:border-gray-600 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${label}-label`}
      >
        <span id={`${label}-label`} className="text-white">{selectedOption.label}</span>
        <svg 
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div 
          className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={`p-2 cursor-pointer hover:bg-gray-700 transition-colors duration-150 ${
                option.value === selectedValue ? 'bg-gray-700' : ''
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={option.value === selectedValue}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;