import Image from 'next/image'

export function TrustStrip() {
  return (
    <section className="py-24 bg-background border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
            <Image 
              src="https://picsum.photos/seed/jlmoons-expert/600/400" 
              alt="Expert Analysis" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint="security expert"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h4 className="text-xl font-bold mb-1">Expert Forensics</h4>
              <p className="text-sm text-muted-foreground">Certified white-hat researchers.</p>
            </div>
          </div>
          
          <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
            <Image 
              src="https://picsum.photos/seed/jlmoons-meeting/600/400" 
              alt="Secure Lab" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint="business meeting"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h4 className="text-xl font-bold mb-1">Global Consultations</h4>
              <p className="text-sm text-muted-foreground">Secure bridging across borders.</p>
            </div>
          </div>

          <div className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10">
            <Image 
              src="https://picsum.photos/seed/jlmoons-system/600/400" 
              alt="Proprietary Tech" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              data-ai-hint="digital security"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h4 className="text-xl font-bold mb-1">Encrypted Systems</h4>
              <p className="text-sm text-muted-foreground">Bank-grade security protocols.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}