
"use client"

import { useState, useEffect } from 'react'
import { Star, Quote, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Testimonial = {
  id: string
  rating: number
  quote: string
  author: string
  result: string
}

const fallbackTestimonials = [
  {
    rating: 5,
    quote: "I thought my 2017 ETH was gone forever. JLMOONS conducted a deep forensic analysis of my corrupted wallet file and recovered the assets within 48 hours. Their technical depth is unmatched.",
    author: "David M.",
    result: "$42K RECOVERED",
  },
  {
    rating: 5,
    quote: "The assessment was transparent from the beginning. They explained what was technically possible and what wasn't before any work began. Their forensic roadmap gave me total clarity on the hack recovery.",
    author: "Sarah J.",
    result: "EXCHANGE HACK CASE",
  },
  {
    rating: 5,
    quote: "After losing access to a hardware wallet that had been inactive for years, the team identified the issue during their forensic review and guided me through a successful recovery process. Highly recommended.",
    author: "Marcus T.",
    result: "LEGACY WALLET RESTORED",
  },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)
        
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          setTestimonials(fallbackTestimonials as any)
        }
      } catch (err) {
        console.error('Failed to load testimonials', err)
        setTestimonials(fallbackTestimonials as any)
      } finally {
        setIsLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Social Proof</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Trusted by Thousands</h3>
        </div>

        {isLoading ? (
          <div className="h-48 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.id || i} className="p-10 rounded-3xl bg-card border border-white/5 relative group hover:border-primary/30 transition-colors h-full flex flex-col">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic leading-relaxed mb-8 relative z-10 flex-grow">"{t.quote}"</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                  <span className="font-bold">{t.author}</span>
                  <span className="text-[10px] px-3 py-1 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-widest">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
