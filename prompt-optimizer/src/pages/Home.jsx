import React, { useState } from 'react'
import { Key } from 'lucide-react'
import Header from '../components/Header.jsx'
import PromptInput from '../components/PromptInput.jsx'
import ResultCard from '../components/ResultCard.jsx'
import ErrorBanner from '../components/ErrorBanner.jsx'
import ApiKeyModal from '../components/ApiKeyModal.jsx'
import { usePromptOptimizer } from '../hooks/usePromptOptimizer.js'

export default function Home() {
  const {
    rawPrompt,
    setRawPrompt,
    result,
    loading,
    error,
    generateAnswer,
    setGenerateAnswer,
    apiKey,
    saveApiKey,
    optimize,
    reset,
  } = usePromptOptimizer()

  const [showKeyModal, setShowKeyModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <Header />

      {/* API key button */}
      <div className="flex justify-end px-6 pt-2">
        <button
          onClick={() => setShowKeyModal(true)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: apiKey ? 'rgba(52,78,107,0.15)' : 'rgba(220,38,38,0.12)',
            color: apiKey ? '#344e6b' : '#dc2626',
          }}
        >
          <Key size={12} />
          {apiKey ? 'API Key ✓' : 'Set API Key'}
        </button>
      </div>

      {/* Hero */}
      {!result && (
        <div className="text-center px-6 pt-10 pb-8">
          <h1
            className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ color: '#1e2d3d' }}
          >
            Write better prompts, instantly
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#3d5166' }}>
            Paste your raw prompt and we'll classify it, wrap it in a professional template,
            and optionally generate a full answer.
          </p>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 px-4 md:px-6 pb-16 space-y-5">
        {/* Error */}
        <ErrorBanner message={error} onDismiss={() => {}} />

        {/* Input or Result */}
        {result ? (
          <ResultCard result={result} onReset={reset} />
        ) : (
          <>
            <PromptInput
              value={rawPrompt}
              onChange={setRawPrompt}
              onOptimize={optimize}
              loading={loading}
            />

            {/* Generate answer toggle */}
            <div className="w-full max-w-3xl mx-auto flex items-center gap-2">
              <label className="relative inline-flex items-center cursor-pointer gap-3">
                <input
                  type="checkbox"
                  checked={generateAnswer}
                  onChange={e => setGenerateAnswer(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className="w-10 h-6 rounded-full transition-colors relative"
                  style={{ background: generateAnswer ? '#344e6b' : '#c8d6e2' }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform"
                    style={{ transform: generateAnswer ? 'translateX(18px)' : 'translateX(2px)' }}
                  />
                </div>
                <span className="text-sm" style={{ color: '#3d5166' }}>
                  Also generate a full answer
                </span>
              </label>
            </div>
          </>
        )}
      </main>

      {/* API Key modal */}
      {showKeyModal && (
        <ApiKeyModal
          currentKey={apiKey}
          onSave={saveApiKey}
          onClose={() => setShowKeyModal(false)}
        />
      )}
    </div>
  )
}
