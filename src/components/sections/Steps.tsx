"use client"

import { useState } from 'react'
import { 
  ClipboardList, 
  Search, 
  Binary, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Landmark, 
  Scale, 
  Key,
  Wallet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Step = {
  id: number
  icon: any
  title: string
  description: string
}

type MethodologyType = 'general' | 'lost_password' | 'scam' | 'hardware'

const methodologies: Record<MethodologyType, { label: string; steps: Step[]; finalLabel: string }> = {
  general: {
    label: "General Recovery",
    finalLabel: "Secure Asset Restoration",
    steps: [
      { id: 1, icon: ClipboardList, title: "Case Assessment", description: "Reviewing evidence and recovery circumstances." },
      { id: 2, icon: Search, title: "Technical Analysis", description: "Analyzing wallet structures and pathways." },
      { id: 3, icon: Binary, title: "Forensic Investigation", description: "Tracing transactions and identifying movements." },
      { id: 4, icon: ShieldCheck, title: "Recovery Execution", description: "Implementing strategies via secure procedures." }
    ]
  },
  lost_password: {
    label: "Password Recovery",
    finalLabel: "Wallet Access Restored",
    steps: [
      { id: 1, icon: ClipboardList, title: "Forensic Assessment", description: "Evaluating encryption and known fragments." },
      { id: 2, icon: Binary, title: "Entropy Mapping", description: "Mapping permutations and salt structures." },
      { id: 3, icon: Cpu, title: "Metadata Rebuild", description: "Rebuilding headers for decryption attempts." },
      { id: 4, icon: ShieldCheck, title: "Decryption Process", description: "Executing high-performance clusters." }
    ]
  },
  scam: {
    label: "Scam Investigation",
    finalLabel: "Asset Recovery Support",
    steps: [
      { id: 1, icon: ClipboardList, title: "Evidence Intake", description: "Collecting hashes and scammer profiles." },
      { id: 2, icon: Search, title: "Blockchain Tracing", description: "Tracking assets across mixers and hops." },
      { id: 3, icon: Landmark, title: "Exchange ID", description: "Identifying destinations for freeze requests." },
      { id: 4, icon: Scale, title: "Legal Coordination", description: "Working with law enforcement for reclamation." }
    ]
  },
  hardware: {
    label: "Hardware Failure",
    finalLabel: "Device Access Restored",
    steps: [
      { id: 1, icon: Wallet, title: "Physical Intake", description: "Evaluation of hardware health and firmware." },
      { id: 2, icon: Cpu, title: "Hardware Imaging", description: "Secure bit-for-bit imaging of storage." },
      { id: 3, icon: Binary, title: "Firmware Recovery", description: "Bypassing layers to reach encrypted root." },
      { id: 4, icon: Key, title: "Seed Extraction", description: "Regaining access through lab-grade tools." }
    ]
  }
}

export function Steps() {
  const [activeType, setActiveType] = useState<MethodologyType>('general')
  const currentMethodology = methodologies[activeType]

  return (
    <section id="how-it-works" className="py-20 bg-[#07111F] relative overflow-hidden border-y border-white/5">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-4">Comprehensive Solutions</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Precision Restoration Methodology</h3>
          <p className="text-muted-foreground text-lg mb-8">
            Every recovery follows a specialized forensic workflow designed for your specific situation.
          </p>

          {/* Case Type Switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {(Object.keys(methodologies) as MethodologyType[]).map((type) => (
              <Button
                key={type}
                variant={activeType === type ? 'default' : 'outline'}
                onClick={() => setActiveType(type)}
                className={cn(
                  "rounded-full px-6 h-10 text-[10px] font-bold uppercase tracking-widest transition-all",
                  activeType === type ? "gold-glow" : "border-white/10 hover:bg-white/5"
                )}
              >
                {methodologies[type].label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative min-h-[480px]">
          {/* Main Horizontal Line - Reserving area for cards above and below */}
          <div className="absolute top-[140px] left-0 w-[85%] h-[1px] bg-white/10" />
          
          <div className="grid grid-cols-5 relative pt-[140px]">
            {currentMethodology.steps.map((step, index) => {
              const isTop = index % 2 === 0
              return (
                <div key={`${activeType}-${step.id}`} className="relative flex flex-col items-center">
                  {/* Connecting Vertical Line */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-[1px] bg-white/15 h-16 transition-all duration-500",
                    isTop ? "bottom-full" : "top-0"
                  )} />
                  
                  {/* Step Node Icon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-12 h-12 rounded-full bg-[#07111F] border border-white/15 flex items-center justify-center teal-glow group transition-transform hover:scale-110 shadow-lg">
                      <step.icon className="w-4 h-4 text-secondary" />
                    </div>
                  </div>

                  {/* Step Content Card - Floating above or below the node */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-[210px] p-4 rounded-xl bg-card/60 backdrop-blur-md border border-white/5 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-700",
                    isTop ? "bottom-[calc(100%+45px)]" : "top-[45px]"
                  )}>
                    <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-secondary mb-1.5">Step 0{step.id}</div>
                    <h4 className="text-sm font-bold mb-1 text-foreground leading-tight">{step.title}</h4>
                    <p className="text-muted-foreground text-[10px] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Final Step 5 - Destination Circle */}
            <div className="relative flex flex-col items-center justify-center -translate-y-1/2">
              <div className="relative z-20 w-[170px] h-[170px] rounded-full bg-secondary text-secondary-foreground p-5 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-10px_rgba(34,211,238,0.4)] transform hover:scale-105 transition-transform duration-500 animate-in zoom-in-95">
                <div className="w-7 h-7 bg-secondary-foreground/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold mb-1 leading-tight uppercase tracking-tight">{currentMethodology.finalLabel}</h4>
                <p className="text-[9px] font-medium opacity-90 mb-3 leading-tight max-w-[120px]">
                  Secure assessment & delivery.
                </p>
                <Button variant="outline" size="sm" className="h-6 px-3 bg-transparent border-secondary-foreground/20 hover:bg-secondary-foreground/10 text-secondary-foreground font-bold text-[7px] uppercase tracking-wider" asChild>
                  <Link href="#recovery-form">Start Now <ArrowRight className="ml-1 w-2 h-2" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-8 relative mt-8">
          <div className="absolute top-0 left-6 w-[2px] h-full bg-white/10" />
          
          {currentMethodology.steps.map((step) => (
            <div key={`${activeType}-mobile-${step.id}`} className="relative pl-16 flex items-start gap-4 animate-in fade-in slide-in-from-left-4">
              <div className="absolute left-0 w-12 h-12 rounded-full border border-white/15 bg-[#07111F] flex items-center justify-center z-10 shadow-lg">
                <step.icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="p-4 rounded-xl bg-card border border-white/5 w-full backdrop-blur-md">
                <div className="text-[9px] font-bold uppercase tracking-widest text-secondary mb-1">Step 0{step.id}</div>
                <h4 className="text-base font-bold mb-1">{step.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile Final Node */}
          <div className="relative pl-16 animate-in fade-in slide-in-from-left-4">
            <div className="absolute left-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center z-10">
              <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div className="p-6 rounded-2xl bg-secondary text-secondary-foreground shadow-2xl">
              <h4 className="text-lg font-bold mb-1 leading-tight">{currentMethodology.finalLabel}</h4>
              <p className="text-xs font-medium opacity-90 mb-4">
                Secure forensic delivery.
              </p>
              <Button size="lg" className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 font-bold uppercase tracking-widest text-xs h-10" asChild>
                <Link href="#recovery-form">Start Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
