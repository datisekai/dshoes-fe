import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/index.css'
import Back from '../../components/Back/Back'
import Pagination from '../../components/Pagination/Pagination'

const ShoesList = ({type,list}) => {
  return (
    <div className='bg-[#222222] min-h-[100vh] relative py-5'>
        <div className='max-w-[1200px] mx-auto my-0'>
            <h1 className='text-gray-100 text-2xl p-5 underlined-blue uppercase'>{type}</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 p-2 sm:p-4 md:p-5'>
                    {list.map((item,index) => (
                        <Link to={`/detail/${item.id}`}  key={index}><div className='relative'>
                        <img src={item.img} className='w-[266px] h-[266px] rounded-md'></img>
                        <p className='absolute text-[#007BFF] bottom-10 md:px-5 text-xl py-2 left-[25%]'>2.999.999</p>
                        <h2 className='text-gray-100 truncate py-2'>{item.name}</h2>
                    </div></Link>
                    ))}
            </div>
        </div>
        <Pagination/>
    </div>
  )
}

export default ShoesList