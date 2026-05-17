/**
 * Anthropic Claude API helpers
 * The API key is expected at import.meta.env.VITE_ANTHROPIC_API_KEY
 * or passed explicitly when calling the functions.
 */

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL   = 'claude-sonnet-4-20250514'

/**
 * Send a single-turn message to Claude.
 * @param {string} userMessage
 * @param {string} [systemPrompt]
 * @param {string} [apiKey]  Override the env-var key
 * @returns {Promise<string>} The assistant text response
 */
export async function sendMessage(userMessage, systemPrompt = '', apiKey) {
  const key = apiKey || import.meta.env.VITE_ANTHROPIC_API_KEY || ''

  if (!key) {
    throw new Error('No Anthropic API key found. Set VITE_ANTHROPIC_API_KEY in .env or pass it directly.')
  }

  const body = {
    model: MODEL,
    max_tokens: 2048,
    messages: [{ role: 'user', content: userMessage }],
  }

  if (systemPrompt) {
    body.system = systemPrompt
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text ?? ''
}

/**
 * Classify a raw prompt into a category.
 * Returns one of: coding | creative | analysis | question | instruction | other
 */
export async function classifyPrompt(rawPrompt, apiKey) {
  const system = `You are a prompt classifier. Given a raw user prompt, respond with ONLY a single lowercase word from this list:
coding | creative | analysis | question | instruction | other

No punctuation, no explanation — just the category word.`

  const category = await sendMessage(rawPrompt, system, apiKey)
  return category.trim().toLowerCase()
}

/**
 * Optimize a raw prompt using professional prompt-engineering templates.
 * Returns an object { category, optimizedPrompt, answer? }
 */
export async function optimizePrompt(rawPrompt, generateAnswer = false, apiKey) {
  // Step 1 – classify
  const category = await classifyPrompt(rawPrompt, apiKey)

  // Step 2 – rewrite
  const rewriteSystem = `You are an expert prompt engineer. Your task is to take a raw, unstructured prompt and rewrite it into a professional, well-structured prompt that will get the best results from an AI assistant.

Guidelines:
- Add clear context and role framing when helpful
- Specify the desired output format
- Include any relevant constraints or requirements
- Keep the user's original intent 100% intact
- Return ONLY the improved prompt text — no meta-commentary, no "Here is the improved prompt:" preamble

Category of the prompt: ${category}`

  const optimizedPrompt = await sendMessage(rawPrompt, rewriteSystem, apiKey)

  // Step 3 (optional) – answer
  let answer = null
  if (generateAnswer) {
    answer = await sendMessage(optimizedPrompt, '', apiKey)
  }

  return { category, optimizedPrompt, answer }
}
