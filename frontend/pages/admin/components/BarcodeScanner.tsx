import React, { useEffect, useRef, useState } from 'react';
import { Scan, X } from 'lucide-react';

interface BarcodeScannerProps {
    onScan: (code: string) => void;
    active?: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, active = true }) => {
    const [lastScanned, setLastScanned] = useState<string>('');
    const [flashSuccess, setFlashSuccess] = useState(false);
    const bufferRef = useRef<string>('');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!active) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input/textarea/select
            const target = e.target as HTMLElement;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

            if (e.key === 'Enter') {
                if (bufferRef.current.length > 2) {
                    const code = bufferRef.current.trim();
                    setLastScanned(code);
                    setFlashSuccess(true);
                    onScan(code);
                    setTimeout(() => setFlashSuccess(false), 1500);
                }
                bufferRef.current = '';
                return;
            }

            if (e.key.length === 1) {
                bufferRef.current += e.key;
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                    bufferRef.current = '';
                }, 100);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [active, onScan]);

    return (
        <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${flashSuccess
                    ? 'bg-green-50 border-green-400 text-green-700'
                    : 'bg-white border-[#B43F3F]/15 text-[#173B45]/60'
                }`}
        >
            <Scan size={16} className={flashSuccess ? 'text-green-500' : 'text-[#B43F3F]/50'} />
            <span className="text-xs font-medium">
                {flashSuccess
                    ? `✓ Scanned: ${lastScanned}`
                    : 'Aim barcode scanner at this screen & scan'}
            </span>
            {lastScanned && !flashSuccess && (
                <span className="ml-auto text-[10px] text-[#173B45]/40">Last: {lastScanned}</span>
            )}
        </div>
    );
};

export default BarcodeScanner;
