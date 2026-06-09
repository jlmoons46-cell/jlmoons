"use client"

import { useState } from 'react'
import { 
  Wallet, 
  TrendingUp, 
  Landmark, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Zap, 
  ChevronRight,
  Shield,
  Binary,
  Search,
  Lock,
  Cpu,
  Scale,
  Database,
  ArrowRight
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    icon: Wallet,
    title: "Wallet Recovery",
    description: "Lost access to your private keys or seed phrase? We utilize advanced cryptographic recovery techniques.",
    details: {
      overview: "Our cryptographic specialists use distributed computing clusters to test trillions of permutations for lost passwords and partial seed phrases.",
      capabilities: [
        "Distributed Entropy Mapping",
        "Seed Phrase Fragment Reconstruction",
        "Hardware Wallet (Ledger/Trezor) Physical Forensics",
        "Legacy Wallet (.dat) Decryption"
      ],
      icon: Cpu
    }
  },
  {
    icon: TrendingUp,
    title: "Investment Scam Recovery",
    description: "Specialized tracing for stolen assets from fraudulent investment platforms and fake schemes.",
    details: {
      overview: "We utilize proprietary blockchain tracing software to follow stolen funds through multiple 'hops', mixers, and cross-chain bridges.",
      capabilities: [
        "Multi-Hop Transaction Tracing",
        "Exchange Intelligence & KYC Mapping",
        "Mixer De-anonymization Analysis",
        "Asset Freeze Coordination"
      ],
      icon: Search
    }
  },
  {
    icon: Landmark,
    title: "Bad Finance Broker",
    description: "Legal and technical assistance for victims of dishonest or unregulated financial brokers.",
    details: {
      overview: "We investigate unregulated brokers by analyzing their platform metadata and transaction histories to document fraud.",
      capabilities: [
        "Broker Identity Verification",
        "Forensic Audit of Platform Behavior",
        "Withdrawal Refusal Documentation",
        "Regulatory Reporting Support"
      ],
      icon: Scale
    }
  },
  {
    icon: Activity,
    title: "Fake Trading Scam",
    description: "Recovery services for capital stolen through manipulated trading apps and fake crypto exchanges.",
    details: {
      overview: "Many fake platforms use 'simulated' trading data. We audit backend behavior to prove the fraud and trace the actual deposits.",
      capabilities: [
        "Simulated Data Audit",
        "Scam Platform Infrastructure Analysis",
        "Liquidity Pool Flow Tracking",
        "Off-Ramp Destination Identification"
      ],
      icon: Binary
    }
  },
  {
    icon: ShieldCheck,
    title: "Romance Scam Recovery",
    description: "Confidential assistance for victims of pig-butchering and relationship-based crypto fraud.",
    details: {
      overview: "These cases require sensitive handling. We identify the 'Pig Butchering' network involved and map the asset flow to cash-out points.",
      capabilities: [
        "Network Attribution & Pattern Analysis",
        "Social Engineering Trail Mapping",
        "Confidential Asset Tracing",
        "High-Stake Case Management"
      ],
      icon: Shield
    }
  },
  {
    icon: FileText,
    title: "Loan Scam Recovery",
    description: "Targeted forensic investigations for victims of fake loan offers, advance-fee fraud, and unauthorized lending schemes.",
    details: {
      overview: "We analyze the payment methods used for 'advance fees' to provide a structured roadmap for law enforcement reclamation.",
      capabilities: [
        "Advance-Fee Payment Analysis",
        "Lender Identity Investigation",
        "Financial Evidence Structuring",
        "Beneficiary Account Mapping"
      ],
      icon: Database
    }
  },
  {
    icon: Zap,
    title: "Crypto Assets Recovery",
    description: "Comprehensive forensic reclamation for stolen NFTs, DeFi exploits, and cross-chain asset loss.",
    details: {
      overview: "Specialized forensics for DeFi protocol hacks and NFT 'drainer' scripts. We analyze smart contract interactions to identify exploit vectors.",
      capabilities: [
        "Smart Contract Interaction Audit",
        "NFT Drainer Script Analysis",
        "DeFi Protocol Exploit Mapping",
        "Cross-Chain Asset Reclamation"
      ],
      icon: Lock
    }
  },
]

export function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Comprehensive Solutions</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Precision Asset Restoration</h3>
          <p className="text-muted-foreground text-lg">We combine deep forensic analysis with cutting-edge cryptographic tools to solve even the most complex recovery cases.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold mb-4">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <button 
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all text-left w-fit"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="p-8 rounded-3xl bg-muted/20 border border-white/5 inline-block max-w-2xl">
            <h4 className="text-xl font-bold mb-4">Don't see your specific scenario?</h4>
            <p className="text-muted-foreground mb-8 text-sm">Our specialists handle custom technical investigations across all blockchain ecosystems and cryptographic structures.</p>
            <Button size="lg" className="h-14 px-10 font-bold uppercase tracking-widest gold-glow group" asChild>
              <Link href="#recovery-form">
                Request Custom Assessment
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl bg-card border-white/10 sm:rounded-3xl p-0 overflow-hidden gold-glow">
            {selectedService && (
              <div className="flex flex-col">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-background to-secondary/10 p-8 flex items-end relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <selectedService.details.icon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-2xl">
                      <selectedService.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Forensic Focus</div>
                      <DialogTitle className="text-3xl font-bold text-foreground">
                        {selectedService.title}
                      </DialogTitle>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strategic Overview</h5>
                    <DialogDescription className="text-lg leading-relaxed text-foreground/90">
                      {selectedService.details.overview}
                    </DialogDescription>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-xs font-bold uppercase tracking-widest text-primary">Key Investigation Capabilities</h5>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedService.details.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-sm font-medium text-muted-foreground">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 h-14 text-base font-bold rounded-xl gold-glow" onClick={() => {
                      setSelectedService(null);
                      window.location.href = '#recovery-form';
                    }}>
                      Start Technical Assessment
                    </Button>
                    <Button variant="outline" className="flex-1 h-14 text-base font-bold rounded-xl border-white/10" onClick={() => setSelectedService(null)}>
                      Close Review
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
