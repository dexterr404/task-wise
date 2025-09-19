import { TrendingUp, TrendingDown } from "@mui/icons-material";

function GrowthIndicator({ value }) {

  // Handle special cases first
  if (value === "New" ) {
    return (
      <div className="flex items-baseline gap-1">
        <div>
          <span className="px-2 py-0.5 rounded font-semibold text-xs text-blue-700">
            New
          </span>
          <TrendingUp className="text-blue-700" fontSize="small" />
        </div>
        <span className="text-xs">first tasks created this month</span>
      </div>
    );
  }
  
  // Default numeric case
  const isPositive = value >= 0;

  return (
    <div className="flex items-baseline gap-1">
      <div>
        <span
          className={`px-2 py-0.5 rounded font-semibold text-sm ${
            isPositive ? "text-green-700" : "text-red-700"
          }`}
        >
          {isPositive ? `+${value}%` : `${value}%`}
        </span>
        {isPositive ? (
          <TrendingUp className="text-green-700" fontSize="small" />
        ) : (
          <TrendingDown className="text-red-700" fontSize="small" />
        )}
      </div>
      <span className="text-xs">
        {isPositive
          ? "increased from last month"
          : "decreased from last month"}
      </span>
    </div>
  );
}

export default GrowthIndicator;
