import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect,useState } from "react";

function SearchTeamInbox({ setSearchQuery, searchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const debouncedValue = useDebounce(inputValue, 500);

   useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className="relative w-full max-w-xs">
      <SearchIcon
        fontSize="small"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search task, name, type, or description"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="w-full pl-9 pr-3 py-2 text-sm font-light rounded-full border border-gray-200 
             bg-gray-50 text-gray-600 placeholder-gray-400 placeholder:font-light
             shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
             transition-all"
      />
    </div>
  );
}

export default SearchTeamInbox;
