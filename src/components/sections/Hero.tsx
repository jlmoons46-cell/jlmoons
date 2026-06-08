"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShieldCheck, ArrowRight, Shield, Binary, Activity, Radar, Lock, Search, Cpu } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Hero() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // 5-phase forensic narrative cycle
    const timer = setInterval(() => {
      setPhase((p) => (p + 1) % 5)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const forensicLabels = [
    "Analyzing...",
    "Cross-chain bridge detected",
    "Entity identified",
    "Recovery route established",
    "Asset secured"
  ]

  return (
    <section className="relative overflow-hidden pt-24 pb-24 lg:pt-40 lg:pb-52 bg-[#050A12]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                Global Forensic Intelligence
              </div>
              
              <h1 className="text-5xl lg:text-[5.5rem] font-extrabold leading-[0.9] tracking-tighter uppercase">
                Crypto Asset <br />
                <span className="text-primary italic">Recovery</span>
                <span className="block text-2xl lg:text-4xl mt-4 tracking-normal text-muted-foreground font-headline font-medium normal-case">
                  & Blockchain Intelligence
                </span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold flex items-center gap-4 text-foreground">
                Track. Trace. <span className="text-secondary">Recover.</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
                We don't just find lost assets—we map the entire investigation. Our intelligence engine identifies attribution, follows cross-chain obfuscation, and secures restoration pathways.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-2xl gold-glow bg-primary hover:bg-primary/90 transition-all active:scale-95 group" asChild>
                <Link href="#recovery-form" className="flex items-center gap-3">
                  Start Investigation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-widest rounded-2xl border-white/10 hover:bg-white/5 transition-all active:scale-95" asChild>
                <Link href="#how-it-works">View Case Studies</Link>
              </Button>
            </div>

            {/* Credibility Legend */}
            <div className="pt-10 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { label: 'Attributed', value: '3,800+', icon: Binary },
                { label: 'Recovered', value: '$8.2M+', icon: Activity },
                { label: 'Accuracy', value: '94%', icon: ShieldCheck },
                { label: 'Uptime', value: '24/7', icon: Radar },
              ].map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                    <stat.icon className="w-3 h-3 text-primary" />
                    {stat.label}
                  </div>
                  <div className="text-2xl font-black text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Cinematic Forensic Matrix Visual */}
          <div className="relative group perspective-[2000px]">
            <div className="relative z-10 w-full aspect-square rounded-[2rem] bg-gradient-to-br from-[#0A111A] to-black border border-white/10 shadow-[0_0_100px_-20px_rgba(34,211,238,0.2)] overflow-hidden transform rotate-x-6 rotate-y--12 hover:rotate-x-0 hover:rotate-y-0 transition-transform duration-1000 ease-out flex items-center justify-center p-12">
              
              {/* Obsidian Surface Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />

              {/* Layer 2: Holographic Grid */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="matrix-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#matrix-grid)" />
                </svg>
              </div>

              {/* Layer 3: Blockchain Network Animation */}
              <div className="relative w-full h-full z-10">
                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  {/* Investigated Paths */}
                  <g className="transition-opacity duration-500">
                    {/* Path A */}
                    <path 
                      id="path1"
                      d="M 50 200 L 150 100 L 250 200" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeDasharray="500" 
                      strokeDashoffset="500" 
                      className={cn("transition-all duration-1000", phase >= 1 && "animate-draw opacity-40")}
                    />
                    {/* Pulse for Path A */}
                    {phase >= 1 && (
                      <circle r="2" fill="white">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 50 200 L 150 100 L 250 200" />
                      </circle>
                    )}

                    {/* Path B */}
                    <path 
                      id="path2"
                      d="M 50 200 L 150 300 L 250 200" 
                      fill="none" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeDasharray="500" 
                      strokeDashoffset="500" 
                      className={cn("transition-all duration-1000 delay-300", phase >= 1 && "animate-draw opacity-40")}
                    />
                    {/* Pulse for Path B */}
                    {phase >= 1 && (
                      <circle r="2" fill="white">
                        <animateMotion dur="2.8s" repeatCount="indefinite" path="M 50 200 L 150 300 L 250 200" />
                      </circle>
                    )}
                    
                    {/* Recovery Pathway (Final Phase) */}
                    <path 
                      id="pathRecovery"
                      d="M 250 200 L 350 200" 
                      fill="none" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="4" 
                      strokeDasharray="500" 
                      strokeDashoffset="500" 
                      className={cn("transition-all duration-1000", phase >= 3 ? "animate-draw opacity-100" : "opacity-0")}
                    />
                    {/* High-speed Pulse for Recovery Pathway */}
                    {phase >= 4 && (
                      <circle r="3" fill="hsl(var(--primary))">
                        <animateMotion dur="1.2s" repeatCount="indefinite" path="M 250 200 L 350 200" />
                      </circle>
                    )}
                  </g>

                  {/* Investigative Nodes */}
                  <g>
                    {/* Source Wallet */}
                    <circle cx="50" cy="200" r="10" className="fill-card stroke-white stroke-2" />
                    <text x="50" y="235" textAnchor="middle" className="text-[10px] font-bold fill-white/60 tracking-widest uppercase">Intake</text>
                    
                    {/* Intermediate Forensic Nodes */}
                    <circle cx="150" cy="100" r="8" className={cn("fill-card stroke-white/30 stroke-2 transition-all duration-700", phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50")} />
                    <circle cx="150" cy="300" r="8" className={cn("fill-card stroke-white/30 stroke-2 transition-all duration-700 delay-300", phase >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-50")} />

                    {/* Identified Entity (Suspicious Node) */}
                    <g className={cn("transition-all duration-500", phase >= 2 ? "opacity-100" : "opacity-0")}>
                      <circle 
                        cx="250" cy="200" r="15" 
                        className={cn("fill-card stroke-2 transition-all duration-700 shadow-[0_0_20px_rgba(245,158,11,0.3)]", phase >= 2 ? "stroke-amber-500" : "stroke-white/30")} 
                      />
                      {/* Node Discovery / Scanning Rings */}
                      {phase === 2 && (
                        <>
                          <circle cx="250" cy="200" r="15" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" className="animate-scan-ring" />
                          <circle cx="250" cy="200" r="15" fill="none" stroke="hsl(var(--secondary))" strokeWidth="1" className="animate-scan-ring" style={{ animationDelay: '0.6s' }} />
                        </>
                      )}
                      <text x="250" y="235" textAnchor="middle" className={cn("text-[9px] font-bold tracking-widest uppercase transition-colors", phase >= 2 ? "fill-amber-500" : "fill-white/60")}>
                        {phase >= 2 ? "Identified Entity" : "Scanning..."}
                      </text>
                    </g>

                    {/* Final Recovery Endpoint (Shield) */}
                    <g className={cn("transition-all duration-1000 transform", phase >= 3 ? "opacity-100 translate-y-0" : "opacity-20 translate-y-4")}>
                      <circle 
                        cx="350" cy="200" r="20" 
                        className={cn("transition-colors duration-1000", phase >= 4 ? "fill-primary/20 stroke-primary stroke-2" : "fill-white/5 stroke-white/10 stroke-1")} 
                      />
                      <foreignObject x="335" y="185" width="30" height="30">
                        <Shield className={cn("w-full h-full transition-all duration-1000", phase >= 4 ? "text-primary animate-pulse" : "text-white/20")} />
                      </foreignObject>
                      <text x="350" y="245" textAnchor="middle" className={cn("text-[11px] font-black tracking-widest uppercase italic transition-colors duration-1000", phase >= 4 ? "fill-primary" : "fill-white/20")}>
                        {phase >= 4 ? "Asset Secured" : "Awaiting Lock"}
                      </text>
                    </g>
                  </g>
                </svg>

                {/* Layer 4: Floating Data UI */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                  <div className="p-3 bg-black/60 border border-white/10 backdrop-blur-md rounded-xl space-y-1 animate-float-panel">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/80">Intake Analysis</div>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground">Tracing: 0x71...f9aE</div>
                  </div>
                  
                  <div className={cn("p-3 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-xl transition-all duration-500 animate-float-panel", phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2")} style={{ animationDelay: '1s' }}>
                    <div className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Risk Score: 92%</div>
                  </div>
                </div>

                {/* Bottom Status Legend */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 border border-white/5 backdrop-blur-2xl rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full transition-all duration-500", 
                      phase === 0 && "bg-white animate-pulse",
                      phase === 1 && "bg-white",
                      phase === 2 && "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
                      phase === 3 && "bg-secondary animate-pulse",
                      phase >= 4 && "bg-primary shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    )} />
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/90 animate-in fade-in slide-in-from-left-2 duration-500" key={phase}>
                      {forensicLabels[phase]}
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">INTEL-OPS V3.0</div>
                </div>
              </div>
            </div>

            {/* Contextual Hardware Indicators */}
            <div className="absolute -top-10 -right-10 p-5 bg-[#0A111A] border border-white/10 rounded-3xl shadow-2xl animate-bounce delay-700 hidden xl:block">
              <Radar className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute -bottom-12 -left-12 p-6 bg-[#0A111A] border border-white/10 rounded-[2.5rem] shadow-2xl animate-pulse hidden xl:block">
              <Lock className="w-10 h-10 text-secondary" />
            </div>
          </div>
        </div>

        <div className="mt-28 pt-12 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-bold">Trusted Technical Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="font-headline font-black text-2xl tracking-tighter uppercase italic">Blockchain.com</div>
             <div className="font-headline font-black text-2xl tracking-tighter uppercase italic">Ledger.</div>
             <div className="font-headline font-black text-2xl tracking-tighter uppercase italic">Binance</div>
             <div className="font-headline font-black text-2xl tracking-tighter uppercase italic">Coinbase</div>
          </div>
        </div>
      </div>
    </section>
  )
}
