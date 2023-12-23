'use client'
import Image from 'next/image'
import { useFormState } from 'react-dom'
import { emailValidate } from './actions/formAction'
import { useEffect } from 'react'

const initialState = {
  message: "",
}

export default function Home() {
  const [state, formAction] = useFormState(emailValidate, initialState)
  
  useEffect(()=>{
    // console.log(state)
  },[state])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-col gap-4 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Email Tester</h1>
          <form action={formAction} >
            <input type="email" name="email" />
            <button type="submit">Verify</button>
        </form>
        <p>{state?.data?.deliverable? "valid email": "invalid email"}</p>
      </div>
    </main>
  )
}
