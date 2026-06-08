
"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, ArrowRight, Users, CheckCircle, Clock, DollarSign, Shield, Loader2, Share2, Lock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export function Hero() {
  const [heroImage, setHeroImage] = useState<string>("https://picsum.photos/seed/jlmoons-matrix/1200/800")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('value')
          .eq('key', 'hero_image_url')
          .single()
        
        if (data?.value) {
          setHeroImage(data.value)
        }
      } catch (err) {
        console.error('Failed to load hero settings', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadSettings()
  }, [])

  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-[#050A12]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              Intelligence-Driven Recovery
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Investigate. Recover. <span className="text-primary italic">Restore.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              JLMOONS is a global leader in blockchain forensics. We provide expert technical recovery for lost wallets, compromised assets, and complex digital investigations with clinical precision.
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="h-14 px-8 text-lg font-semibold gold-glow" asChild>
                    <Link href="#recovery-form">Consult an Investigator</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-white/10 hover:bg-white/5" asChild>
                    <Link href="#how-it-works">Our Methodology</Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground font-medium pl-1 italic">
                  ✓ Confidential assessment. No obligation. Technical feasibility determined before engagement.
                </p>
              </div>

              {/* Trust Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-primary font-bold">✓</span> Certified Forensic Review
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-primary font-bold">✓</span> Blockchain Tracing Experts
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-primary font-bold">✓</span> Evidence-Based Methodology
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-primary font-bold">✓</span> Secure Encrypted Submissions
                </div>
              </div>
            </div>

            {/* Credibility Strip */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Established Authority in Digital Restoration</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary flex items-center gap-1">
                    <DollarSign className="w-5 h-5" /> 8M+
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold leading-tight">Recovered</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary flex items-center gap-1">
                    <Users className="w-5 h-5" /> 3,800+
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold leading-tight">Case Audits</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary flex items-center gap-1">
                    <CheckCircle className="w-5 h-5" /> 94%
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold leading-tight">Success Rate</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-primary flex items-center gap-1">
                    <Clock className="w-5 h-5" /> 24h
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold leading-tight">Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Holographic Tracing Matrix Visual */}
          <div className="relative hidden lg:block group">
            {/* 3D Container with Perspective */}
            <div className="relative z-10 w-full aspect-square perspective-[1000px]">
              <div className="relative w-full h-full bg-[#0A111A] rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(34,211,238,0.3)] group-hover:rotate-x-2 group-hover:rotate-y-2 transition-transform duration-700 ease-out">
                
                {/* SVG Holographic Grid Overlay */}
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Main Visual Image */}
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/50">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <Image 
                    src={heroImage} 
                    alt="Holographic Tracing Matrix" 
                    fill 
                    className="object-cover opacity-40 mix-blend-screen group-hover:scale-110 transition-transform duration-1000" 
                    data-ai-hint="blockchain network"
                    unoptimized
                  />
                )}

                {/* Animated Connection Lines & Nodes (Visual Effects) */}
                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                  {/* Glowing Nodes */}
                  <div className="absolute top-[20%] left-[30%] w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_hsl(var(--primary))]" />
                  <div className="absolute top-[50%] left-[60%] w-4 h-4 bg-secondary rounded-full animate-pulse shadow-[0_0_20px_hsl(var(--secondary))]" />
                  <div className="absolute top-[70%] left-[25%] w-2 h-2 bg-primary rounded-full animate-pulse delay-500 shadow-[0_0_10px_hsl(var(--primary))]" />
                  
                  {/* Floating Icons representing Forensic Intel */}
                  <div className="absolute top-[40%] right-[20%] p-3 bg-primary/20 rounded-xl backdrop-blur-md border border-primary/30 animate-bounce delay-700 shadow-xl">
                    <Share2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute bottom-[25%] left-[45%] p-4 bg-secondary/20 rounded-2xl backdrop-blur-md border border-secondary/30 animate-pulse shadow-2xl">
                    <Shield className="w-8 h-8 text-secondary" />
                    <div className="absolute -top-1 -right-1">
                       <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Intelligence Legend */}
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 border border-white/10 backdrop-blur-xl rounded-2xl z-30 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <div className="text-primary font-bold text-xs uppercase tracking-[0.2em] italic">Forensic Intelligence Matrix</div>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    Our Holographic Tracing Matrix maps complex cross-chain bridges and obfuscated wallet movements with <span className="text-foreground font-semibold">94% surgical accuracy</span>.
                  </div>
                </div>
              </div>

              {/* Decorative 3D elements around the main block */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed italic">
            "We approach every recovery case with the rigor of a forensic audit. Our specialists prioritize technical evidence over assumptions, ensuring that every restoration path is secure, transparent, and built on a foundation of cryptographic integrity."
          </p>
        </div>
      </div>
    </section>
  )
}
