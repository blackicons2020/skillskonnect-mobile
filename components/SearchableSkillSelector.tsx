import React, { useState, useMemo } from 'react';
import { skillCategories } from '../constants/skillTypes';

interface SearchableSkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
}

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const SearchableSkillSelector: React.FC<SearchableSkillSelectorProps> = ({ selectedSkills, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter skills based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return skillCategories;

    const lowerTerm = searchTerm.toLowerCase();
    const result: Record<string, string[]> = {};

    Object.entries(skillCategories).forEach(([category, skills]) => {
      const matchingSkills = skills.filter(skill => 
        skill.toLowerCase().includes(lowerTerm)
      );

      if (matchingSkills.length > 0) {
        result[category] = matchingSkills;
      }
    });

    return result;
  }, [searchTerm]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search for skills (e.g., Plumber, Chef, Developer)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selected Skills Tags */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-xs font-medium text-gray-500 w-full mb-1">Selected Skills ({selectedSkills.length}):</span>
          {selectedSkills.map(skill => (
            <span 
              key={skill} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
              <button
                type="button"
                className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-500 focus:outline-none"
                onClick={() => removeSkill(skill)}
              >
                <span className="sr-only">Remove {skill}</span>
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button 
            onClick={() => onChange([])}
            className="text-xs text-red-500 hover:text-red-700 underline ml-auto"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Skills List */}
      <div className="border border-gray-200 rounded-lg max-h-80 overflow-y-auto bg-white shadow-sm">
        {Object.keys(filteredCategories).length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No skills found matching "{searchTerm}"
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {Object.entries(filteredCategories).map(([category, skills]) => (
              <div key={category} className="p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 sticky top-0 bg-white/95 backdrop-blur-sm py-1 -mt-1 -mx-1 px-1 z-10">
                  {category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skills.map(skill => (
                    <label 
                      key={skill} 
                      className={`
                        relative flex items-start py-2 px-3 rounded-md cursor-pointer transition-colors duration-200
                        ${selectedSkills.includes(skill) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}
                      `}
                    >
                      <div className="min-w-0 flex-1 text-sm">
                        <div className={`font-medium ${selectedSkills.includes(skill) ? 'text-blue-900' : 'text-gray-700'}`}>
                          {skill}
                        </div>
                      </div>
                      <div className="ml-3 flex items-center h-5">
                        <input
                          type="checkbox"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 text-right">
        Can't find your skill? Try searching for related terms.
      </p>
    </div>
  );
};
