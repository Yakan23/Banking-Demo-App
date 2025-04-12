"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'





function AuthForm({ type }: { type: string }) {
  const router=useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  
  const formSchema=authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })
  const onSubmit =async (values: z.infer<typeof formSchema>) =>
  {
    setisLoading(true)
    try {
      if (type === "sign-up") {
        const newUser = await signUp(values)
        setUser(newUser)
      
      } else {
        const response = await signIn({
          email: values.email,
          password: values.password
        })
        if(response) router.push("/")
      }

    } catch (error) {
      console.log("error",error)
      
    } finally {
      setisLoading(false)  
    }
    
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4" >
          <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon Logo'/>
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Horizon
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {
              user ?
                "Link your bank account"
                : type === "sign-in" ?
                  "Sign in to your account"
                  : "Sign Up to Horizon"
            }
            <p className='text-16 font-normal text-gray-600'>
              {
                user ?
                  "Link your account to get started"
                  : "Please enter your details to get started"
              }
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>

        </div> 
      ) :
        (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                {
                  type === "sign-up" &&(
                    <>
                      <div className='flex justify-between gap-4'>
                        
                      <CustomInput
                        control={form.control}
                        name="firstName"
                        placeholder='ex: John'
                        label="First Name"
                        inputType='text'
                        
                      />
                      <CustomInput
                        control={form.control}
                        name="lastName"
                        placeholder='ex: Doe'
                        label="Last Name"
                        inputType='text'
                      />
                      </div>
                      <CustomInput
                        control={form.control}
                        name='address1'
                        placeholder='Please enter your address'
                        label='Address'
                        inputType='text'
                      
                      />
                      <CustomInput
                        control={form.control}
                        name='city'
                        placeholder='Please enter your city'
                        label='City'
                        inputType='text'
                      
                      />
                      <div className='flex justify-between gap-4'>
                        <CustomInput
                        control={form.control}
                        name='state'
                        placeholder='ex: NY'
                        label='State'
                        inputType='text'
                      
                        />

                        <CustomInput
                        control={form.control}
                        name='zipCode'
                        placeholder='ex: 11111'
                        label='Zip Code'
                        inputType='text'
                      
                        />
                      </div>
                      <div className='flex justify-between gap-4'>
                        <CustomInput
                        control={form.control}
                        name='dob'
                        placeholder='YYYY-MM-DD'
                        label='Date of birth'
                        inputType='text'
                        />

                        <CustomInput
                        control={form.control}
                        name='ssn'
                        placeholder='ex: 1234'
                        label='SSN'
                        inputType='text'
                      
                        />
                      </div>
                    </>
                  )
                }
                <CustomInput
                  control={form.control}
                  name="email"
                  placeholder="Please enter your email"
                  inputType="text"
                  label="Email"                
                />
                <CustomInput
                  control={form.control}
                  name="password"
                  placeholder="Please enter your password"
                  inputType="password"
                  label="Password"                
                />
                <div className='flex flex-col gap-4'>
                  <Button type="submit" className='form-btn' disabled={isLoading}>
                    {isLoading ? (
                      
                      <>
                        <Loader2 size={20} className='animate-spin'>
                          &nbsp; Loading...
                        </Loader2>
                      </>
                    ) : 
                      type==="sign-in" ? "Sign In" : "Sign Up"
                  }
                  </Button>
                </div>
              </form>
            </Form> 
            <footer className='flex justify-center gap-1 '>
                <p className='text-14 font-normal text-gray-600'>
                  {type === "sign-in" ?
                    "Don't have an account?"
                  : "Already have an account?"
                  }  
                </p>
                <Link href={type === "sign-in" ? '/sign-up' : '/sign-in'} className='form-link text-bankGradient'>
                  {type === "sign-in" ? "Sign Up" : "Sign In"}
                </Link> 
            </footer>
          </>


        )
    }
    </section>
  )
}

export default AuthForm