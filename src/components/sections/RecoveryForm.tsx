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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Send, MessageSquare, Loader2, Sparkles, MessageCircle } from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is required"),
  recoveryType: z.string().min(1, "Please select a recovery type"),
  estimatedValue: z.string().min(1, "Please estimate the asset value"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

export function RecoveryForm() {
  const { toast } = useToast()
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      recoveryType: "",
      estimatedValue: "",
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
      const result = await inquireRecoveryDetails(values)
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
      title: "Request Submitted",
      description: "Our team will review your case and contact you within 72 hours.",
    })
    form.reset()
    setAiSuggestions(null)
  }

  return (
    <section id="recovery-form" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6">Start Your Recovery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Provide as much detail as possible. Every detail about your wallet type, the date of loss, and the nature of the issue helps our specialists build a stronger recovery plan.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-secondary" />
                  Quick Connect
                </h4>
                <div className="flex flex-col gap-3">
                  <Button variant="outline" className="justify-start gap-3 border-secondary/20 text-secondary hover:bg-secondary/5" asChild>
                    <a href="https://wa.me/jlmoons" target="_blank">
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp Chat
                    </a>
                  </Button>
                  <Button variant="outline" className="justify-start gap-3 border-primary/20 text-primary hover:bg-primary/5" asChild>
                    <a href="https://t.me/jlmoons" target="_blank">
                      <Send className="w-4 h-4" />
                      Telegram Support
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-card border border-white/5 gold-glow relative">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="recoveryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recovery Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="wallet">Wallet Access Recovery</SelectItem>
                                <SelectItem value="hacked">Hacked Account Recovery</SelectItem>
                                <SelectItem value="exchange">Exchange Funds Recovery</SelectItem>
                                <SelectItem value="hardware">Hardware Repair</SelectItem>
                                <SelectItem value="other">Other Digital Assets</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="estimatedValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Value (USD)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., $10,000" {...field} />
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
                            <FormLabel>Case Description</FormLabel>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-[10px] uppercase tracking-tighter text-secondary hover:text-secondary-foreground gap-1"
                              onClick={handleGetAiSuggestions}
                              disabled={isAiLoading}
                            >
                              {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                              AI Assistant
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what happened. Include wallet type, dates, and any relevant details..." 
                              className="min-h-[120px] resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Min. 20 characters. The more detail, the faster we can help.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {aiSuggestions && (
                      <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm mb-2">
                          <Sparkles className="w-4 h-4" />
                          AI Suggestions to Improve Your Case:
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {aiSuggestions}
                        </div>
                      </div>
                    )}

                    <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                      Submit Case for Review
                    </Button>
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