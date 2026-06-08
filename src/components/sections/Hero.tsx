import { Button } from '@/components/ui/button'
import { ShieldCheck, ArrowRight, Users, CheckCircle, Clock, DollarSign } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" />
              Trusted Recovery Specialists Worldwide
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Recover Lost Crypto Assets with <span className="text-primary italic">Forensic Precision</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              When access is lost, funds are misplaced, or digital assets become inaccessible, our blockchain investigators and recovery specialists conduct a comprehensive forensic assessment to identify the safest and most effective recovery path. Confidential, evidence-driven, and handled by experts.
            </p>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold gold-glow" asChild>
                  <Link href="#recovery-form">Start Your Confidential Recovery Assessment</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-white/10 hover:bg-white/5" asChild>
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground/80 flex items-center gap-2 px-1">
                <span className="text-primary font-bold">✓</span> Confidential case review • No obligation • Secure submission
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary flex items-center gap-1">
                  <DollarSign className="w-5 h-5" /> 8M+
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Recovered</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary flex items-center gap-1">
                  <Users className="w-5 h-5" /> 3,800+
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Cases</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary flex items-center gap-1">
                  <CheckCircle className="w-5 h-5" /> 94%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Success</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary flex items-center gap-1">
                  <Clock className="w-5 h-5" /> 72hr
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">Avg Response</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-500">
               <Image 
                src="https://picsum.photos/seed/jlmoons-hero/1200/800" 
                alt="Digital Security" 
                fill 
                className="object-cover opacity-50 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" 
                data-ai-hint="digital connection"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl">
                <div className="text-primary font-bold mb-1 italic">Real-time Dashboard</div>
                <div className="text-sm text-muted-foreground leading-relaxed">Our proprietary secure portal allows clients to track their recovery status 24/7 with end-to-end encryption.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed italic">
            "Every recovery case is unique. We prioritize forensic accuracy, security, and transparency at every stage of the process. Our assessments are based on technical evidence—not assumptions—allowing clients to make informed decisions with confidence."
          </p>
        </div>
      </div>
    </section>
  )
}
