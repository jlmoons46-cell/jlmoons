"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Send, MessageSquare, Loader2, Sparkles, MessageCircle, ShieldCheck, ClipboardCheck } from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  recoveryType: z.string().min(1, "Please select what best describes your situation"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'lost_password', label: 'Lost Wallet Password' },
  { id: 'lost_seed', label: 'Lost Seed Phrase' },
  { id: 'hardware_issue', label: 'Hardware Wallet Issue' },
  { id: 'exchange_access', label: 'Exchange Account Access Problem' },
  { id: 'stolen_crypto', label: 'Stolen Crypto / Scam' },
  { id: 'wrong_address', label: 'Sent Funds to Wrong Address' },
  { id: 'inheritance', label: 'Inheritance / Estate Recovery' },
  { id: 'other', label: 'Other' },
]

export function RecoveryForm() {
  const { toast } = useToast()
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      recoveryType: "",
      message: "",
    },
  })

  async function handleGetAiSuggestions() {
    const values = form.getValues()
    if (values.message.length < 20) {
      toast({
        title: "More details needed",
        description: "Please provide at least 20 characters in your message to get AI suggestions.",
        variant: "destructive",
      })
      return
    }

    setIsAiLoading(true)
    try {
      const result = await inquireRecoveryDetails({
        email: values.email,
        recoveryType: values.recoveryType,
        message: values.message
      })
      setAiSuggestions(result.suggestions)
    } catch (error) {
      toast({
        title: "AI Service Error",
        description: "Could not generate suggestions at this time.",
        variant: "destructive",
      })
    } finally {
      setIsAiLoading(false)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Intake Request Submitted",
      description: "Our forensic team will review your case and contact you within 72 hours.",
    })
    form.reset()
    setAiSuggestions(null)
  }

  return (
    <section id="recovery-form" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  Secure Intake Portal
                </div>
                <h3 className="text-4xl font-bold leading-tight">Start Your Forensic Assessment</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every recovery case begins with a detailed technical intake. This information is critical for our specialists to build an accurate recovery roadmap.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-primary">
                    <ClipboardCheck className="w-5 h-5" />
                    What to Expect
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      Confidential assessment with no obligation
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      Technical feasibility determined before work
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      Direct communication with forensic experts
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                    Immediate Support
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start gap-3 border-secondary/20 text-secondary hover:bg-secondary/5 h-12" asChild>
                      <a href="https://wa.me/jlmoons" target="_blank">
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Secure Chat
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 border-primary/20 text-primary hover:bg-primary/5 h-12" asChild>
                      <a href="https://t.me/jlmoons" target="_blank">
                        <Send className="w-4 h-4" />
                        Telegram Technical Support
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="p-8 lg:p-10 rounded-3xl bg-card border border-white/5 shadow-2xl relative">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    
                    <FormField
                      control={form.control}
                      name="recoveryType"
                      render={({ field }) => (
                        <FormItem className="space-y-6">
                          <div>
                            <FormLabel className="text-xl font-bold">Step 1: What best describes your situation?</FormLabel>
                            <FormDescription className="mt-2">
                              Select the primary issue to begin the tailored intake process.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                              {recoveryOptions.map((option) => (
                                <div key={option.id}>
                                  <RadioGroupItem
                                    value={option.id}
                                    id={option.id}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={option.id}
                                    className="flex items-center h-full rounded-xl border border-white/10 bg-background/50 p-4 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-sm font-semibold"
                                  >
                                    {option.label}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-8 border-t border-white/5 pt-10">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Step 2: Your Professional Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="name@domain.com" className="h-14 bg-background/50" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center mb-1">
                              <FormLabel className="text-lg font-bold">Step 3: Preliminary Case Description</FormLabel>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-[10px] uppercase tracking-tighter text-secondary hover:text-secondary-foreground gap-1"
                                onClick={handleGetAiSuggestions}
                                disabled={isAiLoading}
                              >
                                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                Forensic Assistant
                              </Button>
                            </div>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the loss event. Include relevant dates, wallet software/hardware used, and any specific error messages..." 
                                className="min-h-[180px] resize-none bg-background/50 text-base leading-relaxed"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              The more technical detail provided, the faster our specialists can determine recovery feasibility.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {aiSuggestions && (
                      <div className="p-5 rounded-2xl bg-secondary/10 border border-secondary/20 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-3">
                          <Sparkles className="w-4 h-4" />
                          Recommended Forensic Details:
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed italic">
                          {aiSuggestions}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-4">
                      <Button type="submit" size="lg" className="w-full h-16 text-xl font-bold rounded-2xl shadow-xl transition-all active:scale-95" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : <Send className="w-6 h-6 mr-3" />}
                        Submit for Technical Review
                      </Button>
                      <div className="space-y-2">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground text-center font-bold">
                          Receive an expert evaluation before deciding on next steps.
                        </p>
                        <p className="text-[10px] text-muted-foreground/60 text-center italic">
                          All submissions are encrypted using 256-bit bank-grade protocols.
                        </p>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
