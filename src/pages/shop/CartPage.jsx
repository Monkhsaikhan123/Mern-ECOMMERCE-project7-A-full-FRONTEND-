import React, { useContext , useState, useEffect} from 'react'
import useCart from '../../hooks/useCart'
import {FaTrash} from 'react-icons/fa'
import Swal from 'sweetalert2'
import { AuthContext } from '../../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const CartPage = () => {
    const [cart, refetch] = useCart();
    const {user} = useContext(AuthContext)

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://localhost:4000/carts/${item._id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
              }).then(res => res.json()).then(data => {
                if(data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
                refetch()
              })
            }
          });
    }

    const [cartItems, setCartItems] = useState([])
    //calculate price
    const calculatePrice = (item) => {
      return item.price * item.quantity
    }


    //handleDecrease function
    const handleDecrease = (item)=>{

      if(item.quantity > 1){
          fetch(`http://localhost:4000/carts/${item._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quantity: item.quantity - 1})
          })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const updatedCart = cartItems.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, quantity: cartItem.quantity - 1}
            }
            return cartItem
          })
          setCartItems(updatedCart)
        })
        refetch()
      }else{
        alert("Item can't be zero")
      }
      
    }
     //handleIncrease function
    const handleIncrease = (item)=>{
      
      fetch(`http://localhost:4000/carts/${item._id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({quantity: item.quantity + 1})
      })
     .then(res => res.json())
     .then(data => {
       console.log(data)
       const updatedCart = cartItems.map((cartItem) => {
         if(cartItem.id === item.id){
           return {...cartItem, quantity: cartItem.quantity + 1}
         }
         return cartItem
       })
       setCartItems(updatedCart)
     })
     refetch()
    }

    //calculate total price

    const cartSubTotal = cart.reduce((total, item) =>{
        return total + calculatePrice(item)
    },0)

    const orderTotal = cartSubTotal
    console.log(orderTotal)
  return (
    <div className='section-container'>
        <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
              <div className='py-28 flex flex-col justify-center items-center gap-8'>
            
                    {/* Text    */}
                    <div className='space-y-7 px-4'>
                            <h1 className='md:text-5x1 text-4xl font-bold md:leading-snug leading-snug'>
                                Items of cart
                            </h1>            
                    </div>
              </div>
          </div>

        {/* tables of cart */}

        {
              (cart.length > 0) ? <div className="overflow-x-auto">
          <table className="table">
                {/* head */}
              <thead className='bg-green text-white rounded-sm'>
                <tr>
                    <th>#</th>
                    <th>Food</th>
                    <th>Item name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                  {/* row 1 */}
                  {
                    cart.map((item,index)=> (
                        <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='font-medium'>
                                  {item.name}
                                </td>
                                <td>
                                  <button className='btn btn-xs' onClick={()=> handleDecrease(item)}>-</button>
                                  <input type='number' value={item.quantity} onChange={()=> console.log(item.quantity)} className='w-10 mx-2 text-center overflow-hidden appearance-none'/>
                                  <button className='btn btn-xs' onClick={()=> handleIncrease(item)}>+</button></td>
                                <td>${calculatePrice(item).toFixed(2)}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs text-red" onClick={()=> handleDelete(item)}>
                                        <FaTrash/>
                                    </button>
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
        <div className='my-12 flex flex-col md:flex-row justify between items-stretch'>
          <div className='md:w-1/2 space-y-3'>
                <h3 className='font-medium'>Customer Details</h3>
                <p>Name: {user.displayName}</p>
                <p>Email: {user.email}</p>
                <p>User_id: {user.uid}</p>
          </div>
          <div className='md:w/12 space-y-3'>
          <h3 className='font-medium'>Shopping Details</h3>
                <p>Total Items : {cart.length}</p>
                <p>Total Price: ${orderTotal.toFixed(2)}</p>
                
                <Link to='/process-checkout' orderTotal={orderTotal}><button className='btn bg-green text-white'>Process Checkout</button></Link>
          
          </div>
        </div>              

    </div>
  )
}

export default CartPage