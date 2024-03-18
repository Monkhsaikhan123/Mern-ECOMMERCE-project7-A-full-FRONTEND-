import React, { useContext } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios'
import useAxiosPublic from '../hooks/useAxiosPublic';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const {createUser, login, updateUserProfile} = useContext(AuthContext)

      const axiosPublic = useAxiosPublic();

         //redirect
        const location = useLocation()
        const navigate = useNavigate()
      
        const from = location.state?.from?.pathname || "/";
      

      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password).then((result) => {
            // Signed up 
            const user = result.user;
            updateUserProfile(data.email).then(()=>{
              const userInfo = {
                name: data.name,
                email: data.email,
              }
              axiosPublic.post('/users',userInfo)
              .then((response)=>{
                console.log(response);
                alert("SignIn Successful")
                document.getElementById('my_modal_5').close()
                navigate(from, {replace:true})
              })
            })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      }

  return (
    <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
        <div className="modal-action mt-0 flex flex-col justify-center">
                        <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                            <h3>Create Account</h3>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" {...register("name")}/>
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email")}/>
                            </div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" {...register("password")}/>
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            </div>
                            {/*Error text */}


                            {/*login btn */}
                            <div className="form-control mt-6">
                            <input className="btn bg-green text-white" type='submit' value='SignUp'/>
                            </div>

                            <button className='text-center my-2' onClick={()=>document.getElementById('my_modal_5').showModal()}>If u have an Account<Link to='/signup' className='underline text-red ml-1'>Login</Link></button>
                            <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        
                        </form>


                      
        </div>

        <Modal/>
    </div>
    
  )
}

export default Signup