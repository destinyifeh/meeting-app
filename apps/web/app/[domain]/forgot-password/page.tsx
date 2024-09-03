"use client"
import { SuperAdminResetForgotPasswordForm } from "@components/admin-account-management/reset-password";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dashboardImage from "../../../public/images/dashboard-photo.png";
import logoimage from "../../../public/images/logo.png";
export default function AdminAccount() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email,setEmail] = useState<string>("")
console.log(email,"my ema")

  const handleChange =(email:string)=>{
    console.log(email,"emailllll")
    setEmail(email)
  }


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();

}


const onEmailSent=()=>{
  return(
    <div className="flex flex-col">
    <div className="mb-3">
              <h3 className="text-2xl text-center font-bold text-black leading-9 pb-2">Check Your Email</h3>
             <div className="w-[320px]">
             <p className="text-center text-sm text-black">We've sent a password reset link to B***s**@gmail.com. Please check your inbox and follow the instructions to reset your password</p>
             </div>
              </div>
        <div className="self-center">

        <button  className="w-[320px] h-[45px] rounded-[5px] text-base 
        bg-[#ED1C24] hover:bg-red-600 active:bg-red-700 text-white">Continue</button>
        </div>
    
     <span className="text-sm leading-4 font-normal mt-3 text-center"> <Link href="" className="text-[#ED1C24]">* click here </Link><span className='text-black' >to resend the email.</span></span>
              </div>

  )
}

const onSuccessfulPasswordReset=()=>{
  return(
    <div className="flex flex-col">
         <div className="mb-3">
              <h3 className="text-2xl text-center font-bold text-black leading-9 pb-2">Password Reset Successful</h3>
             <div className="w-[333px]">
             <p className="text-center text-sm text-black">Congratulations! Your password has been changed. Click continue to login.</p>
             </div>
              </div>
         <div className="self-center">
             <button  className="w-[320px] h-[45px] rounded-[5px] text-base 
        bg-[#ED1C24] hover:bg-red-600 active:bg-red-700 text-white">Continue</button>
        </div>
     </div>

  )
}


const isEmail=true;
      return (
        <div className="bg-black flex items-center justify-center h-screen">

        {/* Main content section */}
        <main className="flex flex-col md:flex-row w-[92%] lg:w-[92%] h-[95%] md:h-[92%] lg:h-[82%] bg-white">
          {/* Header Section */}
        
  
          {/* Image Section */}

          <section className="hidden md:flex">
            <Image
              src={dashboardImage}
              alt="Dashboard view"
              className="h-full
              "
              
            />
          </section>
  
          {/* Logo Section */}
        
       
          <section className="flex flex-col flex-1">
          <div className="flex justify-center">
              <Image
                src={logoimage}
                alt="Company Logo"
                className="w-24 h-24 object-contain"
              />
                </div>

                {/* <div>
                   <Image
              src={dashboardImage}
              alt="Dashboard view"
              className="h-80 
              "
              
            />
                </div> */}
              
                <div className="flex flex-col items-center justify-center mb-28 flex-1 md:px-5">
           
           {isEmail&&
            <SuperAdminResetForgotPasswordForm  />
           }

           {/* {onSuccessfulPasswordReset()} */}
           
             </div>
            
             
          </section>
        </main>
      </div>
      
      )
  }
  