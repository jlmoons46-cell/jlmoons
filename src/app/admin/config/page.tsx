"use client"

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Image as ImageIcon, Save, Loader2, RefreshCcw, Upload, X, Shield, Globe, Lock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type SettingKey = 'hero_image_url' | 'trust_image_1_url' | 'trust_image_2_url' | 'trust_image_3_url'

export default function AppConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_image_url: '',
    trust_image_1_url: '',
    trust_image_2_url: '',
    trust_image_3_url: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({})
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const fetchSettings = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('app_settings')
      .select('key, value')
    
    if (data) {
      const newSettings = { ...settings }
      data.forEach((item: any) => {
        newSettings[item.key] = item.value
      })
      setSettings(newSettings)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async (key: SettingKey, value: string) => {
    if (!value) return

    setIsSaving(prev => ({ ...prev, [key]: true }))
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ 
          key, 
          value,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast({
        title: "Setting Saved",
        description: `${key.replace(/_/g, ' ')} has been updated.`,
      })
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(prev => ({ ...prev, [key]: false }))
    }
  }

  const uploadImage = async (key: SettingKey, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an image.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(prev => ({ ...prev, [key]: true }))
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${key}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `assets/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath)

      setSettings(prev => ({ ...prev, [key]: publicUrl }))
      await handleSave(key, publicUrl)

      toast({
        title: "Upload Successful",
        description: "Asset has been stored and applied.",
      })
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: "Ensure the 'assets' bucket exists and is public.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div className="p-8 max-w-6xl space-y-12">
      <div>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Platform Visuals</h1>
        <p className="text-muted-foreground">Manage dynamic identity assets and trust indicators.</p>
      </div>

      <div className="grid gap-12">
        {/* Hero Section */}
        <Card className="bg-card border-white/5 gold-glow overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ImageIcon className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl font-bold uppercase tracking-tight">Hero Banner Identity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <ImageConfigItem 
              id="hero_image_url"
              label="Main Banner URL"
              value={settings.hero_image_url}
              isSaving={isSaving.hero_image_url}
              isUploading={isUploading.hero_image_url}
              onChange={(v) => setSettings(prev => ({ ...prev, hero_image_url: v }))}
              onSave={() => handleSave('hero_image_url', settings.hero_image_url)}
              onUpload={(f) => uploadImage('hero_image_url', f)}
            />
          </CardContent>
        </Card>

        {/* Trust Indicators Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold uppercase tracking-tight">Trust Indicator Visuals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <SettingCard 
              id="trust_image_1_url"
              label="Expert Forensics"
              icon={<Shield className="w-4 h-4" />}
              value={settings.trust_image_1_url}
              isSaving={isSaving.trust_image_1_url}
              isUploading={isUploading.trust_image_1_url}
              onChange={(v) => setSettings(prev => ({ ...prev, trust_image_1_url: v }))}
              onSave={() => handleSave('trust_image_1_url', settings.trust_image_1_url)}
              onUpload={(f) => uploadImage('trust_image_1_url', f)}
            />
            <SettingCard 
              id="trust_image_2_url"
              label="Global Consultations"
              icon={<Globe className="w-4 h-4" />}
              value={settings.trust_image_2_url}
              isSaving={isSaving.trust_image_2_url}
              isUploading={isUploading.trust_image_2_url}
              onChange={(v) => setSettings(prev => ({ ...prev, trust_image_2_url: v }))}
              onSave={() => handleSave('trust_image_2_url', settings.trust_image_2_url)}
              onUpload={(f) => uploadImage('trust_image_2_url', f)}
            />
            <SettingCard 
              id="trust_image_3_url"
              label="Encrypted Systems"
              icon={<Lock className="w-4 h-4" />}
              value={settings.trust_image_3_url}
              isSaving={isSaving.trust_image_3_url}
              isUploading={isUploading.trust_image_3_url}
              onChange={(v) => setSettings(prev => ({ ...prev, trust_image_3_url: v }))}
              onSave={() => handleSave('trust_image_3_url', settings.trust_image_3_url)}
              onUpload={(f) => uploadImage('trust_image_3_url', f)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingCard({ id, label, icon, value, isSaving, isUploading, onChange, onSave, onUpload }: any) {
  return (
    <Card className="bg-card border-white/5 overflow-hidden flex flex-col">
      <CardHeader className="p-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="text-secondary">{icon}</div>
          <CardTitle className="text-xs font-bold uppercase tracking-widest">{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 space-y-4">
        <div className="aspect-[4/3] relative rounded-lg overflow-hidden border border-white/10 bg-background/50 group">
          {value ? (
            <Image src={value} alt={label} fill className="object-cover" unoptimized />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <ImageIcon className="w-8 h-8" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
            <div className="relative w-full h-full border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
              <Upload className="w-6 h-6" />
              <p className="text-[10px] font-bold uppercase">Replace Asset</p>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto" 
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onUpload(file)
                }}
              />
            </div>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
        </div>
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="Source URL" 
          className="h-8 text-[10px] bg-background/30"
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-[10px] font-bold uppercase h-8 border-white/10"
          onClick={onSave}
          disabled={isSaving || isUploading}
        >
          {isSaving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
          Commit
        </Button>
      </CardFooter>
    </Card>
  )
}

function ImageConfigItem({ id, label, value, isSaving, isUploading, onChange, onSave, onUpload }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</Label>
          <div className="flex gap-2">
            <Input 
              value={value} 
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..." 
              className="bg-background/50 h-10 text-xs"
            />
            <Button size="icon" className="h-10 w-10 shrink-0" onClick={onSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="relative border-2 border-dashed rounded-2xl border-white/10 hover:border-white/20 bg-background/30 transition-all flex flex-col items-center justify-center p-8 gap-4 text-center cursor-pointer group overflow-hidden">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file)
            }}
          />
          {isUploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold">Direct Upload</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Supports PNG, JPG, WEBP</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-background/50 shadow-inner group">
        {value ? (
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <ImageIcon className="w-8 h-8 opacity-20" />
          </div>
        )}
      </div>
    </div>
  )
}