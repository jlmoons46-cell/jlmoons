
"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Trash2, Edit2, Loader2, RefreshCcw, Save, X, BookOpen, ImageIcon, Upload, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

type Article = {
  id: string
  title: string
  description: string
  content: string
  tag: string
  image_url: string
  slug: string
  is_published: boolean
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState<Article | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const fetchArticles = async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setArticles(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEditing) return

    setIsSaving(true)
    try {
      const slug = isEditing.slug || isEditing.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
      const { error } = await supabase
        .from('articles')
        .upsert({
          ...isEditing,
          slug,
          content: isEditing.content || '' // Ensure we don't save nulls
        })

      if (error) throw error

      toast({ title: "Article Saved", description: "The resource center has been updated." })
      setIsEditing(null)
      fetchArticles()
    } catch (err: any) {
      toast({ title: "Save Failed", description: err.message, variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this article?')) return

    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) {
      toast({ title: "Delete Failed", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Article Removed" })
      fetchArticles()
    }
  }

  const uploadImage = async (file: File) => {
    setIsUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `article-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: true, contentType: file.type })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(fileName)
      
      if (isEditing) {
        setIsEditing({ ...isEditing, image_url: publicUrl })
      }
      
      toast({ title: "Image Uploaded" })
    } catch (err: any) {
      toast({ title: "Upload Failed", description: err.message, variant: "destructive" })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-tight mb-2">Resource Management</h1>
          <p className="text-muted-foreground">Curate expert insights for the Knowledge Hub.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-white/10" onClick={fetchArticles} disabled={isLoading}>
            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <Button className="gold-glow" onClick={() => setIsEditing({ id: '', title: '', description: '', content: '', tag: 'Security', image_url: '', slug: '', is_published: true })}>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {isEditing && (
        <Card className="bg-card border-white/10 gold-glow">
          <form onSubmit={handleSave}>
            <CardHeader>
              <CardTitle className="text-xl font-bold uppercase tracking-tight flex items-center gap-3">
                <BookOpen className="text-primary" />
                {isEditing.id ? 'Edit Perspective' : 'Draft New Intelligence'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Intelligence Title</Label>
                    <Input 
                      value={isEditing.title || ''} 
                      onChange={e => setIsEditing({...isEditing, title: e.target.value})} 
                      placeholder="e.g. The Future of Blockchain Security"
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Forensic Category (Tag)</Label>
                    <Input 
                      value={isEditing.tag || ''} 
                      onChange={e => setIsEditing({...isEditing, tag: e.target.value})} 
                      placeholder="Security, Recovery, Education"
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Executive Summary</Label>
                    <Input 
                      value={isEditing.description || ''} 
                      onChange={e => setIsEditing({...isEditing, description: e.target.value})} 
                      placeholder="Brief overview for the card..."
                      className="bg-background/50 h-12"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                   <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Cover Visual</Label>
                   <div className="aspect-video relative rounded-2xl overflow-hidden border border-white/10 bg-background/50 flex items-center justify-center group">
                      {isEditing.image_url ? (
                        <Image src={isEditing.image_url} alt="Preview" fill className="object-cover" unoptimized />
                      ) : (
                        <ImageIcon className="w-12 h-12 opacity-10" />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                        <Upload className="w-6 h-6 text-primary" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">Update Asset</p>
                        <input 
                          type="file" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) uploadImage(file)
                          }}
                        />
                      </div>
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      )}
                   </div>
                   <Input 
                     value={isEditing.image_url || ''} 
                     onChange={e => setIsEditing({...isEditing, image_url: e.target.value})} 
                     placeholder="Direct URL (optional)"
                     className="bg-background/50 text-xs"
                   />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Full Intelligence Content</Label>
                <Textarea 
                  value={isEditing.content || ''} 
                  onChange={e => setIsEditing({...isEditing, content: e.target.value})} 
                  placeholder="The complete article text goes here..."
                  className="bg-background/50 min-h-[300px] leading-relaxed text-base"
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 bg-white/5 border-t border-white/5 p-6">
              <Button type="button" variant="ghost" onClick={() => setIsEditing(null)} className="font-bold uppercase tracking-widest text-xs">Cancel</Button>
              <Button type="submit" className="gold-glow font-bold uppercase tracking-widest text-xs h-12 px-8" disabled={isSaving}>
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Commit to Intelligence
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}

      <div className="rounded-2xl border border-white/5 bg-card/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6">Identity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6">Category</TableHead>
              <TableHead className="text-[10px] font-bold uppercase tracking-widest p-6 text-right">Operations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-48 text-center text-muted-foreground italic">
                  No intelligence reports currently indexed.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 relative rounded-lg overflow-hidden border border-white/10 shrink-0">
                        {article.image_url && <Image src={article.image_url} alt={article.title} fill className="object-cover" unoptimized />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{article.title}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-tight truncate max-w-xs">{article.description}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                      {article.tag}
                    </span>
                  </TableCell>
                  <TableCell className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsEditing(article)}>
                        <Edit2 className="w-4 h-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-destructive/10" onClick={() => handleDelete(article.id)}>
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
