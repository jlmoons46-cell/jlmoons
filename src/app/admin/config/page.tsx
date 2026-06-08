"use client"

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Save, Loader2, RefreshCcw, Upload, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function AppConfigPage() {
  const [heroUrl, setHeroUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
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

  const handleSave = async (urlToSave?: string) => {
    const finalUrl = urlToSave || heroUrl
    if (!finalUrl) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ 
          key: 'hero_image_url', 
          value: finalUrl,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Configuration Applied",
        description: "The platform's visual identity has been updated.",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Could not save configuration.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `hero-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `hero/${fileName}`

      // Ensure you have a 'assets' bucket created in Supabase Storage with public access
      const { data, error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath)

      setHeroUrl(publicUrl)
      
      // Auto-save the new URL to settings
      await handleSave(publicUrl)

      toast({
        title: "Upload Successful",
        description: "New hero asset has been stored and applied.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: "Ensure the 'assets' bucket exists in Supabase Storage and is public.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadImage(file)
  }, [])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

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
                <CardDescription>Update the primary landing page hero image via URL or Direct Upload.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="hero-url" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Source URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="hero-url" 
                      value={heroUrl} 
                      onChange={(e) => setHeroUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..." 
                      className="bg-background/50 h-10 text-xs"
                    />
                    <Button variant="outline" className="h-10 border-white/10 shrink-0" onClick={fetchSettings}>
                      <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-bold tracking-widest">Or Upload Directly</span>
                  </div>
                </div>

                <div 
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={cn(
                    "relative border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center p-8 gap-4 text-center cursor-pointer overflow-hidden",
                    isDragging ? "border-primary bg-primary/5 scale-[0.98]" : "border-white/10 hover:border-white/20 bg-background/30",
                    isUploading && "pointer-events-none opacity-50"
                  )}
                >
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) uploadImage(file)
                    }}
                    accept="image/*"
                  />
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold">Drag & Drop Image</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Supports PNG, JPG, WEBP (Max 5MB)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live Visual Preview</Label>
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-background/50 shadow-inner group">
                  {heroUrl ? (
                    <>
                      <Image 
                        src={heroUrl} 
                        alt="Preview" 
                        fill 
                        className="object-cover transition-transform group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <p className="text-[10px] font-bold uppercase text-primary tracking-widest bg-background/80 backdrop-blur px-2 py-1 rounded">Active Asset</p>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setHeroUrl('')}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2 p-6 text-center">
                      <ImageIcon className="w-8 h-8 opacity-20" />
                      <p className="italic text-xs leading-relaxed">No valid image source currently active for this identity.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-white/5 p-6 border-t border-white/5 flex justify-end">
            <Button 
              className="gold-glow font-bold uppercase tracking-widest px-10 h-12" 
              onClick={() => handleSave()} 
              disabled={isSaving || isUploading || !heroUrl}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Commit Configuration
            </Button>
          </CardFooter>
        </Card>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm uppercase">
            <ImageIcon className="w-4 h-4" />
            Infrastructure Requirement
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Direct uploads utilize <strong>Supabase Storage</strong>. Ensure a public bucket named <code className="bg-primary/20 text-primary px-1 rounded">assets</code> is created in your project dashboard before uploading. High-resolution (2000px+) optimized images are recommended for the most authoritative forensic presentation.
          </p>
        </div>
      </div>
    </div>
  )
}
