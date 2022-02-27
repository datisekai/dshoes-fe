import React from 'react'

const Pagination = () => {
  return (
    <div className='flex justify-between max-w-[1200px] bg-[#2A2A2A] mx-auto py-2 px-5 rounded-lg items-center'>
        <div className='text-center text-gray-100 text-sm sm:text-md'>Showing 1 to 10 of 20 results</div>
        <div className='flex justify-center'>
            <button className='border border-[#007BFF] text-gray-100 px-2 sm:px-3 md:px-4 py-0 md:py-1 text-sm rounded-md hover:bg-[#007BFF] transition-transform'>Previous</button>
            <button className='border border-[#007BFF] text-gray-100 px-2 sm:px-3 md:px-4 py-0 md:py-1 text-sm rounded-md ml-3 hover:bg-[#007BFF] transition-transform'>Next</button>
        </div>
    </div>
  )
}

export default Pagination