import React from 'react'
import { ProbeContactSection } from '@/sections/probe-contact'
import Hero from './components/Hero'
import Process from './components/Process'
import Story from './components/Story'
import Features from './components/Features'

export default function ProbePage() {
  return (
    <div>
      <Hero />
      <Process />
      <Story />
      <Features />
      <ProbeContactSection />
    </div>
  )
}
