import React from 'react'
import { Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center gap-3"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)' }}>
      <div className="flex items-center justify-center w-10 h-10 rounded-xl"
           style={{ background: 'rgba(255,255,255,0.3)' }}>
        <Zap size={20} style={{ color: '#344e6b' }} />
      </div>
      <div>
        <p className="font-semibold text-sm leading-tight" style={{ color: '#1e2d3d' }}>
          Prompt Optimizer
        </p>
        <p className="text-xs" style={{ color: '#3d5166' }}>
          Classify &amp; enhance your prompts
        </p>
      </div>
    </header>
  )
}
