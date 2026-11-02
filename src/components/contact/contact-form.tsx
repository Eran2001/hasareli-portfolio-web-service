import { useState, type FormEvent } from 'react'

import { contactSchema, projectTypes, type ContactInput } from '@/schemas/contact-schema'
import { sendContact } from '@/services/contact-service'

const emptyForm: ContactInput = { name: '', email: '', message: '', projectType: 'AI feature' }

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyForm)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Add your name and a valid email so I can reply.')
      return
    }
    setPending(true)
    setError('')
    try {
      await sendContact(parsed.data)
      setSent(true)
    } catch {
      setError('The message did not send. Try again in a moment.')
    } finally {
      setPending(false)
    }
  }

  const kind = values.projectType === 'Just saying hi' ? '"just saying hi"' : values.projectType.toLowerCase()

  return sent ? (
    <div className="contact-form form-ok">
      <div className="check">✓</div>
      <h3>Thanks, {values.name}. Message received.</h3>
      <p>I'll get back to you at {values.email} about your {kind} idea.</p>
      <button className="btn btn-ghost" type="button" onClick={() => { setSent(false); setValues(emptyForm) }}>Send another</button>
    </div>
  ) : (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="choices">
        {projectTypes.map((type) => (
          <button
            key={type}
            className={values.projectType === type ? 'choice is-on' : 'choice'}
            type="button"
            onClick={() => setValues((current) => ({ ...current, projectType: type }))}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="fields">
        <label>
          Name
          <input value={values.name} autoComplete="name" onChange={(event) => { setValues((current) => ({ ...current, name: event.target.value })); setError('') }} />
        </label>
        <label>
          Email
          <input type="email" value={values.email} autoComplete="email" onChange={(event) => { setValues((current) => ({ ...current, email: event.target.value })); setError('') }} />
        </label>
      </div>
      <label>
        Message
        <textarea rows={5} value={values.message} onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))} />
      </label>
      <div className="form-row">
        <span className="form-error">{error}</span>
        <button className="btn btn-primary" type="submit" disabled={pending}>{pending ? 'Sending' : 'Send'}</button>
      </div>
    </form>
  )
}
