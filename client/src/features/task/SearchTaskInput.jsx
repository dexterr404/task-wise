import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../hooks/useDebounce";
import { useState, useEffect } from "react";

function SearchTaskInput({ className = "", setSearchQuery, searchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery || "");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  return (
    <div className={`relative ${className}`}>
      <SearchIcon
        fontSize="small"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary"
      />
      <input
        type="text"
        placeholder="Search tasks"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-border 
                   bg-bg text-text-primary placeholder-text-secondary
                   shadow-sm focus:outline-none focus:ring-1 focus:text-text-secondary
                   transition-all"
      />
    </div>
  );
}

export default SearchTaskInput;
