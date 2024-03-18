import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
            <div className='md:w-1/2'>
                <img src="/src/image/8.jpg"/>
                <div className='flex flex-col md:flex-row items-center justify-around -mt-14 gap-4'>
                    <div className='flex bg-white py-2 px-3 rounded-2x1 items-center gap-3 shadow-md w-64'>
                        <img src='/src/image/20.jpg'/> 
                        <div className='space-y-1'>
                            <h5 className='font-medium mb-1'>Spicy noodles</h5>
                            <div className='rating rating-sm'>
                                <input type="radio" name="rating-10" readOnly className="rating-hidden" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" checked />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                            </div>
                            <p className='text-red'>$18.99</p>
                        </div>
                    </div>
                    <div className='md:flex hidden bg-white py-2 px-3 rounded-2x1 items-center gap-3 shadow-md w-64'>
                        <img src='/src/image/12.jpg'/>
                        <div className='space-y-1'>
                            <h5 className='font-medium mb-1'>Spicy noodles</h5>
                            <div className='rating rating-sm'>
                                <input type="radio" name="rating-10" readOnly className="rating-hidden" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" checked />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                                <input type="radio" name="rating-10" readOnly className="bg-green-500 mask mask-star-2" />
                            </div>
                            <p className='text-red'>$18.99</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Text    */}
            <div className='md:w-1/2 space-y-7 px-4'>
                    <h1 className='md:text-5x1 text-4xl font-bold md:leading-snug leading-snug'>
                        Lorem ipsum dolor sit amet consectetur
                    </h1>
                    <p className='text-xl text-[#4A4A4A]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, sit!</p>
                    <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>Order Now</button>
            </div>
        </div>
    </div>
  )
}

export default Banner