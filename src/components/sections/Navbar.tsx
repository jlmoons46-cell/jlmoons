
"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

export function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)

  useEffect(() => {
    async function loadLogo() {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'brand_logo_url')
        .single()
      
      if (data?.value) {
        setLogoUrl(data.value)
      }
    }
    loadLogo()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[88px] flex items-center bg-[#050A12]/85 backdrop-blur-[18px] border-b border-white/5 transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section - Institutional Typography */}
        <Link href="/" className="flex items-center gap-3 group w-[250px] shrink-0">
          {logoUrl && (
            <div className="relative w-8 h-8 overflow-hidden group-hover:scale-110 transition-transform">
              <Image src={logoUrl} alt="JLMOONS Icon" fill className="object-contain" unoptimized />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-headline text-2xl font-extrabold tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors">
              JLMOONS
            </span>
            <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">
              Forensics & Recovery
            </span>
          </div>
        </Link>

        {/* Cohesive Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.15em]">
          <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="#recovery-types" className="text-muted-foreground hover:text-primary transition-colors">Recovery Types</Link>
          <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">Methodology</Link>
          <Link href="#blog" className="text-muted-foreground hover:text-primary transition-colors">Resource Center</Link>
        </nav>

        {/* Premium CTA Anchor */}
        <div className="flex items-center justify-end w-[220px] shrink-0">
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
