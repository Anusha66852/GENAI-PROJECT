import React from 'react'
import { AlertCircle, X } from 'lucide-react'

export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null

  return (
    <div
      className="w-full max-w-3xl mx-auto flex items-start gap-3 rounded-xl px-4 py-3 fade-in"
      style={{ background: '#fee2e2', border: '1px solid #fecaca' }}
    >
      <AlertCircle size={18} className="mt-0.5 shrink-0" style={{ color: '#dc2626' }} />
      <p className="text-sm flex-1" style={{ color: '#991b1b' }}>{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 p-0.5">
          <X size={16} style={{ color: '#dc2626' }} />
        </button>
      )}
    </div>
  )
}
