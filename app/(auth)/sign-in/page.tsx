import React from 'react'
import AuthForm from '@/components/ui/AuthForm'
function SignIn() {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type={"sign-in"}></AuthForm>

    </section>
  )
}

export default SignIn