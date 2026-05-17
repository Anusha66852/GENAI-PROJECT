import React from 'react'
import { Sparkles } from 'lucide-react'
import { EXAMPLE_PROMPTS } from '../utils/promptExamples.js'

export default function PromptInput({
  value,
  onChange,
  onOptimize,
  loading,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      {/* Example chips */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3"
           style={{ color: '#3d5166' }}>
          Try an example
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((ex) => (
            <button
              key={ex}
              onClick={() => onChange(ex)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: 'rgba(255,255,255,0.55)',
                color: '#1e2d3d',
                border: '1px solid rgba(255,255,255,0.7)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.55)'}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea card */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm"
           style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.8)' }}>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Type or paste your prompt here... e.g. 'explain machine learning' or 'write a poem about the ocean'"
          rows={7}
          className="w-full resize-none p-5 text-sm leading-relaxed outline-none"
          style={{ color: '#1e2d3d', background: 'transparent' }}
        />
        <div className="flex items-center justify-between px-5 pb-4">
          <span className="text-xs" style={{ color: '#8fa3b8' }}>
            {value.length} chars
          </span>
        </div>
      </div>

      {/* Optimize button */}
      <div className="flex justify-end">
        <button
          onClick={onOptimize}
          disabled={loading || !value.trim()}
          className="btn-primary text-sm font-medium"
        >
          {loading ? (
            <>
              <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Optimizing…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Optimize Prompt
            </>
          )}
        </button>
      </div>
    </div>
  )
}
