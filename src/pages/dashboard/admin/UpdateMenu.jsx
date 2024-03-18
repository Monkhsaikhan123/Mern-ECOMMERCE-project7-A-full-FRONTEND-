import React from 'react'
import { FaUtensils } from 'react-icons/fa6'
import { useForm } from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import Swal from 'sweetalert2'
import { useLoaderData } from 'react-router-dom'

const UpdateMenu = () => {
    const { register, handleSubmit,} = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const item = useLoaderData()
    console.log(item)

    const VITE_IMAGE_HOSTING_KEY='fa49287413751bdc6a6637ea2328a167'
    const image_hosting_key = VITE_IMAGE_HOSTING_KEY
    console.log(image_hosting_key)
    const image_hosting_api = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`
    console.log(image_hosting_api)
  
    const onSubmit = async (data) => {
        console.log('Image Upload', data);
        const imageFile = { image: data.image[0] };
        const hostingImage = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        /* console.log(hostingImage); */
        console.log("hosting image Data",hostingImage.data)
        if(hostingImage.data.success){
            console.log("image successfully uploaded")
            const menuItem = {
                name: data.name,
                category:data.category,
                price: parseFloat(data.price),
                recipe:data.recipe,
                image: hostingImage.data.data.url,
            }
            console.log("menuItem",menuItem)
            //post menu item

            const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem)
            
            console.log("postMenuItem",postMenuItem)
            if(postMenuItem){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Item Successfully Updated",
                    showConfirmButton: false,
                    timer: 1500
                  });
                window.location.reload()
            }
        }
      };

  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
    <h1 className='text-2xl font-semibold my-4'>Update this <span className='text-green'>Menu Item</span></h1>
    
    {/* form here */}

    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name*/}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Recipe Name</span>
                        
                    </label>
                    <input type="text" defaultValue={item.name} {...register("name", { required: true })} placeholder="Recipe Name" className="input input-bordered w-full" />
                </div>

                {/* Categories and price */}
                <div className='flex items-center gap-4'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select defaultValue={item.category} {...register("category", { required: true })} className="select select-bordered">
                            <option disabled value='default'>Select a Category</option>
                            <option value='salad'>Salad</option>
                            <option value='pizza'>Pizza</option>
                            <option value='drinks'>Drinks</option>
                            <option value='dessert'>Dessert</option>
                            <option value='soup'>Soup</option>
                            <option value='popular'>Popular</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input defaultValue={item.price} {...register("price", { required: true })} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                </div>

                {/* text area */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details</span>
                    </label>
                    <textarea defaultValue={item.recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Recipe Details...."></textarea>
                </div>

                {/* fileinput */}
                <div className="form-control w-full my-6">
                    <input type="file" {...register("image", { required: true })} className="file-input w-full max-w-xs" />
                </div>

                <button className='bg-green text-white px-6'>Update<FaUtensils/></button>
        </form>
    </div>
</div>
  )
}

export default UpdateMenu