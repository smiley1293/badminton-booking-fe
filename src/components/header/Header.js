import React from 'react';
import { Link } from 'react-router-dom';
import headerImage from "./img/headerImage.png"
import logo from "./img/logo.png"
import waveIcon from "./img/waveIcon.png"
import peopleLike from './img/peopleLike.png';


// import { useSelector } from "react-redux";
// import { useStatbooking</div></div>seSelector and 'react';

const Header = () => {
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const [opne, setOpen] = useState(false);

  return (
    <div>
      <div className='relative'>
        <img src={headerImage} alt="" />
        {/* Header */}
        <header className='absolute inset-0 flex flex-col top-[20px] justify-start items-center gap-[200px]'>
          <div className='flex items-center justify-center gap-[220px] text-[20px]'>
            <img src={logo} alt="" />
            <ul className='flex gap-[60px] text-white items-center justify-center'>
              <li className='hover:text-[#DF6951] transition-all'>
                <Link to={"/"}>Home</Link>
              </li>
              <li className='hover:text-[#DF6951] transition-all'>
                <Link to={'/about-us'}>About</Link>
              </li>
              <li className='hover:text-[#DF6951] transition-all'>
                <Link to={"/reservation"}>Reservations</Link>
              </li>
              <li className='hover:text-[#DF6951] transition-all'>
                <Link to={'/pricing'}>Pricing</Link>
              </li>
            </ul>
            {/* button */}
            <div className='text-white flex items-center justify-center gap-[40px]'>
              <button className='px-[28px] py-[17px] bg-[#DF6951] rounded-[10px] hover:bg-transparent hover:border-white hover:border-solid hover:border-[1px] hover:transition hover:ease-in-out hover:outline-white '>
                <Link to={"/register"}>Sign up</Link>
              </button>
              <button className='hover:text-[#DF6951] transition-all'>
                <Link to={"/login"}>Sign in</Link>
              </button>
            </div>
          </div>

        </header>
        {/* header content */}
        <div className='absolute top-[200px] left-[200px]'>
          <img src={waveIcon} alt="" />
          <h1 className='font-extrabold font-[Poppins] text-[58px] w-[631px] text-left text-white'>No matter where you’re playing, we’ll take you there</h1>
          <div className='bg-[#939697] relative rounded-[6px] w-[600px] flex items-center mt-[30px] justify-center py-[37px] gap-[40px] '>
            <span className='text-[20px] text-white'>Wanna play right now? Click here</span>
            <Link to={"/reservation"} className='px-[14px] py-[15px] bg-[#ee5f43] hover:scale-110 transition-all opacity-100 text-white rounded-[5px]'>Take reservation</Link>
          </div>
          <div className='mt-[20px] flex items-center justify-start gap-[20px]'>
            <img src={peopleLike} alt="" />
            <span className='text-[13px] text-white'>2,500 people booked Badminzone in last 1 months</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Header;