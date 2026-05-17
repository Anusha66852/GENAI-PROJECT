/**
 * Utility: merge class names (lightweight clsx alternative)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Capitalise the first letter of a string
 */
export function capitalise(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate a string to `maxLength` characters
 */
export function truncate(str, maxLength = 120) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}
