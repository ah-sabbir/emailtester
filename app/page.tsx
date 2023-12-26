'use client'
import Image from 'next/image'
import { useFormState, useFormStatus } from 'react-dom'
import { emailBulkValidate, emailValidate } from './actions/formAction'
import { useEffect } from 'react'
import Loader from '@/components/loader'
import { JsonToTable } from "react-json-to-table";

const initialState = {
  message: "",
}

export default async function Home() {
  const {pending} = useFormStatus();
  const [singleState, singleFormAction] = useFormState(emailValidate, initialState)
  // const [multipleState, multipleFormAction] = useFormState(emailBulkValidate,initialState)
  
  useEffect(()=>{
    console.log(typeof multipleState?.data)
    const generator = streamItems()
                    for await (const item of generator) {
                        console.log(item)
                    }
  },[multipleState])

  return (
    <main className="min-h-screen bg-gray-100 mx-auto ">
        <div className='single-text max-w-[90%] mx-auto shadow-sm'>
          <h2 className='font-semibold relative z-[1] mb-8 pb-4 border-b-[rgba(0,0,0,0.05)] border-b border-solid'>Validate an Email Address</h2>
          <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row lg:flex-row lg:gap-0">
              <div className="left-sidebar w-full px-[15px] md:w-6/12 md:max-w-[50%] lg:w-6/12 lg:max-w-[50%]">
                <div className='bg-white shadow-[0_2px_4px_rgba(126,142,177,0.12)] h-full px-8 py-6 rounded-md'>
                    <div className="single-title relative">
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <h2>Single Check</h2>
                        <p>Perform single email verification with deep analysis result.</p>
                    </div>
                    <h3 className='font-semibold text-sm text-[#4a910c] pt-10 pb-0 px-0'>Enter Email to Check</h3>

                    <form action={singleFormAction} >
                        <input type="email" name="email" placeholder='Email to Check' className='block w-full text-[0.8rem] leading-normal text-[#495057] bg-white border rounded box-border mt-[25px] px-3 py-1.5 border-solid border-[#dde2ec] focus:outline-0'/>
                        <p className='text-[red] text-[11px] block mt-[15px]'>Please Provide an Email First</p>
                        <button className='text-[0.8rem] rounded min-w-[80px_px] mt-[15px] px-3 py-1.5 bg-green-500' type="submit">Verify</button>
                    </form>
                </div>
              </div>
            <div className="right-sidebar  w-full px-[15px] md:w-6/12 md:max-w-[50%] lg:w-6/12 lg:max-w-[50%]">
                <div className='bg-white shadow-[0_2px_4px_rgba(126,142,177,0.12)] h-full px-8 py-6 rounded-md'>
                  <Loader className={`${pending?"block":"hidden"}`}/>
                  <h2 className='font-semibold text-lg pb-[18px] border-b-[rgba(0,0,0,0.1)] border-b border-solid'>Analysis Results</h2>
                  {
                    singleState?.data?.deliverable? 
                      <h2>Your email address is Safe to send because it's Deliverable</h2>:
                      <pre className=' bg-[ghostwhite] border rounded mx-auto m-5 px-5 py-2.5 border-solid border-[silver]'>
                        <code>{JSON.stringify(singleState?.data,null,2)}</code>
                      </pre> 
                  }
                  
                </div>
            </div>
          </div>
        </div>

      <div className='multiple-text mt-16 max-w-[90%] mx-auto shadow-sm'>
        <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row lg:flex-row lg:gap-0">
            <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row lg:flex-row lg:gap-0">
                <div className="left-sidebar w-full px-[15px] md:w-4/12 md:max-w-[50%] lg:w-4/12 lg:max-w-[50%]">
                  <div className='bg-white shadow-[0_2px_4px_rgba(126,142,177,0.12)] h-full px-8 py-6 rounded-md'>
                      <div className="single-title relative">
                          <i className="fa fa-envelope-o" aria-hidden="true"></i>
                          <h1>Multiple verification</h1>
                          <p>Enter Email(s) to Verify</p>
                          <p>Enter up to 10 emails, separated by commas or on their own line.</p>
                      </div>
                      {/* <h3 className='font-semibold text-sm text-[#4a910c] pt-10 pb-0 px-0'>Enter Email to Check</h3> */}

                      <form action={multipleFormAction} >
                          <textarea name="emails" placeholder='Email to Check' className='text-[13px] text-[#92929D] w-full h-[200px] border mt-[23px] mb-0 mx-0 p-[25px] rounded-[5px] border-solid border-[#E2E2EA] focus:outline-0'/>
                          <p className='text-[red] text-[11px] block mt-[15px]'>Please Provide an Email First</p>
                          <button className='text-[0.8rem] rounded min-w-[80px_px] mt-[15px] px-3 py-1.5 bg-green-500' type="submit">Verify</button>
                      </form>
                  </div>
                </div>
              <div className="right-sidebar  w-full px-[15px] md:w-8/12 md:max-w-[50%] lg:w-8/12 lg:max-w-[80%]">
                  <div className='bg-white shadow-[0_2px_4px_rgba(126,142,177,0.12)] h-full px-8 py-6 rounded-md'>
                    { pending && <Loader/>}
                    <h2 className='font-semibold text-lg pb-[18px] border-b-[rgba(0,0,0,0.1)] border-b border-solid'>Analysis Results</h2>
                    
                    {/* <JsonToTable json={multipleState} /> */}
                    {/* <pre className=' bg-[ghostwhite] border rounded mx-auto m-5 px-5 py-2.5 border-solid border-[silver]'>
                      <code>{JSON.stringify(multipleState?.data,null,2)}</code>
                    </pre> */}
                  </div>
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}
