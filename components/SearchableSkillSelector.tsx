import React, { useState, useMemo } from 'react';
import { skillTree } from '../constants/skillTypes';

interface SearchableSkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  maxSkills?: number;
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

export const SearchableSkillSelector: React.FC<SearchableSkillSelectorProps> = ({ selectedSkills, onChange, maxSkills = 3 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const limitReached = selectedSkills.length >= maxSkills;

  // Filter the tree based on search term
  const filteredTree = useMemo(() => {
    if (!searchTerm.trim()) return skillTree;
    const lower = searchTerm.toLowerCase();

    return skillTree
      .map(cat => ({
        ...cat,
        subCategories: cat.subCategories
          .map(sub => ({
            ...sub,
            skills: sub.skills.filter(skill => skill.toLowerCase().includes(lower))
          }))
          .filter(sub => sub.skills.length > 0)
      }))
      .filter(cat => cat.subCategories.length > 0);
  }, [searchTerm]);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter(s => s !== skill));
    } else if (selectedSkills.length < maxSkills) {
      onChange([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    onChange(selectedSkills.filter(s => s !== skill));
  };

  const shouldShowSubCategoryLabel = (catName: string, subName: string) =>
    catName !== subName;

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          placeholder="Search skills — e.g. Plumber, Chef, Developer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Limit Warning */}
      {limitReached && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
          <svg className="h-4 w-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.168 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
          <span className="text-xs font-medium text-amber-700">Maximum {maxSkills} skills allowed. Remove a skill to select a different one.</span>
        </div>
      )}

      {/* Selected Skills Tags */}
      {selectedSkills.length > 0 && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
              Selected ({selectedSkills.length}/{maxSkills})
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedSkills.map(skill => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-blue-800 border border-blue-200 shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="flex-shrink-0 text-blue-400 hover:text-blue-700 transition-colors"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Skills Tree */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="max-h-[360px] overflow-y-auto overscroll-contain">
          {filteredTree.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              <SearchIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              No skills found for "<span className="font-medium">{searchTerm}</span>"
            </div>
          ) : (
            filteredTree.map((cat, catIdx) => (
              <div key={cat.name} className={catIdx > 0 ? 'border-t border-gray-200' : ''}>
                {/* Top-level category header */}
                <div className="sticky top-0 z-20 bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {cat.name}
                  </span>
                  {cat.subCategories.flatMap(s => s.skills).filter(sk => selectedSkills.includes(sk)).length > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
                      {cat.subCategories.flatMap(s => s.skills).filter(sk => selectedSkills.includes(sk)).length} selected
                    </span>
                  )}
                </div>

                {/* Sub-categories */}
                {cat.subCategories.map((sub, subIdx) => (
                  <div key={sub.name} className={subIdx > 0 ? 'border-t border-gray-100' : ''}>
                    {shouldShowSubCategoryLabel(cat.name, sub.name) && (
                      <div className="sticky top-8 z-10 bg-gray-50 border-b border-gray-100 px-4 py-1.5">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {sub.name}
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 p-3 gap-1">
                      {sub.skills.map(skill => {
                        const isSelected = selectedSkills.includes(skill);
                        const isDisabled = !isSelected && limitReached;
                        return (
                          <label
                            key={skill}
                            className={`
                              flex items-center justify-between px-3 py-2 rounded-lg select-none
                              transition-all duration-150
                              ${isSelected
                                ? 'bg-blue-600 text-white shadow-sm cursor-pointer'
                                : isDisabled
                                  ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50'
                                  : 'text-gray-700 hover:bg-gray-100 cursor-pointer'}
                            `}
                          >
                            <span className="text-sm font-medium truncate pr-2">{skill}</span>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSkill(skill)}
                              disabled={isDisabled}
                              className="sr-only"
                            />
                            <div className={`
                              flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                              ${isSelected ? 'border-white bg-white' : 'border-gray-300 bg-white'}
                            `}>
                              {isSelected && (
                                <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 12 12">
                                  <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z"/>
                                </svg>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {filteredTree.flatMap(c => c.subCategories.flatMap(s => s.skills)).length} skills across {filteredTree.length} categories
          </span>
          {selectedSkills.length === 0 && (
            <span className="text-xs text-gray-400 italic">Select up to {maxSkills} skills</span>
          )}
        </div>
      </div>
    </div>
  );
};
