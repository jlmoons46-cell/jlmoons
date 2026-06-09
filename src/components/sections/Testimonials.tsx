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
    id: 'f1',
    rating: 5,
    quote: "I thought my 2017 ETH was gone forever. JLMOONS conducted a deep forensic analysis of my corrupted wallet file and recovered the assets within 48 hours. Their technical depth is unmatched.",
    author: "David M.",
    result: "$42K RECOVERED",
  },
  {
    id: 'f2',
    rating: 5,
    quote: "The assessment was transparent from the beginning. They explained what was technically possible and what wasn't before any work began. Their forensic roadmap gave me total clarity on the hack recovery.",
    author: "Sarah J.",
    result: "EXCHANGE HACK CASE",
  },
  {
    id: 'f3',
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
        
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          setTestimonials(fallbackTestimonials)
        }
      } catch (err) {
        console.error('Failed to load testimonials', err)
        setTestimonials(fallbackTestimonials)
      } finally {
        setIsLoading(false)
      }
    }
    loadTestimonials()
  }, [])

  // Duplicate testimonials for seamless looping in the marquee
  const loopedItems = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Social Proof</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Trusted by Thousands</h3>
        </div>
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
        </div>
      ) : (
        <div className="relative w-full overflow-hidden flex">
          {/* Subtle fade masks at the edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee Container */}
          <div className="flex gap-8 py-4 animate-marquee pause-on-hover whitespace-nowrap">
            {loopedItems.map((t, i) => (
              <div 
                key={`${t.id}-${i}`} 
                className="inline-block w-[400px] shrink-0 p-10 rounded-3xl bg-card border border-white/5 relative group hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] whitespace-normal"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating || 5)].map((_, starIndex) => (
                    <Star key={starIndex} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-lg italic leading-relaxed mb-8 relative z-10 text-foreground/90">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{t.author}</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Verified Client</span>
                  </div>
                  <span className="text-[10px] px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold uppercase tracking-widest">
                    {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Background ambient glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  )
}
