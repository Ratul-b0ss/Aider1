import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-light">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-red-100 flex flex-col items-center text-center gap-8">
        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-black uppercase italic tracking-tight">Something went wrong</h2>
          <p className="text-deep-moss/60 font-medium leading-relaxed">
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>
          <div className="mt-4 p-4 bg-red-50 rounded-2xl text-left">
            <p className="text-xs font-mono text-red-600 break-all">{error.message}</p>
          </div>
        </div>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-deep-moss text-white py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-primary hover:text-deep-moss transition-all"
        >
          <RefreshCcw size={20} /> Try Again
        </button>
      </div>
    </div>
  );
}

export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
