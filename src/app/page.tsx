import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { Eligibility } from '@/components/sections/Eligibility'
import { Services } from '@/components/sections/Services'
import { Steps } from '@/components/sections/Steps'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { RecoveryForm } from '@/components/sections/RecoveryForm'
import { Testimonials } from '@/components/sections/Testimonials'
import { KnowledgeHub } from '@/components/sections/KnowledgeHub'
import { Footer } from '@/components/sections/Footer'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Eligibility />
      <Services />
      <Steps />
      <TrustStrip />
      <RecoveryForm />
      <Testimonials />
      <KnowledgeHub />
      <Footer />
      <Toaster />
    </main>
  )
}
