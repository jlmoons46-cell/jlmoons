"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

const initialImages = [
  {
    id: 'trust_image_1_url',
    title: 'Expert Forensics',
    desc: 'Certified white-hat researchers.',
    hint: 'security expert',
    default: 'https://picsum.photos/seed/jlmoons-expert/600/400'
  },
  {
    id: 'trust_image_2_url',
    title: 'Global Consultations',
    desc: 'Secure bridging across borders.',
    hint: 'business meeting',
    default: 'https://picsum.photos/seed/jlmoons-meeting/600/400'
  },
  {
    id: 'trust_image_3_url',
    title: 'Encrypted Systems',
    desc: 'Bank-grade security protocols.',
    hint: 'digital security',
    default: 'https://picsum.photos/seed/jlmoons-system/600/400'
  }
]

export function TrustStrip() {
  const [images, setImages] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTrustImages() {
      try {
        const { data, error } = await supabase
          .from('app_settings')
          .select('key, value')
          .in('key', initialImages.map(img => img.id))
        
        if (data) {
          const loaded: Record<string, string> = {}
          data.forEach((item: any) => {
            loaded[item.key] = item.value
          })
          setImages(loaded)
        }
      } catch (err) {
        console.error('Failed to load trust images', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadTrustImages()
  }, [])

  return (
    <section className="py-24 bg-background border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialImages.map((img) => (
            <div key={img.id} className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 bg-card/50">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary/20" />
                </div>
              ) : (
                <Image 
                  src={images[img.id] || img.default} 
                  alt={img.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  data-ai-hint={img.hint}
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h4 className="text-xl font-bold mb-1">{img.title}</h4>
                <p className="text-sm text-muted-foreground">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}