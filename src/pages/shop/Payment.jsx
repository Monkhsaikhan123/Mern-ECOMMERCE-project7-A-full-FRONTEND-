import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from './CheckOutForm'
import {loadStripe} from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';



const stripePromise = loadStripe('pk_test_51OvXuPRuPT5jtrc87UnoFMLcdRLGxXdPRkuCMJYCh8Q2RCm4WIaC2yCNK1g0dJQRX0GsJzdlDHoJPXijxeFOz59B00EPoLRqMR');


const Payment = () => {
  console.log(stripePromise)


  const [cart] = useCart();
  console.log(cart)

  //calculate price
  const cartTotal = cart.reduce((sum, item)=>sum + item.price ,0)
  console.log(cartTotal)

  const totalPrice = parseFloat(cartTotal.toFixed(2));
  console.log(totalPrice)

  return (
    <div className='max-w-screen-2x1 container flexmx-auto xl:px-24 px-4 py-28'>
         <Elements stripe={stripePromise}>
              <CheckOutForm cart={cart} price={totalPrice}/>
          </Elements>
    </div>
  )
}

export default Payment