"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[88px] flex items-center bg-[#050A12]/85 backdrop-blur-[18px] border-b border-white/5 transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section - Wider & More Prominent */}
        <Link href="/" className="flex items-center gap-3 group w-[180px] lg:w-[220px] shrink-0">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-headline text-2xl font-bold gold-glow group-hover:scale-105 transition-transform">
            JL
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-foreground uppercase">Moons</span>
        </Link>

        {/* Cohesive Navigation Menu */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.15em]">
          <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="#recovery-types" className="text-muted-foreground hover:text-primary transition-colors">Recovery Types</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">Methodology</Link>
          <Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Resources</Link>
        </nav>

        {/* Premium CTA Anchor */}
        <div className="flex items-center justify-end w-[180px] lg:w-[220px] shrink-0">
          <Button 
            className="h-[52px] px-8 text-xs font-extrabold uppercase tracking-widest rounded-[12px] gold-glow animate-pulse-subtle bg-primary hover:bg-primary/90 text-primary-foreground transition-all active:scale-95" 
            asChild
          >
            <Link href="#recovery-form">Start Recovery</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
