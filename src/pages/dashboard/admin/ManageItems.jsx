import React from 'react'
import useMenuHook from '../../../hooks/useMenuHook'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft, FaTrash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const ManageItems = () => {
    const [menu,refetch] = useMenuHook()
    console.log('manageItems',menu)
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = (item) => {
        console.log("Delete Item",item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                window.location.reload()
            }
            
          });
    }
  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
         <h1 className='text-2xl font-semibold my-4'>Manage All <span className='text-green'>Menu Items</span></h1>
         {/* table here */}

         <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                   {
                    menu.map((item,index) => (
                        <tr key={index}>
                        <th>
                            {index+1}
                        </th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={item.image} alt="" />
                                </div>
                            </div>
                        </div>
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <th>
                        <Link to={`/dashboard/update-menu/${item._id}`}className="btn btn-ghost btn-xs bg-orange-500 text-white"><FaEdit/></Link>
                        </th>
                        <td>
                            <button onClick={()=> handleDeleteItem(item)} className="btn btn-ghost btn-xs text-red"><FaTrash/></button>
                        </td>
                    </tr>
                    ))
                   }
                    </tbody>
                    {/* foot */}
                </table>
            </div>
         </div>
    </div>

  )
}

export default ManageItems