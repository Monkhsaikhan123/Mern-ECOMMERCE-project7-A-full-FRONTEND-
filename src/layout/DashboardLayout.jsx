import React from 'react'
import {Outlet, Link} from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle , FaRegUser, FaLocationArrow, FaQuestionCircle} from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import logo from '../image/9.jpg'
import Main from './Main';
import Signup from '../components/Signup';


const sharedLink = (
<>
    <li>
        <Link to='/' className='mt-3'>
            <MdDashboard />Home
        </Link>
    </li>
    <li>
        <Link to='menu'>
            <FaShoppingCart />
            Menu
        </Link>
    </li>
    <li>
        <Link to=''>
            <FaLocationArrow/>
            Orders Tracking
        </Link>
    </li>
    <li>
        <Link>
            <FaQuestionCircle/>
            Customer Support
        </Link>
    </li>
</>
)
const DashboardLayout = () => {
    const isAdmin = true;

  return (
    <div>
      {
        isAdmin ? (
            <div className="drawer sm:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                {/* Page content here */}
                <div className='flex items-center justify-between mx-4'>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdDashboard/></label>
                    <button className='btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden'><FaRegUser/>Log out</button>
                </div>
               <div className='mt-5 md:mt-2 mx-4'> 
                    <Outlet/>
               </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                    <li>
                        <Link to='/dashboard' className='flex justify-start mb-3'>
                            <img src={logo} alt='' className='w-20'/>
                            <span><div className="badge badge-primary">Admin</div></span>
                        </Link>
                    </li>
                    <li><Link to='/dashboard' className='mt-3'><MdDashboard />Dashboard</Link></li>
                    <li><Link to='/dashboard'><FaShoppingBag />Manage Booking</Link></li>
                    <li><Link to='/dashboard/add-menu'><FaPlusCircle />Add Menu</Link></li>
                    <li><Link to='/dashboard/manage-items'><FaEdit />Manage Items</Link></li>
                    <li><Link to='/dashboard/users' className='mb-3'> <FaUsers />All Users</Link></li>
                    <hr/>
                    {
                        sharedLink
                    }
                </ul>
            
            </div>
            </div>
        ) : (<p className='h-screen flex items-center justify-center flex-col'>Only Admin can join
        <a className="link" href='/'>Back to Main</a></p>)
      }
        
    </div>
  )
}

export default DashboardLayout