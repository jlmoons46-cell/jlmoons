import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    rating: 5,
    quote: "I thought my 2017 ETH was gone forever after losing my hardware wallet password. JLMOONS recovered everything within 48 hours. Absolute lifesavers.",
    author: "David M.",
    result: "$42k Recovered",
  },
  {
    rating: 5,
    quote: "Professional, transparent, and incredibly knowledgeable. They explained every step of the hacking recovery process. Highly recommend for any digital loss.",
    author: "Sarah J.",
    result: "Exchange Hack Case",
  },
  {
    rating: 5,
    quote: "I was skeptical at first, but after their free assessment, I felt confident. They recovered a legacy wallet I hadn't opened in 6 years.",
    author: "Marcus T.",
    result: "Legacy Wallet Restored",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Social Proof</h2>
          <h3 className="text-4xl lg:text-5xl font-bold mb-6">Trusted by Thousands</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 rounded-3xl bg-card border border-white/5 relative group hover:border-primary/30 transition-colors">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg italic leading-relaxed mb-8 relative z-10">"{t.quote}"</p>
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <span className="font-bold">{t.author}</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-bold uppercase tracking-widest">{t.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}