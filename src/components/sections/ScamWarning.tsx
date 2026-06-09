import { ShieldAlert, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const signs = [
  "Conduct technical assessments before making claims",
  "Explain recovery limitations clearly",
  "Maintain transparent communication",
  "Protect sensitive wallet information",
  "Avoid unrealistic guarantees"
]

export function ScamWarning() {
  return (
    <section className="py-24 bg-destructive/5 border-y border-destructive/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-destructive/20 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  Industry Warning
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                  How to Identify Legitimate Recovery Providers
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The digital asset recovery space is unfortunately filled with fraudulent actors. We prioritize transparency and education to help you distinguish expert forensic services from deceptive practices.
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="h-14 px-8 border-destructive/20 hover:bg-destructive/10 text-foreground font-bold uppercase tracking-widest group" asChild>
                    <Link href="#recovery-form">
                      Get Secure Assessment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-7">
                <div className="bg-background/40 rounded-2xl p-6 lg:p-8 border border-white/5 space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <span className="w-1.5 h-6 bg-destructive rounded-full" />
                    Legitimate Service Standards
                  </h3>
                  <div className="grid gap-4">
                    {signs.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 flex items-start gap-3 text-xs text-muted-foreground italic">
                    <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
                    <span>Always verify credentials and beware of any provider demanding upfront payment for "guaranteed" results without a technical review.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
