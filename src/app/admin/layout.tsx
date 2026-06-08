
"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Shield, LayoutDashboard, LogOut, FileText, Settings, Loader2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
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

  return (
    <div className="min-h-screen bg-[#050A12] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/50 flex flex-col">
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
          <Link href="/admin/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider ${pathname === '/admin/dashboard' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/articles" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider ${pathname?.startsWith('/admin/articles') ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}>
            <BookOpen className="w-4 h-4" />
            Resource Center
          </Link>
          <Link href="/admin/config" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider ${pathname === '/admin/config' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}`}>
            <Settings className="w-4 h-4" />
            Config
          </Link>
        </nav>
        <div className="p-4 border-t border-white/5">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive gap-3 font-bold text-xs uppercase tracking-widest" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Terminate Session
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
