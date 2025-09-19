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
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search tasks"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="pl-10 pr-3 text-sm py-2 border bg-white border-gray-400 rounded-md w-full focus:outline-1 focus:border-gray-400 z-0"
      />
    </div>
  );
}

export default SearchTaskInput;
