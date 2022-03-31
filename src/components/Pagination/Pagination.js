import React from "react";

const Pagination = ({ pagination, handle }) => {
  const { handleNext, handlePre } = handle;
  const totalPage = Math.ceil(pagination.total / pagination.limit);
  return (
    <div className="flex justify-between max-w-[1200px] bg-[#2A2A2A] mx-auto py-2 px-5 rounded-lg items-center">
      <div className="text-center text-gray-100 text-sm sm:text-md">
        Showing {pagination && pagination.skip} to {pagination && pagination.to + pagination.skip - 1}{" "}
        of {pagination && pagination.total} results
      </div>
      <div className="flex justify-center">
        <button
          disabled={pagination.page > 1 ? false : true}
          onClick={handlePre}
          className={`border border-[#007BFF] text-gray-100 px-2 sm:px-3 md:px-4 py-0 md:py-1 text-sm rounded-md transition-transform ${
            pagination.page > 1 ? "hover:bg-[#007BFF]" : "opacity-50"
          }`}
        >
          Previous
        </button>
        <button
          disabled={pagination.page < totalPage ? false : true}
          onClick={handleNext}
          className={`border border-[#007BFF] text-gray-100 px-2 sm:px-3 md:px-4 py-0 md:py-1 text-sm rounded-md ml-3  transition-transform ${
            pagination.page < totalPage ? "hover:bg-[#007BFF]" : "opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
