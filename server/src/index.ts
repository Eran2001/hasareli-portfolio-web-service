import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'

const port = Number(process.env.PORT || 8787)
const toAddress = process.env.CONTACT_TO_EMAIL || ''
const fromAddress = process.env.CONTACT_FROM_EMAIL || ''
const apiKey = process.env.RESEND_API_KEY || ''
const webOrigin = process.env.WEB_ORIGIN || 'http://localhost:5173'

const server = createServer(async (request, response) => {
  setCors(request, response)
  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }
  if (request.url === '/health') {
    sendJson(response, 200, { ok: true })
    return
  }
  if (request.method === 'POST' && request.url === '/contact') {
    await handleContact(request, response)
    return
  }
  sendJson(response, 404, { ok: false, error: 'Not found' })
})

server.listen(port, () => {
  console.log(`mail api listening on ${port}`)
})

async function handleContact(request: IncomingMessage, response: ServerResponse) {
  const body = await readBody(request)
  let payload: { name?: string; email?: string; message?: string; projectType?: string }
  try {
    payload = JSON.parse(body) as typeof payload
  } catch {
    sendJson(response, 400, { ok: false, error: 'Invalid JSON' })
    return
  }

  const name = payload.name?.trim() ?? ''
  const email = payload.email?.trim() ?? ''
  const message = payload.message?.trim() ?? ''
  const projectType = payload.projectType?.trim() || 'Just saying hi'
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    sendJson(response, 400, { ok: false, error: 'Name and a valid email are required' })
    return
  }
  if (!apiKey || !toAddress || !fromAddress) {
    sendJson(response, 503, { ok: false, error: 'Mail is not configured' })
    return
  }

  const resend = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromAddress,
      to: [toAddress],
      reply_to: email,
      subject: `Portfolio: ${projectType} from ${name}`,
      text: `${name} <${email}>\nProject: ${projectType}\n\n${message || '(no message)'}`,
    }),
  })

  if (!resend.ok) {
    sendJson(response, 502, { ok: false, error: 'Mail provider rejected the message' })
    return
  }
  sendJson(response, 200, { ok: true })
}

function setCors(request: IncomingMessage, response: ServerResponse) {
  const origin = request.headers.origin
  const allowed = !origin || origin === webOrigin || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')
  response.setHeader('Access-Control-Allow-Origin', allowed && origin ? origin : webOrigin)
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.setHeader('Vary', 'Origin')
}

function sendJson(response: ServerResponse, status: number, payload: unknown) {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(payload))
}

function readBody(request: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    request.on('data', (chunk: Buffer) => chunks.push(chunk))
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    request.on('error', reject)
  })
}
