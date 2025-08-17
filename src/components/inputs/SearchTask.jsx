import SearchIcon from "@mui/icons-material/Search";

function SearchTask({ className = "" }) {
    return<div className={`relative ${className}`}>
    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    <input
        type="text"
        placeholder="Search tasks"
        className="pl-10 pr-3 py-2 border bg-white border-gray-400 rounded-md w-full focus:outline-1 focus:border-gray-400"
    />
    </div>
    
}

export default SearchTask