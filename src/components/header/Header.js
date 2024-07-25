import React from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import headerImage from "./img/headerImage.png"
import logo from "./img/logo.png"
import waveIcon from "./img/waveIcon.png"
import peopleLike from './img/peopleLike.png';
import Avatar from '../avatar/Avatar';
import { toast } from 'react-toastify';


// import { useSelector } from "react-redux";
// import { useStatbooking</div></div>seSelector and 'react';

const Header = () => {
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const [opne, setOpen] = useState(false);

  // check if token exist
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleReservationClick = (e) => {
    if (!token) {
      e.preventDefault();
      toast.error("Please login to watch this content")
      navigate("/login")
    }
  };
  return (
    <header className='absolute inset-0 flex flex-col top-[20px] justify-start items-center gap-[200px]'>
      <div className='flex items-center justify-center gap-[220px] text-[20px]'>
        <img src={logo} alt="" />
        <ul className='flex gap-[60px] text-white items-center justify-center'>
          <li className='hover:text-[#DF6951] font-extrabold transition-all'>
            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')}>Home</NavLink>
          </li>
          <li className='hover:text-[#DF6951] font-extrabold transition-all'>
            <NavLink to={'/about-us'} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')}>About</NavLink>
          </li>
          <li className='hover:text-[#DF6951] font-extrabold transition-all'>
            <NavLink to={"/reservation"} className={({ isActive }) => (isActive ? 'text-[#DF6951]' : '')} onClick={handleReservationClick}>Reservations</NavLink>
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
  );
};

export default Header;
