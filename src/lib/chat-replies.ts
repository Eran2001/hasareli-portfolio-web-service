export function replyTo(question: string) {
  const text = question.toLowerCase()
  if (/availab|hire|freelance|full-time|open to/.test(text)) {
    return "Yes. Hasareli is open to freelance projects and full-time roles. The Let's Build form at the bottom is the fastest way in."
  }
  if (/backend|stack|go\b|python|php|database|api/.test(text)) {
    return 'Go (Gin, Chi), Python (Flask, Django) and PHP on the backend, with PostgreSQL, MySQL and Redis for data. The AI layer is Python.'
  }
  if (/\bai\b|built|build|project|llm|rag|agent/.test(text)) {
    return 'Ledgerly (an AI invoice copilot), DocuMind (RAG search that cites its sources) and Tripwise (an agentic trip planner). The Builds section has the full case studies.'
  }
  return "I'm a demo assistant, so I only know the basics. For anything specific, the Let's Build form below reaches Hasareli directly."
}
