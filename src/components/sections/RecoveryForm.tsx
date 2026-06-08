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
  Building2, 
  ShieldAlert,
  Calendar as CalendarIcon,
  Hash,
  Link2,
  Wallet as WalletIcon,
  AlertTriangle,
  ArrowRightLeft,
  Users,
  Info,
  CheckCircle2
} from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  recoveryType: z.string().min(1, "Please select what best describes your situation"),
  walletName: z.string().optional(),
  accessDetails: z.array(z.string()).default([]),
  missingWords: z.string().optional(),
  seedDetails: z.array(z.string()).default([]),
  hardwareDevice: z.string().optional(),
  hardwareIssue: z.string().optional(),
  exchangeName: z.string().optional(),
  exchangeProblem: z.string().optional(),
  contactedExchange: z.string().optional(),
  estimatedValue: z.string().optional(),
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
  { id: 'exchange_access', label: 'Exchange Account Access' },
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
  "Binance", 
  "Coinbase", 
  "Kraken", 
  "KuCoin", 
  "OKX", 
  "Bybit", 
  "Gate.io", 
  "Bitfinex", 
  "Gemini", 
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
      email: "",
      recoveryType: "",
      walletName: "",
      accessDetails: [],
      missingWords: "",
      seedDetails: [],
      hardwareDevice: "",
      hardwareIssue: "",
      exchangeName: "",
      exchangeProblem: "",
      contactedExchange: "",
      estimatedValue: "",
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
  const watchEstimatedValue = form.watch("estimatedValue")
  const watchAmountLost = form.watch("amountLost")

  const qualificationStatus = useMemo(() => {
    // Check for high value thresholds
    const highValueTags = ['50k_100k', 'more_100k', '100k_500k', '500k_1m', 'more_1m'];
    const amountLostValue = parseFloat(watchAmountLost || "0");

    if (highValueTags.includes(watchEstimatedValue || "") || amountLostValue >= 50000) {
      return 'priority';
    }

    // Check for low value thresholds
    if (watchEstimatedValue === 'less_1k') {
      return 'low_threshold';
    }

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

                    {/* Case Type 1: Lost Password */}
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

                    {/* Case Type 2: Lost Seed Phrase */}
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

                    {/* Case Type 3: Hardware Wallet */}
                    {watchRecoveryType === 'hardware_issue' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary">Forensic Details: Hardware Wallet Investigation</h4>
                        
                        <FormField
                          control={form.control}
                          name="hardwareDevice"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Select your hardware device</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                                >
                                  {['Ledger', 'Trezor', 'KeepKey', 'Other'].map((device) => (
                                    <div key={device}>
                                      <RadioGroupItem value={device} id={`device-${device}`} className="peer sr-only" />
                                      <Label
                                        htmlFor={`device-${device}`}
                                        className="flex items-center justify-center h-12 rounded-xl border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-sm font-semibold text-center"
                                      >
                                        {device}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hardwareIssue"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>What is the primary issue?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select technical issue" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {[
                                    "Forgotten PIN",
                                    "Damaged device",
                                    "Corrupted firmware",
                                    "Missing recovery phrase",
                                    "Unknown"
                                  ].map(issue => (
                                    <SelectItem key={issue} value={issue.toLowerCase().replace(/\s+/g, '_')}>
                                      {issue}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
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

                    {/* Case Type 4: Exchange Access */}
                    {watchRecoveryType === 'exchange_access' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <Building2 className="w-5 h-5" />
                          Forensic Details: Exchange Account Restoration
                        </h4>
                        
                        <FormField
                          control={form.control}
                          name="exchangeName"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Identify the exchange platform</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select exchange" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {exchangeOptions.map(opt => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="exchangeProblem"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Nature of the account issue</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                  {[
                                    "Locked account",
                                    "2FA issue",
                                    "KYC issue",
                                    "Account frozen",
                                    "Access lost"
                                  ].map((problem) => (
                                    <div key={problem}>
                                      <RadioGroupItem value={problem} id={`problem-${problem}`} className="peer sr-only" />
                                      <Label
                                        htmlFor={`problem-${problem}`}
                                        className="flex items-center h-12 px-4 rounded-xl border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-sm font-semibold"
                                      >
                                        {problem}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="contactedExchange"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Have you already contacted their technical support?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex gap-6"
                                >
                                  {['Yes', 'No'].map((val) => (
                                    <div key={val} className="flex items-center space-x-3">
                                      <RadioGroupItem value={val.toLowerCase()} id={`contacted-${val}`} />
                                      <Label htmlFor={`contacted-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
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

                    {/* Case Type 5: Scam / Stolen Funds */}
                    {watchRecoveryType === 'stolen_crypto' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-destructive flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5" />
                          Forensic Details: Scam Investigation & Asset Tracing
                        </h4>

                        <FormField
                          control={form.control}
                          name="scamType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>What type of scam best describes your situation?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                  {scamOptions.map((scam) => (
                                    <div key={scam}>
                                      <RadioGroupItem value={scam} id={`scam-${scam}`} className="peer sr-only" />
                                      <Label
                                        htmlFor={`scam-${scam}`}
                                        className="flex items-center h-12 px-4 rounded-xl border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-destructive peer-data-[state=checked]:bg-destructive/5 peer-data-[state=checked]:text-destructive cursor-pointer transition-all text-sm font-semibold"
                                      >
                                        {scam}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="amountLost"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4 text-destructive" />
                                  Amount Lost
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2.5" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cryptoCurrency"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Cryptocurrency (BTC, ETH, etc.)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. BTC" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="incidentDate"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <CalendarIcon className="w-4 h-4 text-primary" />
                                  Date of Incident
                                </FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="scamWalletAddress"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <WalletIcon className="w-4 h-4 text-primary" />
                                  Scammer Wallet Address
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="0x... or 1..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="transactionHash"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <Hash className="w-4 h-4 text-secondary" />
                                Transaction Hash (TXID)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Full transaction hash" className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="scammerWebsite"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <Link2 className="w-4 h-4 text-primary" />
                                  Scammer Website/App
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="scammerContact"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4 text-primary" />
                                  Scammer Contact (Telegram/WA)
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="@username or phone" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Case Type 6: Wrong Address Transfer */}
                    {watchRecoveryType === 'wrong_address' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <ArrowRightLeft className="w-5 h-5" />
                          Forensic Details: Wrong Address Recovery
                        </h4>

                        <FormField
                          control={form.control}
                          name="cryptoCurrency"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Which cryptocurrency was sent?</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. USDT (ERC20)" className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="sendingWallet"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <WalletIcon className="w-4 h-4 text-primary" />
                                  Sending Wallet Address
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="0x..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="destinationWallet"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <WalletIcon className="w-4 h-4 text-primary" />
                                  Destination Wallet Address
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="0x..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="transactionHash"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <Hash className="w-4 h-4 text-secondary" />
                                Transaction Hash (TXID)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Full transaction hash" className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="destinationType"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Is the destination address an exchange or a self-custody wallet?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col sm:flex-row gap-6"
                                >
                                  {[
                                    { id: 'exchange', label: 'Exchange' },
                                    { id: 'self_custody', label: 'Self-custody wallet' },
                                    { id: 'unknown', label: 'Unknown' }
                                  ].map((opt) => (
                                    <div key={opt.id} className="flex items-center space-x-3">
                                      <RadioGroupItem value={opt.id} id={`dest-${opt.id}`} />
                                      <Label htmlFor={`dest-${opt.id}`} className="cursor-pointer font-medium">{opt.label}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Case Type 7: Estate Recovery */}
                    {watchRecoveryType === 'inheritance' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Forensic Details: Estate Recovery & Digital Inheritance
                        </h4>

                        <FormField
                          control={form.control}
                          name="relationship"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>What is your relationship to the asset holder?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select relationship type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {relationshipOptions.map(opt => (
                                    <SelectItem key={opt} value={opt.toLowerCase()}>{opt}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="estateDetails"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Do you currently possess:</FormLabel>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {estateChecklist.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="estateDetails"
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
                              <FormLabel>Approximate total portfolio value</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50">
                                    <SelectValue placeholder="Select value range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="less_10k">Less than $10,000</SelectItem>
                                  <SelectItem value="10k_100k">$10,000 to $100,000</SelectItem>
                                  <SelectItem value="100k_500k">$100,000 to $500,000</SelectItem>
                                  <SelectItem value="500k_1m">$500,000 to $1M</SelectItem>
                                  <SelectItem value="more_1m">Over $1M (Premium Estate Case)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="grid gap-8 border-t border-white/5 pt-10">
                      {qualificationStatus === 'low_threshold' && (
                        <Alert variant="default" className="bg-muted/30 border-muted/50 text-muted-foreground animate-in fade-in">
                          <Info className="h-4 w-4" />
                          <AlertTitle className="font-bold text-foreground">Technical Notice</AlertTitle>
                          <AlertDescription className="text-sm leading-relaxed">
                            Due to the complexity of forensic recovery work, we typically prioritize cases above a certain asset threshold. You may still submit, but manual forensic review times may be extended.
                          </AlertDescription>
                        </Alert>
                      )}

                      {qualificationStatus === 'priority' && (
                        <Alert variant="default" className="bg-primary/5 border-primary/20 text-primary animate-in fade-in">
                          <CheckCircle2 className="h-4 w-4" />
                          <AlertTitle className="font-bold">Priority Status Verified</AlertTitle>
                          <AlertDescription className="text-sm leading-relaxed">
                            Your case qualifies for priority forensic review. Our senior investigators will prioritize this technical assessment upon submission.
                          </AlertDescription>
                        </Alert>
                      )}

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
                          Confidential assessment. No obligation. Recovery feasibility determined before any recovery work begins.
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
