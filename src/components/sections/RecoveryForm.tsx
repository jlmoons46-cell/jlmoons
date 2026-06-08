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
import { Send, MessageSquare, Loader2, Sparkles, MessageCircle } from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  recoveryType: z.string().min(1, "Please select what happened"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'wallet', label: 'Lost password' },
  { id: 'hardware', label: 'Hardware wallet issue' },
  { id: 'exchange', label: 'Exchange access problem' },
  { id: 'seed', label: 'Seed phrase issue' },
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
                  Every detail about your wallet type, the date of loss, and the nature of the issue helps our specialists build a stronger recovery plan.
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
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    
                    <FormField
                      control={form.control}
                      name="recoveryType"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-lg font-bold">What happened?</FormLabel>
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
                                    className="flex items-center justify-center rounded-xl border border-white/10 bg-background/50 p-4 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all"
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

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold">Your Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" className="h-12" {...field} />
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
                            <FormLabel className="text-lg font-bold">Case Description</FormLabel>
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
                              placeholder="Tell us what happened. Include dates and any relevant details..." 
                              className="min-h-[150px] resize-none"
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

                    <div className="space-y-4">
                      <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Send className="w-5 h-5 mr-2" />}
                        Request a Case Review
                      </Button>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground text-center font-bold">
                        Receive an expert evaluation before deciding on next steps.
                      </p>
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
