import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

const PaginationClient = ({ pagination, handle }) => {
  const { handleNext, handlePre, handleClickPage } = handle;
  const totalPage = Math.ceil(pagination.total / pagination.limit);
  return (
    <div className='tw-flex tw-justify-between tw-max-w-[1200px] tw-bg-[#2A2A2A] tw-mx-auto tw-py-2 tw-px-5 tw-rounded-lg tw-items-center'>
      <div className='tw-text-center tw-text-gray-100 tw-text-sm sm:tw-text-md'>
        Showing {pagination && pagination.skip} to{" "}
        {pagination && pagination.to + pagination.skip - 1} of{" "}
        {pagination && pagination.total} results
      </div>

      {totalPage > 1 && (
        <div className='tw-bg-[#007BFF] tw-border tw-border-[#175EAC] tw-px-5 tw-py-1 tw-rounded-[10px] tw-hidden md:tw-block'>
          <Pagination
            count={totalPage}
            page={pagination.page}
            color='secondary'
            className='tw-text-white'
            hidePrevButton
            hideNextButton
            onChange={(e, page) => handleClickPage(page)}
          />
        </div>
      )}
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

export default PaginationClient;
