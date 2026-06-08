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
      { id: 1, icon: ClipboardList, title: "Case Assessment", description: "Review submitted evidence, wallet information, and recovery circumstances." },
      { id: 2, icon: Search, title: "Technical Analysis", description: "Analyze wallet structures, blockchain activity, and recovery pathways." },
      { id: 3, icon: Binary, title: "Forensic Investigation", description: "Trace transactions, identify asset movements, and document findings." },
      { id: 4, icon: ShieldCheck, title: "Recovery Execution", description: "Implement approved recovery strategies using secure technical procedures." }
    ]
  },
  lost_password: {
    label: "Password Recovery",
    finalLabel: "Wallet Access Restored",
    steps: [
      { id: 1, icon: ClipboardList, title: "Forensic Assessment", description: "Evaluating wallet version, encryption type, and known fragments." },
      { id: 2, icon: Binary, title: "Entropy Mapping", description: "Computational mapping of possible password permutations and salt structures." },
      { id: 3, icon: Cpu, title: "Metadata Rebuild", description: "Rebuilding corrupted wallet headers to allow decryption attempts." },
      { id: 4, icon: ShieldCheck, title: "Decryption Process", description: "Executing high-performance clusters to regain asset access." }
    ]
  },
  scam: {
    label: "Scam Investigation",
    finalLabel: "Asset Recovery Support",
    steps: [
      { id: 1, icon: ClipboardList, title: "Evidence Intake", description: "Collecting transaction hashes, scammer profiles, and platform details." },
      { id: 2, icon: Search, title: "Blockchain Tracing", description: "Tracking stolen assets across mixers, hops, and deposit addresses." },
      { id: 3, icon: Landmark, title: "Exchange ID", description: "Identifying destination exchanges and initiating preservation requests." },
      { id: 4, icon: Scale, title: "Legal Coordination", description: "Working with law enforcement to freeze and reclaim stolen assets." }
    ]
  },
  hardware: {
    label: "Hardware Failure",
    finalLabel: "Device Access Restored",
    steps: [
      { id: 1, icon: Wallet, title: "Physical Intake", description: "Forensic evaluation of device hardware health and firmware status." },
      { id: 2, icon: Cpu, title: "Hardware Imaging", description: "Secure bit-for-bit imaging of device storage to protect original data." },
      { id: 3, icon: Binary, title: "Firmware Recovery", description: "Bypassing corrupted firmware layers to reach the encrypted root." },
      { id: 4, icon: Key, title: "Seed Extraction", description: "Regaining access to root mnemonic fragments through specialized lab tools." }
    ]
  }
}

export function Steps() {
  const [activeType, setActiveType] = useState<MethodologyType>('general')
  const currentMethodology = methodologies[activeType]

  return (
    <section id="how-it-works" className="py-24 bg-[#07111F] relative overflow-hidden border-y border-white/5">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Forensic Standards</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Our Recovery Methodology</h3>
          <p className="text-muted-foreground text-lg mb-10">
            Every recovery follows a specialized forensic workflow designed for your specific situation. Select your case type below to view our roadmap.
          </p>

          {/* Case Type Switcher */}
          <div className="flex flex-wrap justify-center gap-3">
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
        <div className="hidden lg:block relative min-h-[650px]">
          {/* Main Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-[80%] h-[2px] bg-white/10 -translate-y-1/2" />
          
          <div className="grid grid-cols-5 h-full relative">
            {currentMethodology.steps.map((step, index) => {
              const isTop = index % 2 === 0
              return (
                <div key={`${activeType}-${step.id}`} className="relative flex flex-col items-center">
                  {/* Connecting Vertical Line */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-[1px] bg-white/15 h-32 transition-all duration-500",
                    isTop ? "bottom-1/2" : "top-1/2"
                  )} />
                  
                  {/* Step Node Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-14 h-14 rounded-full bg-[#07111F] border border-white/15 flex items-center justify-center teal-glow group transition-transform hover:scale-110">
                      <step.icon className="w-5 h-5 text-secondary" />
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-64 p-6 rounded-2xl bg-card border border-white/5 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-700",
                    isTop ? "bottom-[calc(50%+140px)]" : "top-[calc(50%+140px)]"
                  )}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">Step 0{step.id}</div>
                    <h4 className="text-base font-bold mb-2 text-foreground">{step.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}

            {/* Final Step 5 - Destination Circle */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative z-20 w-[240px] h-[240px] rounded-full bg-secondary text-secondary-foreground p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)] transform hover:scale-105 transition-transform duration-500 animate-in zoom-in-95">
                <div className="w-12 h-12 bg-secondary-foreground/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-2 leading-tight">{currentMethodology.finalLabel}</h4>
                <p className="text-xs font-medium opacity-90 mb-6 leading-relaxed">
                  Receive your case assessment and recommended next steps from our specialists.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent border-secondary-foreground/20 hover:bg-secondary-foreground/10 text-secondary-foreground font-bold text-[10px] uppercase tracking-wider" asChild>
                  <Link href="#recovery-form">Start Assessment <ArrowRight className="ml-2 w-3 h-3" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-10 relative">
          <div className="absolute top-0 left-6 w-[2px] h-full bg-white/10" />
          
          {currentMethodology.steps.map((step) => (
            <div key={`${activeType}-mobile-${step.id}`} className="relative pl-16 flex items-start gap-4 animate-in fade-in slide-in-from-left-4">
              <div className="absolute left-0 w-12 h-12 rounded-full border border-white/15 bg-[#07111F] flex items-center justify-center z-10">
                <step.icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="p-6 rounded-2xl bg-card border border-white/5 w-full">
                <div className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Step 0{step.id}</div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
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
            <div className="p-8 rounded-3xl bg-secondary text-secondary-foreground shadow-2xl">
              <h4 className="text-xl font-bold mb-2 leading-tight">{currentMethodology.finalLabel}</h4>
              <p className="text-sm font-medium opacity-90 mb-6">
                Our specialists deliver your investigation results and recovered access securely.
              </p>
              <Button size="lg" className="w-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 font-bold uppercase tracking-widest text-xs h-14" asChild>
                <Link href="#recovery-form">Start Assessment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
