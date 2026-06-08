import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const articles = [
  {
    tag: "Security",
    title: "How to Secure Your Crypto Wallet Against Social Engineering",
    description: "Learn the latest tactics hackers use and how to build a robust defense for your digital assets.",
    image: "https://picsum.photos/seed/jlmoons-blog1/400/300",
  },
  {
    tag: "Recovery",
    title: "The Anatomy of a Hardware Wallet Forensic Recovery",
    description: "A deep dive into the technical process of extracting data from physically damaged devices.",
    image: "https://picsum.photos/seed/jlmoons-blog2/400/300",
  },
  {
    tag: "Education",
    title: "Understanding Seed Phrases: Why Your Backup Might Be At Risk",
    description: "Common mistakes users make when storing mnemonic phrases and how to fix them today.",
    image: "https://picsum.photos/seed/jlmoons-blog3/400/300",
  },
]

export function KnowledgeHub() {
  return (
    <section id="blog" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Knowledge Hub</h2>
            <h3 className="text-4xl lg:text-5xl font-bold">Expert Insights & Education</h3>
          </div>
          <Button variant="outline" className="border-secondary/20 hover:bg-secondary/5" asChild>
            <Link href="#">Load More Articles <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden bg-card border border-white/5 hover:border-secondary/50 transition-all">
              <div className="relative h-56 w-full">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  data-ai-hint="crypto technology"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase">
                    {article.tag}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-xl font-bold mb-4 leading-tight group-hover:text-secondary transition-colors">
                  {article.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {article.description}
                </p>
                <Link href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors">
                  Read Article <BookOpen className="ml-2 w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}