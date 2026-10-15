import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Search jobs, freelancers, or skills...', showFilters = true, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [category, setCategory] = useState('All');
  const [experience, setExperience] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ search: searchTerm, category, experience });
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch({ search: '', category, experience });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-[#1E293B] border border-slate-700/80 rounded-2xl p-2 shadow-xl shadow-black/40 flex flex-col md:flex-row items-stretch md:items-center gap-2">
        <div className="flex-1 flex items-center px-3 gap-2">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none py-2"
          />
          {searchTerm && (
            <button type="button" onClick={handleClear} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-700/80 pt-2 md:pt-0 md:pl-2">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (onSearch) onSearch({ search: searchTerm, category: e.target.value, experience });
              }}
              className="bg-slate-800/80 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile App">Mobile App</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Backend Development">Backend Development</option>
            </select>

            <select
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                if (onSearch) onSearch({ search: searchTerm, category, experience: e.target.value });
              }}
              className="bg-slate-800/80 border border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer hidden sm:block"
            >
              <option value="All">Any Experience</option>
              <option value="Entry Level">Entry Level</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary py-2.5 px-6 shrink-0 text-sm font-semibold rounded-xl"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
