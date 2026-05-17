import React, { useState } from 'react'
import { Key, X, Eye, EyeOff } from 'lucide-react'

export default function ApiKeyModal({ currentKey, onSave, onClose }) {
  const [value, setValue] = useState(currentKey || '')
  const [show, setShow]   = useState(false)

  const handleSave = () => {
    onSave(value.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4"
           style={{ background: '#ffffff' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key size={18} style={{ color: '#344e6b' }} />
            <h2 className="font-semibold" style={{ color: '#1e2d3d' }}>Anthropic API Key</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X size={18} style={{ color: '#8fa3b8' }} />
          </button>
        </div>

        <p className="text-sm" style={{ color: '#3d5166' }}>
          Your key is stored only in your browser's local storage and never sent anywhere except
          directly to the Anthropic API.
        </p>

        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full rounded-xl border px-4 py-3 text-sm pr-12 outline-none focus:ring-2"
            style={{
              borderColor: '#d1dce6',
              color: '#1e2d3d',
              '--tw-ring-color': '#344e6b',
            }}
          />
          <button
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
            style={{ color: '#8fa3b8' }}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="flex gap-2 justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-xl border transition-all"
            style={{ borderColor: '#d1dce6', color: '#3d5166' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary text-sm px-4 py-2"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  )
}
