import Link from 'next/link'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-headline text-xl font-bold gold-glow">
                JL
              </div>
              <span className="font-headline text-2xl font-bold tracking-tight">MOONS</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading global specialists in cryptographic asset recovery and digital forensics. Trusted by private holders and enterprise exchanges since 2018.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="#recovery-types" className="hover:text-primary transition-colors">Recovery Types</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary transition-colors">Methodology</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Resource Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                support@jlmoons.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                24/7 Monitoring
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security Audit</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} JLMOONS RECOVERY. All rights reserved.</p>
          <p>Worldwide Digital Asset Restoration Specialists</p>
        </div>
      </div>
    </footer>
  )
}
