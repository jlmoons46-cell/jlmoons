import { Binary, Lock, Scale, Shield } from 'lucide-react'

const reasons = [
  {
    icon: Binary,
    title: "Blockchain Forensics First",
    description: "Every case begins with technical investigation and evidence review.",
  },
  {
    icon: Lock,
    title: "Security-Focused Process",
    description: "Sensitive wallet information is handled through encrypted channels.",
  },
  {
    icon: Scale,
    title: "Transparent Assessments",
    description: "We provide realistic recovery evaluations based on technical findings.",
  },
  {
    icon: Shield,
    title: "Confidential Handling",
    description: "Client information and recovery details remain private.",
  },
]

export function WhyTrustUs() {
  return (
    <section className="py-24 bg-muted/10 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">The MOONS Advantage</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Why Clients Choose Us</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all text-center group">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <reason.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold mb-3">{reason.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
