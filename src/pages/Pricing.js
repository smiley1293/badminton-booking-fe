import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import check_icon from "./img/check_icon.png"
import { checkSubscriptionApi, subscriptionApi } from '../services/SubscriptionApi';
import { useState } from 'react';
import { paymentApi } from '../services/PaymentApi';
import { toast } from 'react-toastify'
import Modal from '../components/other/modal.js'
import Header from '../components/header/Header';
import pricingBanner from "../components/header/img/pricing_image.png"

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const acceptModal = () => {
    console.log('yy')
    handleSubscription()
    setIsModalOpen(false);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const accessToken = localStorage.getItem("token");
  const [upgraded, setUpgraded] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  useEffect(() => {
    handleAlreadySubscribe()
  }, [])

  const handleAlreadySubscribe = async () => {
    let res = await checkSubscriptionApi()
    console.log(res.statusCode)
    if (res.statusCode === 404) {
      setUpgraded(false)
    }
    if (res.statusCode === 200) {
      setUpgraded(true)
    }
    console.log(upgraded)
  }

  const handleSubscription = async () => {
    setLoadingAPI(true);
    let res = await subscriptionApi()
    console.log(res)
    if (res.status === 402) {
      let pay = await paymentApi(res.data, true)
      if (pay) {
        console.log(pay)
        window.location.href = pay
      }
    } else {
      if (res) {
        toast.success("Your subscription is upgraded")
        setUpgraded(true)
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
      <Modal isOpen={isModalOpen} closeModal={closeModal} acceptModal={acceptModal}>
        <h2 className='font-[900] text-[20px]'>Confirmation</h2>
        <p>Are you sure to continue purchase. </p>
        <p className='text-[12px] text-[#f58d42]'>{'('} *This may lead to payment gateway if you don't have enough balance {')'}</p>
      </Modal>
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
              upgraded ?
                <button className='  mt-[48px]'>
                  <div className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] text-opacity-50'>Subscribed</div>
                </button>
                :
                <button className='  mt-[48px]'>
                  <div onClick={openModal} className='upgrade_btn py-[12px] px-[106px] text-[16px] text-[#3D4449] font-bold bg-[#FFD586] rounded-[12px] lg:hover:bg-[black] lg:hover:text-[#fefefe]'>Upgrade</div>
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
      </div >
    </div >
  )
  return (
    <div>
      <div className='relative'>
        <img className='h-[476px] w-full object-cover' src={pricingBanner} alt="" />
        <Header />
      </div>
      {displayPricing}
    </div>
  );
};

export default Pricing;