
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/toaster'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Tag, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getArticle(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  
  if (error || !data) return null
  return data
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <article className="pt-32 pb-24">
        {/* Hero Header */}
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link 
              href="/#blog" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-primary/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Knowledge Hub
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {article.tag}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  5 min read
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight uppercase tracking-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                {article.description}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container mx-auto px-4 mt-16">
          <div className="max-w-6xl mx-auto aspect-[21/9] relative rounded-[2rem] overflow-hidden border border-white/5 gold-glow">
            <Image 
              src={article.image_url} 
              alt={article.title} 
              fill 
              className="object-cover" 
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Content Body */}
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-foreground/90 leading-[1.8] text-lg whitespace-pre-wrap space-y-6">
                {article.content || "Content is currently being analyzed by our forensic team. Please check back shortly."}
              </div>
            </div>

            {/* Post-content Footer */}
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Authoritative Source</span>
                  <span className="font-bold">JLMOONS Forensic Intelligence Team</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Share Insight:</span>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <Toaster />
    </main>
  )
}
