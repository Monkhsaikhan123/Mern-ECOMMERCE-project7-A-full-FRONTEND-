import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query';


const Order = () => {
    const {user} = useAuth();
    const token = localStorage.getItem('access-token')

    const { refetch, data:orders= []} = useQuery({
        queryKey: ["orders", user?.email
    ],
        queryFn: async() => {
            const res = await fetch(`http://localhost:4000/pay?email=${user?.email}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                }
            })
            return res.json()
        }
    })
    console.log("orders",orders)

    const formatDate = (createdAt) => {
        const createdAtDate = new Date(createdAt)
        return createdAtDate.toLocaleDateString()
    }
  return (
    <div className='max-w-screen-2x1 container mx-auto xl:px-24 px-4'>
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
              <div className='py-28 flex flex-col justify-center items-center gap-8'>
            
                    {/* Text    */}
                    <div className='space-y-7 px-4'>
                            <h1 className='md:text-5x1 text-4xl font-bold md:leading-snug leading-snug'>
                                Track All Your Orders
                            </h1>            
                    </div>
              </div>
          </div>

          <div>
          {
              (orders.length > 0) ? <div className="overflow-x-auto">
          <table className="table">
                {/* head */}
              <thead className='bg-green text-white rounded-sm'>
                <tr>
                    <th>#</th>
                    <th>Order Date</th>
                    <th>Email</th>
                    <th>TransitionId</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {/* row 1 */}
                  {
                    orders.map((item,index)=> (
                        <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {formatDate(item.createdAt)}
                                </td>
                                <td>
                                   {item.email}
                                </td>
                                <td className='font-medium'>
                                  {item.transitionId}
                                </td>
                                
                                <th>
                                    {item.status}
                                </th>
                                <th>
                                    ${item.price}
                                </th>
                                <th className='text-orange-300'>
                                    Contact
                                </th>    
                                 </tr>
                                ))
                                }
                </tbody>
               </table> 
                                    </div>:<div className='text-center mt-20'>
                                    <p>Cart is empty. Please add Products</p>
                                    <Link to='/menu'><button className='btn bg-green text-white mt-3'>Back to Menu</button></Link>
                                    </div>
                                    }
          </div>

    </div>
  )
}

export default Order