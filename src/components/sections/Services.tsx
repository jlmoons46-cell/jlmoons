import { Wallet, Key, ShieldAlert, Landmark, Cpu, Smartphone, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: Wallet,
    title: "Wallet Recovery",
    description: "Lost your seed phrase or private keys? We specialize in recovering access to dormant and locked wallets.",
  },
  {
    icon: Key,
    title: "Password Recovery",
    description: "Forgotten the password to your encrypted wallet files? Our brute-force and decryption experts can help.",
  },
  {
    icon: ShieldAlert,
    title: "Hacked Account Recovery",
    description: "Victim of a social engineering or phishing attack? We work to secure and reclaim your compromised digital identity.",
  },
  {
    icon: Landmark,
    title: "Exchange Recovery",
    description: "Funds stuck on a defunct or uncooperative exchange? Our legal and technical team navigates the complexity.",
  },
  {
    icon: Cpu,
    title: "Hardware Wallet Recovery",
    description: "Physical damage to your Ledger, Trezor or Coldcard? We perform hardware repairs and firmware bypasses.",
  },
  {
    icon: Smartphone,
    title: "Mobile Wallet Recovery",
    description: "Locked out of your phone or mobile-based crypto app? Secure extraction for iOS and Android environments.",
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