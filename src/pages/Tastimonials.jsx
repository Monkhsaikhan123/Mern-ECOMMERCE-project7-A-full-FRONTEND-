import React from 'react'
import {FaStar} from 'react-icons/fa'

const Tastimonials = () => {
  return (
    <div className='section-container'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-12'>
            <div className='md:w-1/2'>
                <img src="/src/image/18.jpg" alt=""/>
            </div>
            <div className='md:w-1/2'>
                <div className='text-left md:w-4/5'>
                    <p className='subtitle'>Tastimonials</p>
                    <h3 className='title'>What our customers saying</h3>
                    <blockquote className='my-5 text-secondary leading-[30px]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam iure beatae eaque. Quas, repellendus quod. Exercitationem dicta similique dolorum facilis?
                    </blockquote>

                    {/* avatar */}
                    <div className='flex items-center gap-4 flex-[30px]'>
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-12">
                                <img src="/src/image/10.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                <img src="/src/image/11.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                <img src="/src/image/12.jpg" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                <img src="/src/image/13.jpg" />
                                </div>
                            </div>
                            </div>
                    </div>
                     <div className='space-y-1'>
                        <h5 className='text-lg font-semibold'>Customer feedback</h5>
                        <div className='flex items-center gap-2'>
                            <FaStar className='text-yellow-400'/>
                            <span className='font-medium'>4.9</span>
                            <span className='text-gray-100'>(18.6k Reviews)</span>
                        </div>
                     </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Tastimonials