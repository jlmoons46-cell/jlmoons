import { ClipboardList, Search, Binary, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
  {
    id: 1,
    icon: ClipboardList,
    title: "Case Assessment",
    description: "Review submitted evidence, wallet information, and recovery circumstances.",
    position: "top"
  },
  {
    id: 2,
    icon: Search,
    title: "Technical Analysis",
    description: "Analyze wallet structures, blockchain activity, credentials, and recovery pathways.",
    position: "bottom"
  },
  {
    id: 3,
    icon: Binary,
    title: "Blockchain Investigation",
    description: "Trace transactions, identify asset movements, and document forensic findings.",
    position: "top"
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: "Recovery Execution",
    description: "Implement approved recovery strategies using secure technical procedures.",
    position: "bottom"
  }
]

export function Steps() {
  return (
    <section id="how-it-works" className="py-24 bg-[#07111F] relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Our Recovery Methodology</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">A Structured, Secure Recovery Process</h3>
          <p className="text-muted-foreground text-lg">
            Every case follows a documented forensic workflow designed to evaluate recovery feasibility, protect sensitive information, and maximize the likelihood of a successful outcome.
          </p>
        </div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative min-h-[600px] mt-12">
          {/* Main Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/15 -translate-y-1/2" />
          
          <div className="grid grid-cols-5 h-full relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center">
                {/* Connecting Vertical Line */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-white/15 h-24 ${step.position === 'top' ? 'bottom-1/2' : 'top-1/2'}`} />
                
                {/* Step Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-16 h-16 rounded-full bg-[#07111F] border border-white/15 flex items-center justify-center teal-glow group">
                     <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">
                        {step.id}
                      </span>
                    <step.icon className="w-7 h-7 text-secondary" />
                  </div>
                </div>

                {/* Content Box */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-64 text-center ${step.position === 'top' ? 'bottom-[calc(50%+120px)]' : 'top-[calc(50%+120px)]'}`}>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Final Step 5 - Destination Circle */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative z-20 w-[240px] h-[240px] rounded-full bg-secondary text-secondary-foreground p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)] transform hover:scale-105 transition-transform duration-500">
                <div className="w-12 h-12 bg-secondary-foreground/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-2">Secure Asset Restoration</h4>
                <p className="text-xs font-medium opacity-90 mb-4 leading-relaxed">
                  Recovered access, assets, or investigation results delivered securely.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent border-secondary-foreground/20 hover:bg-secondary-foreground/10 text-secondary-foreground font-bold text-[10px] uppercase tracking-wider" asChild>
                  <Link href="#recovery-form">Start Assessment <ArrowRight className="ml-2 w-3 h-3" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden space-y-12 relative">
          <div className="absolute top-0 left-6 w-[2px] h-full bg-white/10" />
          
          {[...steps, { id: 5, icon: CheckCircle2, title: "Secure Asset Restoration", description: "Recovered access, assets, or investigation results are delivered securely to the client." }].map((step, index) => (
            <div key={step.id} className="relative pl-16 flex items-start gap-4">
              <div className={`absolute left-0 w-12 h-12 rounded-full border border-white/15 bg-[#07111F] flex items-center justify-center z-10 ${step.id === 5 ? 'bg-secondary border-secondary' : ''}`}>
                <step.icon className={`w-5 h-5 ${step.id === 5 ? 'text-secondary-foreground' : 'text-secondary'}`} />
              </div>
              <div>
                <h4 className={`text-xl font-bold mb-2 ${step.id === 5 ? 'text-secondary' : ''}`}>{step.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  {step.description}
                </p>
                {step.id === 5 && (
                  <Button size="sm" className="mt-4 gold-glow" asChild>
                    <Link href="#recovery-form">Start Your Assessment</Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
