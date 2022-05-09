import React from "react";

const Pagination = ({ pagination, handle }) => {
  const { handleNext, handlePre } = handle;
  const totalPage = Math.ceil(pagination.total / pagination.limit);
  return (
    <div className='tw-flex tw-justify-between tw-max-w-[1200px] tw-bg-[#2A2A2A] tw-mx-auto tw-py-2 tw-px-5 tw-rounded-lg tw-items-center'>
      <div className='tw-text-center tw-text-gray-100 tw-text-sm sm:tw-text-md'>
        Showing {pagination && pagination.skip} to{" "}
        {pagination && pagination.to + pagination.skip - 1} of{" "}
        {pagination && pagination.total} results
      </div>
      <div className='tw-flex tw-justify-center'>
        <button
          disabled={pagination.page > 1 ? false : true}
          onClick={handlePre}
          className={`tw-border tw-border-[#007BFF] tw-text-gray-100 tw-px-2 sm:tw-px-3 md:tw-px-4 tw-py-0 md:tw-py-1 tw-text-sm tw-rounded-md tw-transition-transform ${
            pagination.page > 1 ? "hover:tw-bg-[#007BFF]" : "tw-opacity-50"
          }`}
        >
          Previous
        </button>
        <button
          disabled={pagination.page < totalPage ? false : true}
          onClick={handleNext}
          className={`tw-border tw-border-[#007BFF] tw-text-gray-100 tw-px-2 sm:tw-px-3 md:tw-px-4 tw-py-0 md:tw-py-1 tw-text-sm tw-rounded-md tw-ml-3  tw-transition-transform ${
            pagination.page < totalPage
              ? "hover:tw-bg-[#007BFF]"
              : "tw-opacity-50"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
