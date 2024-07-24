import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import register_img from "./img/registerBanner.png"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { registerApi } from '../services/UserApi';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loadingAPI, setLoadingAPI] = useState(false);

  // trả lỗi
  const [error, setError] = useState("");

  // validate
  const validateSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(/(?=.*[A-Z])\w+/, "Password must contain at least one uppercase letter")
      .matches(/(?=.*[a-z])\w+/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number"),
    fullname: Yup.string().required("This field is required"),
    phone: Yup.string()
      .required('This field is required')
      .matches(/^[0-9]{10,11}$/, 'Invalid phone number'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
      phone: "",
    },
    validationSchema: validateSchema,
    onSubmit: values => {
      setLoadingAPI(true);
      Register(values.email, values.password, values.fullname, values.phone)
      setLoadingAPI(false);
    },
  });

  async function Register(
    email, password, fullname, phoneNumber
  ) {
    let res = await registerApi(
      email, password, fullname, phoneNumber
    );
    if (res && res.accessToken) {
      localStorage.setItem("token", res.accessToken);
      navigate("/");
    } else {
      if (res) {
        if(res.status === 400){
          console.log(res.data)
          toast.error(res.data)
        }
      }
      console.log(res);
    }
  }
  return (
    <section className="">
      <div className="flex items-center py-8 md:h-screen lg:py-0">
        <div className="w-[50%] flex justify-center">
          <div className="p-6">
            <h1 className="register_title text-center text-[56px] leading-tight tracking-tight text-[#3D4449] md:text-[56px] mb-[30px]">
              Sign up to Badminzone
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div className="flex items-center">
                <div className="w-[48%] justify-center">
                  <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                  <input
                    type='text'
                    name='fullname'
                    id='fullname'
                    className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                    value={formik.values.fullname} onChange={formik.handleChange}
                  />
                  {formik.errors.fullname ? <div className='text-red-500'>{formik.errors.fullname}</div> : <></>}
                </div>
                <div className="w-[4%] justify-center">
                </div>
                <div className="w-[48%] justify-center">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone ? <div className='text-red-500'>{formik.errors.phone}</div> : <></>}
                </div>
              </div>
              <div className='mt-[70px]'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className="border border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                  value={formik.values.email} onChange={formik.handleChange}
                />
                {formik.errors.email ? <div className='text-red-500'>{formik.errors.email}</div> : <></>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className="border mb-[10px] border-[#3D4449] border-opacity-25 h-[50px] text-gray-900 text-[16px]  rounded-[10px] focus:ring-primary-600 focus:border-[#3D4449] block w-full p-2.5 focus:outline-none dark:focus:ring-blue-500 dark:focus:border-[#3D4449]"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password ? <div className='text-red-500'>{formik.errors.password}</div> : <></>}
              </div>
              <button type='submit' className="login_btn w-full text-[#F4F1E4] bg-[#000000] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-[50px] text-[19px] px-5 py-[15px] text-center dark:bg-primary-600 dark:hover:bg-[#DF6951] dark:focus:ring-primary-800 mb-[20px] transition-all">
                {loadingAPI && <i className='fa-solid fa-sync fa-spin'></i>}
                &nbsp;Create Account</button>
              <p className=" text-sm text-center font-light text-[#3D4449] dark:text-gray-400">
                Already have an account? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/Login"}>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
        <div className='w-[50%] h-[100vh]'>
          <img className='object-cover w-full h-full' src={register_img} alt='' />
        </div>
      </div>
    </section>
  );
};

export default Register;