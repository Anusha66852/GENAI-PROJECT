# Prompt Optimizer ⚡

> Classify & enhance your prompts instantly.

A React + Vite application that uses the Anthropic Claude API to classify, rewrite, and optionally answer your prompts using professional prompt engineering templates.

## Features

- 🔍 **Classify** your prompt type automatically (coding, creative, analysis, etc.)
- ✨ **Optimize** raw prompts into structured, professional templates
- 💬 **Generate** full answers with the optimized prompt
- 🧪 **Example prompts** to get started quickly

## Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) – icons
- [Anthropic Claude API](https://www.anthropic.com/) – AI backbone

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/prompt-optimizer.git
cd prompt-optimizer

# Install dependencies
npm install

# Add your API key
# The app will prompt you, or set VITE_ANTHROPIC_API_KEY in a .env file
cp .env.example .env
# Edit .env and add your key

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/          # Anthropic API calls
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries
├── pages/        # Page-level components
├── utils/        # Helper functions
├── App.jsx       # Root component
├── index.css     # Global styles
└── main.jsx      # Entry point
```

## Usage

1. Paste any raw prompt into the text area (or click an example).
2. Click **Optimize Prompt**.
3. The app will classify your prompt, produce an optimized version, and optionally generate a full answer.

## License

MIT
