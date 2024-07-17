import React from 'react';
import { Link } from 'react-router-dom';


// import { useSelector } from "react-redux";
// import { useStatbooking</div></div>seSelector and 'react';

const Header = () => {
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // const [opne, setOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div>
        <ul className='flex gap-[50px] items-center justify-center'>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={'/about-us'}>About</Link>
          </li>
          <li>
            <Link to={"/booking"}>Bookings</Link>
          </li>
          <li>
            <Link to={'/faqs'}>FAQs</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;