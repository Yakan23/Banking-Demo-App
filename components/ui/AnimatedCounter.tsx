"use client";
import React from 'react'
import CountUp from 'react-countup';

function AnimatedCounter({amount}:{amount:number}) {
  return (
    <CountUp start={0} prefix='$' duration={2.54} decimals={2} end={amount} className='w-full'/>
  )
}

export default AnimatedCounter