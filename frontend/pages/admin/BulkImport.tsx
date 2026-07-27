import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Settings, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Play, 
  RefreshCw,
  ChevronDown,
  ChevronRight,
  FileArchive,
  Info,
  File,
  X,
  PlusCircle,
  Edit2,
  Copy,
  Ban
} from 'lucide-react';
import API from '../../services/api';

// --- Interfaces ---

interface PreviewRow {
  _rowNumber: number;
  sku: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  subCategory?: string;
  thumbnail?: string;
  validationStatus: 'valid' | 'warning' | 'error';
  issues: Array<{ field: string; issue: string; suggestion: string; severity: 'error'|'warning' }>;
}

interface ValidationSummary {
  total: number;
  valid: number;
  errorCount: number;
  warningCount: number;
  rows: PreviewRow[];
  thumbnails: Record<string, string>;
}

interface ImportJob {
  _id: string;
  status: string;
  stats: { total: number; created: number; updated: number; skipped: number; failed: number; imageUploaded: number; };
  errors: any[];
  warnings: any[];
}

export default function BulkImport() {
  const [step, setStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [config, setConfig] = useState({ 
    brand: 'TANVO', 
    importMode: 'Create New', 
    templateType: 'Fashion', 
    autoCreateCategories: false, 
    isDryRun: false 
  });
  const [jobId, setJobId] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationSummary | null>(null);
  const [job, setJob] = useState<ImportJob | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'all'|'valid'|'warning'|'error'>('all');
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [validationStage, setValidationStage] = useState(0);
  
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/zip',
      'application/x-zip-compressed'
    ];
    if (validTypes.includes(file.type) || file.name.match(/\.(xlsx|csv|zip)$/i)) {
      setFile(file);
      setError(null);
    } else {
      setError('Invalid file type. Please upload .xlsx, .csv, or .zip');
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await API.get(`/admin/bulk-import/template?type=${config.templateType}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${config.templateType}_template.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Template download failed', err);
    }
  };

  const startValidation = async () => {
    if (!file) return;
    setStep(2);
    setError(null);
    setValidationStage(0);
    
    // Simulate validation stages for UX
    const stageInterval = setInterval(() => {
      setValidationStage(prev => {
        if (prev >= 4) {
          clearInterval(stageInterval);
          return 4;
        }
        return prev + 1;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('config', JSON.stringify(config));
      
      const response = await API.post('/admin/bulk-import/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      clearInterval(stageInterval);
      setValidationStage(4);
      setValidation(response.data.summary);
      setJobId(response.data.jobId);
      
      setTimeout(() => setStep(3), 600);
    } catch (err: any) {
      clearInterval(stageInterval);
      setError(err.response?.data?.message || 'Failed to upload and validate file.');
    }
  };

  const downloadErrorReport = () => {
    if (!validation) return;
    let csvContent = "Row,SKU,Field,Issue,Suggestion,Severity\n";
    validation.rows.forEach(row => {
      if (row.issues && row.issues.length > 0) {
        row.issues.forEach(issue => {
          csvContent += `"${row._rowNumber}","${row.sku}","${issue.field}","${issue.issue}","${issue.suggestion}","${issue.severity}"\n`;
        });
      }
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "validation_errors.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const startImport = async () => {
    if (!jobId) return;
    try {
      await API.post('/admin/bulk-import/execute', { jobId, importMode: config.importMode, isDryRun: config.isDryRun });
      setStep(4);
      startPolling(jobId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to start import.');
    }
  };

  const startPolling = (id: string) => {
    pollRef.current = setInterval(async () => {
      try {
        const response = await API.get(`/admin/bulk-import/status/${id}`);
        setJob(response.data);
        if (['completed', 'dry_run_complete', 'failed'].includes(response.data.status)) {
          if (pollRef.current) clearInterval(pollRef.current);
          setStep(5);
        }
      } catch (err) {
        console.error("Polling failed", err);
      }
    }, 2000);
  };

  const resetState = () => {
    setStep(1);
    setFile(null);
    setJobId(null);
    setValidation(null);
    setJob(null);
    setError(null);
  };

  const toggleRowExpansion = (rowNumber: number) => {
    setExpandedRows(prev => ({ ...prev, [rowNumber]: !prev[rowNumber] }));
  };

  const renderStepIndicator = () => {
    const steps = ['Upload', 'Validate', 'Preview', 'Import', 'Complete'];
    return (
      <div className="flex items-center justify-center mb-8 px-4">
        {steps.map((label, idx) => {
          const isActive = step === idx + 1;
          const isCompleted = step > idx + 1;
          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'bg-[#B43F3F] text-white' : 
                  isCompleted ? 'bg-[#173B45] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={`text-xs mt-2 ${isActive ? 'text-[#B43F3F] font-medium' : 'text-gray-500'}`}>{label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded transition-colors duration-300 ${
                  isCompleted ? 'bg-[#173B45]' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderStep1 = () => (
    <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#173B45]">Upload Products</h2>
        <button onClick={downloadTemplate} className="flex items-center space-x-2 text-[#B43F3F] hover:bg-[#B43F3F]/10 px-4 py-2 rounded-md transition-colors">
          <Download className="w-4 h-4" />
          <span>Download Template</span>
        </button>
      </div>

      <div 
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
          isDragging ? 'border-[#B43F3F] bg-[#B43F3F]/5' : 
          file ? 'border-[#173B45] bg-[#173B45]/5' : 'border-gray-300 hover:border-[#B43F3F] hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept=".xlsx,.csv,.zip" onChange={handleFileChange} />
        {file ? (
          <div className="flex flex-col items-center space-y-3">
            {file.name.endsWith('.zip') ? <FileArchive className="w-12 h-12 text-[#173B45]" /> : <FileSpreadsheet className="w-12 h-12 text-[#173B45]" />}
            <div>
              <p className="font-semibold text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-sm text-red-500 hover:underline">Remove</button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-[#B43F3F]' : 'text-gray-400'}`} />
            <p className="text-lg font-medium text-gray-700">Drag & drop your file here</p>
            <p className="text-sm text-gray-500">or click to browse</p>
            <div className="flex items-center space-x-2 mt-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">.xlsx</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">.csv</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">.zip</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button 
          onClick={() => setShowInstructions(!showInstructions)} 
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-2 text-[#173B45] font-medium">
            <Info className="w-5 h-5" />
            <span>Format Instructions</span>
          </div>
          {showInstructions ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
        {showInstructions && (
          <div className="p-4 border-t border-gray-200 text-sm text-gray-600">
            <p className="mb-2">For simple imports, upload a <strong>.xlsx</strong> or <strong>.csv</strong> file.</p>
            <p className="mb-2">To import products with images, upload a <strong>.zip</strong> file with this structure:</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-xs overflow-x-auto">
{`TanvoImport.zip
├── Products.xlsx (or .csv)
└── Images/
    ├── SKU001.jpg
    ├── SKU001-2.jpg
    └── SKU002.png`}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <h3 className="font-semibold text-[#173B45] flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Import Configuration</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Brand</label>
            <select 
              value={config.brand} 
              onChange={e => setConfig({...config, brand: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B43F3F] focus:border-[#B43F3F]"
            >
              <option value="TANVO">TANVO</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Template Type</label>
            <select 
              value={config.templateType} 
              onChange={e => setConfig({...config, templateType: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#B43F3F] focus:border-[#B43F3F]"
            >
              <option value="Fashion">Fashion</option>
              <option value="Kids">Kids</option>
              <option value="Accessories">Accessories</option>
              <option value="Sarees">Sarees</option>
              <option value="Home Decor">Home Decor</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Import Mode</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { id: 'Create New', icon: PlusCircle, color: 'text-green-500', desc: 'Add only new products' },
              { id: 'Update Existing', icon: Edit2, color: 'text-blue-500', desc: 'Update only matching SKUs' },
              { id: 'Create or Update', icon: RefreshCw, color: 'text-yellow-500', desc: 'Add new, update existing' },
              { id: 'Ignore Existing', icon: Ban, color: 'text-gray-500', desc: 'Add new, skip duplicates' },
            ].map(mode => (
              <label 
                key={mode.id} 
                className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                  config.importMode === mode.id ? 'border-[#B43F3F] bg-[#B43F3F]/5' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="importMode" 
                  value={mode.id} 
                  checked={config.importMode === mode.id}
                  onChange={() => setConfig({...config, importMode: mode.id})}
                  className="mt-1 text-[#B43F3F] focus:ring-[#B43F3F]"
                />
                <div className="ml-3">
                  <div className="flex items-center space-x-2">
                    <mode.icon className={`w-4 h-4 ${mode.color}`} />
                    <span className="font-medium text-gray-900">{mode.id}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{mode.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.autoCreateCategories}
              onChange={e => setConfig({...config, autoCreateCategories: e.target.checked})}
              className="rounded text-[#B43F3F] focus:ring-[#B43F3F]"
            />
            <span className="text-sm text-gray-700">Auto-create missing categories</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group relative">
            <input 
              type="checkbox" 
              checked={config.isDryRun}
              onChange={e => setConfig({...config, isDryRun: e.target.checked})}
              className="rounded text-[#FF8225] focus:ring-[#FF8225]"
            />
            <span className="text-sm font-medium text-[#FF8225]">Dry Run Simulation</span>
            <div className="hidden group-hover:block absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
              Simulates the import without saving anything to the database.
            </div>
          </label>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start space-x-3 text-red-700">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button 
          onClick={startValidation}
          disabled={!file}
          className={`px-6 py-3 rounded-md font-medium text-white transition-colors ${
            file ? 'bg-[#B43F3F] hover:bg-[#9c3434]' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Validate File
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => {
    const stages = [
      { id: 0, label: 'Reading file...' },
      { id: 1, label: 'Parsing rows...' },
      { id: 2, label: 'Checking for duplicates...' },
      { id: 3, label: 'Validating against catalog...' },
      { id: 4, label: 'Validation complete!' },
    ];

    return (
      <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center justify-center py-12">
        <div className="w-full max-w-md space-y-4">
          {stages.map(stage => {
            const isCompleted = validationStage > stage.id;
            const isCurrent = validationStage === stage.id;
            return (
              <div key={stage.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${
                isCompleted ? 'bg-green-50 border-green-200 text-green-700' :
                isCurrent ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-100 text-gray-400'
              }`}>
                {isCompleted ? <CheckCircle className="w-6 h-6 text-green-500" /> :
                 isCurrent ? <RefreshCw className="w-6 h-6 text-blue-500 animate-spin" /> :
                 <div className="w-6 h-6 rounded-full border-2 border-gray-200" />}
                <span className="font-medium">{stage.label}</span>
              </div>
            );
          })}
        </div>
        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md flex flex-col items-center space-y-3">
            <div className="flex items-center text-red-700 space-x-2">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
            <button onClick={() => setStep(1)} className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">Retry</button>
          </div>
        )}
      </motion.div>
    );
  };

  const renderStep3 = () => {
    if (!validation) return null;
    
    const filteredRows = validation.rows.filter(row => {
      if (previewTab === 'all') return true;
      return row.validationStatus === previewTab;
    });

    const hasErrors = validation.errorCount > 0;
    const canImport = config.isDryRun || !hasErrors;

    return (
      <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
        {config.isDryRun && (
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-md flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Dry Run Mode Active: This is a simulation — no data will be saved.</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="text-blue-500 text-sm font-medium">Total Rows</div>
            <div className="text-2xl font-bold text-blue-900 mt-1">{validation.total}</div>
          </div>
          <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
            <div className="text-green-500 text-sm font-medium">Ready to Import</div>
            <div className="text-2xl font-bold text-green-900 mt-1">{validation.valid}</div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <div className="text-amber-500 text-sm font-medium">Warnings</div>
            <div className="text-2xl font-bold text-amber-900 mt-1">{validation.warningCount}</div>
          </div>
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
            <div className="text-red-500 text-sm font-medium">Errors</div>
            <div className="text-2xl font-bold text-red-900 mt-1">{validation.errorCount}</div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-2">
            {(['all', 'valid', 'warning', 'error'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setPreviewTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                  previewTab === tab 
                    ? 'bg-[#173B45] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
                {tab === 'error' && validation.errorCount > 0 && <span className="ml-2 bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs">{validation.errorCount}</span>}
                {tab === 'warning' && validation.warningCount > 0 && <span className="ml-2 bg-amber-500 text-white px-1.5 py-0.5 rounded-full text-xs">{validation.warningCount}</span>}
              </button>
            ))}
          </div>
          {(validation.errorCount > 0 || validation.warningCount > 0) && (
            <button onClick={downloadErrorReport} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 w-16">Row</th>
                  <th className="px-4 py-3 w-16">Image</th>
                  <th className="px-4 py-3">SKU / Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRows.map(row => (
                  <React.Fragment key={row._rowNumber}>
                    <tr className={`hover:bg-gray-50 ${expandedRows[row._rowNumber] ? 'bg-gray-50' : ''}`}>
                      <td className="px-4 py-3 text-gray-500">{row._rowNumber}</td>
                      <td className="px-4 py-3">
                        {row.thumbnail ? (
                          <img src={row.thumbnail} alt="thumb" className="w-10 h-10 object-cover rounded border" />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-gray-400">
                            <File className="w-5 h-5" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{row.sku}</div>
                        <div className="text-gray-500 truncate max-w-[200px]">{row.name}</div>
                      </td>
                      <td className="px-4 py-3">₹{row.price}</td>
                      <td className="px-4 py-3 truncate max-w-[150px]">{row.category}</td>
                      <td className="px-4 py-3">
                        {row.validationStatus === 'valid' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Valid</span>}
                        {row.validationStatus === 'warning' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Warning</span>}
                        {row.validationStatus === 'error' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Error</span>}
                      </td>
                      <td className="px-4 py-3">
                        {row.issues && row.issues.length > 0 && (
                          <button onClick={() => toggleRowExpansion(row._rowNumber)} className="text-gray-400 hover:text-gray-600">
                            {expandedRows[row._rowNumber] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedRows[row._rowNumber] && row.issues && row.issues.length > 0 && (
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <td colSpan={7} className="px-8 py-4">
                          <div className="space-y-2">
                            {row.issues.map((issue, idx) => (
                              <div key={idx} className={`flex items-start space-x-2 text-sm ${issue.severity === 'error' ? 'text-red-700' : 'text-amber-700'}`}>
                                {issue.severity === 'error' ? <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                                <div>
                                  <span className="font-semibold capitalize">{issue.field}: </span>
                                  <span>{issue.issue}</span>
                                  {issue.suggestion && <p className="text-xs mt-0.5 opacity-80">Suggestion: {issue.suggestion}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button onClick={resetState} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          
          <button 
            onClick={startImport}
            disabled={!canImport}
            className={`flex items-center space-x-2 px-6 py-2 rounded-md font-medium text-white transition-colors ${
              !canImport ? 'bg-gray-300 cursor-not-allowed' :
              config.isDryRun ? 'bg-[#FF8225] hover:bg-[#e67520]' : 'bg-[#B43F3F] hover:bg-[#9c3434]'
            }`}
          >
            {config.isDryRun ? <Play className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
            <span>{config.isDryRun ? 'Run Simulation' : 'Start Import'}</span>
          </button>
        </div>
      </motion.div>
    );
  };

  const renderStep4 = () => {
    // If we don't have job data yet, mock some initial progress
    const stats = job?.stats || { total: validation?.total || 100, created: 0, updated: 0, imageUploaded: 0, skipped: 0, failed: 0 };
    
    // Simulate image upload progress relative to products processed for UX if real stats not granular
    const processedCount = stats.created + stats.updated + stats.skipped + stats.failed;
    
    const imageProgress = Math.min(100, Math.round((stats.imageUploaded / Math.max(1, stats.total)) * 100)) || Math.min(100, Math.round((processedCount / Math.max(1, stats.total)) * 100) + 10);
    const importProgress = Math.min(100, Math.round((processedCount / Math.max(1, stats.total)) * 100));
    const invProgress = Math.max(0, importProgress - 10); // Lags slightly behind

    const progressColor = config.isDryRun ? 'bg-[#173B45]' : 'bg-[#B43F3F]';

    return (
      <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-12 px-6 max-w-2xl mx-auto space-y-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {config.isDryRun ? 'Simulating Import...' : 'Importing Products...'}
        </h2>
        
        <p className="text-gray-500">
          Processing {processedCount} of {stats.total} items
        </p>

        <div className="space-y-6 text-left">
          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-gray-700 flex items-center"><UploadCloud className="w-4 h-4 mr-2"/> Uploading Images</span>
              <span className="text-gray-500">{imageProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${progressColor} rounded-full h-2 transition-all duration-500`} style={{width: `${imageProgress}%`}}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-gray-700 flex items-center"><FileArchive className="w-4 h-4 mr-2"/> Importing Data</span>
              <span className="text-gray-500">{importProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${progressColor} rounded-full h-2 transition-all duration-500 delay-100`} style={{width: `${importProgress}%`}}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-gray-700 flex items-center"><RefreshCw className="w-4 h-4 mr-2"/> Updating Inventory</span>
              <span className="text-gray-500">{invProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`${progressColor} rounded-full h-2 transition-all duration-500 delay-200`} style={{width: `${invProgress}%`}}></div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 inline-block text-sm text-gray-600">
          You can safely close this tab — the import continues in the background.
        </div>
      </motion.div>
    );
  };

  const renderStep5 = () => {
    const isFailed = job?.status === 'failed';
    const stats = job?.stats || { total: 0, created: 0, updated: 0, imageUploaded: 0, skipped: 0, failed: 0 };
    
    return (
      <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 py-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {isFailed ? (
              <XCircle className="w-20 h-20 text-red-500" />
            ) : config.isDryRun ? (
              <RefreshCw className="w-20 h-20 text-blue-500" />
            ) : (
              <CheckCircle className="w-20 h-20 text-green-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            {isFailed ? 'Import Failed' : config.isDryRun ? 'Simulation Complete' : 'Import Complete!'}
          </h2>
          {config.isDryRun && (
            <p className="text-amber-600 bg-amber-50 inline-block px-4 py-2 rounded-full text-sm font-medium">
              This was a simulation. No data was saved to the database.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-gray-500 text-sm">Created</div>
            <div className="text-2xl font-bold text-green-600">{stats.created}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-gray-500 text-sm">Updated</div>
            <div className="text-2xl font-bold text-blue-600">{stats.updated}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-gray-500 text-sm">Skipped</div>
            <div className="text-2xl font-bold text-gray-600">{stats.skipped}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-gray-500 text-sm">Failed</div>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <div className="text-gray-500 text-sm">Images</div>
            <div className="text-2xl font-bold text-purple-600">{stats.imageUploaded}</div>
          </div>
        </div>

        {isFailed && job?.errors && job.errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-semibold text-red-800 mb-2">Top Errors</h4>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {job.errors.slice(0, 5).map((e, i) => (
                <li key={i}>{e.message || JSON.stringify(e)}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
          <button onClick={resetState} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors w-full sm:w-auto">
            Import Another File
          </button>
          
          <a href="/admin/products" className="px-6 py-3 bg-[#173B45] hover:bg-[#102a31] text-white rounded-md font-medium transition-colors w-full sm:w-auto text-center">
            View All Products
          </a>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#173B45]">Bulk Import</h1>
          <p className="text-gray-500 mt-1">Import products, update inventory, and upload images in bulk.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {renderStepIndicator()}
          
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}
              {step === 5 && renderStep5()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
