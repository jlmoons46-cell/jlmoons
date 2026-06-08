"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Save, Loader2, RefreshCcw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function AppConfigPage() {
  const [heroUrl, setHeroUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const fetchSettings = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'hero_image_url')
      .single()
    
    if (data) setHeroUrl(data.value)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ 
          key: 'hero_image_url', 
          value: heroUrl,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Settings Updated",
        description: "The Hero Image URL has been successfully modified.",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Could not save settings.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Platform Configuration</h1>
        <p className="text-muted-foreground">Manage dynamic visual elements and global application variables.</p>
      </div>

      <div className="grid gap-8">
        <Card className="bg-card border-white/5 gold-glow overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold uppercase tracking-tight">Hero Visual Identity</CardTitle>
                <CardDescription>Update the primary landing page hero image.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-url" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image Source URL</Label>
                <div className="flex gap-4">
                  <Input 
                    id="hero-url" 
                    value={heroUrl} 
                    onChange={(e) => setHeroUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..." 
                    className="bg-background/50 h-12"
                  />
                  <Button variant="outline" className="h-12 border-white/10" onClick={fetchSettings}>
                    <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live Preview</Label>
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-background/50">
                {heroUrl ? (
                  <Image 
                    src={heroUrl} 
                    alt="Preview" 
                    fill 
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic text-sm">
                    No valid image source provided
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <p className="text-xs font-bold uppercase text-primary tracking-widest">Active Hero Asset</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 p-6 border-t border-white/5 flex justify-end">
            <Button className="gold-glow font-bold uppercase tracking-widest px-8" onClick={handleSave} disabled={isSaving || !heroUrl}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Apply Configuration
            </Button>
          </CardFooter>
        </Card>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm uppercase">
            <RefreshCcw className="w-4 h-4" />
            Infrastructure Notice
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Changes applied here will reflect globally across the public landing page in real-time. We recommend using high-resolution (1200x800+) optimized images for the best forensic presentation.
          </p>
        </div>
      </div>
    </div>
  )
}
