function SortMenu() {
  return (
    <div className="absolute top-full mt-1 left-0 z-50 bg-gray-200 p-3 text-xs rounded-md shadow-md flex flex-col gap-1 font-semibold">
      <label className="flex items-center gap-1">
        <input type="radio" name="sort" /> Alphabetical
      </label>
      <label className="flex items-center gap-1">
        <input type="radio" name="sort" /> Status
      </label>
      <label className="flex items-center gap-1">
        <input type="radio" name="sort" /> Deadline
      </label>
    </div>
  );
}

export default SortMenu;
