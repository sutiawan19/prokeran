"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, Eye, CheckCircle2, ChevronLeft, Image as ImageIcon, 
  Plus, Trash2, GripVertical, Settings2, Users, Calendar, 
  AlignLeft, ToggleLeft, Link as LinkIcon 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateProkerPage() {
  const router = useRouter();
  const [prokerId, setProkerId] = useState<string | null>(null);
  
  // Section 1: Info Program
  const [info, setInfo] = useState({
    name: '',
    slug: '',
    shortDesc: '',
    fullDesc: '',
    benefits: [''],
    requirements: ['']
  });

  // Section 2: Jadwal
  const [schedule, setSchedule] = useState({
    regOpen: '',
    regClose: '',
    announcement: '',
    eventStart: '',
    eventEnd: '',
    location: ''
  });

  // Section 3: Tim Inti
  const [coreTeam, setCoreTeam] = useState({
    chairman: '',
    viceChairman: '',
    secretary: '',
    treasurer: ''
  });

  // Section 4: Divisions
  const [divisions, setDivisions] = useState([
    { id: 1, name: 'Acara', quota: 0, desc: '' }
  ]);

  // Section 6: FAQ
  const [faqs, setFaqs] = useState([
    { question: '', answer: '' }
  ]);

  // Section 7: CTA
  const [cta, setCta] = useState({
    waLink: '',
    guidebookLink: '',
    btnLabel: 'Daftar Sekarang'
  });

  // Section 8: Visibility
  const [visibility, setVisibility] = useState({
    enableRegistration: false,
    showDocumentation: true,
    showFaq: true,
    showOrgStructure: true
  });

  const [status, setStatus] = useState('draft'); // draft, open, closed, finished
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    if (id) {
      setProkerId(id);
      setIsLoading(true);
      fetch('/api/prokers')
        .then(res => res.json())
        .then(data => {
          const p = data.find((x: any) => x.id === id);
          if (p) {
            setInfo(prev => ({ 
              ...prev, 
              name: p.title, 
              slug: p.slug,
              fullDesc: p.description || '',
              benefits: p.benefits ? p.benefits.split('\n') : ['']
            }));
            setSchedule(prev => ({ 
              ...prev, 
              eventStart: p.start_date || '', 
              eventEnd: p.end_date || '', 
              regOpen: p.registration_open || '', 
              regClose: p.registration_close || '' 
            }));
            setStatus(p.status);
            if (p.divisions && p.divisions.length > 0) {
              setDivisions(p.divisions);
            }
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Dynamic Array Handlers
  const addArrayItem = (setter: any, key: string, emptyVal: any) => {
    setter((prev: any) => ({ ...prev, [key]: [...prev[key], emptyVal] }));
  };
  const updateArrayItem = (setter: any, key: string, index: number, value: any) => {
    setter((prev: any) => {
      const newArr = [...prev[key]];
      newArr[index] = value;
      return { ...prev, [key]: newArr };
    });
  };
  const removeArrayItem = (setter: any, key: string, index: number) => {
    setter((prev: any) => {
      const newArr = prev[key].filter((_: any, i: number) => i !== index);
      return { ...prev, [key]: newArr };
    });
  };

  const completionPercentage = () => {
    let filled = 0;
    let total = 6; // Just a basic required fields count
    if (info.name) filled++;
    if (info.shortDesc) filled++;
    if (schedule.regOpen) filled++;
    if (schedule.eventStart) filled++;
    if (coreTeam.chairman) filled++;
    if (divisions.length > 0 && divisions[0].name) filled++;
    return Math.round((filled / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-gray-500 hover:text-gray-900 -ml-2">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {prokerId ? 'Edit Proker' : 'Tambah Proker'}
            </h1>
            <Badge variant="outline" className="bg-gray-100 text-gray-600 border-none font-medium px-2 py-0.5 text-[10px] uppercase tracking-wide">
              {status}
            </Badge>
          </div>
          <p className="text-gray-500 font-medium mt-1 ml-11">
            Lengkapi informasi program kerja di bawah ini.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="h-9 font-medium"
              onClick={() => {
                const previewData = {
                  title: info.name || 'Draft Program Kerja',
                  slug: 'preview',
                  status: status,
                  banner_url: info.slug ? '' : '', // mock
                  benefits: info.benefits.join('\n'),
                  description: info.fullDesc,
                  divisions: divisions.map(d => ({ ...d, filled_quota: 0 })),
                  start_date: schedule.eventStart,
                  end_date: schedule.eventEnd,
                  registration_close: schedule.regClose
                };
                localStorage.setItem('proker_preview', JSON.stringify(previewData));
                window.open('/proker/preview', '_blank');
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              className="bg-[#0038FF] hover:bg-[#0038FF]/90 text-white font-bold h-10 px-6 rounded-xl shadow-sm"
              disabled={isSubmitting || !info.name}
              onClick={async () => {
                setIsSubmitting(true);
                try {
                  const payload: any = {
                    title: info.name,
                    description: info.fullDesc,
                    benefits: info.benefits.filter(b => b.trim() !== '').join('\n'),
                    start_date: schedule.eventStart,
                    end_date: schedule.eventEnd,
                    registration_open: schedule.regOpen,
                    registration_close: schedule.regClose,
                    status: status === 'draft' ? 'upcoming' : status,
                    divisions: divisions,
                  };
                  
                  let res;
                  if (prokerId) {
                    payload.id = prokerId;
                    res = await fetch('/api/prokers', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                  } else {
                    res = await fetch('/api/prokers', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                  }
                  
                  if (!res.ok) throw new Error('Failed');
                  
                  router.push('/admin/proker');
                } catch (e) {
                  console.error(e);
                  toast.error('Gagal menyimpan proker');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Menyimpan...' : (prokerId ? 'Update' : 'Publish')}
            </Button>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
        
        {/* ── Main Content (Form Sections) ── */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Section 1: Informasi Program */}
          <Card id="info" className="scroll-mt-24 shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg">Informasi Program</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label>Thumbnail Program</Label>
                  <div className="h-32 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                    <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Klik untuk upload thumbnail</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Nama Program <span className="text-red-500">*</span></Label>
                  <Input 
                    placeholder="Contoh: Makrab 2026" 
                    value={info.name}
                    onChange={(e) => setInfo({...info, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL Slug</Label>
                  <Input 
                    placeholder="makrab-2026" 
                    value={info.slug}
                    onChange={(e) => setInfo({...info, slug: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Deskripsi Singkat (Max 150 karakter)</Label>
                  <Textarea 
                    className="h-20 resize-none" 
                    placeholder="Tuliskan intisari acara..."
                    value={info.shortDesc}
                    onChange={(e) => setInfo({...info, shortDesc: e.target.value})}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Deskripsi Lengkap</Label>
                  <Textarea 
                    className="h-40" 
                    placeholder="Jelaskan secara rinci tentang program ini..."
                    value={info.fullDesc}
                    onChange={(e) => setInfo({...info, fullDesc: e.target.value})}
                  />
                </div>

                {/* Benefits */}
                <div className="space-y-3 md:col-span-2 bg-slate-50 p-4 rounded-xl border">
                  <Label>Benefit (Dinamis)</Label>
                  {info.benefits.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <Input 
                        value={b} 
                        onChange={(e) => updateArrayItem(setInfo, 'benefits', i, e.target.value)} 
                        placeholder="Contoh: E-Certificate" 
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeArrayItem(setInfo, 'benefits', i)} className="text-gray-400 hover:text-red-500 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addArrayItem(setInfo, 'benefits', '')} className="text-xs">
                    <Plus className="w-4 h-4 mr-1" /> Tambah Benefit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Jadwal */}
          <Card id="jadwal" className="scroll-mt-24 shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg">Jadwal & Lokasi</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Fase Pendaftaran</h4>
                  <div className="space-y-2">
                    <Label>Pendaftaran Buka</Label>
                    <Input type="datetime-local" value={schedule.regOpen} onChange={e => setSchedule({...schedule, regOpen: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pendaftaran Tutup</Label>
                    <Input type="datetime-local" value={schedule.regClose} onChange={e => setSchedule({...schedule, regClose: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Pengumuman Seleksi</Label>
                    <Input type="date" value={schedule.announcement} onChange={e => setSchedule({...schedule, announcement: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Pelaksanaan Acara</h4>
                  <div className="space-y-2">
                    <Label>Mulai Acara</Label>
                    <Input type="date" value={schedule.eventStart} onChange={e => setSchedule({...schedule, eventStart: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Selesai Acara</Label>
                    <Input type="date" value={schedule.eventEnd} onChange={e => setSchedule({...schedule, eventEnd: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Lokasi Acara</Label>
                    <Input placeholder="Contoh: Gedung A / Zoom" value={schedule.location} onChange={e => setSchedule({...schedule, location: e.target.value})} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Tim Inti */}
          <Card id="tim-inti" className="scroll-mt-24 shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg">Tim Inti</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-slate-50 space-y-3">
                  <Label className="text-blue-600 font-bold">Ketua Pelaksana (Wajib)</Label>
                  <Input placeholder="Nama / NIM" value={coreTeam.chairman} onChange={e => setCoreTeam({...coreTeam, chairman: e.target.value})} />
                </div>
                <div className="p-4 rounded-xl border bg-slate-50 space-y-3">
                  <Label className="text-gray-700 font-bold">Wakil Ketua (Opsional)</Label>
                  <Input placeholder="Nama / NIM" value={coreTeam.viceChairman} onChange={e => setCoreTeam({...coreTeam, viceChairman: e.target.value})} />
                </div>
                <div className="p-4 rounded-xl border bg-slate-50 space-y-3">
                  <Label className="text-gray-700 font-bold">Sekretaris (Opsional)</Label>
                  <Input placeholder="Nama / NIM" value={coreTeam.secretary} onChange={e => setCoreTeam({...coreTeam, secretary: e.target.value})} />
                </div>
                <div className="p-4 rounded-xl border bg-slate-50 space-y-3">
                  <Label className="text-gray-700 font-bold">Bendahara (Opsional)</Label>
                  <Input placeholder="Nama / NIM" value={coreTeam.treasurer} onChange={e => setCoreTeam({...coreTeam, treasurer: e.target.value})} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Divisions */}
          <Card id="divisions" className="scroll-mt-24 shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg">Manajemen Divisi</CardTitle>
              </div>
              <Button size="sm" variant="outline" onClick={() => setDivisions([...divisions, { id: Date.now(), name: '', quota: 0, desc: '' }])}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Divisi
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <Accordion className="w-full space-y-4">
                {divisions.map((div, i) => (
                  <AccordionItem value={`div-${div.id}`} key={div.id} className="border rounded-xl bg-white overflow-hidden shadow-sm">
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 hover:no-underline">
                      <div className="flex items-center gap-4 text-left">
                        <GripVertical className="w-5 h-5 text-gray-300" />
                        <span className="font-semibold text-gray-900">{div.name || 'Divisi Baru'}</span>
                        <Badge variant="secondary" className="ml-2 font-normal">Kuota: {div.quota || 0}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-6 pt-2 border-t bg-slate-50/50">
                      <div className="grid gap-4 mt-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-3 space-y-2">
                            <Label>Nama Divisi</Label>
                            <Input 
                              value={div.name} 
                              onChange={(e) => {
                                const newD = [...divisions]; newD[i].name = e.target.value; setDivisions(newD);
                              }} 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Kuota</Label>
                            <Input 
                              type="number" 
                              value={div.quota} 
                              onChange={(e) => {
                                const newD = [...divisions]; newD[i].quota = Number(e.target.value); setDivisions(newD);
                              }} 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Deskripsi / Tanggung Jawab</Label>
                          <Textarea 
                            className="h-20"
                            value={div.desc} 
                            onChange={(e) => {
                              const newD = [...divisions]; newD[i].desc = e.target.value; setDivisions(newD);
                            }} 
                          />
                        </div>

                        {/* Question Builder Mock */}
                        <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-xl bg-white">
                          <h5 className="font-semibold text-sm mb-3 text-gray-700">Formulir Pertanyaan Pendaftaran</h5>
                          <Button variant="secondary" size="sm" className="w-full border-dashed">
                            <Plus className="w-4 h-4 mr-2" /> Tambah Pertanyaan Seleksi
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3 text-xs" onClick={() => setDivisions(divisions.filter((_, idx) => idx !== i))}>
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Hapus Divisi
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Section 6: FAQ */}
          <Card id="faq" className="scroll-mt-24 shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
              <div className="flex items-center gap-2">
                <AlignLeft className="w-5 h-5 text-gray-400" />
                <CardTitle className="text-lg">FAQ Builder</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="flex gap-4 p-4 border rounded-xl bg-slate-50 relative group">
                  <div className="flex-1 space-y-3">
                    <Input 
                      placeholder="Pertanyaan" 
                      className="font-medium bg-white"
                      value={faq.question}
                      onChange={e => { const n = [...faqs]; n[i].question = e.target.value; setFaqs(n); }}
                    />
                    <Textarea 
                      placeholder="Jawaban" 
                      className="h-20 bg-white"
                      value={faq.answer}
                      onChange={e => { const n = [...faqs]; n[i].answer = e.target.value; setFaqs(n); }}
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 shrink-0" onClick={() => setFaqs(faqs.filter((_, idx) => idx !== i))}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full border-dashed" onClick={() => setFaqs([...faqs, {question:'', answer:''}])}>
                <Plus className="w-4 h-4 mr-2" /> Tambah FAQ
              </Button>
            </CardContent>
          </Card>

          {/* Section 7 & 8: CTA & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card id="cta" className="shadow-sm border-gray-200">
              <CardHeader className="bg-gray-50/50 border-b">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-gray-400" />
                  <CardTitle className="text-lg">Call to Action</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Link Grup WhatsApp</Label>
                  <Input value={cta.waLink} onChange={e => setCta({...cta, waLink: e.target.value})} placeholder="https://chat.whatsapp.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Link Guidebook (Opsional)</Label>
                  <Input value={cta.guidebookLink} onChange={e => setCta({...cta, guidebookLink: e.target.value})} placeholder="https://drive.google.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Label Tombol Daftar</Label>
                  <Input value={cta.btnLabel} onChange={e => setCta({...cta, btnLabel: e.target.value})} />
                </div>
              </CardContent>
            </Card>

            <Card id="visibility" className="shadow-sm border-gray-200">
              <CardHeader className="bg-gray-50/50 border-b">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-gray-400" />
                  <CardTitle className="text-lg">Visibility Toggles</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold text-gray-900">Buka Pendaftaran</Label>
                    <p className="text-xs text-gray-500">Izinkan peserta mengisi formulir</p>
                  </div>
                  <Switch checked={visibility.enableRegistration} onCheckedChange={v => setVisibility({...visibility, enableRegistration: v})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold text-gray-900">Tampilkan Dokumentasi</Label>
                  </div>
                  <Switch checked={visibility.showDocumentation} onCheckedChange={v => setVisibility({...visibility, showDocumentation: v})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-semibold text-gray-900">Tampilkan FAQ</Label>
                  </div>
                  <Switch checked={visibility.showFaq} onCheckedChange={v => setVisibility({...visibility, showFaq: v})} />
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

        {/* ── Sticky Sidebar (Right) ── */}
        <div className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24 pb-10">
          
          {/* Progress Card */}
          <Card className="shadow-sm border-gray-200 bg-white">
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 mb-4">Kelengkapan Data</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-blue-600">{completionPercentage()}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${completionPercentage()}%` }} />
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Info Program</span>
                  {info.name ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Jadwal Acara</span>
                  {schedule.eventStart ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Manajemen Divisi</span>
                  {divisions.length > 0 && divisions[0].name ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200" />}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Summary */}
          <Card className="shadow-sm border-gray-200 bg-white">
            <CardHeader className="pb-3 border-b border-gray-50">
              <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Divisi</span>
                  <span className="font-bold text-gray-900">{divisions.length}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Kuota</span>
                  <span className="font-bold text-gray-900">{divisions.reduce((acc, d) => acc + (d.quota || 0), 0)}</span>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status Pendaftaran</span>
                  {visibility.enableRegistration ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Buka</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none">Tutup</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
