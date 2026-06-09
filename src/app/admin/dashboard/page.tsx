
"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Filter, 
  Eye, 
  RefreshCcw, 
  TrendingUp, 
  Wallet, 
  ShieldAlert, 
  AlertCircle,
  Clock,
  FileText,
  User,
  Mail,
  Phone,
  Globe
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { format } from 'date-fns'
import { useToast } from '@/hooks/use-toast'

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const { toast } = useToast()

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('recovery_requests')
        .select('*')
        .order('submitted_at', { ascending: false })
      
      if (error) throw error
      setRequests(data || [])
    } catch (err: any) {
      toast({
        title: "Sync Failed",
        description: err.message || "Could not retrieve forensic data.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'priority':
        return <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase tracking-widest text-[10px]">Priority Review</Badge>
      case 'low_threshold':
        return <Badge variant="outline" className="text-muted-foreground border-white/10 font-bold uppercase tracking-widest text-[10px]">Extended Review</Badge>
      default:
        return <Badge variant="secondary" className="font-bold uppercase tracking-widest text-[10px]">Standard</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wallet_recovery': return <Wallet className="w-4 h-4 text-primary" />
      case 'investment_scam': return <TrendingUp className="w-4 h-4 text-secondary" />
      case 'loan_scam': return <AlertCircle className="w-4 h-4 text-destructive" />
      default: return <ShieldAlert className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Forensic Intelligence Dashboard</h1>
          <p className="text-muted-foreground">Monitor and triage active technical assessments.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2" onClick={fetchRequests}>
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Intelligence
          </Button>
          <Button className="gold-glow gap-2">
            <Filter className="w-4 h-4" />
            Filter View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Total Intake</p>
          <p className="text-3xl font-extrabold">{requests.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Priority Cases</p>
          <p className="text-3xl font-extrabold text-primary">{requests.filter(r => r.qualification_status === 'priority').length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Active Investigations</p>
          <p className="text-3xl font-extrabold text-secondary">{requests.filter(r => r.recoveryType?.includes('scam') || r.recoveryType?.includes('trading')).length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-white/5 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Standard Review</p>
          <p className="text-3xl font-extrabold">{requests.filter(r => r.qualification_status === 'standard' || r.qualification_status === 'low_threshold').length}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-card/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="font-bold uppercase tracking-wider text-[10px] p-6">Case Identification</TableHead>
              <TableHead className="font-bold uppercase tracking-wider text-[10px] p-6">Forensic Type</TableHead>
              <TableHead className="font-bold uppercase tracking-wider text-[10px] p-6">Triage Status</TableHead>
              <TableHead className="font-bold uppercase tracking-wider text-[10px] p-6">Submission Time</TableHead>
              <TableHead className="font-bold uppercase tracking-wider text-[10px] p-6 text-right">Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <RefreshCcw className="w-8 h-8 animate-spin mx-auto text-primary/20" />
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground italic">
                  No forensic requests identified in intelligence database.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((req) => (
                <TableRow key={req.id} className="border-white/5 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedRequest(req)}>
                  <TableCell className="p-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-foreground">{req.fullName}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{req.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(req.recoveryType)}
                      <span className="text-xs font-bold uppercase tracking-tight">{req.recoveryType?.replace(/_/g, ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    {getStatusBadge(req.qualification_status)}
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {req.submitted_at ? format(new Date(req.submitted_at), 'MMM dd, HH:mm') : 'N/A'}
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4 text-primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-4xl bg-card border-white/10 sm:rounded-3xl p-0 overflow-hidden gold-glow max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <div className="flex flex-col">
              <div className="p-8 bg-gradient-to-br from-primary/10 to-transparent border-b border-white/5">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                      {getTypeIcon(selectedRequest.recoveryType)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1">Investigation Details</div>
                      <DialogTitle className="text-3xl font-bold uppercase tracking-tight">{selectedRequest.fullName}</DialogTitle>
                    </div>
                  </div>
                  {getStatusBadge(selectedRequest.qualification_status)}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-1 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center text-muted-foreground">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Email Contact</p>
                      <p className="text-sm font-medium">{selectedRequest.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center text-muted-foreground">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Secure Link</p>
                      <p className="text-sm font-medium">{selectedRequest.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-1 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center text-muted-foreground">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest">Region</p>
                      <p className="text-sm font-medium">{selectedRequest.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-10">
                {/* Forensic Deep Dive */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    Technical Assessment Data
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 p-8 rounded-2xl bg-background/50 border border-white/5">
                    {Object.entries(selectedRequest)
                      .filter(([key, value]) => {
                        return value !== null && 
                               value !== "" && 
                               (Array.isArray(value) ? value.length > 0 : true) &&
                               !['id', 'fullName', 'email', 'phone', 'country', 'submitted_at', 'qualification_status', 'message'].includes(key)
                      })
                      .map(([key, value]) => (
                        <div key={key} className="space-y-1 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <p className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest italic">{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</p>
                          <p className="text-sm font-mono break-all text-foreground/90 leading-relaxed">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Victim Narrative */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    Loss Narrative & Technical Description
                  </h4>
                  <div className="p-8 rounded-2xl bg-background/30 border border-white/5 italic text-muted-foreground leading-[1.8] text-base whitespace-pre-wrap">
                    "{selectedRequest.message}"
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex gap-4">
                  <Button className="flex-1 h-14 font-bold uppercase tracking-widest gold-glow">
                    Assign Investigator
                  </Button>
                  <Button variant="outline" className="flex-1 h-14 font-bold uppercase tracking-widest border-white/10" onClick={() => setSelectedRequest(null)}>
                    Archive Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
