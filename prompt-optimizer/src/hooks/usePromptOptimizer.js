import { useState, useCallback } from 'react'
import { optimizePrompt } from '../api/claude.js'

/**
 * Custom hook that manages prompt optimisation state and logic.
 */
export function usePromptOptimizer() {
  const [rawPrompt, setRawPrompt]       = useState('')
  const [result, setResult]             = useState(null)   // { category, optimizedPrompt, answer }
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [generateAnswer, setGenerateAnswer] = useState(false)
  const [apiKey, setApiKey]             = useState(
    () => localStorage.getItem('anthropic_api_key') || ''
  )

  const saveApiKey = useCallback((key) => {
    setApiKey(key)
    if (key) localStorage.setItem('anthropic_api_key', key)
    else      localStorage.removeItem('anthropic_api_key')
  }, [])

  const optimize = useCallback(async () => {
    if (!rawPrompt.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await optimizePrompt(rawPrompt.trim(), generateAnswer, apiKey || undefined)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [rawPrompt, generateAnswer, apiKey])

  const reset = useCallback(() => {
    setRawPrompt('')
    setResult(null)
    setError(null)
  }, [])

  return {
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
  }
}
