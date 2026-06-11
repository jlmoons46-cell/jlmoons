
"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Shield, LayoutDashboard, LogOut, FileText, Settings, Loader2, BookOpen, Star, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(!!session)
      }
    }
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(!!session)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, pathname])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#050A12] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/articles", label: "Resource Center", icon: BookOpen },
    { href: "/admin/testimonials", label: "Success Stories", icon: Star },
    { href: "/admin/config", label: "Config", icon: Settings },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card/50 border-r border-white/5">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex flex-col group">
          <span className="font-headline text-xl font-extrabold tracking-tighter text-foreground uppercase">
            JLMOONS
          </span>
          <span className="text-[8px] text-primary font-bold uppercase tracking-[0.2em] -mt-1">
            Admin Intelligence
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname?.startsWith(link.href))
          return (
            <Link 
              key={link.href}
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive gap-3 font-bold text-xs uppercase tracking-widest" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Terminate Session
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050A12] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <SidebarContent />
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden h-16 border-b border-white/5 bg-card/50 flex items-center justify-between px-4 sticky top-0 z-50">
        <Link href="/admin/dashboard" className="flex flex-col group">
          <span className="font-headline text-lg font-extrabold tracking-tighter text-foreground uppercase">
            JLMOONS
          </span>
        </Link>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-[#050A12] border-white/5">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 overflow-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
