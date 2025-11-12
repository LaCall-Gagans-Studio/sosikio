'use client'

import React from 'react'
// import Attractors from './texst'

// sections
import { HeroSection } from '@/sections/hero'
import { OverviewSection } from '@/sections/overview'
import { AboutSection } from '@/sections/about'
// import { ArchiveSection } from '../../sections/archive'
import { ContactTrialSection } from '@/sections/contact-trial'

import { products } from './data_products'
import { allTestimonials } from './data_testimonials'

// --- メインページコンポーネント ---
export default function Page() {
  return (
    <main className="bg-[#f1f1f1] text-gray-800 font-zenKakuGothicNew tracking-wide">
      {/* --- Hero Section --- */}
      <HeroSection />

      {/* --- Overview Section --- */}
      <OverviewSection testimonials={allTestimonials} />

      {/* --- About Section --- */}
      <AboutSection products={products} />

      {/* --- ContactTrial Section --- */}
      <ContactTrialSection />

      {/* --- Archive Section --- */}
      {/* <ArchiveSection allTestimonials={allTestimonials} products={products} /> */}
    </main>
  )
}
