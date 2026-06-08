import { Wallet, TrendingUp, Landmark, Activity, ShieldCheck, FileText, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Wallet,
    title: "Wallet Recovery",
    description: "Lost access to your private keys or seed phrase? We utilize advanced cryptographic recovery techniques.",
  },
  {
    icon: TrendingUp,
    title: "Investment Scam Recovery",
    description: "Specialized tracing for stolen assets from fraudulent investment platforms and fake schemes.",
  },
  {
    icon: Landmark,
    title: "Bad Finance Broker",
    description: "Legal and technical assistance for victims of dishonest or unregulated financial brokers.",
  },
  {
    icon: Activity,
    title: "Fake Trading Scam",
    description: "Recovery services for capital stolen through manipulated trading apps and fake crypto exchanges.",
  },
  {
    icon: ShieldCheck,
    title: "Romance Scam Recovery",
    description: "Confidential assistance for victims of pig-butchering and relationship-based crypto fraud.",
  },
  {
    icon: FileText,
    title: "Loan Scam Recovery",
    description: "Assistance for victims of fraudulent lending platforms and advanced-fee loan traps.",
  },
  {
    icon: Zap,
    title: "Crypto Assets Recovery",
    description: "Comprehensive forensic reclamation for stolen NFTs, DeFi exploits, and cross-chain asset loss.",
  },
]

export function Services() {
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
              <Link 
                href="#recovery-form" 
                className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all"
              >
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
