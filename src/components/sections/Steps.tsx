import { ClipboardList, Search, Binary, ShieldCheck } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: "Submit Case Details",
    description: "Provide wallet information and recovery circumstances to begin your intake.",
  },
  {
    icon: Search,
    title: "Technical Feasibility Review",
    description: "We analyze the data to determine potential recovery pathways and technical risks.",
  },
  {
    icon: Binary,
    title: "Recovery Strategy",
    description: "A tailored recovery plan is prepared based on our detailed forensic findings.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Resolution",
    description: "Recovered access or final findings are delivered through our secure channels.",
  },
]

export function Steps() {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Our Process</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Recovery in 4 Simple Steps</h3>
          <p className="text-muted-foreground text-lg">We have streamlined the complex world of cryptographic recovery into a transparent, guided journey focused on technical accuracy and security.</p>
        </div>

        <div className="relative">
          {/* Connecting Line Desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-card border-4 border-background flex items-center justify-center text-primary teal-glow">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <step.icon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
