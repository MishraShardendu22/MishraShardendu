// File: components/github/FilterSortControls.tsx
import { SortOption } from './types'

interface FilterSortControlsProps {
  languages: string[]
  selectedLanguage: string | null
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  onFilterChange: (language: string | null) => void
}

const FilterSortControls = ({
  languages,
  selectedLanguage,
  sortBy,
  onSortChange,
  onFilterChange,
}: FilterSortControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
      {/* Filter */}
      <div className="relative">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white shadow-sm"
          value={selectedLanguage || ''}
          onChange={(e) =>
            onFilterChange(e.target.value === '' ? null : e.target.value)
          }
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white shadow-sm"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  )
}

export default FilterSortControls
