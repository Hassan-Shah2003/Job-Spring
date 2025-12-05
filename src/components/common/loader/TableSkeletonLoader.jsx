import React from "react";

const TableSkeletonLoader = ({ rows = 6, cols = 6, compact = false }) => {
  const rowH = compact ? "h-8" : "h-12";
  const headerH = compact ? "h-6" : "h-8";

  // Build fixed grid style using inline gridTemplateColumns
  const template = `repeat(${cols}, minmax(0, 1fr))`;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full bg-white rounded-lg shadow border border-gray-200">
        <div style={{ display: "grid", gridTemplateColumns: template }} className="gap-0 px-4 py-3 border-b bg-gray-50">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className={`animate-pulse bg-gray-200 rounded ${headerH} mr-2`} />
          ))}
        </div>

        <div className="px-0">
          {Array.from({ length: rows }).map((_, r) => (
            <div
              key={r}
              style={{ display: "grid", gridTemplateColumns: template }}
              className="gap-0 px-4 items-center border-b last:border-b-0"
            >
              {Array.from({ length: cols }).map((__, c) => (
                <div key={c} className="py-3">
                  <div className={`animate-pulse bg-gray-200 rounded ${rowH} w-full`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;
