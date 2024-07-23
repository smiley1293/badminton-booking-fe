import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import headerImage from "./img/headerImage.png"
import logo from "./img/logo.png"
import Avatar from '../avatar/Avatar';
import pricingBanner from "./img/pricing_image.png"


// import { useSelector } from "react-redux";
// import { useStatbooking</div></div>seSelector and 'react';

const HeaderOutside = () => {
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const [opne, setOpen] = useState(false);

  // check if token exist
  const token = localStorage.getItem('token');
  return (
    <div>
      <div className='relative'>
        <img className='h-[476px] w-full object-cover' src={pricingBanner} alt="" />
        {/* Header */}
        <header className='absolute inset-0 flex flex-col top-[20px] justify-start items-center gap-[200px]'>
          <div className='flex items-center justify-center gap-[220px] text-[20px]'>
            <img src={logo} alt="" />
            <ul className='flex gap-[60px] text-white items-center justify-center'>
              <li className='hover:text-[#DF6951] font-extrabold transition-all'>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'text-red-500' : '')}>Home</NavLink>
              </li>
              <li className='hover:text-[#DF6951] transition-all font-extrabold'>
                <NavLink to={'/about-us'} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')}>About</NavLink>
              </li>
              <li className='hover:text-[#DF6951] font-extrabold transition-all'>
                <NavLink to={"/reservation"} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')}>Reservations</NavLink>
              </li>
              <li className='hover:text-[#DF6951] font-extrabold transition-all'>
                <NavLink to={'/pricing'} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')}>Pricing</NavLink>
              </li>
            </ul>
            {/* button */}
            {token ? (<div><Avatar /></div>) : (<div className='text-white flex items-center justify-center gap-[40px]'>
              <button className='px-[28px] py-[17px] bg-[#DF6951] rounded-[10px] hover:bg-transparent hover:border-white hover:border-solid hover:border-[1px] hover:transition hover:ease-in-out hover:outline-white '>
                <Link to={"/register"}>Sign up</Link>
              </button>
              <button className='hover:text-[#DF6951] transition-all'>
                <Link to={"/login"}>Sign in</Link>
              </button>
            </div>)}

          </div>

        </header>


      </div>

    </div>
  );
};

export default HeaderOutside;