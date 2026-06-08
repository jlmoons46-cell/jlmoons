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
    answer: "Every case undergoes an independent forensic assessment before recommendations are made."
  },
  {
    question: "Do you guarantee recovery?",
    answer: "No. Legitimate recovery providers cannot guarantee outcomes before technical analysis."
  },
  {
    question: "Is my information secure?",
    answer: "All case information is submitted through encrypted channels and handled confidentially."
  },
  {
    question: "How quickly can my case be reviewed?",
    answer: "Most cases receive an initial assessment within 24 to 72 hours."
  }
]

export function FAQ() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Direct Answers</h2>
            <h3 className="text-4xl font-bold mb-6">Common Questions</h3>
            <p className="text-muted-foreground">We believe in transparency. If you have questions about our process or security, we address them here.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-white/5 rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left font-bold hover:no-underline hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
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
