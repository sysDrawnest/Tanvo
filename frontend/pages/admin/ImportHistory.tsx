import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload, Search, X, ChevronDown, ChevronUp, FileDown, RotateCcw, Play, Trash2,
  CheckCircle, XCircle, Clock, AlertTriangle, AlertCircle, Loader2, FlaskConical, Calendar, FileText
} from 'lucide-react';
import API from '../../services/api';

interface ImportJobRecord {
  _id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | 'rolled_back' | 'dry_run_complete';
  brand: string;
  importMode: string;
  isDryRun: boolean;
  templateType: string;
  fileName: string;
  fileSize: number;
  stats: {
    total: number;
    created: number;
    updated: number;
    skipped: number;
    failed: number;
    imageUploaded: number;
  };
  errors: Array<{ row: number; sku: string; field: string; issue: string; suggestion: string; }>;
  warnings: any[];
  resumable: boolean;
  createdBy: { name: string; email: string; };
  duration: number;
  startedAt: string;
  completedAt: string;
  createdAt: string;
}

const downloadCSV = (filename: string, headers: string[], rows: string[][]) => {
  const content = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

export default function ImportHistory() {
  const [jobs, setJobs] = useState<ImportJobRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  
  // Filters and Pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [brandFilter, setBrandFilter] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  
  const limit = 20;
  
  // State for expanded rows and modal
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rollbackJob, setRollbackJob] = useState<ImportJobRecord | null>(null);
  
  // Toasts
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/bulk-import/history?page=${page}&limit=${limit}`;
      if (statusFilter !== 'All') url += `&status=${statusFilter.toLowerCase()}`;
      if (brandFilter !== 'All') url += `&brand=${brandFilter}`;
      
      const { data } = await API.get(url);
      // Assuming API returns { data: ImportJobRecord[], total: number }
      setJobs(data.data || []);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
      showToast('Failed to load import history', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, statusFilter, brandFilter]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRollback = async () => {
    if (!rollbackJob) return;
    try {
      await API.post(`/api/admin/bulk-import/rollback/${rollbackJob._id}`);
      showToast('Rollback successful', 'success');
      fetchJobs();
    } catch (err) {
      showToast('Failed to rollback import', 'error');
    } finally {
      setRollbackJob(null);
    }
  };

  const handleResume = async (id: string) => {
    try {
      await API.post(`/api/admin/bulk-import/resume/${id}`);
      showToast('Import resumed successfully', 'success');
      fetchJobs();
    } catch (err) {
      showToast('Failed to resume import', 'error');
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await API.delete(`/api/admin/bulk-import/${id}`);
      showToast('Import cancelled', 'success');
      fetchJobs();
    } catch (err) {
      showToast('Failed to cancel import', 'error');
    }
  };

  const handleDownloadReport = (job: ImportJobRecord) => {
    const headers = ['Type', 'Row', 'SKU', 'Field', 'Issue', 'Suggestion'];
    const rows = [
      ...job.errors.map(e => ['Error', e.row.toString(), e.sku, e.field, e.issue, e.suggestion]),
      ...job.warnings.map(w => ['Warning', w.row?.toString() || '', w.sku || '', w.field || '', w.issue || '', w.suggestion || ''])
    ];
    downloadCSV(`import-report-${job._id}.csv`, headers, rows);
  };

  // Client-side filtering for search & dates
  const filteredJobs = useMemo(() => {
    let result = jobs;
    if (search) {
      result = result.filter(j => j.fileName.toLowerCase().includes(search.toLowerCase()));
    }
    if (fromDate) {
      result = result.filter(j => new Date(j.createdAt) >= new Date(fromDate));
    }
    if (toDate) {
      result = result.filter(j => new Date(j.createdAt) <= new Date(toDate + 'T23:59:59'));
    }
    return result;
  }, [jobs, search, fromDate, toDate]);

  // Analytics Calculations
  const stats = useMemo(() => {
    const completed = jobs.filter(j => j.status === 'completed');
    const failed = jobs.filter(j => j.status === 'failed');
    
    return {
      total: jobs.length,
      productsImported: completed.reduce((acc, curr) => acc + (curr.stats?.created || 0) + (curr.stats?.updated || 0), 0),
      failedImports: failed.length,
      avgDuration: completed.length 
        ? Math.round(completed.reduce((acc, curr) => acc + (curr.duration || 0), 0) / completed.length) 
        : 0
    };
  }, [jobs]);

  const getStatusBadge = (status: ImportJobRecord['status']) => {
    switch (status) {
      case 'queued':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><span className="w-2 h-2 mr-1.5 bg-amber-500 rounded-full animate-pulse"></span>Queued</span>;
      case 'processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Loader2 className="w-3 h-3 mr-1.5 animate-spin" />Processing</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1.5" />Completed</span>;
      case 'failed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1.5" />Failed</span>;
      case 'rolled_back':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 line-through">Rolled Back</span>;
      case 'dry_run_complete':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"><FlaskConical className="w-3 h-3 mr-1.5" />Simulation</span>;
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setBrandFilter('All');
    setFromDate('');
    setToDate('');
    setPage(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return '-';
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  return (
    <div className="min-h-screen bg-[#F8EDED] p-6 text-[#173B45]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg flex items-center space-x-2 ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-[#B43F3F]'
            } text-white`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Import History</h1>
          <p className="text-gray-600 mt-1">View, manage, and rollback all past bulk import operations</p>
        </div>
        <Link 
          to="/admin/bulk-import" 
          className="mt-4 md:mt-0 bg-[#B43F3F] hover:bg-red-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
        >
          <Upload className="w-5 h-5 mr-2" />
          New Import
        </Link>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Imports (Page)', value: stats.total, icon: FileText, color: 'text-blue-600' },
          { title: 'Products Imported', value: stats.productsImported, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Failed Imports', value: stats.failedImports, icon: XCircle, color: 'text-[#B43F3F]' },
          { title: 'Avg Duration', value: formatDuration(stats.avgDuration), icon: Clock, color: 'text-[#FF8225]' },
        ].map((card, i) => (
          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className={`p-3 rounded-lg bg-gray-50 mr-4 ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative lg:col-span-2">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by file name..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173B45]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#173B45]"
          >
            {['All', 'Queued', 'Processing', 'Completed', 'Failed', 'Rolled Back', 'Simulation'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select 
            value={brandFilter} 
            onChange={(e) => setBrandFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#173B45]"
          >
            {['All', 'TANVO'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#173B45]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#173B45]"
            />
            <button 
              onClick={clearFilters}
              title="Clear Filters"
              className="p-2 text-gray-500 hover:text-[#B43F3F] bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">File</th>
                <th className="py-3 px-4">Brand</th>
                <th className="py-3 px-4">Mode</th>
                <th className="py-3 px-4 text-right">Created</th>
                <th className="py-3 px-4 text-right">Updated</th>
                <th className="py-3 px-4 text-right">Failed</th>
                <th className="py-3 px-4 text-right">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div></td>
                    <td className="py-4 px-4"><div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div></td>
                    <td className="py-4 px-4"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                    <td className="py-4 px-4"><div className="h-8 bg-gray-200 rounded w-24 mx-auto"></div></td>
                  </tr>
                ))
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <FileText className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-medium text-[#173B45] mb-1">No imports found</h3>
                      <p className="text-gray-500 mb-4 max-w-sm">No imports match your criteria. Start your first bulk import or clear filters.</p>
                      <Link to="/admin/bulk-import" className="text-[#B43F3F] hover:text-red-800 font-medium">
                        Go to Bulk Import &rarr;
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <React.Fragment key={job._id}>
                    <tr className={`hover:bg-gray-50 transition-colors ${expandedId === job._id ? 'bg-gray-50' : ''}`}>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{formatDate(job.createdAt)}</td>
                      <td className="py-3 px-4 font-medium truncate max-w-[200px]" title={job.fileName}>{job.fileName}</td>
                      <td className="py-3 px-4">{job.brand}</td>
                      <td className="py-3 px-4 capitalize">{job.importMode.replace('_', ' ')}</td>
                      <td className="py-3 px-4 text-right">{job.stats?.created || 0}</td>
                      <td className="py-3 px-4 text-right">{job.stats?.updated || 0}</td>
                      <td className="py-3 px-4 text-right text-red-500 font-medium">{job.stats?.failed || 0}</td>
                      <td className="py-3 px-4 text-right text-gray-500">{formatDuration(job.duration)}</td>
                      <td className="py-3 px-4">{getStatusBadge(job.status)}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => setExpandedId(expandedId === job._id ? null : job._id)}
                            className="px-2 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center"
                          >
                            Details {expandedId === job._id ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                          </button>
                          
                          {job.status === 'completed' && !job.isDryRun && (
                            <button 
                              onClick={() => setRollbackJob(job)}
                              className="p-1.5 text-gray-500 hover:text-[#FF8225] bg-gray-100 hover:bg-orange-50 rounded"
                              title="Rollback Import"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                          
                          {job.status === 'failed' && job.resumable && (
                            <button 
                              onClick={() => handleResume(job._id)}
                              className="p-1.5 text-gray-500 hover:text-green-600 bg-gray-100 hover:bg-green-50 rounded"
                              title="Resume Import"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          
                          {job.status === 'queued' && (
                            <button 
                              onClick={() => handleCancel(job._id)}
                              className="p-1.5 text-gray-500 hover:text-[#B43F3F] bg-gray-100 hover:bg-red-50 rounded"
                              title="Cancel Import"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    <AnimatePresence>
                      {expandedId === job._id && (
                        <motion.tr 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gray-50 border-b border-gray-100 overflow-hidden"
                        >
                          <td colSpan={10} className="p-0">
                            <div className="p-6 border-l-4 border-[#173B45] m-4 bg-white rounded shadow-sm">
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <h4 className="font-semibold text-lg flex items-center">
                                    Import Details 
                                    <span className="ml-3 text-sm font-normal text-gray-500">ID: {job._id}</span>
                                  </h4>
                                  <p className="text-sm text-gray-500">By: {job.createdBy?.name || 'Unknown'} ({job.createdBy?.email || 'N/A'})</p>
                                </div>
                                <button 
                                  onClick={() => handleDownloadReport(job)}
                                  className="flex items-center text-sm px-3 py-1.5 bg-[#173B45] hover:bg-[#0c1f24] text-white rounded transition-colors"
                                >
                                  <FileDown className="w-4 h-4 mr-2" />
                                  Download Report
                                </button>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 text-sm">
                                <div className="bg-gray-50 p-3 rounded"><p className="text-gray-500">Total Rows</p><p className="font-bold text-lg">{job.stats?.total || 0}</p></div>
                                <div className="bg-green-50 p-3 rounded"><p className="text-gray-500">Created</p><p className="font-bold text-lg text-green-700">{job.stats?.created || 0}</p></div>
                                <div className="bg-blue-50 p-3 rounded"><p className="text-gray-500">Updated</p><p className="font-bold text-lg text-blue-700">{job.stats?.updated || 0}</p></div>
                                <div className="bg-amber-50 p-3 rounded"><p className="text-gray-500">Skipped</p><p className="font-bold text-lg text-amber-700">{job.stats?.skipped || 0}</p></div>
                                <div className="bg-red-50 p-3 rounded"><p className="text-gray-500">Failed</p><p className="font-bold text-lg text-red-700">{job.stats?.failed || 0}</p></div>
                                <div className="bg-gray-50 p-3 rounded"><p className="text-gray-500">Images</p><p className="font-bold text-lg">{job.stats?.imageUploaded || 0}</p></div>
                              </div>

                              {job.errors?.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="font-medium text-red-600 flex items-center mb-3">
                                    <AlertCircle className="w-4 h-4 mr-1.5" /> Top Errors (Showing up to 10)
                                  </h5>
                                  <div className="border border-red-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-xs text-left">
                                      <thead className="bg-red-50 text-red-800">
                                        <tr>
                                          <th className="py-2 px-3 w-16">Row</th>
                                          <th className="py-2 px-3">SKU</th>
                                          <th className="py-2 px-3">Field</th>
                                          <th className="py-2 px-3">Issue</th>
                                          <th className="py-2 px-3">Suggestion</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-red-100">
                                        {job.errors.slice(0, 10).map((err, i) => (
                                          <tr key={i} className="hover:bg-red-50/50">
                                            <td className="py-2 px-3">{err.row}</td>
                                            <td className="py-2 px-3 font-medium">{err.sku || '-'}</td>
                                            <td className="py-2 px-3">{err.field || '-'}</td>
                                            <td className="py-2 px-3 text-red-600">{err.issue}</td>
                                            <td className="py-2 px-3 text-gray-500">{err.suggestion}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}

                              {job.warnings?.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-amber-600 flex items-center mb-3">
                                    <AlertTriangle className="w-4 h-4 mr-1.5" /> Warnings (Showing up to 10)
                                  </h5>
                                  <div className="border border-amber-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-xs text-left">
                                      <thead className="bg-amber-50 text-amber-800">
                                        <tr>
                                          <th className="py-2 px-3 w-16">Row</th>
                                          <th className="py-2 px-3">Issue</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-amber-100">
                                        {job.warnings.slice(0, 10).map((warn, i) => (
                                          <tr key={i} className="hover:bg-amber-50/50">
                                            <td className="py-2 px-3">{warn.row || '-'}</td>
                                            <td className="py-2 px-3 text-amber-700">{warn.issue || JSON.stringify(warn)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && totalItems > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(page * limit, totalItems)}</span> of <span className="font-medium">{totalItems}</span> imports
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-200 rounded text-sm bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-[#173B45] font-medium">Page {page}</span>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * limit >= totalItems}
                className="px-3 py-1 border border-gray-200 rounded text-sm bg-white text-gray-600 disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rollback Modal */}
      <AnimatePresence>
        {rollbackJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-[#B43F3F]">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#173B45] mb-2">Confirm Rollback</h3>
                <p className="text-gray-600 mb-6">
                  This action will delete all <strong className="text-green-600">{rollbackJob.stats?.created || 0}</strong> products created and restore <strong className="text-blue-600">{rollbackJob.stats?.updated || 0}</strong> updated products to their previous state. Are you absolutely sure?
                </p>
                <div className="flex justify-end space-x-3">
                  <button 
                    onClick={() => setRollbackJob(null)}
                    className="px-4 py-2 font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleRollback}
                    className="px-4 py-2 font-medium text-white bg-[#B43F3F] hover:bg-red-800 rounded-lg transition-colors"
                  >
                    Confirm Rollback
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
