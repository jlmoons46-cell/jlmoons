import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const cases = [
  "Lost Wallet Passwords",
  "Hardware Wallet Access Issues",
  "Corrupted Wallet Files",
  "Exchange Access Problems",
  "Seed Phrase Fragment Reconstruction",
  "Legacy Wallet Recovery",
  "Blockchain Tracing & Asset Investigation",
  "Inheritance & Estate Recovery Cases"
]

export function Eligibility() {
  return (
    <section id="recovery-types" className="py-12 bg-muted/20 border-b border-white/5 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 gold-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-4">Verification Criteria</h2>
                <h3 className="text-3xl lg:text-4xl font-bold leading-tight">Can you actually help my situation?</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Most visitors are wondering if their specific loss is recoverable. We specialize in complex technical cases where access has been compromised or lost.
                </p>
              </div>
              <Button className="w-full lg:w-fit h-14 px-8 font-bold uppercase tracking-widest gold-glow bg-primary hover:bg-primary/90 group" asChild>
                <Link href="#recovery-form">
                  Verify My Case
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            <div className="lg:col-span-7">
              <div className="bg-background/40 rounded-2xl p-6 lg:p-8 border border-white/5">
                <h4 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  Cases We Review
                </h4>
                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                  {cases.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
