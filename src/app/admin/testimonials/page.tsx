
"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash2, Edit2, Loader2, RefreshCcw, Save, Star, Quote } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type Testimonial = {
  id: string
  author: string
  quote: string
  result: string
  rating: number
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState<Testimonial | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      if (data) setTestimonials(data)
    } catch (err: any) {
      console.error('Fetch testimonials error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEditing) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('testimonials')
        .upsert({
          ...isEditing,
          rating: Number(isEditing.rating) || 5
        })

      if (error) throw error

      toast({ title: "Success Story Saved", description: "The public proof section has been updated." })
      setIsEditing(null)
      fetchTestimonials()
    } catch (err: any) {
      toast({ 
        title: "Save Failed", 
        description: err instanceof Error ? err.message : "An unexpected error occurred", 
        variant: "destructive" 
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this success story?')) return

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
      
      toast({ title: "Story Removed" })
      fetchTestimonials()
    } catch (err: any) {
      toast({ 
        title: "Delete Failed", 
        description: err instanceof Error ? err.message : "An unexpected error occurred", 
        variant: "destructive" 
      })
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Success Story Management</h1>
          <p className="text-muted-foreground">Manage client testimonials and recovery proof.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10" onClick={fetchTestimonials} disabled={isLoading}>
            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <Button className="gold-glow" onClick={() => setIsEditing({ id: '', author: '', quote: '', result: '', rating: 5 })}>
            <Plus className="w-4 h-4 mr-2" />
            New Success Story
          </Button>
        </div>
      </div>

      {isEditing && (
        <Card className="bg-card border-white/10 gold-glow">
          <form onSubmit={handleSave}>
            <CardHeader>
              <CardTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <Quote className="text-primary" />
                {isEditing.id ? 'Edit Success Story' : 'Register New Success'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Client Identity</Label>
                    <Input 
                      value={isEditing.author || ''} 
                      onChange={e => setIsEditing({...isEditing, author: e.target.value})} 
                      placeholder="e.g. David M."
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Recovery Result Badge</Label>
                    <Input 
                      value={isEditing.result || ''} 
                      onChange={e => setIsEditing({...isEditing, result: e.target.value})} 
                      placeholder="e.g. $42K Recovered"
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Rating (1-5)</Label>
                    <Input 
                      type="number"
                      min="1"
                      max="5"
                      value={isEditing.rating || 5} 
                      onChange={e => setIsEditing({...isEditing, rating: parseInt(e.target.value)})} 
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Success Narrative</Label>
                  <Textarea 
                    value={isEditing.quote || ''} 
                    onChange={e => setIsEditing({...isEditing, quote: e.target.value})} 
                    placeholder="The client's story..."
                    className="bg-background/50 min-h-[160px] leading-relaxed"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 bg-white/5 border-t border-white/5 p-6">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(null)} className="font-bold uppercase tracking-widest text-xs">Cancel</Button>
              <Button type="submit" className="gold-glow font-bold uppercase tracking-widest text-xs h-12 px-8" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Commit Story
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="rounded-2xl border border-white/5 bg-card/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6">Client</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6">Result</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6 text-right">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-48 text-center text-muted-foreground italic">
                  {isLoading ? <Loader2 className="w-8 h-8 animate-spin mx-auto opacity-20" /> : "No success stories indexed yet."}
                </TableCell>
              </TableRow>
            ) : (
              testimonials.map((t) => (
                <TableRow key={t.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="p-6">
                    <div className="flex items-center gap-3">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-bold">{t.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                      {t.result}
                    </span>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsEditing(t)}>
                        <Edit2 className="w-4 h-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-destructive/10" onClick={() => handleDelete(t.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
