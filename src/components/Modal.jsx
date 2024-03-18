import React, { useContext , useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Modal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const {signUpWithGmail, login} = useContext(AuthContext)
      const [errorMessage, setErrorMessage] = useState('')
      const axiosPublic = useAxiosPublic()

      //redirect
      const location = useLocation()
      const navigate = useNavigate()

      const from = location.state?.from?.pathname || "/";


      const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        console.log(email,password)
        login(email, password)
        .then((result)=>{
            //signed in
            const user = result.user;
            const userInfor = {
                email:data.email,
            };
            axiosPublic.post('/users', userInfor)
            .then((response)=> {
                //console.log(response);
                alert("Success")
                
                navigate(from, {replace:true})
            })
        })
        .catch((error)=> {
            const errorMessage = error.message;
            setErrorMessage("Provide a correct email and password")
        })
        document.getElementById('my_modal_5').close().reset()
      }

      //google signin
      const handleLogin = () => {
        signUpWithGmail().then((result)=> {
            const user = result.user;
            const userInfor = {
                name:result?.user.displayName,
                email:result?.user?.email,
            };
            axios.post('http://localhost:4000/users', userInfor)
            .then((response)=>{
                //console.log(response);
                alert("Success")
                navigate(from, {replace:true})
            })
        }).catch((error) => {
            console.log(error)
        })
      }
  return (
   
        <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
            <div className="modal-box">
                <div className="modal-action mt-0 flex flex-col justify-center">
                        <form className="card-body" method='dialog' onSubmit={handleSubmit(onSubmit)}>
                            <h3>Please Login</h3>
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
                            {
                                errorMessage? <p className='text-red text-lg'>{errorMessage}</p> :  ""
                            }

                            {/*login btn */}
                            <div className="form-control mt-6">
                            <input className="btn bg-green text-white" type='submit' value='Login'/>
                            </div>

                            <p className='text-center my-2'>Don't have an account? <Link to='/signup' className='underline text-red ml-1'>Sign up</Link></p>
                            <button htmlFor='my_modal_5' onClick={()=>document.getElementById('my_modal_5').close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        
                        </form>


                        <div className='text-center space-x-3 mb-5 '>
                            
                            <button className="btn btn-circle hover:bg-green hover:text-white" onClick={handleLogin}>
                            <FaGoogle />
                            </button>

                            <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebook />
                            </button>

                            <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub />
                            </button>
                            
                        </div>
                </div>
            </div>
        </dialog>   
    
  )
}

export default Modal