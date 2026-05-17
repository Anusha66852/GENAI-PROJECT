import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { getCategoryMeta, capitalise } from '../utils/promptExamples.js'
import { capitalise as cap } from '../lib/utils.js'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
      style={{ background: 'rgba(52,78,107,0.08)', color: '#344e6b' }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function Section({ title, content, badge }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold" style={{ color: '#1e2d3d' }}>{title}</h3>
          {badge}
        </div>
        <CopyButton text={content} />
      </div>
      <div
        className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap"
        style={{ background: '#f4f7fa', color: '#2c3e50' }}
      >
        {content}
      </div>
    </div>
  )
}

export default function ResultCard({ result, onReset }) {
  if (!result) return null

  const meta = getCategoryMeta(result.category)

  const CategoryBadge = (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${meta.bg} ${meta.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  )

  return (
    <div className="w-full max-w-3xl mx-auto fade-in space-y-4">
      <div
        className="rounded-2xl p-6 space-y-5 shadow-sm"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.8)' }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold" style={{ color: '#1e2d3d' }}>Optimized Result</h2>
          <div className="flex items-center gap-2">
            {CategoryBadge}
            <button
              onClick={onReset}
              className="text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{ background: 'rgba(52,78,107,0.08)', color: '#344e6b' }}
            >
              ← New prompt
            </button>
          </div>
        </div>

        <Section
          title="Optimized Prompt"
          content={result.optimizedPrompt}
        />

        {result.answer && (
          <Section
            title="Generated Answer"
            content={result.answer}
          />
        )}
      </div>
    </div>
  )
}
