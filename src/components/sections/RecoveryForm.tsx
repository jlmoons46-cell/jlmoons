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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert'
import { 
  Send, 
  MessageSquare, 
  Loader2, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  ClipboardCheck, 
  Binary, 
  Activity, 
  ShieldAlert,
  Calendar as CalendarIcon,
  Hash,
  Link2,
  Wallet as WalletIcon,
  AlertTriangle,
  ArrowRightLeft,
  Users,
  Info,
  CheckCircle2,
  User,
  Globe,
  Phone,
  Upload
} from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required"),
  country: z.string().min(1, "Please enter your country"),
  recoveryType: z.string().min(1, "Please select what best describes your situation"),
  walletName: z.string().optional(),
  accessDetails: z.array(z.string()).default([]),
  missingWords: z.string().optional(),
  seedDetails: z.array(z.string()).default([]),
  hardwareDevice: z.string().optional(),
  hardwareIssue: z.string().optional(),
  // Fake Trading fields
  exchangeName: z.string().optional(),
  platformUrl: z.string().optional(),
  withdrawalBlocked: z.string().optional(),
  feesRequested: z.string().optional(),
  totalDeposited: z.string().optional(),
  // Scam specific fields
  scamType: z.string().optional(),
  amountLost: z.string().optional(),
  cryptoCurrency: z.string().optional(),
  incidentDate: z.string().optional(),
  scamWalletAddress: z.string().optional(),
  transactionHash: z.string().optional(),
  scammerWebsite: z.string().optional(),
  scammerContact: z.string().optional(),
  // Wrong Address specific fields
  sendingWallet: z.string().optional(),
  destinationWallet: z.string().optional(),
  destinationType: z.string().optional(),
  // Estate specific fields
  relationship: z.string().optional(),
  estateDetails: z.array(z.string()).default([]),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'lost_password', label: 'Lost Wallet Password' },
  { id: 'lost_seed', label: 'Lost Seed Phrase' },
  { id: 'hardware_issue', label: 'Hardware Wallet Issue' },
  { id: 'fake_trading', label: 'Fake Trading Scam' },
  { id: 'stolen_crypto', label: 'Stolen Crypto / Scam' },
  { id: 'wrong_address', label: 'Wrong Address Transaction' },
  { id: 'inheritance', label: 'Inheritance / Estate Case' },
  { id: 'other', label: 'Other Technical Issue' },
]

const scamOptions = [
  "Investment Scam",
  "Pig Butchering",
  "Fake Exchange",
  "Romance Scam",
  "Impersonation Scam",
  "Wallet Drainer",
  "Phishing Attack",
  "Other"
]

const walletOptions = ["Electrum", "Exodus", "Atomic", "Trust Wallet", "MetaMask", "Other"]

const exchangeOptions = [
  "Binance (Clone)", 
  "MetaTrader 4/5 (Unregulated)", 
  "Fake Exchange", 
  "Telegram Trading Bot", 
  "WhatsApp Investment Group",
  "Other"
]

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

const estateChecklist = [
  { id: 'death_cert', label: 'Death certificate' },
  { id: 'device_access', label: 'Device access' },
  { id: 'wallet_info', label: 'Wallet information' },
  { id: 'legal_auth', label: 'Legal authorization' },
]

const relationshipOptions = ["Spouse", "Child", "Executor", "Attorney", "Other"]

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
      recoveryType: "",
      walletName: "",
      accessDetails: [],
      missingWords: "",
      seedDetails: [],
      hardwareDevice: "",
      hardwareIssue: "",
      exchangeName: "",
      platformUrl: "",
      withdrawalBlocked: "",
      feesRequested: "",
      totalDeposited: "",
      scamType: "",
      amountLost: "",
      cryptoCurrency: "",
      incidentDate: "",
      scamWalletAddress: "",
      transactionHash: "",
      scammerWebsite: "",
      scammerContact: "",
      sendingWallet: "",
      destinationWallet: "",
      destinationType: "",
      relationship: "",
      estateDetails: [],
      message: "",
    },
  })

  const watchRecoveryType = form.watch("recoveryType")
  const watchEstimatedValue = form.watch("totalDeposited") || "0"
  const watchAmountLost = form.watch("amountLost") || "0"

  const qualificationStatus = useMemo(() => {
    const value = parseFloat(watchEstimatedValue) || parseFloat(watchAmountLost) || 0;
    if (value >= 50000) return 'priority';
    if (value < 1000 && value > 0) return 'low_threshold';
    return 'standard';
  }, [watchEstimatedValue, watchAmountLost]);

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
        estimatedValue: values.totalDeposited || values.amountLost || "0",
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
                  Comprehensive Solutions
                </div>
                <h3 className="text-4xl font-bold leading-tight">Precision Technical Assessment</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Every restoration begins with a comprehensive technical intake. This data is essential for our specialists to build an accurate forensic roadmap.
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
                  <h4 className="font-bold flex items-center gap-2 text-secondary">
                    <MessageCircle className="w-5 h-5" />
                    Secure Support
                  </h4>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start gap-3 border-white/10 hover:bg-white/5 h-12" asChild>
                      <a href="#" target="_blank">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        WhatsApp Secure Channel
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 border-white/10 hover:bg-white/5 h-12" asChild>
                      <a href="#" target="_blank">
                        <Send className="w-4 h-4 text-primary" />
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

                    {/* Case Type: Lost Password */}
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
                      </div>
                    )}

                    {/* Case Type: Fake Trading Scam */}
                    {watchRecoveryType === 'fake_trading' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Forensic Details: Fake Trading Platform Investigation
                        </h4>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="exchangeName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Platform Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ApexCrypto" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="platformUrl"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <Link2 className="w-4 h-4 text-primary" />
                                  Platform Website URL
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="withdrawalBlocked"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Withdrawal Blocked?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    {['Yes', 'No'].map((val) => (
                                      <div key={val} className="flex items-center space-x-3">
                                        <RadioGroupItem value={val.toLowerCase()} id={`withdrawal-${val}`} />
                                        <Label htmlFor={`withdrawal-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="feesRequested"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Additional Fees Requested?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    {['Yes', 'No'].map((val) => (
                                      <div key={val} className="flex items-center space-x-3">
                                        <RadioGroupItem value={val.toLowerCase()} id={`fees-${val}`} />
                                        <Label htmlFor={`fees-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="totalDeposited"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-primary" />
                                Total Deposited Amount ($)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 15000" className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="p-4 rounded-xl border border-dashed border-white/20 bg-background/30 flex flex-col items-center justify-center gap-4 py-8">
                          <Upload className="w-8 h-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="text-sm font-bold">Account Screenshot Upload</p>
                            <p className="text-xs text-muted-foreground mt-1">Upload dashboard showing balance/error (Max 5MB)</p>
                          </div>
                          <Button variant="outline" size="sm" type="button" className="text-xs h-8">Select File</Button>
                        </div>
                      </div>
                    )}

                    {/* Standard Contact Info Section */}
                    <div className="grid gap-8 border-t border-white/5 pt-10">
                      {qualificationStatus === 'low_threshold' && (
                        <Alert variant="default" className="bg-muted/30 border-muted/50 text-muted-foreground animate-in fade-in">
                          <Info className="h-4 w-4" />
                          <AlertTitle className="font-bold text-foreground">Technical Notice</AlertTitle>
                          <AlertDescription className="text-sm leading-relaxed">
                            Due to the complexity of forensic recovery work, we typically prioritize cases above a certain asset threshold. You may still submit, but review times may be extended.
                          </AlertDescription>
                        </Alert>
                      )}

                      {qualificationStatus === 'priority' && (
                        <Alert variant="default" className="bg-primary/5 border-primary/20 text-primary animate-in fade-in">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertTitle className="font-bold">Priority Status Verified</AlertTitle>
                          <AlertDescription className="text-sm leading-relaxed">
                            Your case qualifies for priority forensic review. Our senior investigators will prioritize this technical assessment.
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-8">
                        <div>
                          <h4 className="text-xl font-bold flex items-center gap-2 mb-6">
                            Step 2: Contact Information
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Full Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" className="h-12 bg-background/50" {...field} />
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
                                  <FormLabel className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    Secure Contact Email
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="name@domain.com" className="h-12 bg-background/50" {...field} />
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
                                  <FormLabel className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary" />
                                    Country
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="United Kingdom" className="h-12 bg-background/50" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    Phone Number
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="+44 7... (Secure)" className="h-12 bg-background/50" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

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
                                placeholder="Describe the loss event. Include relevant dates, platform communication, and any specific error messages..." 
                                className="min-h-[160px] resize-none bg-background/50 text-base leading-relaxed"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Detailed descriptions help our specialists determine recovery feasibility faster.
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
                          Confidential assessment. No obligation.
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
