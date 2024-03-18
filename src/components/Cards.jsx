import React ,{useContext, useState}from 'react'
import {Link} from 'react-router-dom'
import {FaHeart} from 'react-icons/fa'
import { AuthContext } from '../contexts/AuthProvider'
import Swal from 'sweetalert2'

const Cards = ({item}) => {
    const {name, image, price, recipe, _id} = item
    const [isHeartFilled, setIsHeartFilled] = useState(false)

    const handleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled)
    }
    const {user} = useContext(AuthContext)
    const handleAddToCart = (item) => {
       /*  console.log(item) */
       if(user && user?.email){
            const cartItem = {menuItemId: _id, name, quantity: 1, image, price, email:user.email}
            console.log(cartItem)
            fetch('http://localhost:4000/carts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then((data)=> {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Already added to cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
       }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Need to login",
          });
       }
    }
  return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${isHeartFilled ? "text-rose-500" : "text-white"}`} onClick={handleHeartClick}>
                <FaHeart className='h-5 w-5 cursor-pointer'/>
            </div>
            <Link to={`/menu/${item._id}`}>
                <img src={item.image} alt="" />
            </Link>
                
            <div className="card-body">
                <Link to={`/menu/${item._id}`}><h2 className='card-title'>{item.name}</h2></Link>
                <p>{item.desc}</p>
                <div className="card-actions justify-between items-center mt-2">
                    <h5><span>$</span>{item.price}</h5>
                    <button className="btn bg-green text-white" onClick={()=> handleAddToCart(item)}>Add to Cart</button>
                </div>
            </div>
            
        </div>
  )
}

export default Cards