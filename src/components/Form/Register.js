import React from 'react'
import '../../assets/css/index.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

  return (
    <div className='min-h-[90vh] bg-[#222222] pt-10'>
        <div className='bg-gray-100 w-[90%] sm:w-[80%] md:w-[70%] rounded-md h-[500px] mx-auto flex justify-between items-center'>
            <img src='https://prices.vn/photos/8/blog/review-giay-nike-nam.jpg' alt="" className='md:w-[50%] lg:w-[60%] hidden md:block rounded-md h-full object-cover'/>
            <div className='w-[100%] md:w-[50%] lg:w-[40%] p-5'>
                <h1 className='text-[#333] underlined-blue text-xl'>WELCOME BACK</h1>
                <div className='mt-3'>
                    <label htmlFor="email" className='text-[#666]'>Email Address</label><br />
                    <input type="text" name="" id="email" placeholder='Ex: datly@gmail.com' className='px-4 py-1 w-full rounded-md'/>
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className='text-[#666]'>Password</label><br />
                    <input type="text" name="" id="password" placeholder='Ex: datly1223'className='px-4 py-1 w-full rounded-md'/>
                </div>

                <div className='mt-3'>
                    <label htmlFor="repeat" className='text-[#666]'>Repeat Password</label><br />
                    <input type="text" name="" id="repeat" placeholder='Ex: datly1223'className='px-4 py-1 w-full rounded-md'/>
                </div>

                <div className='mt-3 flex flex-col md:flex-row justify-between'>
                    <button className='w-full md:w-[49%] text-md bg-red-400 text-gray-100 rounded-md px-5 py-1 hover:bg-red-500 transition-transform'>Create Account</button>
                    <button className='w-full mt-2 md:mt-0  md:w-[49%] text-md bg-[#007BFF] rounded-md px-5 md:px-2 lg:px-5 py-1 text-gray-100 hover:bg-[blue] transition-transform' onClick={() => navigate('/login')}>Login Now</button>
                </div>

                

                <div className='mt-3'>
                    <p className='text-[#888] text-sm'>Login with social</p>
                    <div className='flex justify-start'>
                    <i className="text-3xl px-1 cursor-pointer text-[#007bff] fa-brands fa-facebook"></i>
                    <i className="text-3xl px-1 cursor-pointer text-red-400 fa-brands fa-google-plus-square"></i>
                    <i className="text-3xl px-1 cursor-pointer fa-brands fa-github-square"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register