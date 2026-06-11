
"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, ArrowRight, Shield, Binary, Activity, Radar, Lock, Wallet, Search, TrendingUp, Landmark, Heart, FileText, Zap } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const caseTypes = [
  { icon: Wallet, label: "Wallet Recovery", id: "wallet" },
  { icon: Search, label: "Scam Investigation", id: "scam" },
  { icon: Landmark, label: "Bad Broker", id: "broker" },
  { icon: TrendingUp, label: "Investment Fraud", id: "fraud" },
  { icon: Heart, label: "Romance Scams", id: "romance" },
  { icon: Zap, label: "Asset Reclamation", id: "reclaim" },
]

export function Hero() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 5)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-background flex flex-col items-center">
      {/* Institutional Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Section 1: The Institutional Statement */}
        <div className="space-y-8 max-w-5xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.4em] uppercase mx-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            Global Digital Asset Forensics
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase text-foreground">
            Investigate.<br />
            <span className="text-primary italic">Trace.</span><br />
            Restore.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            JLMOONS is an independent intelligence firm providing technical attribution and forensic restoration for complex cryptographic losses.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Button size="lg" className="h-16 px-12 text-lg font-bold uppercase tracking-widest rounded-2xl gold-glow bg-primary hover:bg-primary/90 transition-all group" asChild>
              <Link href="#recovery-form">
                Start Recovery
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Section 2: Full-Width Intelligence Canvas */}
        <div className="w-full max-w-7xl mx-auto mb-20 relative group">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.3em] uppercase text-primary/40 flex items-center gap-2">
            <Radar className="w-3 h-3 animate-pulse" />
            Live Forensic Case Map
          </div>
          
          <div className="relative aspect-[21/9] w-full rounded-[3rem] bg-card/30 border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl flex items-center justify-center p-4 lg:p-12">
            {/* Glass Surface Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="canvas-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#canvas-grid)" />
              </svg>
            </div>

            {/* Tracing Animation SVG */}
            <svg viewBox="0 0 1000 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,255,178,0.1)]">
               {/* Paths */}
               <path d="M 100 200 C 250 50, 450 350, 600 200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 10" className="opacity-10" />
               <path d="M 100 200 C 250 350, 450 50, 600 200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="10 10" className="opacity-10" />
               
               {/* Animated Investigation Path */}
               <path 
                d="M 100 200 L 300 150 L 500 250 L 700 200 L 900 200" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                strokeDasharray="1000" 
                strokeDashoffset={phase === 0 ? "1000" : phase === 1 ? "800" : phase === 2 ? "500" : phase === 3 ? "200" : "0"} 
                className="transition-all duration-1000 ease-in-out"
               />

               {/* Nodes */}
               <circle cx="100" cy="200" r="8" className="fill-background stroke-primary stroke-2" />
               <text x="100" y="235" textAnchor="middle" className="text-[10px] font-bold fill-muted-foreground uppercase tracking-widest">Intake</text>

               <g className={cn("transition-opacity duration-500", phase >= 1 ? "opacity-100" : "opacity-0")}>
                 <circle cx="300" cy="150" r="6" className="fill-background stroke-white/20" />
                 <text x="300" y="130" textAnchor="middle" className="text-[9px] fill-muted-foreground uppercase tracking-tighter">Attribution</text>
               </g>

               <g className={cn("transition-opacity duration-500", phase >= 2 ? "opacity-100" : "opacity-0")}>
                 <circle cx="500" cy="250" r="10" className="fill-background stroke-secondary stroke-2 shadow-lg shadow-secondary/50" />
                 <text x="500" y="285" textAnchor="middle" className="text-[9px] font-bold fill-secondary uppercase tracking-widest">Mixer Identified</text>
                 {phase === 2 && <circle cx="500" cy="250" r="10" fill="none" stroke="hsl(var(--secondary))" className="animate-scan-ring" />}
               </g>

               <g className={cn("transition-opacity duration-500", phase >= 3 ? "opacity-100" : "opacity-0")}>
                 <circle cx="700" cy="200" r="6" className="fill-background stroke-white/20" />
                 <text x="700" y="180" textAnchor="middle" className="text-[9px] fill-muted-foreground uppercase tracking-tighter">Routing</text>
               </g>

               <g className={cn("transition-opacity duration-500", phase >= 4 ? "opacity-100" : "opacity-0")}>
                 <circle cx="900" cy="200" r="14" className="fill-primary/20 stroke-primary stroke-2" />
                 <foreignObject x="888" y="188" width="24" height="24">
                   <Shield className="w-full h-full text-primary" />
                 </foreignObject>
                 <text x="900" y="240" textAnchor="middle" className="text-[11px] font-black fill-primary uppercase tracking-widest">Secured</text>
               </g>
            </svg>

            {/* Canvas Status Tags */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
               <div className="space-y-2">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black text-foreground uppercase tracking-[0.2em]">Forensic Scan Active</span>
                 </div>
                 <div className="text-[10px] font-mono text-muted-foreground opacity-60">ID-TRACER_V4.0 // BLOCK_HEIGHT: 872,341</div>
               </div>
               <div className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl backdrop-blur-md">
                 <span className="text-[9px] font-bold text-secondary uppercase tracking-widest">Risk Factor: High</span>
               </div>
            </div>
          </div>
        </div>

        {/* Section 3: Forensic Metrics */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12 mb-28">
           {[
             { label: 'Cases Reviewed', value: '3,800+', desc: 'Forensic Intake Global' },
             { label: 'Assets Investigated', value: '$8.2M+', desc: 'Cryptographic Volume' },
             { label: 'Qualification Accuracy', value: '94%', desc: 'Technical Success Ratio' },
           ].map((stat, i) => (
             <div key={i} className="space-y-3 relative">
               {i !== 0 && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-10 bg-white/5 hidden md:block" />}
               <div className="text-4xl md:text-5xl font-black text-foreground">{stat.value}</div>
               <div className="space-y-1">
                 <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{stat.label}</div>
                 <div className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest opacity-60">{stat.desc}</div>
               </div>
             </div>
           ))}
        </div>

        {/* Section 4: Operational Triage (Case Entry Points) */}
        <div className="w-full max-w-6xl">
          <div className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-8">Operational Triage</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {caseTypes.map((type) => (
              <Link 
                key={type.id} 
                href="#recovery-form"
                className="group p-6 rounded-2xl bg-card/50 border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col items-center gap-4 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <type.icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-center leading-tight">
                  {type.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
