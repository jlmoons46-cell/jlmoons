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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Send, MessageSquare, Loader2, Sparkles, MessageCircle, ShieldCheck, ClipboardCheck, Binary } from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  recoveryType: z.string().min(1, "Please select what best describes your situation"),
  walletName: z.string().optional(),
  accessDetails: z.array(z.string()).default([]),
  missingWords: z.string().optional(),
  seedDetails: z.array(z.string()).default([]),
  estimatedValue: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'lost_password', label: 'Lost Wallet Password' },
  { id: 'lost_seed', label: 'Lost Seed Phrase' },
  { id: 'hardware_issue', label: 'Hardware Wallet Issue' },
  { id: 'exchange_access', label: 'Exchange Account Access' },
  { id: 'stolen_crypto', label: 'Stolen Crypto / Scam' },
  { id: 'wrong_address', label: 'Wrong Address Transaction' },
  { id: 'inheritance', label: 'Inheritance / Estate Case' },
  { id: 'other', label: 'Other Technical Issue' },
]

const walletOptions = ["Electrum", "Exodus", "Atomic", "Trust Wallet", "MetaMask", "Other"]

const accessChecklist = [
  { id: 'wallet_file', label: 'Wallet file (.dat, .json, etc.)' },
  { id: 'recovery_phrase', label: 'Recovery / Seed phrase' },
  { id: 'password_variations', label: 'Old password variations' },
  { id: 'original_device', label: 'Original device used' },
]

const seedChecklist = [
  { id: 'partial_phrase', label: 'Partial phrase fragments' },
  { id: 'wallet_address', label: 'Known wallet address' },
  { id: 'tx_history', label: 'Transaction history' },
  { id: 'backup_notes', label: 'Original backup notes' },
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
      walletName: "",
      accessDetails: [],
      missingWords: "",
      seedDetails: [],
      estimatedValue: "",
      message: "",
    },
  })

  const watchRecoveryType = form.watch("recoveryType")

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
        estimatedValue: values.estimatedValue,
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
    // Simulate API call to investigation backend
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast({
      title: "Forensic Case Registered",
      description: "Our technical team will review your intake data and contact you within 72 hours.",
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
                  Forensic Intake Portal
                </div>
                <h3 className="text-4xl font-bold leading-tight">Begin Technical Assessment</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every recovery begins with a technical intake. This data is essential for our specialists to build an accurate forensic roadmap.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-primary">
                    <ClipboardCheck className="w-5 h-5" />
                    Intake Standards
                  </h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      Confidential technical assessment
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      Feasibility determined before engagement
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      End-to-end encrypted communication
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-secondary" />
                    Secure Support
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start gap-3 border-secondary/20 text-secondary hover:bg-secondary/5 h-12" asChild>
                      <a href="https://wa.me/jlmoons" target="_blank">
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Secure Channel
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 border-primary/20 text-primary hover:bg-primary/5 h-12" asChild>
                      <a href="https://t.me/jlmoons" target="_blank">
                        <Send className="w-4 h-4" />
                        Telegram Technical Portal
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
                            <FormLabel className="text-xl font-bold flex items-center gap-2">
                              <Binary className="w-5 h-5 text-primary" />
                              Step 1: Situation Analysis
                            </FormLabel>
                            <FormDescription className="mt-2">
                              Select the scenario that best describes your current asset loss.
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

                    {/* Dynamic Case Details for Lost Password */}
                    {watchRecoveryType === 'lost_password' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary">Forensic Details: Password Recovery</h4>
                        
                        <FormField
                          control={form.control}
                          name="walletName"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>What wallet software are you using?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select wallet software" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {walletOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="accessDetails"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Do you still have access to:</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {accessChecklist.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="accessDetails"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="estimatedValue"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Approximate total asset value</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select value range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="less_1k">Less than $1,000</SelectItem>
                                  <SelectItem value="1k_10k">$1,000 to $10,000</SelectItem>
                                  <SelectItem value="10k_50k">$10,000 to $50,000</SelectItem>
                                  <SelectItem value="50k_100k">$50,000 to $100,000</SelectItem>
                                  <SelectItem value="more_100k">Over $100,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Dynamic Case Details for Lost Seed Phrase */}
                    {watchRecoveryType === 'lost_seed' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary">Forensic Details: Seed Phrase Reconstruction</h4>
                        
                        <FormField
                          control={form.control}
                          name="walletName"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Original wallet software</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select wallet software" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {walletOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="missingWords"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>How many words are missing or incorrect?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col sm:flex-row gap-6"
                                >
                                  {['1', '2', '3+'].map((val) => (
                                    <div key={val} className="flex items-center space-x-3">
                                      <RadioGroupItem value={val} id={`words-${val}`} />
                                      <Label htmlFor={`words-${val}`} className="cursor-pointer font-medium">{val} {val === '1' ? 'Word' : 'Words'}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="seedDetails"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Evidence available:</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {seedChecklist.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="seedDetails"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...(field.value || []), item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="estimatedValue"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Approximate total asset value</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select value range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="less_1k">Less than $1,000</SelectItem>
                                  <SelectItem value="1k_10k">$1,000 to $10,000</SelectItem>
                                  <SelectItem value="10k_50k">$10,000 to $50,000</SelectItem>
                                  <SelectItem value="50k_100k">$50,000 to $100,000</SelectItem>
                                  <SelectItem value="more_100k">Over $100,000</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="grid gap-8 border-t border-white/5 pt-10">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold">Step 2: Secure Contact Email</FormLabel>
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
                              <FormLabel className="text-lg font-bold">Step 3: Brief Description of Loss</FormLabel>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-[10px] uppercase tracking-tighter text-secondary hover:text-secondary-foreground gap-1"
                                onClick={handleGetAiSuggestions}
                                disabled={isAiLoading}
                              >
                                {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                AI Forensic Assistant
                              </Button>
                            </div>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the loss event. Include relevant dates, wallet software/hardware used, and any specific error messages..." 
                                className="min-h-[160px] resize-none bg-background/50 text-base leading-relaxed"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Detailed technical descriptions help our specialists determine recovery feasibility faster.
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
                          Recommended Technical Details:
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
