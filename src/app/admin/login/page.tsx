
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShieldCheck, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Access Granted",
        description: "Redirecting to Forensic Intelligence Dashboard.",
      })
      router.push('/admin/dashboard')
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Invalid credentials provided.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050A12] p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-card border-white/5 gold-glow relative z-10">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold uppercase tracking-tight">Forensic Portal</CardTitle>
          <CardDescription>Administrative access for JLMOONS investigators only.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Investigator Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@jlmoons.com" 
                className="bg-background/50" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Security Protocol</Label>
              <Input 
                id="password" 
                type="password" 
                className="bg-background/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 font-bold uppercase tracking-widest" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Initialize Session
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
