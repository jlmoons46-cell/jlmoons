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
  Link2,
  Wallet as WalletIcon,
  AlertTriangle,
  Info,
  CheckCircle2,
  User,
  Globe,
  Phone,
  Upload,
  Landmark,
  Heart,
  TrendingUp,
  Key,
  Database
} from 'lucide-react'
import { inquireRecoveryDetails } from '@/ai/flows/ai-recovery-inquiry-assistant'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Valid phone number is required"),
  country: z.string().min(1, "Please enter your country"),
  recoveryType: z.string().min(1, "Please select what best describes your situation"),
  // Wallet Recovery fields
  walletType: z.string().optional(),
  walletIssueType: z.string().optional(),
  availableMaterials: z.array(z.string()).default([]),
  estimatedAssetValue: z.string().optional(),
  // Fake Trading fields
  exchangeName: z.string().optional(),
  platformUrl: z.string().optional(),
  withdrawalBlocked: z.string().optional(),
  feesRequested: z.string().optional(),
  totalDeposited: z.string().optional(),
  // Bad Broker fields
  brokerName: z.string().optional(),
  brokerCountry: z.string().optional(),
  brokerWebsite: z.string().optional(),
  brokerDeposited: z.string().optional(),
  brokerLoginAccess: z.string().optional(),
  brokerWithdrawalRequested: z.string().optional(),
  // Romance Scam fields
  metWhere: z.string().optional(),
  askedToInvest: z.string().optional(),
  romancePlatform: z.string().optional(),
  romanceLoss: z.string().optional(),
  romanceWallet: z.string().optional(),
  // Investment Scam fields
  investPlatformName: z.string().optional(),
  investPlatformUrl: z.string().optional(),
  investAmount: z.string().optional(),
  investCrypto: z.string().optional(),
  investWalletAddress: z.string().optional(),
  investLastTransferDate: z.string().optional(),
  investStillCommunicating: z.string().optional(),
  // General message
  message: z.string().min(20, "Message must be at least 20 characters"),
})

const recoveryOptions = [
  { id: 'wallet_recovery', label: 'Wallet Recovery' },
  { id: 'fake_trading', label: 'Fake Trading Scam' },
  { id: 'bad_broker', label: 'Bad Broker Recovery' },
  { id: 'romance_scam', label: 'Romance Scam Recovery' },
  { id: 'investment_scam', label: 'Investment Scam Recovery' },
  { id: 'other', label: 'Other Technical Issue' },
]

const walletTypes = ["MetaMask", "Trust Wallet", "Exodus", "Ledger", "Trezor", "Other"]
const walletIssueTypes = ["Lost Password", "Corrupted Wallet", "Lost Access", "Missing Seed Phrase", "Damaged Device"]
const materialOptions = [
  { id: 'seed', label: 'Seed Phrase' },
  { id: 'partial_seed', label: 'Partial Seed Phrase' },
  { id: 'wallet_file', label: 'Wallet File' },
  { id: 'backup', label: 'Backup' },
  { id: 'device', label: 'Device' },
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
      recoveryType: "",
      walletType: "",
      walletIssueType: "",
      availableMaterials: [],
      estimatedAssetValue: "",
      exchangeName: "",
      platformUrl: "",
      withdrawalBlocked: "",
      feesRequested: "",
      totalDeposited: "",
      brokerName: "",
      brokerCountry: "",
      brokerWebsite: "",
      brokerDeposited: "",
      brokerLoginAccess: "",
      brokerWithdrawalRequested: "",
      metWhere: "",
      askedToInvest: "",
      romancePlatform: "",
      romanceLoss: "",
      romanceWallet: "",
      investPlatformName: "",
      investPlatformUrl: "",
      investAmount: "",
      investCrypto: "",
      investWalletAddress: "",
      investLastTransferDate: "",
      investStillCommunicating: "",
      message: "",
    },
  })

  const watchRecoveryType = form.watch("recoveryType")
  const watchEstimatedValue = form.watch("totalDeposited") || form.watch("brokerDeposited") || form.watch("estimatedAssetValue") || form.watch("romanceLoss") || form.watch("investAmount") || "0"

  const qualificationStatus = useMemo(() => {
    const value = parseFloat(watchEstimatedValue) || 0;
    if (value >= 50000) return 'priority';
    if (value < 1000 && value > 0) return 'low_threshold';
    return 'standard';
  }, [watchEstimatedValue]);

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
        estimatedValue: watchEstimatedValue,
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

                    {/* Case Type: Wallet Recovery */}
                    {watchRecoveryType === 'wallet_recovery' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <WalletIcon className="w-5 h-5" />
                          Forensic Details: Wallet Recovery Intake
                        </h4>

                        <FormField
                          control={form.control}
                          name="walletType"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>Wallet Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                                >
                                  {walletTypes.map((type) => (
                                    <div key={type}>
                                      <RadioGroupItem value={type.toLowerCase()} id={`wallet-${type}`} className="peer sr-only" />
                                      <Label 
                                        htmlFor={`wallet-${type}`}
                                        className="flex items-center justify-center h-10 rounded-lg border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs font-semibold"
                                      >
                                        {type}
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
                          name="walletIssueType"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>Issue Type</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                >
                                  {walletIssueTypes.map((type) => (
                                    <div key={type}>
                                      <RadioGroupItem value={type.toLowerCase()} id={`issue-${type}`} className="peer sr-only" />
                                      <Label 
                                        htmlFor={`issue-${type}`}
                                        className="flex items-center justify-center h-10 rounded-lg border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs font-semibold"
                                      >
                                        {type}
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
                          name="availableMaterials"
                          render={() => (
                            <FormItem className="space-y-4">
                              <FormLabel className="flex items-center gap-2">
                                <Database className="w-4 h-4 text-primary" />
                                Do You Still Have?
                              </FormLabel>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {materialOptions.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="availableMaterials"
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
                                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                          name="estimatedAssetValue"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-primary" />
                                Estimated Asset Value ($)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 15000" className="h-12 bg-background/50" {...field} />
                              </FormControl>
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

                    {/* Case Type: Bad Broker Recovery */}
                    {watchRecoveryType === 'bad_broker' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <Landmark className="w-5 h-5" />
                          Forensic Details: Bad Broker Investigation
                        </h4>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="brokerName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Broker Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Global Trade FX" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="brokerCountry"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Country of Operation</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Cyprus, St. Vincent" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="brokerWebsite"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <Link2 className="w-4 h-4 text-primary" />
                                Broker Website
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="brokerDeposited"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-primary" />
                                Total Amount Deposited ($)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 25000" className="h-12 bg-background/50" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="brokerLoginAccess"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Can You Still Log In?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    {['Yes', 'No'].map((val) => (
                                      <div key={val} className="flex items-center space-x-3">
                                        <RadioGroupItem value={val.toLowerCase()} id={`login-${val}`} />
                                        <Label htmlFor={`login-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="brokerWithdrawalRequested"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Have You Requested Withdrawal?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    {['Yes', 'No'].map((val) => (
                                      <div key={val} className="flex items-center space-x-3">
                                        <RadioGroupItem value={val.toLowerCase()} id={`withdraw-req-${val}`} />
                                        <Label htmlFor={`withdraw-req-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Case Type: Romance Scam Recovery */}
                    {watchRecoveryType === 'romance_scam' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          Forensic Details: Romance Scam Investigation
                        </h4>
                        
                        <FormField
                          control={form.control}
                          name="metWhere"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>Where Did You Meet?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                                >
                                  {['Facebook', 'Instagram', 'WhatsApp', 'Telegram', 'Dating App', 'Other'].map((platform) => (
                                    <div key={platform}>
                                      <RadioGroupItem value={platform.toLowerCase()} id={`meet-${platform}`} className="peer sr-only" />
                                      <Label 
                                        htmlFor={`meet-${platform}`}
                                        className="flex items-center justify-center h-10 rounded-lg border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs font-semibold"
                                      >
                                        {platform}
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
                          name="askedToInvest"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Did They Ask You To Invest?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex gap-6"
                                >
                                  {['Yes', 'No'].map((val) => (
                                    <div key={val} className="flex items-center space-x-3">
                                      <RadioGroupItem value={val.toLowerCase()} id={`invest-${val}`} />
                                      <Label htmlFor={`invest-${val}`} className="cursor-pointer font-medium">{val}</Label>
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
                            name="romancePlatform"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Platform Used (e.g. MetaTrader)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Trading App Name" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="romanceLoss"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Estimated Loss ($)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 10000" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="romanceWallet"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <WalletIcon className="w-4 h-4 text-primary" />
                                Scammer Wallet Address (If Known)
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="0x... or bc1..." className="h-12 bg-background/50 font-mono text-xs" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Case Type: Investment Scam Recovery */}
                    {watchRecoveryType === 'investment_scam' && (
                      <div className="space-y-8 border-t border-white/5 pt-10 animate-in fade-in slide-in-from-top-4">
                        <h4 className="text-lg font-bold text-secondary flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Forensic Details: Investment Scam Investigation
                        </h4>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="investPlatformName"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Scam Platform Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. YieldPro AI" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="investPlatformUrl"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel className="flex items-center gap-2">
                                  <Link2 className="w-4 h-4 text-primary" />
                                  Website URL
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="https://..." className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="investAmount"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Investment Amount ($)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 10000" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="investCrypto"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Cryptocurrency Used</FormLabel>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                  {['BTC', 'ETH', 'USDT', 'SOL', 'Other'].map(opt => (
                                    <div key={opt}>
                                      <RadioGroupItem value={opt} id={`crypto-${opt}`} className="peer sr-only" />
                                      <Label 
                                        htmlFor={`crypto-${opt}`}
                                        className="flex items-center justify-center h-10 rounded-lg border border-white/10 bg-background/50 hover:bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary cursor-pointer transition-all text-xs font-semibold"
                                      >
                                        {opt}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="investWalletAddress"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="flex items-center gap-2">
                                <WalletIcon className="w-4 h-4 text-primary" />
                                Wallet Address Sent To
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="0x... or bc1..." className="h-12 bg-background/50 font-mono text-xs" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid sm:grid-cols-2 gap-8">
                          <FormField
                            control={form.control}
                            name="investLastTransferDate"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Date of Last Transfer</FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-12 bg-background/50" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="investStillCommunicating"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Still Communicating With Them?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    {['Yes', 'No'].map((val) => (
                                      <div key={val} className="flex items-center space-x-3">
                                        <RadioGroupItem value={val.toLowerCase()} id={`comm-${val}`} />
                                        <Label htmlFor={`comm-${val}`} className="cursor-pointer font-medium">{val}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
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
