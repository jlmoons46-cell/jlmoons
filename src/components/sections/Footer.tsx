import Link from 'next/link'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex flex-col group">
              <span className="font-headline text-2xl font-extrabold tracking-tighter text-foreground uppercase">
                JLMOONS
              </span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">
                Digital Asset Recovery & Forensics
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              JLMOONS is a digital asset recovery and blockchain forensics firm specializing in wallet recovery, asset tracing, scam investigations, and technical recovery services.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Technical Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Forensic Services</Link></li>
              <li><Link href="#recovery-types" className="hover:text-primary transition-colors">Recovery Scenarios</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary transition-colors">Our Methodology</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition-colors">Resource Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                investigation@jlmoons.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                24/7 Forensic Monitoring
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-primary">Standards</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Engagement</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Security Audit</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Case Confidentiality</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} JLMOONS DIGITAL ASSET RECOVERY & FORENSICS. All rights reserved.</p>
          <p>Global Leaders in Cryptographic Restoration</p>
        </div>
      </div>
    </footer>
  )
}
