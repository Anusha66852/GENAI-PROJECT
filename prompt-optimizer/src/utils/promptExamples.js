/**
 * Example prompts displayed on the home page.
 */
export const EXAMPLE_PROMPTS = [
  'Explain machine learning in simple terms',
  'Write a haiku about rainy mornings',
  'Write a Python function to sort a list',
  'Summarize the benefits of meditation',
]

/**
 * Map category slug → display label + colour classes
 */
export const CATEGORY_META = {
  coding: {
    label: 'Coding',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
  },
  creative: {
    label: 'Creative',
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    dot: 'bg-purple-500',
  },
  analysis: {
    label: 'Analysis',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    dot: 'bg-blue-500',
  },
  question: {
    label: 'Question',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
  },
  instruction: {
    label: 'Instruction',
    bg: 'bg-rose-100',
    text: 'text-rose-800',
    dot: 'bg-rose-500',
  },
  other: {
    label: 'Other',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    dot: 'bg-slate-400',
  },
}

export function getCategoryMeta(category) {
  return CATEGORY_META[category] || CATEGORY_META.other
}
