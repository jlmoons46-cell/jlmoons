import { CheckCircle2, ShieldCheck, Binary, Lock, Scale, Shield } from 'lucide-react'

const cases = [
  "Lost Wallet Passwords",
  "Hardware Wallet Access Issues",
  "Exchange Account Recovery",
  "Seed Phrase Reconstruction",
  "Blockchain Tracing & Investigations",
  "Estate & Inheritance Recovery"
]

const differentiators = [
  "Evidence-Based Recovery Assessments",
  "Blockchain Investigation Specialists",
  "Confidential Case Handling",
  "Transparent Recovery Feasibility Reviews",
  "Structured Recovery Methodologies",
  "Secure Asset Restoration Process"
]

export function WhyTrustUs() {
  return (
    <section className="py-24 bg-muted/10 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">The MOONS Standards</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Why Clients Trust JLMOONS</h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Forensic Recovery Backed by Technical Expertise. Every case is evaluated through a structured forensic process designed to identify recovery opportunities while maintaining strict confidentiality and security standards.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Common Cases */}
          <div className="p-8 lg:p-12 rounded-3xl bg-card border border-white/5 hover:border-primary/20 transition-all group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Binary className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold">Cases We Commonly Handle</h4>
            </div>
            <div className="grid gap-4">
              {cases.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <span className="text-muted-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Differentiators */}
          <div className="p-8 lg:p-12 rounded-3xl bg-card border border-white/5 hover:border-secondary/20 transition-all group">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold">What Sets JLMOONS Apart</h4>
            </div>
            <div className="grid gap-4">
              {differentiators.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <span className="text-muted-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Confidential</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Zero-Knowledge Protocols</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Binary className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Forensic</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Evidence-Based Audits</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Secure</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Bank-Grade Encryption</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Scale className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Transparent</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Clear Feasibility Roadmap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
