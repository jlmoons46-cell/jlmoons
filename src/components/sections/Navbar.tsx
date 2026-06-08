"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Send, Phone, Shield } from 'lucide-react'

export function Navbar() {
  return (
    <header className="glass-nav">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-headline text-xl font-bold gold-glow group-hover:scale-105 transition-transform">
            JL
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">MOONS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          <Link href="#blog" className="hover:text-primary transition-colors">Knowledge Hub</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-secondary hover:text-secondary-foreground" asChild>
            <a href="https://t.me/jlmoons" target="_blank" rel="noopener noreferrer">
              <Send className="w-4 h-4" />
              Telegram
            </a>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 hover:border-primary/50" asChild>
             <Link href="#contact">Contact</Link>
          </Button>
          <Button size="sm" className="gold-glow animate-pulse-subtle" asChild>
            <Link href="#recovery-form">Start Recovery</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}