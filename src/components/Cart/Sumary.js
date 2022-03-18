import React from 'react'
import '../../assets/css/index.css'

const Sumary = () => {
  return (
    <div className='w-full md:w-[50%] lg:w-[40%] mt-4 md:px-5 md:mt-0'>
        <h1 className='underlined-blue text-gray-100 text-2xl'>SUMMARY</h1>
        <div className='flex justify-between items-center mt-2'>
            <h3 className='flex items-center text-gray-300'>Count products <i className="ml-1 fa-solid fa-circle-question"></i></h3>
            <h3 className='text-gray-300'>5 products</h3>
        </div>
        <div className='flex justify-between items-center mt-2 border-b border-[#ccc] pb-2'>
            <h3 className='flex items-center text-gray-300'>Total <i className="ml-1 fa-solid fa-coins"></i></h3>
            <h3 className='text-gray-300'>6.990.000₫</h3>
        </div>
        <button className='uppercase mt-3 w-full bg-gradient-to-r from-blue-400 to-red-400 rounded-md px-5 py-1 text-gray-200 hover:opacity-90 hover:text-gray-100 transition-all'>Check out</button>
    </div>
  )
}

export default Sumary