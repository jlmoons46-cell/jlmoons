
"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Footer() {
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
    <footer className="bg-background pt-16 lg:pt-24 pb-8 lg:pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              {logoUrl && (
                <div className="relative w-8 h-8 overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                  <Image src={logoUrl} alt="JLMOONS Icon" fill className="object-contain" unoptimized />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-headline text-2xl font-extrabold tracking-tighter text-foreground uppercase">
                  JLMOONS
                </span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">
                  Digital Asset Recovery & Forensics
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              JLMOONS is a digital asset recovery and blockchain forensics firm specializing in wallet recovery, asset tracing, scam investigations, and technical recovery services.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Technical Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Forensic Services</Link></li>
              <li><Link href="#recovery-types" className="hover:text-primary transition-colors">Recovery Scenarios</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary transition-colors">Our Methodology</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Resource Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="truncate">investigation@jlmoons.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                24/7 Forensic Monitoring
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Standards</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms-of-engagement" className="hover:text-primary transition-colors">Terms of Engagement</Link></li>
              <li><Link href="/legal/security-audit" className="hover:text-primary transition-colors">Security Audit</Link></li>
              <li><Link href="/legal/case-confidentiality" className="hover:text-primary transition-colors">Case Confidentiality</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] lg:text-xs text-muted-foreground uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} JLMOONS DIGITAL ASSET RECOVERY & FORENSICS. All rights reserved.</p>
          <p>Global Leaders in Cryptographic Restoration</p>
        </div>
      </div>
    </footer>
  )
}
