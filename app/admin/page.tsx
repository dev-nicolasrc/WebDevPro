'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, FileText, Calendar, Download, Search, Filter, LogOut, RefreshCw, Globe, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
  tipoNegocio?: string;
  fuente: string;
  estado: string;
  createdAt: string;
  cotizaciones?: any[];
  reuniones?: any[];
}

interface Cotizacion {
  id: string;
  tipoSitio: string;
  precioEstimado: number;
  estado: string;
  createdAt: string;
  lead?: { nombre: string; email: string };
}

interface Reunion {
  id: string;
  fechaReunion: string;
  horaReunion: string;
  estado: string;
  notas?: string;
  createdAt: string;
  lead?: { nombre: string; email: string; telefono?: string };
}

export default function AdminPage() {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);
  const [reuniones, setReuniones] = useState<Reunion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFuente, setFilterFuente] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router?.replace?.('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [leadsRes, cotizacionesRes, reunionesRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/cotizaciones'),
        fetch('/api/reuniones'),
      ]);
      const leadsData = await leadsRes?.json();
      const cotizacionesData = await cotizacionesRes?.json();
      const reunionesData = await reunionesRes?.json();
      setLeads(leadsData?.leads ?? []);
      setCotizaciones(cotizacionesData?.cotizaciones ?? []);
      setReuniones(reunionesData?.reuniones ?? []);
    } catch (error) {
      toast?.error?.('Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data?.length) return;
    const headers = Object.keys(data[0] ?? {})?.filter(k => k !== 'lead' && k !== 'cotizaciones' && k !== 'reuniones');
    const csvContent = [headers?.join(','), ...data?.map(row => headers?.map(h => `"${(row?.[h] ?? '')?.toString?.()?.replace?.(/"/g, '""')}"`)?.join(','))]?.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL?.createObjectURL?.(blob);
    const a = document?.createElement?.('a');
    a.href = url;
    a.download = `${filename}_${new Date()?.toISOString()?.split?.('T')?.[0]}.csv`;
    a?.click?.();
    URL?.revokeObjectURL?.(url);
    toast?.success?.('Archivo exportado');
  };

  const filteredLeads = leads?.filter(l => {
    const matchSearch = (l?.nombre ?? '')?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.()) || (l?.email ?? '')?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.());
    const matchFilter = !filterFuente || l?.fuente === filterFuente;
    return matchSearch && matchFilter;
  });

  const stats = {
    totalLeads: leads?.length ?? 0,
    totalCotizaciones: cotizaciones?.length ?? 0,
    totalReuniones: reuniones?.length ?? 0,
    valorTotal: cotizaciones?.reduce?.((acc, c) => acc + (c?.precioEstimado ?? 0), 0) ?? 0,
  };

  if (status === 'loading' || isLoading) {
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center"><RefreshCw className="w-8 h-8 text-blue-600 animate-spin" /></div>);
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center"><Globe className="w-5 h-5 text-white" /></div>
            <div><h1 className="font-bold text-gray-900">WebDev Pro</h1><p className="text-xs text-gray-500">Panel de Administracion</p></div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hola, {session?.user?.name ?? 'Admin'}</span>
            <button onClick={() => signOut?.({ callbackUrl: '/admin/login' })} className="p-2 text-gray-500 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Leads', value: stats?.totalLeads, icon: Users, color: 'bg-blue-500' },
            { label: 'Cotizaciones', value: stats?.totalCotizaciones, icon: FileText, color: 'bg-green-500' },
            { label: 'Reuniones', value: stats?.totalReuniones, icon: Calendar, color: 'bg-purple-500' },
            { label: 'Valor Pipeline', value: `$${stats?.valorTotal?.toLocaleString?.()}`, icon: DollarSign, color: 'bg-orange-500' },
          ]?.map((stat) => {
            const Icon = stat?.icon;
            return (
              <motion.div key={stat?.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm text-gray-500">{stat?.label}</p><p className="text-2xl font-bold text-gray-900 mt-1">{stat?.value}</p></div>
                  <div className={`w-12 h-12 ${stat?.color} rounded-xl flex items-center justify-center`}><Icon className="w-6 h-6 text-white" /></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b">
            {[{ id: 'leads', label: 'Leads', icon: Users }, { id: 'cotizaciones', label: 'Cotizaciones', icon: FileText }, { id: 'reuniones', label: 'Reuniones', icon: Calendar }]?.map((tab) => {
              const Icon = tab?.icon;
              return (<button key={tab?.id} onClick={() => setActiveTab(tab?.id)} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab?.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}><Icon className="w-4 h-4" />{tab?.label}</button>);
            })}
          </div>
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e?.target?.value ?? '')} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div>
              {activeTab === 'leads' && (
                <select value={filterFuente} onChange={(e) => setFilterFuente(e?.target?.value ?? '')} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Todas las fuentes</option>
                  <option value="chatbot">Chatbot</option>
                  <option value="cotizador">Cotizador</option>
                  <option value="contacto">Contacto</option>
                </select>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={fetchData} className="p-2 text-gray-500 hover:text-blue-600 transition-colors"><RefreshCw className="w-5 h-5" /></button>
              <button onClick={() => exportToCSV(activeTab === 'leads' ? filteredLeads : activeTab === 'cotizaciones' ? cotizaciones : reuniones, activeTab)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"><Download className="w-4 h-4" />Exportar CSV</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'leads' && (
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefono</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuente</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads?.map((lead) => (<tr key={lead?.id} className="hover:bg-gray-50"><td className="px-6 py-4 font-medium text-gray-900">{lead?.nombre}</td><td className="px-6 py-4 text-gray-600">{lead?.email}</td><td className="px-6 py-4 text-gray-600">{lead?.telefono || '-'}</td><td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{lead?.tipoNegocio || '-'}</span></td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${lead?.fuente === 'chatbot' ? 'bg-purple-100 text-purple-700' : lead?.fuente === 'cotizador' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{lead?.fuente}</span></td><td className="px-6 py-4 text-gray-500 text-sm">{new Date(lead?.createdAt)?.toLocaleDateString?.()}</td></tr>))}
              </tbody>
            </table>
          )}
          {activeTab === 'cotizaciones' && (
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Sitio</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {cotizaciones?.map((c) => (<tr key={c?.id} className="hover:bg-gray-50"><td className="px-6 py-4"><div><p className="font-medium text-gray-900">{c?.lead?.nombre}</p><p className="text-sm text-gray-500">{c?.lead?.email}</p></div></td><td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">{c?.tipoSitio}</span></td><td className="px-6 py-4 font-semibold text-gray-900">${c?.precioEstimado?.toLocaleString?.()}</td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${c?.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{c?.estado}</span></td><td className="px-6 py-4 text-gray-500 text-sm">{new Date(c?.createdAt)?.toLocaleDateString?.()}</td></tr>))}
              </tbody>
            </table>
          )}
          {activeTab === 'reuniones' && (
            <table className="w-full">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notas</th></tr></thead>
              <tbody className="divide-y divide-gray-200">
                {reuniones?.map((r) => (<tr key={r?.id} className="hover:bg-gray-50"><td className="px-6 py-4"><div><p className="font-medium text-gray-900">{r?.lead?.nombre}</p><p className="text-sm text-gray-500">{r?.lead?.email}</p></div></td><td className="px-6 py-4 text-gray-900">{new Date(r?.fechaReunion)?.toLocaleDateString?.()}</td><td className="px-6 py-4 text-gray-600">{r?.horaReunion}</td><td className="px-6 py-4"><span className={`px-2 py-1 text-xs rounded-full ${r?.estado === 'programada' ? 'bg-blue-100 text-blue-700' : r?.estado === 'completada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r?.estado}</span></td><td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">{r?.notas || '-'}</td></tr>))}
              </tbody>
            </table>
          )}
          {((activeTab === 'leads' && !filteredLeads?.length) || (activeTab === 'cotizaciones' && !cotizaciones?.length) || (activeTab === 'reuniones' && !reuniones?.length)) && (
            <div className="p-12 text-center text-gray-500">No hay datos para mostrar</div>
          )}
        </div>
      </main>
    </div>
  );
}