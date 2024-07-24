import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import check_icon from "./img/check_icon.png"
import HeaderOutside from '../components/header/HeaderOutsite';
import { subscriptionApi } from '../services/SubscriptionApi';
import { useState } from 'react';
import { paymentApi } from '../services/PaymentApi';
import { toast } from 'react-toastify'

const Pricing = () => {
  const accessToken = localStorage.getItem("token");
  const navigate = useNavigate()
  const [loadingAPI, setLoadingAPI] = useState(false);
  useEffect(() => {
  }, [])

  const handleSubscription = async () => {
    setLoadingAPI(true);
    let res = await subscriptionApi(2)
    if (res.status === 402) {
      let pay = await paymentApi(2, res.data, true)
      if(pay){
        console.log(pay)
        window.location.href = pay
      }
    }
    setLoadingAPI(false);
  }
  const notification = () => {
    return (
      <div>
        Your balance isn't enough. <a href=''>Click here to add more</a>
      </div>
    )
  }

  const displayPricing = (
    <div className='pricing_container mt-[66px] '>
      <h1 className='pricing_title text-center text-[72px] font-bold text-[#3D4449] tracking-[1px] leading-[50px]'>Become a club owner<span className='text-[100px]'>.</span> </h1>
      <div className=' flex justify-center  mt-[35px]'>
        <h3 className='text-center w-[614px] leading-[28px] text-[#7D7D7D] flex-shrink-0 text-[18px]'>Choose a better plan, starting from 50,000VND/month - Let’s make your account more powerful</h3>
      </div>

      {/* subscription card */}
      <div className='flex gap-[70px] justify-center mt-[78px] mb-[235px]'>
        <div className='title w-[376px] h-[578px] border border-[#3D4449] rounded-[40px]'>
          <h1 className='text-[40px] font-bold mt-[36px] ml-[25px]'>Free</h1>
          <p className='text-[#888] text-[16px] ml-[25px]'>For casual customers</p>
          <div className='h-[112px]'>
          </div>
          <div className='flex justify-center'>
            {accessToken == null ?
              (
                <button className='mt-[68px]'>
                  <Link to={"/Login"} className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</Link>
                </button>
              ) :
              (
                <div className='mt-[68px] py-[10px] px-[96px] bg-[#FFD586] bg-opacity-50 rounded-[12px]'>
                  <div className='text-[16px] font-medium text-[#3D4449] text-opacity-50'>On Free plan</div>
                </div>
              )
            }
          </div>
          {/* rights */}
          <div className='ml-[38px] mt-[39px]'>
            <div className='flex items-center gap-[7.85px] mb-[15px]'>
              <div><img className='' src={check_icon} alt="" /></div>
              <div className='text-[14px]'>Access and reserve badmintons courts</div>
            </div>
            <div className='flex items-center gap-[7.85px]'>
              <div>
                <img src={check_icon} alt="" />
              </div>
              <div className='text-[14px]'>Visit services on the platform</div>
            </div>
          </div>
        </div>
        <div className='title w-[376px] h-[578px] bg-[#F6ECC5] rounded-[40px]'>
          <h1 className='text-[40px] font-bold mt-[36px] ml-[25px]'>Monthly</h1>
          <p className='text-[#888] text-[16px] ml-[25px]'>For club owners</p>
          <div className='text-center text-[56px] text-[#3D4449] mt-[48px]'>
            50<span className='text-[42px]'>,000₫</span>
          </div>
          <div className='flex justify-center'>
            {accessToken == null ?
              <button className='  mt-[48px]'>
                <Link to={"/Login"} className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</Link>
              </button>
              :
              <button className='  mt-[48px]'>
                <div onClick={handleSubscription} className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</div>
              </button>
            }
          </div>
          <div className='ml-[38px] mt-[39px]'>
            <div className='flex items-center gap-[7.85px] mb-[15px]'>
              <div><img className='' src={check_icon} alt="" /></div>
              <div className='text-[14px]'>Be an official club owner of Badminzone</div>
            </div>
            <div className='flex items-center gap-[7.85px] mb-[15px]'>
              <div><img className='' src={check_icon} alt="" /></div>
              <div className='text-[14px]'>Create your own clubs</div>
            </div>
            <div className='flex items-center gap-[7.85px] mb-[15px]'>
              <div>
                <img src={check_icon} alt="" />
              </div>
              <div className='text-[14px]'>Manage reservation everyday</div>
            </div>
            <div className='flex items-center gap-[7.85px] mb-[15px]'>
              <div><img className='' src={check_icon} alt="" /></div>
              <div className='text-[14px]'>Manage your club and members</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <div>
      <HeaderOutside></HeaderOutside>
      {displayPricing}
    </div>
  );
};

export default Pricing;