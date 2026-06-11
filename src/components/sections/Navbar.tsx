
"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Menu, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

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

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#recovery-types", label: "Recovery Types" },
    { href: "#how-it-works", label: "Methodology" },
    { href: "#blog", label: "Resource Center" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] lg:h-[88px] flex items-center bg-[#050A12]/85 backdrop-blur-[18px] border-b border-white/5 transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 lg:gap-3 group min-w-0">
          {logoUrl && (
            <div className="relative w-6 h-6 lg:w-8 lg:h-8 overflow-hidden group-hover:scale-110 transition-transform shrink-0">
              <Image src={logoUrl} alt="JLMOONS Icon" fill className="object-contain" unoptimized />
            </div>
          )}
          <div className="flex flex-col truncate">
            <span className="font-headline text-lg lg:text-2xl font-extrabold tracking-tighter text-foreground uppercase group-hover:text-primary transition-colors">
              JLMOONS
            </span>
            <span className="text-[7px] lg:text-[9px] text-primary font-bold uppercase tracking-[0.2em] -mt-0.5 lg:-mt-1">
              Forensics & Recovery
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.15em]">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button 
            className="hidden sm:flex h-[44px] lg:h-[52px] px-6 lg:px-8 text-[10px] lg:text-xs font-extrabold uppercase tracking-widest rounded-[12px] gold-glow animate-pulse-subtle bg-primary hover:bg-primary/90 text-primary-foreground transition-all active:scale-95 whitespace-nowrap" 
            asChild
          >
            <Link href="#recovery-form">Start Recovery</Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#050A12] border-white/5 pt-16">
                <nav className="flex flex-col gap-8 text-center">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button 
                    className="mt-4 h-14 font-extrabold uppercase tracking-widest gold-glow bg-primary text-primary-foreground" 
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="#recovery-form">Start Recovery</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
