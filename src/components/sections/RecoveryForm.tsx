
"use client"

import { useState, useMemo } from 'react'
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
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert'
import { 
  Send, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  ClipboardCheck, 
  Binary, 
  User,
  MessageSquare,
  Phone,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required"),
  country: z.string().min(1, "Please enter your country"),
  recoveryType: z.string().min(1, "Please select your case type"),
  estimatedAssetValue: z.string().min(1, "Please enter an estimated amount"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'wallet_recovery', label: 'Wallet Recovery' },
  { id: 'scam_investigation', label: 'Scam Investigation' },
  { id: 'bad_broker', label: 'Bad Broker' },
  { id: 'investment_fraud', label: 'Investment Fraud' },
  { id: 'romance_scam', label: 'Romance Scam' },
  { id: 'other', label: 'Other Technical' },
]

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
      country: "",
      recoveryType: "wallet_recovery",
      estimatedAssetValue: "",
      message: "",
    },
  })

  const watchAmount = form.watch("estimatedAssetValue")

  const qualificationStatus = useMemo(() => {
    const value = parseFloat(watchAmount) || 0;
    if (value >= 50000) return 'priority';
    if (value < 1000 && value > 0) return 'low_threshold';
    return 'standard';
  }, [watchAmount]);

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
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        recoveryType: values.recoveryType,
        estimatedValue: watchAmount,
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
    try {
      const { error } = await supabase
        .from('recovery_requests')
        .insert([{
          ...values,
          submitted_at: new Date().toISOString(),
          qualification_status: qualificationStatus
        }])

      if (error) throw error

      toast({
        title: "Forensic Case Registered",
        description: "Our technical team will review your intake data and contact you within 72 hours.",
      })
      form.reset()
      setAiSuggestions(null)
    } catch (error: any) {
      console.error('Submission error:', error)
      toast({
        title: "Submission Error",
        description: "We encountered a technical issue. Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
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
                  Forensic Assessment
                </div>
                <h3 className="text-4xl font-bold leading-tight uppercase tracking-tight">Simplify Your Recovery</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Provide the core details of your case. Our specialists will conduct an initial technical scan based on your intake data.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-card border border-white/5 space-y-6">
                  <h4 className="font-bold flex items-center gap-2 text-primary uppercase tracking-widest text-xs">
                    <ClipboardCheck className="w-5 h-5" />
                    Technical Standards
                  </h4>
                  <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 font-bold">✓</span>
                      Instant Forensic Triage
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 font-bold">✓</span>
                      Secure 256-bit Encryption
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-0.5 font-bold">✓</span>
                      No Upfront Obligations
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="p-8 lg:p-12 rounded-[2.5rem] bg-card border border-white/5 shadow-2xl relative gold-glow">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    
                    {/* Case Type Selection - Simplified */}
                    <FormField
                      control={form.control}
                      name="recoveryType"
                      render={({ field }) => (
                        <FormItem className="space-y-6">
                          <div>
                            <FormLabel className="text-sm font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                              <Binary className="w-4 h-4" />
                              Case Classification
                            </FormLabel>
                          </div>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-3"
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
                                    className="flex items-center justify-center h-12 rounded-xl border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-[10px] font-bold uppercase tracking-widest text-center"
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

                    {/* Core Contact Info */}
                    <div className="grid gap-8">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <User className="w-3.5 h-3.5 text-primary" />
                                Full Name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="h-14 bg-background/50 border-white/5 focus:border-primary/50" {...field} />
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
                              <FormLabel className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" className="h-14 bg-background/50 border-white/5 focus:border-primary/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <Phone className="w-3.5 h-3.5 text-primary" />
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="+1..." className="h-14 bg-background/50 border-white/5 focus:border-primary/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <Globe className="w-3.5 h-3.5 text-primary" />
                                Country
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="United Kingdom" className="h-14 bg-background/50 border-white/5 focus:border-primary/50" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="estimatedAssetValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                              <AlertTriangle className="w-3.5 h-3.5 text-primary" />
                              Estimated Amount Lost ($)
                            </FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="5000" className="h-14 bg-background/50 border-white/5 focus:border-primary/50 font-mono" {...field} />
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
                              <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Investigation Details</FormLabel>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-[9px] uppercase tracking-widest text-secondary hover:text-secondary-foreground gap-1 font-black"
                                onClick={handleGetAiSuggestions}
                                disabled={isAiLoading}
                              >
                                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                AI Assistant
                              </Button>
                            </div>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe what happened..." 
                                className="min-h-[160px] resize-none bg-background/50 border-white/5 focus:border-primary/50 text-base leading-relaxed"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Status Alerts */}
                    <div className="space-y-4">
                      {qualificationStatus === 'priority' && (
                        <Alert className="bg-primary/5 border-primary/20 text-primary animate-in fade-in">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertTitle className="font-bold uppercase tracking-widest text-[10px]">Priority Tier</AlertTitle>
                          <AlertDescription className="text-xs font-medium">Your case qualifies for priority forensic triage.</AlertDescription>
                        </Alert>
                      )}
                      {qualificationStatus === 'low_threshold' && (
                        <Alert className="bg-muted/30 border-white/5 text-muted-foreground animate-in fade-in">
                          <Info className="h-4 w-4" />
                          <AlertTitle className="font-bold uppercase tracking-widest text-[10px]">Standard Review</AlertTitle>
                          <AlertDescription className="text-xs font-medium">Initial scan will be queued for technical review.</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    {aiSuggestions && (
                      <div className="p-6 rounded-2xl bg-secondary/10 border border-secondary/20 animate-in fade-in slide-in-from-top-4">
                        <div className="flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                          <Sparkles className="w-3.5 h-3.5" />
                          Forensic Recommendations
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed italic">
                          {aiSuggestions}
                        </div>
                      </div>
                    )}

                    <div className="space-y-6 pt-4">
                      <Button type="submit" size="lg" className="w-full h-16 text-lg font-black uppercase tracking-[0.2em] rounded-2xl gold-glow transition-all active:scale-95 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Send className="w-5 h-5 mr-3" />}
                        Submit Intelligence
                      </Button>
                      <p className="text-[10px] text-muted-foreground/60 text-center font-bold uppercase tracking-[0.1em]">
                        Encrypted Intake • Zero-Knowledge Protocol • Bank-Grade Security
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
