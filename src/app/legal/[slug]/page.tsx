
import { supabase } from '@/lib/supabase'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { Shield, Lock, FileText, Scale } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const slugToKeyMap: Record<string, string> = {
  'privacy-policy': 'legal_privacy_policy',
  'terms-of-engagement': 'legal_terms_of_engagement',
  'security-audit': 'legal_security_audit',
  'case-confidentiality': 'legal_case_confidentiality',
}

const slugToTitleMap: Record<string, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-of-engagement': 'Terms of Engagement',
  'security-audit': 'Security Audit',
  'case-confidentiality': 'Case Confidentiality',
}

const slugToIconMap: Record<string, any> = {
  'privacy-policy': Lock,
  'terms-of-engagement': Scale,
  'security-audit': Shield,
  'case-confidentiality': FileText,
}

async function getLegalContent(slug: string) {
  const key = slugToKeyMap[slug]
  if (!key) return null

  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', key)
    .single()
  
  if (error || !data) return null
  return data.value
}

export default async function LegalPage({ params }: { params: { slug: string } }) {
  const content = await getLegalContent(params.slug)
  const title = slugToTitleMap[params.slug]
  const Icon = slugToIconMap[params.slug] || FileText

  if (!content || !title) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-40 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Institutional Header */}
            <div className="space-y-8 text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6">
                <Icon className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">Institutional Standard</div>
                <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                  {title}
                </h1>
                <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-16 rounded-[2.5rem] bg-card/50 border border-white/5 gold-glow backdrop-blur-sm">
              <div className="prose prose-invert prose-lg max-w-none">
                <div className="text-foreground/80 leading-[2] text-lg whitespace-pre-wrap font-medium">
                  {content}
                </div>
              </div>
              
              <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Last Technical Review</span>
                  <span className="font-mono text-xs opacity-60 uppercase">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground italic">
                  End-to-End Encrypted Governance
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 max-w-2xl mx-auto">
              This document is a formal declaration of JLMOONS operational standards. Unauthorized duplication or reproduction is strictly prohibited.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
