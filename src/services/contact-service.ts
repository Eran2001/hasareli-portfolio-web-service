import type { ContactInput } from '@/schemas/contact-schema'
import { api } from '@/lib/axios'

export function sendContact(input: ContactInput) {
  return api.post('/contact', input)
}
