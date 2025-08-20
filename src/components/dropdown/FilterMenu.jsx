import React, { useState } from "react";

export default function FilterMenu() {
  const [filters, setFilters] = useState({
    all: true,
    inProgress: true,
    inReview: true,
    done: true,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;

    if (name === "all") {
      // Toggle all at once
      setFilters({
        all: checked,
        inProgress: checked,
        inReview: checked,
        done: checked,
      });
    } else {
      // Update individual filter
      const updated = { ...filters, [name]: checked };

      // If every filter is ON, turn "All" back on
      const allSelected =
        updated.inProgress && updated.inReview && updated.done;

      updated.all = allSelected;

      setFilters(updated);
    }
  };

  return (
    <div className="absolute top-full z-100 bg-gray-100 p-3 mt-1 text-xs shadow-md rounded-md flex flex-col gap-2">
      <label>
        <input
          type="checkbox"
          name="all"
          className="mr-1"
          checked={filters.all}
          onChange={handleChange}
        />
        All
      </label>
      <label>
        <input
          type="checkbox"
          name="inProgress"
          className="mr-1"
          checked={filters.inProgress}
          onChange={handleChange}
        />
        In Progress
      </label>
      <label>
        <input
          type="checkbox"
          name="inReview"
          className="mr-1"
          checked={filters.inReview}
          onChange={handleChange}
        />
        In Review
      </label>
      <label>
        <input
          type="checkbox"
          name="done"
          className="mr-1"
          checked={filters.done}
          onChange={handleChange}
        />
        Done
      </label>
    </div>
  );
}
