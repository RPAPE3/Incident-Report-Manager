import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchIncidents({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full md:w-64">
      <input
        type="search"
        placeholder="Search incidents..."
        className="pl-8 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <span className="absolute left-2.5 top-2.5 text-gray-400">
        <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
      </span>
    </div>
  );
} 