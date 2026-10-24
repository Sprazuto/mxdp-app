import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { ArrowUpDown, Eye, Edit } from 'lucide-react'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Inquiry {
  id: string
  created_at: string
  parent_name: string
  child_name: string | null
  phone_number: string
  email: string | null
  preferred_visit_date: string | null
  status: string
}

interface Registration {
  id: string
  created_at: string
  registration_number: string
  parent_name: string
  parent_phone: string
  parent_email: string | null
  child_full_name: string
  program_applied: string
  status: string
}

async function getInquiries(search = '', status = ''): Promise<Inquiry[]> {
  const supabase = createSupabaseServerClient()
  let query = supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (search) {
    query = query.or(`parent_name.ilike.%${search}%,child_name.ilike.%${search}%,phone_number.ilike.%${search}%`)
  }
  if (status) {
    query = query.eq('status', status.toUpperCase())
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching inquiries:', error)
    return []
  }
  return data || []
}

async function getRegistrations(search = '', status = ''): Promise<Registration[]> {
  const supabase = createSupabaseServerClient()
  let query = supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (search) {
    query = query.or(`parent_name.ilike.%${search}%,child_full_name.ilike.%${search}%,registration_number.ilike.%${search}%`)
  }
  if (status) {
    query = query.eq('status', status.toUpperCase())
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching registrations:', error)
    return []
  }
  return data || []
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    VERIFIED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    ACCEPTED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  }
  return (
    <Badge variant="outline" className={cn(variants[status] || 'bg-gray-100 text-gray-800', 'capitalize')}>
      {status.toLowerCase()}
    </Badge>
  )
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminDashboardPage() {
  const inquiries = await getInquiries()
  const registrations = await getRegistrations()

  const inquiryStats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'NEW').length,
    verified: inquiries.filter(i => i.status === 'VERIFIED').length,
  }

  const registrationStats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'PENDING').length,
    verified: registrations.filter(r => r.status === 'VERIFIED').length,
    accepted: registrations.filter(r => r.status === 'ACCEPTED').length,
    rejected: registrations.filter(r => r.status === 'REJECTED').length,
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MXDP Admin Dashboard</h1>
            </div>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Lihat Website
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Inquiries</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{inquiryStats.total}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {inquiryStats.new} baru · {inquiryStats.verified} terverifikasi
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Total PPDB</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{registrationStats.total}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {registrationStats.pending} pending · {registrationStats.accepted} diterima
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Verified</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {inquiryStats.verified + registrationStats.verified}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total terverifikasi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Diterima</CardTitle>
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{registrationStats.accepted}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Diterima PPDB</p>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries Table */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Daftar Inquiries (Kontak)</CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Cari nama, anak, telepon..."
                  className="w-64"
                  id="inquiry-search"
                />
                <Select
                  placeholder="Semua status"
                  className="w-40"
                >
                  <option value="">Semua Status</option>
                  <option value="NEW">New</option>
                  <option value="VERIFIED">Verified</option>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Tanggal</TableHead>
                    <TableHead>Orang Tua</TableHead>
                    <TableHead>Anak</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead>Tanggal Kunjungan</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-32">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Belum ada data inquiry
                      </TableCell>
                    </TableRow>
                  ) : (
                    inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="text-sm text-gray-500">{formatDate(inquiry.created_at)}</TableCell>
                        <TableCell className="font-medium">{inquiry.parent_name}</TableCell>
                        <TableCell>{inquiry.child_name || '-'}</TableCell>
                        <TableCell className="font-mono text-sm">{inquiry.phone_number}</TableCell>
                        <TableCell>{inquiry.preferred_visit_date ? formatDate(inquiry.preferred_visit_date).split(',')[0] : '-'}</TableCell>
                        <TableCell><StatusBadge status={inquiry.status} /></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select defaultValue={inquiry.status} className="w-28">
                              <option value="NEW">New</option>
                              <option value="VERIFIED">Verified</option>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Daftar Pendaftaran PPDB</CardTitle>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Cari no. reg, nama orang tua, nama anak..."
                  className="w-64"
                  id="registration-search"
                />
                <Select defaultValue="" className="w-40">
                  <option value="">Semua Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Tanggal</TableHead>
                    <TableHead className="w-40">No. Registrasi</TableHead>
                    <TableHead>Orang Tua</TableHead>
                    <TableHead>Anak</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-32">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Belum ada data pendaftaran PPDB
                      </TableCell>
                    </TableRow>
                  ) : (
                    registrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="text-sm text-gray-500">{formatDate(reg.created_at)}</TableCell>
                        <TableCell className="font-mono text-sm font-medium">{reg.registration_number}</TableCell>
                        <TableCell className="font-medium">{reg.parent_name}</TableCell>
                        <TableCell>{reg.child_full_name}</TableCell>
                        <TableCell>{reg.program_applied}</TableCell>
                        <TableCell><StatusBadge status={reg.status} /></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Select defaultValue={reg.status} className="w-28">
                              <option value="PENDING">Pending</option>
                              <option value="VERIFIED">Verified</option>
                              <option value="ACCEPTED">Accepted</option>
                              <option value="REJECTED">Rejected</option>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}