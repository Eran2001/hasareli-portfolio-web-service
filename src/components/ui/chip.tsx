type ChipProps = { label: string; tone?: 'plain' | 'accent' }

export function Chip({ label, tone = 'plain' }: ChipProps) {
  const className = tone === 'accent' ? 'chip chip-accent' : 'chip'
  return <span className={className}>{label}</span>
}
