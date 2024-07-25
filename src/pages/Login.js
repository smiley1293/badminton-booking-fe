import React, { useState, useEffect } from 'react';
import google_icon from "./img/googleLogo.png"
import login_img from "./img/LoginImage.png"
import line from "./img/line.png"
import { Link } from 'react-router-dom';
import { loginApi } from '../services/UserApi';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loadingAPI, setLoadingAPI] = useState(false);

  // check token
  useEffect(() => {
    let token = localStorage.getItem("token")
    if (token) {
      navigate("/")
    }
  }, [])

  const isValid = email && password;

  const handleLogin = async () => {
    // alert("Please enter")
    if (!email || !password) {
      toast.error("Email or password is required");
      return;
    }
    setLoadingAPI(true);
    let res = await loginApi(email, password);
    console.log("<<<<check res: ", res);
    if (res && res.accessToken) {
      localStorage.setItem("token", res.accessToken);
      toast.success("Login successfully")
      navigate("/");
    } else {
      if (res && res.status === 400) {
        console.log(res.data)
        toast.error(res.data)
      }
    }

    setLoadingAPI(false);
    console.log(res);
  }
  return (
    <section className="">
      <div className="flex items-center py-8 md:h-screen lg:py-0">
        <div className='w-[50%] h-[100vh] object-cover flex-shrink'>
          <img className='object-cover w-full h-full flex-shrink' src={login_img} alt='' />
        </div>
        <div className="w-[50%] flex justify-center">
          <div className="p-6">
            <h1 className="login_title text-center text-[56px] leading-tight tracking-tight text-[#3D4449] md:text-[56px] mb-[30px]">
              Sign in to us
            </h1>
            <div className=' w-[380px] google_signin flex gap-[15px] justify-center items-center border rounded-[50px] py-[10px] border-[#3D4449] border-opacity-35 cursor-pointer'>
              <img className='w-[28px] h-[28px]' src={google_icon} alt='google' />
              <p>Sign in with Google</p>
            </div>
            <div className='mt-[10px] text-[14px] flex justify-center items-center gap-[8px] opacity-40'>
              <img className='w-[80px] h-[0.5px]' src={line} alt='' />
              <p>or sign in with email</p>
              <img className='w-[80px] h-[0.5px]' src={line} alt='' />
            </div>
            {/* <div className='text-red-500'>Chỗ cho báo lỗi</div> */}
            <form className="space-y-4 md:space-y-6" action="#">
              <div className='mt-[70px]'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username or email</label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449] hover:bg-[#dedede] transition-all"
                />

                {/* <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>Email form error </div> */}

              </div>
              <div>
                <div className='mt-[30px] flex justify-between items-center'>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <div className="flex items-center justify-between">
                    <Link className="underline mb-2 text-[13px] font-medium text-[#3D4449] opacity-60 hover:underline dark:text-primary-500" to={"#"}>Forgot your password?</Link>
                  </div>
                </div>

                <input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="border mb-[10px] border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449] hover:bg-[#dedede] transition-all"
                />

                {/* <div className='flex-1 flex items-center mt-2 text-red-500 italic text-sm'>Password form errrr</div> */}

              </div>

              <button type='button' className={`w-full text-[#F4F1E4] bg-[#F8939C] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[50px] text-[19px] px-5 py-[15px] text-center dark:bg-primary-600 dark:focus:ring-primary-800 mb-[20px]  transition-all ease-in-out ${isValid ? 'dark:hover:bg-[#000000] hover:cursor-pointer' : 'cursor-not-allowed bg-gray-400'}`} disabled={!isValid}
                onClick={() => handleLogin()}>
                {loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>}
                &nbsp; Login </button>
              <p className=" text-sm text-center font-light text-[#3D4449] dark:text-gray-400">
                Don't have account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-not-allowed" to={"/Register"}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Login;