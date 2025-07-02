interface MetaItemProps {
  label: string
  value: string | number | null
  type?: 'text' | 'currency' | 'link'
  href?: string
}

export function MetaItem({ label, value, type = 'text', href }: MetaItemProps) {
  if (!value) return null

  const formatValue = () => {
    if (type === 'currency' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    }
    return value.toString()
  }

  const displayValue = formatValue()

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-700">
      <span className="text-gray-400 font-medium mb-1 sm:mb-0">{label}</span>
      {type === 'link' && href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors font-semibold"
        >
          {displayValue}
        </a>
      ) : (
        <span className="text-white font-semibold">{displayValue}</span>
      )}
    </div>
  )
}
