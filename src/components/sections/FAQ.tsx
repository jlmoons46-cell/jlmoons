"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I know if recovery is possible?",
    answer: "Every case undergoes an independent forensic assessment before recommendations are made. We analyze the technical data, wallet structures, and blockchain evidence to provide a realistic evaluation of recovery pathways."
  },
  {
    question: "Do you guarantee recovery?",
    answer: "No. Legitimate recovery providers cannot guarantee outcomes before technical analysis. We prioritize forensic honesty, providing you with clear expectations based on the technical complexity of your specific case."
  },
  {
    question: "Is my information secure?",
    answer: "Security is our foundation. All case information is submitted through encrypted channels, and we utilize bank-grade protocols to ensure your sensitive data remains confidential throughout the entire investigation."
  },
  {
    question: "How quickly can my case be reviewed?",
    answer: "Most cases receive an initial forensic assessment within 24 to 72 hours. Our team works diligently to provide you with a comprehensive review as quickly as the technical evidence allows."
  }
]

export function FAQ() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Direct Answers</h2>
            <h3 className="text-4xl font-bold mb-6">Common Questions & Concerns</h3>
            <p className="text-muted-foreground">
              We understand the skepticism in the digital asset recovery space. We address these common concerns directly to ensure you have full clarity before proceeding with your recovery case.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-white/5 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
